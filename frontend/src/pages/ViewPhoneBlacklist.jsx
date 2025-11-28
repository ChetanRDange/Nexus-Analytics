import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const ViewPhoneBlacklist = () => {
  const [isScrollable, setIsScrollable] = useState(false);
  const location = useLocation();
  const { row } = location.state; // This assumes the `row` is passed via the location state

  const checkScrollability = () => {
    const contentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
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
    <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex items-start md:flex-row xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">
            Phone Blacklist Details
          </span>
        </div>
        <div className="w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
          <Link
            id="back"
            to="/phone-blacklist"
            className="px-4 py-2 text-primary font-medium bg-white hover:bg-gray-50 rounded-xl border border-primary whitespace-nowrap"
          >
            Back
          </Link>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 mb-20 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Phone Blacklist Details</span>
          </div>

          <form className="w-full">
            {/* Country */}
            <div className="w-full">
              <label className="block font-medium text-primary">Country</label>
              <div className="mt-1">
                <p className="font-normal text-dark flex gap-2">
                  <img src={row.countryLogo} alt="" />
                  {row.country}
                </p>
              </div>
            </div>

            {/* Phone Number */}
            <div className="w-full mt-5">
              <label className="block font-medium text-primary">
                Phone Number
              </label>
              <div className="mt-1">
                <p className="font-normal text-dark">{row.phonenumber}</p>
              </div>
            </div>

            {/* Unsolicited Calls */}
            <div className="w-full mt-5">
              <label className="block font-medium text-primary">
                Number of Unsolicited Calls
              </label>
              <div className="mt-1">
                <p className="font-normal text-dark">{row.unsolicitedcalls}</p>
              </div>
            </div>

            {/* Fraud Activity Complaints */}
            <div className="w-full mt-5">
              <label className="block font-medium text-primary">
                Fraudulent Activity Complaints
              </label>
              <div className="mt-1">
                <p className="font-normal text-dark">
                  {row.fraudactivitycomplaints}
                </p>
              </div>
            </div>

            {/* Frequency of Short Calls */}
            <div className="w-full mt-5">
              <label className="block font-medium text-primary">
                Frequency of Short Calls
              </label>
              <div className="mt-1">
                <p className="font-normal text-dark">
                  {row.shortcallsfrequency}
                </p>
              </div>
            </div>

            {/* Failed OTP Verifications */}
            <div className="w-full mt-5">
              <label className="block font-medium text-primary">
                Failed OTP Verifications
              </label>
              <div className="mt-1">
                <p className="font-normal text-dark">
                  {row.failedotpverifications}
                </p>
              </div>
            </div>

            {/* Failed Two-Factor Authentication */}
            <div className="w-full mt-5">
              <label className="block font-medium text-primary">
                Failed Two-Factor Authentication via SMS
              </label>
              <div className="mt-1">
                <p className="font-normal text-dark">{row.failed2fa}</p>
              </div>
            </div>

            {/* Robocall Detection */}
            <div className="w-full mt-5">
              <label className="block font-medium text-primary">
                Robocall Detection
              </label>
              <div className="mt-1">
                <p className="font-normal text-dark">{row.robocallDetection}</p>
              </div>
            </div>

            {/* Date Added */}
            <div className="w-full mt-5">
              <label className="block font-medium text-primary">
                Date Added
              </label>
              <div className="mt-1">
                <p className="font-normal text-dark">{row.dateadded}</p>
              </div>
            </div>

            {/* Added By */}
            <div className="w-full mt-5">
              <label className="block font-medium text-primary">Added By</label>
              <div className="mt-1">
                <p className="font-normal text-dark">{row.addedby}</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewPhoneBlacklist;
