import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const ViewLoginLog = () => {
  const location = useLocation();
  const { row, heading } = location.state;

  const [isScrollable, setIsScrollable] = useState(false);

  const checkScrollability = () => {
    const contentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    console.log(windowHeight);
    setIsScrollable(contentHeight > windowHeight);
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);

    return () => {
      window.removeEventListener("resize", checkScrollability);
    };
  }, []);

  return (
    <div className="min-h-screen py-8 p-4 sm:p-5 overflow-x-hidden mb-20">
      <div className="w-full pb-8  gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end border-b border-primary">
        <div>
          <span className="text-3xl font-semibold text-dark">
            Login Log Details
          </span>
        </div>
        <div className="w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
          <Link
            id="back"
            to="/login-logs"
            className="px-4 py-2 text-primary font-medium bg-white hover:bg-gray-50 rounded-xl border border-primary whitespace-nowrap"
          >
            Back
          </Link>
        </div>
      </div>

      <div className="pb-14">
        <div className="w-full justify-center border-b border-primary items-center mt-8 mb-5 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="w-full md:w-7/12">
              <span className=" text-primary whitespace-nowrap md:whitespace-wrap">
                User Information
              </span>
            </div>
            <div className="w-full">
              <div className="w-full flex flex-col gap-y-1">
                <label className="text-primary font-bold">User Name </label>
                <span className="text-primary font-medium">{row.fullName}</span>
              </div>
              <div className="w-full flex flex-col gap-y-1 mt-5">
                <label className="text-primary font-bold">Email ID </label>
                <span className="text-primary font-medium">{row.email}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full justify-center border-b border-primary items-center mt-8 mb-5 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="w-full md:w-7/12">
              <span className=" text-primary whitespace-nowrap md:whitespace-wrap">
                Login Information
              </span>
            </div>

            <div className="w-full">
              <div className="flex w-full justify-between items-center">
                <div>
                  <label className="text-primary"> Login Date & Time </label>
                  <span className="text-primary font-medium">
                    {row.loginDate}
                  </span>
                </div>
                <div>
                  <label className="text-primary"> Logout Date & Time </label>
                  <span className="text-primary font-medium">
                    {row.logoutDate}
                  </span>
                </div>
              </div>

              <div className="w-full flex flex-col gap-y-1 mt-5">
                <label className="text-primary font-bold">Duration </label>
                <span className="text-primary font-medium">{row.duration}</span>
              </div>
              <div className="w-full flex flex-col gap-y-1 mt-5">
                <label className="text-primary font-bold">IP Address </label>
                <span className="text-primary font-medium">
                  {row.ipAddress}
                </span>
              </div>
              <div className="w-full flex flex-col gap-y-1 mt-5">
                <label className="text-primary font-bold">Location </label>
                <span className="text-primary font-medium">{row.location}</span>
              </div>

              <div className="mt-5">
                <label className="text-primary font-bold">Status </label>
                {row.status === "Success" ? (
                  <div className="flex gap-2 items-center mt-2 justify-center w-fit px-2 p-1 rounded-xl bg-[#ECFDF3] text-[#027948] ">
                    <span
                      className="min-w-[8px] min-h-[8px] rounded-full"
                      style={{ backgroundColor: "#12B76A" }}
                    ></span>
                    <span>Success</span>
                  </div>
                ) : (
                  <div className="flex gap-2 items-center mt-2 justify-center w-fit px-2 p-1 rounded-xl bg-[#FEF3F2] text-[#B32318]">
                    <span
                      className="min-w-[8px] min-h-[8px] rounded-full"
                      style={{ backgroundColor: "#F04438" }}
                    ></span>
                    <span>Failure</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full justify-center border-b border-primary items-center mt-8 mb-5 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="w-full md:w-7/12">
              <span className=" text-primary whitespace-nowrap md:whitespace-wrap">
                Additional Security Information
              </span>
            </div>

            <div className="w-full">
              <div className="w-full flex flex-col gap-y-1">
                <label className="text-primary">
                  2FA Used (Two Factor Authentication)
                </label>
                <span className="text-primary font-medium">{row.twoFA}</span>
              </div>

              <div className="w-full flex flex-col mt-5 gap-y-1">
                <label className="text-primary"> Login Method </label>
                <span className="text-primary font-medium">
                  {row.loginmethod}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isScrollable && (
        <div className="w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
          <Link
            id="back-1"
            to="/login-logs"
            className="px-4 py-2 text-primary font-medium bg-white hover:bg-gray-50 rounded-xl border border-primary whitespace-nowrap"
          >
            Back
          </Link>
        </div>
      )}
    </div>
  );
};

export default ViewLoginLog;
