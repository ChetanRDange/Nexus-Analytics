import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import StatusIndicator from "../Components/StatusIndicator";

const ViewSmtp = () => {
  const [smtpData, setSmtpData] = useState({});
  const { smtpId } = useParams();


  const { data: res, reFetch } = useFetch(`/private/smtp/${smtpId}`);
  const smtpDetails = res?.data;

  useEffect(() => {
    if (smtpDetails) {
      setSmtpData(smtpDetails);
    }
  }, [smtpDetails]);

  return (
    <>
      <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-wrap justify-between items-center   ">
        <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
          View SMTP
        </h4>

        <div className="flex gap-2">
            <Link
              id="back"
              to="/smtp-settings"
              className="px-4 py-2 text-primary hover:bg-hover  font-medium bg-main rounded-xl border border-primary whitespace-nowrap"
            >
              Back
            </Link>
          </div>
        </div>

        <div className="w-full justify-center items-center mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className="block  text-primary ">SMTP Details</span>
              <span className="text-secondary font-normal ">
                SMTP settings details
              </span>
            </div>

            <form className="w-full">
              <div className="w-full">
                <label className="block  font-bold text-primary">
                  SMTP Name
                </label>

                <div className="mt-1">
                  <p className="font-medium text-dark">
                    {smtpData?.name || "N/A"}
                  </p>
                </div>
              </div>

              <div className="w-full mt-5">
                <label className="block  font-bold text-primary">
                  SMTP Host
                </label>
                <div className="mt-1">
                  <p className="font-medium text-dark ">
                    {smtpData?.host || "N/A"}
                  </p>
                </div>
              </div>

              <div className="w-full mt-5">
                <label className="block  font-bold text-primary">
                  SMTP User Name
                </label>
                <div className="mt-1">
                  <p className="font-medium text-dark ">
                    {smtpData?.userName || "N/A"}
                  </p>
                </div>
              </div>

              <div className="w-full mt-5">
                <label className="block font-bold text-primary">
                  SMTP Password
                </label>
                <div className="mt-1">
                  <p className="font-medium text-dark ">
                    {smtpData?.password || "N/A"}
                  </p>
                </div>
              </div>

              <div className="w-full mt-5">
                <label className="block  font-bold text-primary">
                  SMTP Port
                </label>
                <div className="mt-1">
                  <p className="font-medium text-dark ">
                    {smtpData?.port || "N/A"}
                  </p>
                </div>
              </div>

              <div className="w-full mt-5">
                <label className="block  font-bold text-primary">
                  From Name
                </label>
                <div className="mt-1">
                  <p className="font-medium text-dark ">
                    {smtpData?.fromName || "N/A"}
                  </p>
                </div>
              </div>
              <div className="w-full mt-5">
                <label className="block  font-bold text-primary">
                  From Email
                </label>
                <div className="mt-1">
                  <p className="font-medium text-dark ">
                    {smtpData?.fromEmail || "N/A"}
                  </p>
                </div>
              </div>
              <div className="w-full mt-5">
                <label className="block  font-bold text-primary">
                  Encrypted
                </label>
                <div className="mt-1">
                  <p className="font-medium text-dark ">
                    {smtpData?.secure || "N/A"}
                  </p>
                </div>
              </div>

              <div className="w-full mt-5">
                <label className="block  font-bold text-primary">
                  IsVerified
                </label>
               <StatusIndicator isActive={smtpData?.isVerified}/>
              </div>
            </form>
          </div>
        </div>

        <div className=" w-full flex gap-4 justify-end items-end">
            <Link
              id="back"
              to="/smtp-settings"
              className="px-4 py-2 text-primary hover:bg-hover  font-medium bg-main rounded-xl border border-primary whitespace-nowrap"
            >
              Back
            </Link>
          </div>
      </div>
    </>
  );
};

export default ViewSmtp;
