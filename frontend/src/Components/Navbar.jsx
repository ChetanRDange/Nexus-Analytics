import React, { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FiSun } from "react-icons/fi";
import { HiBars3, HiBars4 } from "react-icons/hi2";
import { PiMoonStarsLight } from "react-icons/pi";
import { TbLogout } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import Person from "../assets/images/person.png";
import { useAuth } from "../AuthContext";
import { useBrand } from "../BrandContext";
import useStore from "../state/store";
import MaterialSidebar from "./MaterialSidebar";
import Leadsmagix from "../assets/images/app-logo.png";
import useMutation from "../hooks/useMutation";
import toast from "react-hot-toast";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { logOut, theme, setTheme } = useAuth();
  const { admin } = useStore();
  const { brand } = useBrand();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const sidebarRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const zoomRef = useRef(null);
  const { zoomValue, setZoomGlobalValue } = useStore();
  const { callApi } = useMutation();

  useEffect(() => {
    document.body.setAttribute("theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleDarkMode = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    try {
      const res = await callApi("/private/user/profile/update", "PUT", {
        isDarkMode: newTheme === 'dark'
      });
      if (res) {
        setTheme(newTheme);
      }
    } catch (error) {
      toast.error("Failed to update theme preference");
    }
  };

  const handleZoom = async (value) => {
    const numericValue = parseInt(value, 10);
    try {
      const res = await callApi("/private/user/profile/update", "PUT", {
        layout: value === 85 ? 'small' : value === 100 ? 'medium' : 'large'
      });
      if (res) {
        setZoom(numericValue);
        setZoomGlobalValue(numericValue);
        document.documentElement.style.fontSize = `${(numericValue / 100) * 16}px`;
        setIsZoomOpen(false);
      }
    } catch (error) {
      toast.error("Failed to update zoom layout");
    }
  };

  useEffect(() => {
    const handleWheel = async (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 25 : -25;
        const newZoom = Math.min(Math.max(zoom + delta, 25), 200);
        try {
          const layoutValue = newZoom <= 85 ? 'small' : newZoom >= 125 ? 'large' : 'medium';
          const res = await callApi("/protect/profile/update", "PUT", {
            layout: layoutValue
          });
          if (res) {
            setZoom(newZoom);
            setZoomGlobalValue(newZoom);
            document.documentElement.style.fontSize = `${(newZoom / 100) * 16}px`;
          }
        } catch (error) {
          console.error('Error updating zoom:', error);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [zoom]);

  const handleSidebarClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  const handleProfileClickOutside = (event) => {
    if (
      profileDropdownRef.current &&
      !profileDropdownRef.current.contains(event.target) &&
      !event.target.closest("button")
    ) {
      setIsProfileOpen(false);
    }
  };

  const handleMobileDropdownClickOutside = (event) => {
    if (
      mobileDropdownRef.current &&
      !mobileDropdownRef.current.contains(event.target) &&
      !event.target.closest("button")
    ) {
      setIsMobileDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleSidebarClickOutside);
    } else {
      document.removeEventListener("mousedown", handleSidebarClickOutside);
    }

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleProfileClickOutside);
    } else {
      document.removeEventListener("mousedown", handleProfileClickOutside);
    }

    if (isMobileDropdownOpen) {
      document.addEventListener("mousedown", handleMobileDropdownClickOutside);
    } else {
      document.removeEventListener(
        "mousedown",
        handleMobileDropdownClickOutside
      );
    }

    if (isZoomOpen) {
      document.addEventListener("mousedown", (event) => {
        if (zoomRef.current && !zoomRef.current.contains(event.target)) {
          setIsZoomOpen(false);
        }
      });
    }

    return () => {
      document.removeEventListener("mousedown", handleSidebarClickOutside);
      document.removeEventListener("mousedown", handleProfileClickOutside);
      document.removeEventListener(
        "mousedown",
        handleMobileDropdownClickOutside
      );
    };
  }, [isSidebarOpen, isProfileOpen, isMobileDropdownOpen, isZoomOpen]);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setIsProfileOpen(false);
    setIsMobileDropdownOpen(false);
    logOut();
  };

  return (
    <>
      <div className="w-screen py-2 px-4 sm:px-6 flex justify-between border-b border-primary items-center bg-main">
        <div className="h-[50px] flex items-center justify-center">
          <div className="flex lg:hidden ml-1">
            <button onClick={handleToggleSidebar} id="button-72">
              <HiBars3 className="text-primary" size={26} strokeWidth={0.01} />
            </button>

            {isSidebarOpen && (
              <div className="absolute inset-0 w-screen bg-black/50 z-40 overflow-y-auto scrollbar-hide">
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="fixed top-2 right-7 z-50 p-2 rounded-full bg-main text-primary hover:bg-hover"
                >
                  <IoClose size={24} />
                </button>
                <div
                  className="lg:hidden block w-[312px] sm:w-[330px] md:w-[340px] h-screen"
                  ref={sidebarRef}
                >
                  <div className="lg:hidden block fixed w-[312px] sm:w-[320px] md:w-[340px] h-screen border-r border-primary my-0.5 bg-main">
                    <div className="relative">
                      <MaterialSidebar
                        handleToggleSidebar={handleToggleSidebar}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Link to="/dashboard" id="link-1">
            {brand && (
              <img
                src={
                  theme === "light"
                    ? brand.lightLogo || brand.darkLogo || Leadsmagix
                    : brand.darkLogo || brand.lightLogo || Leadsmagix
                }
                alt="Leadsmagix"
                className="size-32 ml-4"
              />
            )}
          </Link>
        </div>

        <div className="flex gap-1 sm:gap-3 items-center justify-right">
          <span className="sm:p-1 hover:bg-hover rounded-full hidden sm:block">
            {theme === "light" ? (
              <PiMoonStarsLight
                size={28}
                strokeWidth={1.667}
                className="text-secondary cursor-pointer"
                onClick={toggleDarkMode}
              />
            ) : (
              <FiSun
                size={28}
                strokeWidth={1.667}
                className="text-secondary cursor-pointer"
                onClick={toggleDarkMode}
              />
            )}
          </span>
          <div className="relative hidden sm:block" ref={zoomRef}>
            <button
              onClick={() => setIsZoomOpen(!isZoomOpen)}
              className="px-3 py-1.5 text-secondary hover:bg-hover rounded-lg"
            >
              <HiBars4
                size={
                  zoomValue === 85
                    ? 25
                    : zoomValue === 100
                    ? 24
                    : zoomValue === 125
                    ? 30
                    : 24
                }
              />
            </button>

            {isZoomOpen && (
              <div className="absolute top-[48px] right-0 w-40 bg-main border border-primary rounded-lg shadow-lg z-30">
                <button
                  onClick={() => handleZoom(85)}
                  className="w-full text-left px-4 py-2 hover:bg-hover text-secondary flex items-center justify-between"
                >
                  <span>Small</span>
                  {zoomValue === 85 && <span className="text-blue">✓</span>}
                </button>
                <button
                  onClick={() => handleZoom(100)}
                  className="w-full text-left px-4 py-2 hover:bg-hover text-secondary flex items-center justify-between"
                >
                  <span>Medium</span>
                  {zoomValue === 100 && <span className="text-blue">✓</span>}
                </button>
                <button
                  onClick={() => handleZoom(125)}
                  className="w-full text-left px-4 py-2 hover:bg-hover text-secondary flex items-center justify-between"
                >
                  <span>Large</span>
                  {zoomValue === 125 && <span className="text-blue">✓</span>}
                </button>
              </div>
            )}
          </div>

          <div className="relative hidden sm:block">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsProfileOpen(!isProfileOpen);
              }}
              className="p-1"
              id="button-69"
            >
              {admin?.avatar ? (
                <img
                  className="profile-image rounded-full"
                  src={admin.avatar}
                  width={40}
                  height={40}
                  alt="Avatar"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-lg font-semibold uppercase">
                  {admin?.name?.charAt(0) || "A"}
                </div>
              )}
            </button>
            {isProfileOpen && (
              <div
                ref={profileDropdownRef}
                className="w-[300px] overflow-hidden mb-2 z-30 border border-primary rounded-lg bg-main absolute top-[48px] right-0"
              >
                <div className="border-b border-primary">
                  <div className="w-full px-4 py-2 flex gap-2 items-center pb-4 border-b border-primary">
                    {admin?.avatar ? (
                      <img
                        className="profile-image rounded-full"
                        src={admin.avatar}
                        width={40}
                        height={40}
                        alt="Avatar"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-lg font-semibold uppercase">
                        {admin?.name?.charAt(0) || "A"}
                      </div>
                    )}
                    <div className="flex flex-col gap-y-0.5 ">
                      <h4 className="text-primary text-lg">
                        {" "}
                        {admin?.name?.length > 20
                          ? `${admin.name.slice(0, 20)}...`
                          : admin?.name}
                      </h4>
                      <p
                        className="font-normal text-secondary"
                        style={{ wordWrap: "break-word" }}
                      >
                        {admin?.email?.length > 20
                          ? `${admin.email.slice(0, 20)}...`
                          : admin?.email}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <Link
                      id="link-2"
                      to={"/profile"}
                      onClick={() => setIsProfileOpen(false)}
                      className="py-3 px-4 flex gap-2 text-secondary items-center font-medium hover:bg-hover cursor-pointer"
                    >
                      <CgProfile size={22} strokeWidth={0.01} />
                      <span>Profile </span>
                    </Link>
                  </div>
                </div>

                <Link
                  id="link-3"
                  onClick={handleLogout}
                  className="py-3 px-4 text-secondary flex gap-2 items-center font-medium hover:bg-hover cursor-pointer"
                >
                  <TbLogout size={22} />
                  Logout
                </Link>
              </div>
            )}
          </div>

          <div className="flex sm:hidden items-center gap-2">
            <button onClick={toggleDarkMode} className="p-1" id="button-70">
              {theme === "light" ? (
                <PiMoonStarsLight size={24} className="text-secondary" />
              ) : (
                <FiSun size={24} className="text-secondary" />
              )}
            </button>

            <div className="relative">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileDropdownOpen(!isMobileDropdownOpen);
                }}
                className="p-1"
                id="button-71"
              >
                <img
                  className="profile-image rounded-full"
                  src={admin?.avatar || Person}
                  width={34}
                  height={34}
                  alt="Person"
                />
              </button>

              {isMobileDropdownOpen && (
                <div
                  ref={mobileDropdownRef}
                  className="z-30 border  overflow-hidden border-primary rounded-lg bg-main absolute top-[48px] right-0 w-[75vw]"
                >
                  <div className="border-b border-primary">
                    <div className="w-full px-4 py-2 flex gap-2 items-center pb-4 border-b border-primary">
                      <img
                        className="profile-image rounded-full"
                        src={admin?.avatar || Person}
                        width={40}
                        height={40}
                        alt="Person"
                      />
                      <div className="flex flex-col gap-y-0.5">
                        <h4 className="text-primary text-lg">
                          {admin?.name?.length > 20
                            ? `${admin.name.slice(0, 20)}...`
                            : admin?.name}
                        </h4>
                        <p
                          className="font-normal text-secondary"
                          style={{ wordWrap: "break-word" }}
                        >
                          {admin?.email?.length > 20
                            ? `${admin.email.slice(0, 20)}...`
                            : admin?.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col w-full">
                      <Link
                        id="link-4"
                        to={"/profile"}
                        onClick={() => setIsMobileDropdownOpen(false)}
                        className="py-3 px-4 flex gap-2 text-secondary items-center font-medium hover:bg-hover cursor-pointer"
                      >
                        <CgProfile size={22} strokeWidth={0.01} />
                        <span>Profile</span>
                      </Link>
                    </div>
                  </div>

                  <Link
                    id="link-5"
                    onClick={handleLogout}
                    className="py-3 px-4 text-secondary flex gap-2 items-center font-medium hover:bg-hover cursor-pointer"
                  >
                    <TbLogout size={22} />
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
