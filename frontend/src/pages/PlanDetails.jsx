import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import formatDateTime from "../utils/DateFormat";

const PlanDetails = () => {
  const { companyId } = useParams();

  const { data: res } = useFetch(`/private/companies/${companyId}`);
  const companyData = res?.data;
  const planData = companyData?.plan;

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
    <>
      <div className="w-full justify-center items-center mb-5 pb-8 border-b border-primary gap-y-4 gap-2  lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="w-full md:w-7/12">
            <span className=" text-primary mb-2 px-4 sm:px-0">
              Plan Details
            </span>
          </div>
          <form className="w-full flex sm:flex-row flex-col px-4 sm:px-0 gap-y-2 justify-between gap-6">
            <div className="w-full align-middle my-auto">
              <div>
                <label className="text-primary font-bold">Current Plan</label>
                <p className="text-primary mt-1">{planData?.name || "N/A"}</p>
              </div>
              <div className="mt-5">
                <label className="text-primary font-bold">
                  Payment Currency
                </label>
                <p className="text-primary mt-1">
                  {planData?.currency || "N/A"}
                </p>
              </div>
              <div className="mt-5">
                <label className="text-primary font-bold">Plan Type</label>
                <p className="text-primary mt-1">{planData?.type || "N/A"}</p>
              </div>
              <div className="mt-5">
                <label className="text-primary font-bold">Plan Duration</label>
                <p className="text-primary mt-1">
                  {planData?.duration || "N/A"}
                </p>
              </div>
            </div>
            <div className=" w-full align-middle my-auto ">
              <div className="flex flex-col align-middle my-auto">
                <label className="text-primary font-bold">Payment Status</label>
                <p className="text-green-600 bg-green-100 inline w-fit mt-1 py-1 px-2 rounded-full capitalize">
                  &#x2022; {companyData?.statuss || "N/A"}
                </p>
              </div>
              <div className="mt-5 align-middle my-auto">
                <label className="text-primary font-bold">Payment Amount</label>
                <p className="text-primary mt-1">
                  {planData?.discountedPrice ||
                    planData?.originalPrice ||
                    "N/A"}
                </p>
              </div>
              <div className="mt-5 align-middle my-auto">
                <label className="text-primary font-bold">Created Date</label>
                <p className="text-primary mt-1">
                  {formatDateTime(companyData?.createdAt) || "N/A"}
                </p>
              </div>
              <div className="mt-5 align-middle my-auto">
                <label className="text-primary font-bold">
                  Plan Expiry Date
                </label>
                <p className="text-primary mt-1">
                  {formatDateTime(companyData?.renewalDate) || "N/A"}
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* <div className="w-full justify-center items-center mt-8 mb-5 pb-8  gap-y-4 gap-2  lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="w-full md:w-7/12">
            <span className=" text-primary mb-2">Plan Usage</span>
          </div>
          <div className="w-full flex sm:flex-row flex-col justify-between gap-6 ">
            <PlanUsage
              title="Account Storage"
              logo={Logo1}
              use1="50 GB"
              max="100 GB"
            />
            <PlanUsage title="No. of Seats" logo={Logo2} use1="70" max="100" />
          </div>
        </div>
      </div> */}
    </>
  );
};

export default PlanDetails;
