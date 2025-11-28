import React, { useEffect, useMemo, useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import MaterialSidebar from "./MaterialSidebar";
import { GlobalContext } from "../App";
import useStore from "../state/store";

const StructuredLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { fullScreen } = useContext(GlobalContext);
  const { zoomValue } = useStore();

  const handleOutsideClick = (e) => {
    if (isSidebarOpen && window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const sidebarWidth = useMemo(() => {
    return zoomValue === 85 ? 'w-[265px]' : 'w-[310px]';
  }, [zoomValue]);

  return (
    <>
      <div
        className="w-screen h-screen overflow-hidden"
        onClick={handleOutsideClick}
      >
        {!fullScreen && (
          <Navbar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        )}
        <div className="w-screen h-full flex gap-0.5">
          {!fullScreen && (
            <div
              className={`sidebaar-showww ${sidebarWidth} h-screen bg-main ${
                !isSidebarOpen && "hidden md:block"
              }`}
            >
              <div className={`sidebaar-showww fixed ${sidebarWidth} h-screen my-0.5 border-r border-primary`}>
                <MaterialSidebar
                  isSidebarOpen={isSidebarOpen}
                  setIsSidebarOpen={setIsSidebarOpen}
                />
              </div>
            </div>
          )}
          <div className={`${!fullScreen ? "calcc-widthhh" : ""} overflow-y-auto custom-scrollbar min-h-screen bg-main w-full`}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default StructuredLayout;
