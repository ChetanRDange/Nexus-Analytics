import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NavItem = ({ item, setIsSidebarOpen }) => {
  const theme = document.body.getAttribute("theme") || "dark";
  const { key, title, icon: Icon, pathname, id } = item;
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (typeof setIsSidebarOpen === 'function') {
      setIsSidebarOpen(false);
    }
    
    // Check if we're already on the same path
    if (window.location.pathname === pathname) {
      // Navigate to a temporary path and then back to force a refresh
      navigate('/', { replace: true });
      setTimeout(() => {
        navigate(pathname, { replace: true });
      }, 0);
    } else {
      navigate(pathname, { replace: true });
    }
  };

  return (
    <NavLink
      id={id}
      to={pathname}
      onClick={handleClick}
      className={({ isActive }) =>
        `py-2.5 px-3 rounded-xl flex gap-3 items-center ${
          isActive
            ? "bg-fadedblue text-blue"
            : "text-primary hover:bg-hover bg-main"
        }`
      }
    >
      {({ isActive }) => {
        const iconColor =
          isActive && theme === "light"
            ? "#175cd3"
            : isActive && theme === "dark"
            ? "#60a5fa"
            : undefined;

        return (
          <>
            <Icon {...(iconColor ? { color: iconColor } : {})} />
            {title}
          </>
        );
      }}
    </NavLink>
  );
};

export default NavItem;
