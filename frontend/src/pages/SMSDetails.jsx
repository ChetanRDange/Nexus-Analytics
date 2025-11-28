import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const SMSDetails = () => {
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
            SMS Logs Details
          </span>
        </div>
        <div className="w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
          <Link
            id="back"
            to="/sms-logs"
            className="px-4 py-2 text-primary font-medium hover:bg-gray-50 bg-white rounded-xl border border-primary whitespace-nowrap"
          >
            Back
          </Link>
        </div>
      </div>

      <div className="w-full justify-center items-center mt-8 mb-5 pb-8 border-b border-primary gap-y-4 gap-2  lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="w-full md:w-7/12">
            <span className=" text-primary mb-2 whitespace-nowrap md:whitespace-wrap">
              Recipient Details
            </span>
          </div>
          <div className="w-full">
            <div className="w-full flex flex-col gap-y-1">
              <label className="text-primary font-bold"> Recipient Name </label>
              <span className="text-primary font-medium">
                {row.recipientName}
              </span>
            </div>

            <div className="w-full flex flex-col gap-y-1 mt-5">
              <label className="text-primary"> Phone Number </label>
              <div className="flex gap-2 items-center">
                <span className="text-primary font-medium">
                  {row.countryCode}
                </span>
                <span className="text-primary font-medium">{row.phone}</span>
              </div>
            </div>
            <div className="w-full flex flex-col gap-y-1 mt-5">
              <label className="text-primary"> Country </label>
              <span className="text-primary font-medium">{row.country}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center mt-8 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="w-7/12">
            <span className=" text-primary mb-2 whitespace-nowrap md:whitespace-wrap">
              SMS Details
            </span>
          </div>
          <div className="w-full">
            <div className="w-full flex flex-col gap-y-1">
              <label className="text-primary"> Message ID </label>
              <span className="text-primary font-medium">{row.messageId}</span>
            </div>
            <div className="w-full flex flex-col gap-y-1 mt-5">
              <label className="text-primary"> Message Content </label>
              <span className="text-primary font-medium">
                {row.messageContent}
              </span>
            </div>
            <div className="w-full flex flex-col gap-y-1 mt-5">
              <label className="text-primary"> Type </label>
              <span className="text-primary font-medium">{row.type}</span>
            </div>
            <div className="w-full flex flex-col gap-y-1 mt-5">
              <label className="text-primary"> Response Time </label>
              <span className="text-primary font-medium">
                {row.responseTime}
              </span>
            </div>
            <div className="w-full flex flex-col gap-y-1 mt-5">
              <label className="text-primary"> Sent Date & Time </label>
              <span className="text-primary font-medium">{row.sentDate}</span>
            </div>
            <div className="w-fit flex flex-col gap-y-1 mt-5">
              <label className="text-primary"> Status </label>
              {row.status === "Delivered" ? (
                <div className="flex gap-2 items-center py-1 px-2 bg-[#ECFDF3] rounded-xl text-[#027948]">
                  <span className="w-[12px] h-[12px] rounded-full bg-[#12B76A]"></span>
                  <span>{row.status}</span>
                </div>
              ) : row.status === "Sent" ? (
                <div className="flex gap-2 items-center py-1 px-2 bg-[#FFF7E1] rounded-xl text-[#FFB904]">
                  <span className="w-[12px] h-[12px] rounded-full bg-[#FFB904]"></span>
                  <span>{row.status}</span>
                </div>
              ) : (
                <div className="flex gap-2 items-center py-1 px-2 bg-[#FEF3F2] rounded-xl text-[#B32318]">
                  <span className="w-[12px] h-[12px] rounded-full bg-[#F04438]"></span>
                  <span>{row.status}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border-t border-primary">
          <Link
            id="back-1"
            to="/sms-logs"
            className="px-4 py-2 text-primary font-medium bg-white hover:bg-gray-50 rounded-xl border border-primary whitespace-nowrap"
          >
            Back
          </Link>
        </div>
      )}
    </div>
  );
};

export default SMSDetails;
