import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const ViewIPBlacklist = () => {
  const [isScrollable, setIsScrollable] = useState(false);
  const location = useLocation();
  const { row } = location.state;

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
    <>
      <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
        <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex items-start md:flex-row xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
          <div>
            <span className="text-3xl font-semibold text-dark">
              IP Blacklist Details
            </span>
          </div>
          <div className=" w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
            <Link
              id="back"
              to="/ip-blacklist"
              className="px-4 py-2 text-primary font-medium bg-white hover:bg-gray-50  rounded-xl border border-primary whitespace-nowrap"
            >
              Back
            </Link>
          </div>
        </div>

        <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className="block  text-primary">IP Blacklist Details</span>
            </div>

            <form className="w-full">
              <div className="w-full">
                <label className="block  font-medium text-primary">
                  IP Address
                </label>

                <div className="mt-1">
                  <p className="font-normal text-dark">{row.ipaddress}</p>
                </div>
              </div>

              <div className="w-full mt-5">
                <label className="block  font-medium text-primary">
                  Failed Login Attempts
                </label>
                <div className="mt-1">
                  <p className="font-normal text-dark ">
                    {row.failedloginattempts}
                  </p>
                </div>
              </div>

              <div className="w-full mt-5">
                <label className="block  font-medium text-primary">
                  Repeated API Misuse
                </label>
                <div className="mt-1">
                  <p className="font-normal text-dark ">
                    {row.repeatedapimisuse}
                  </p>
                </div>
              </div>

              <div className="w-full mt-5">
                <label className="block font-medium text-primary">
                  DDoS Attack Detection
                </label>
                <div className="mt-1">
                  <p className="font-normal text-dark ">
                    {row.ddosattackdetection}
                  </p>
                </div>
              </div>

              <div className="w-full mt-5">
                <label className="block  font-medium text-primary">
                  Repeatedly Submits Incorrect Forms
                </label>
                <div className="mt-1">
                  <p className="font-normal text-dark ">
                    {row.repeatedlysubmitsincorrectforms}
                  </p>
                </div>
              </div>

              <div className="w-full mt-5">
                <label className="block  font-medium text-primary">
                  Suspicious Login Locations
                </label>
                <div className="mt-1">
                  <p className="font-normal text-dark ">
                    {row.suspiciousloginlocations}
                  </p>
                </div>
              </div>
              <div className="w-full mt-5">
                <label className="block  font-medium text-primary">
                  Date Added
                </label>
                <div className="mt-1">
                  <p className="font-normal text-dark ">{row.dateaddednew}</p>
                </div>
              </div>
              <div className="w-full mt-5">
                <label className="block  font-medium text-primary">
                  Added By
                </label>
                <div className="mt-1">
                  <p className="font-normal text-dark ">{row.addedbynew}</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewIPBlacklist;
