import React from "react";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { base_url } from "./config/constant";
import useStore from "./state/store";
import useFetch from "./hooks/useFetch";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { admin, setAdmin, setZoomGlobalValue } = useStore();
  const [metaData, setMetaData] = useState(null);

  const [theme, setTheme] = useState("light");
  const [layout, setLayout] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(
    localStorage.getItem("authtoken") ||
    sessionStorage.getItem("authtoken") ||
    null
  );
  const navigate = useNavigate();
  const location = useLocation();
  const login = (token, rememberMe) => {
    setToken(token);
    if (rememberMe) {
      localStorage.setItem("authtoken", token);
      setIsAuthenticated(true);
      navigate("/dashboard", { replace: true });
    } else {
      sessionStorage.setItem("authtoken", token);
      setIsAuthenticated(true);
      navigate("/dashboard", { replace: true });
    }
  };

  const logOut = () => {
    localStorage.removeItem("authtoken");
    sessionStorage.removeItem("authtoken");
    setIsAuthenticated(false);
    setToken("");
    navigate("/", { replace: true });
  };

  const { data: profileData, loading: profileLoading } = useFetch(
    "/protect/profile",
    {},
    !token
  );

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  useEffect(() => {
    if (profileData && profileData.data) {
      const roleInfo = profileData?.data;
      setAdmin({
        _id: roleInfo?._id,
        name: roleInfo?.name,
        email: roleInfo?.email,
        isSuperAdmin: roleInfo?.isSuperAdmin,
        isVerified: roleInfo?.isVerified,
        roles: {
          _id: roleInfo?.roles?._id,
          name: roleInfo?.roles?.name,
        },
        phone: roleInfo?.phone,
        avatar: roleInfo?.avatar,
        permissions: roleInfo?.roles?.permissions,
        socials: roleInfo?.socials,
        brandSettings: roleInfo?.brandSettings,
      });
      setMetaData(profileData?.data?.metaData);
      // Set theme from profile data
      if (roleInfo?.isDarkMode !== undefined) {
        setTheme(roleInfo.isDarkMode ? 'dark' : 'light');
      }
      // Set layout/zoom from profile data
      if (roleInfo?.layout) {
        const zoomValue = roleInfo.layout === 'small' ? 85 : roleInfo.layout === 'large' ? 125 : 100;
        setZoomGlobalValue(zoomValue);
        document.documentElement.style.fontSize = `${(zoomValue / 100) * 16}px`;
      }
    } else if (token) {
      // Fallback: Try to get user from localStorage if profile fetch fails
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setAdmin({
            _id: userData.id,
            name: userData.name,
            email: userData.email,
            isSuperAdmin: true, // Default to superadmin for dashboard access
            isVerified: true,
            roles: { _id: '1', name: 'Admin' },
            permissions: {},
          });
        } catch (e) {
          console.error('Error parsing stored user:', e);
        }
      }
    }
  }, [profileData, token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        setToken,
        login,
        logOut,
        profileLoading,
        metaData,
        setMetaData,
        theme,
        setTheme,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
