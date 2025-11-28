import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
const ForgotPasswordDetails = () => {
  const { forgotPasswordId } = useParams();
  const [isScrollable, setIsScrollable] = useState(false);

  const { data: res } = useFetch(
    `/private/logs/forgot-password/${forgotPasswordId}`
  );

  const forPasswordLogs = res?.data || {};

  return (
    <div className="min-h-screen py-8 p-4 sm:p-5 overflow-x-hidden mb-20">
      <div className="w-full pb-8  gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end border-b border-primary">
        <div>
          <span className="text-3xl font-semibold text-dark">
            Forgot Password Logs
          </span>
        </div>
        <div className="w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
          <Link
            id="back"
            to="/forgot-password-logs"
            className="px-4 py-2 text-primary font-medium hover:bg-gray-50 bg-white rounded-xl border border-primary whitespace-nowrap"
          >
            Back
          </Link>
        </div>
      </div>

      <div className="w-full justify-center items-center mt-8 mb-5 pb-8 gap-y-4 gap-2 border-b border-primary lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="w-full md:w-7/12">
            <span className=" text-primary mb-2 whitespace-nowrap md:whitespace-wrap">
              User Information
            </span>
          </div>
          <div className="w-full">
            <div className="w-full flex flex-col gap-y-1">
              <label className="text-primary font-bold"> User Name </label>
              <span className="text-primary font-medium">
                {forPasswordLogs?.name || "N/A"}
              </span>
            </div>
            <div className="w-full flex flex-col gap-y-1 mt-5">
              <label className="text-primary"> Email ID </label>
              <a
                href={`mailto:${forPasswordLogs?.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {forPasswordLogs?.email || "N/A"}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center mt-8 mb-8 pb-8 gap-y-4 gap-2 border-b border-primary lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="w-full md:w-7/12">
            <span className=" text-primary mb-2 whitespace-nowrap md:whitespace-wrap">
              Forgot Password Logs Details
            </span>
          </div>
          <div className="w-full">
            <div className="w-full flex flex-col gap-y-1">
              <label className="text-primary"> IP Address </label>
              <a
                href={`http://${forPasswordLogs?.ipAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {forPasswordLogs?.ipAddress}
              </a>
            </div>
            <div className="w-full flex flex-col gap-y-1 mt-5">
              <label className="text-primary font-bold"> Device </label>
              <span className="text-primary font-medium">
                {forPasswordLogs?.device || "N/A"}
              </span>
            </div>
            <div className="w-full flex flex-col gap-y-1 mt-5">
              <label className="text-primary"> Request Count </label>
              <span className="text-primary font-medium">
                {forPasswordLogs?.count || "N/A"}
              </span>
            </div>
            <div className="w-full flex flex-col gap-y-1 mt-5">
              <label className="text-primary"> Server </label>
              <span className="text-primary font-medium">Server 1</span>
            </div>
            <div className="w-full flex flex-col gap-y-1 mt-5">
              <label className="text-primary"> Request Time </label>
              <span className="text-primary font-medium">
                {forPasswordLogs?.time || "N/A"}
              </span>
            </div>
            <div className="w-full flex flex-col gap-y-1 mt-5">
              <label className="text-primary"> Triggered By </label>
              <span className="text-primary font-medium">
                {forPasswordLogs?.detials}
              </span>
            </div>
            <div className="w-full flex flex-col gap-y-1 mt-5">
              <label className="text-primary"> Details </label>
              <span className="text-primary font-medium">
                Password reset email sent successfully.
              </span>
            </div>
            <div className="w-fit flex flex-col gap-y-1 mt-5">
              <label className="text-primary"> Status </label>
              {forPasswordLogs?.status === "Success" ? (
                <div className="flex gap-2 items-center py-1 px-2 bg-[#ECFDF3] rounded-xl text-[#027948]">
                  <span className="w-[12px] h-[12px] rounded-full bg-[#12B76A]"></span>
                  <span>{forPasswordLogs?.status}</span>
                </div>
              ) : forPasswordLogs?.status === "Pending" ? (
                <div className="flex gap-2 items-center py-1 px-2 bg-[#ECFDF3] rounded-xl text-[#B54708]">
                  <span className="w-[12px] h-[12px] rounded-full bg-[#F79009]"></span>
                  <span>{forPasswordLogs?.status}</span>
                </div>
              ) : (
                <div className="flex gap-2 items-center py-1 px-2 bg-[#FEF3F2] rounded-xl text-[#B32318]">
                  <span className="w-[12px] h-[12px] rounded-full bg-[#F04438]"></span>
                  <span>{forPasswordLogs?.status}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4">
          <Link
            id="back-1"
            to="/forgot-password-logs"
            className="px-4 py-2 text-primary font-medium bg-white hover:bg-gray-50 rounded-xl border border-primary whitespace-nowrap"
          >
            Back
          </Link>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordDetails;
