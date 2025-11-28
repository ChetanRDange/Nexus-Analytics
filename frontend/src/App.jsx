import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AuthProvider from "./AuthContext";
import useFavicon from "./hooks/useFavicon.jsx";
import Layout from "./pages/Layout";
import { useEffect } from "react";
import useStore from "./state/store";
import { BrandProvider } from "./BrandContext.jsx";
import { ThemeProvider } from "./ThemeContext.jsx";
import Loader from "./Components/Loader.jsx";

export const GlobalContext = React.createContext({});

function App() {
  const { admin } = useStore();
  const [loading, setLoading] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  const setFavicon = useFavicon("/assets/images/leadmagixlogo.png");

  useEffect(() => {
    if (admin?.brandSettings?.favIcon) {
      setFavicon(admin.brandSettings.favIcon);
    }
  }, [admin?.brandSettings?.favIcon]);

  return (
    <GlobalContext.Provider
      value={{ loading, setLoading, fullScreen, setFullScreen }}
    >
      {loading && <Loader />}
      <div className="w-screen inter-unique overflow-x-hidden">
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              width: "auto",
              maxWidth: "90vw",
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
            },
          }}
        />
        <BrowserRouter>
          <AuthProvider>
            <ThemeProvider>
              <BrandProvider>
                <Layout />
              </BrandProvider>
            </ThemeProvider>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
