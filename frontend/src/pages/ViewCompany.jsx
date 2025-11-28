import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import formatDateTime from "../utils/DateFormat";
import PlanDetails from "./PlanDetails";
import { PhoneWithFlag } from "../Components/countryCode";
import StatusIndicator from "../Components/StatusIndicator";

const ViewCompany = () => {
  const [onTabClick, setOnTabClick] = useState("Company-Details");
  const { companyId } = useParams();

  const { data: res } = useFetch(`/private/companies/${companyId}`);
  const companyData = res?.data;

  return (
    <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex justify-between items-center   ">
        <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
          View Company
        </h4>

        <div className="flex gap-2">
          <Link
            id="cancel"
            to="/companies"
            className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-darkgray whitespace-nowrap"
          >
            Cancel
          </Link>
          <Link
            id="edit"
            to={`/edit-company/${companyId}`}
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
          >
            Edit
          </Link>
        </div>
      </div>
      <div className="flex  flex-col">
        <div className="overflow-x-auto">
          <div className="w-full align-middle">
            <div className="flex flex-col gap-y-2 md:flex-row md:justify-between items-center gap-2 pt-3 pb-6 ">
              <div className="w-full flex flex-wrap items-center gap-3 border-b border-primary pb-6">
                <button
                  onClick={() => setOnTabClick("Company-Details")}
                  className={`py-2 px-3 rounded-xl text-primary font-medium ${onTabClick === "Company-Details"
                    ? "bg-fadedblue"
                    : "bg-main"
                    }`}
                  id="button-302"
                >
                  Company Details
                </button>
                <button
                  onClick={() => setOnTabClick("Plan-Details")}
                  className={`py-2 px-3 rounded-xl text-primary font-medium ${onTabClick === "Plan-Details" ? "bg-fadedblue" : "bg-main"
                    }`}
                  id="button-303"
                >
                  Plan Details
                </button>
              </div>
            </div>

            {onTabClick === "Company-Details" && (
              <div>
                <div className="w-full justify-center items-center gap-y-4 gap-2 lg:items-start md:items-end xl:items-end border-b border-primary pb-6">
                  <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
                    <div className="sm:w-7/12 w-full flex flex-col">
                      <span className="block  text-primary">
                        Company Details
                      </span>
                    </div>
                    <form className="w-full">
                      <div className="w-full  flex flex-col">
                        <div className="w-full ">
                          <label className="text-primary font-bold">
                            Company Name
                          </label>
                          <p className="mt-1 text-primary">
                            {companyData?.companyName}
                          </p>
                        </div>

                        <div className="w-full mt-5">
                          <label className="text-primary font-bold">
                            Email
                          </label>
                          <p className="mt-1 text-primary">
                            {companyData?.email}
                          </p>
                        </div>

                        <div className="w-full mt-5">
                          <label className="text-primary font-bold">
                            Contact Number
                          </label>
                          <p className="mt-1 text-primary">
                            {companyData ? (
                              <PhoneWithFlag
                                phoneCode={companyData.phoneCode}
                                phone={companyData.phone}
                              />
                            ) : (
                              "NA"
                            )}
                          </p>
                        </div>

                        <div className="w-full mt-5">
                          <label className="text-primary font-bold">
                            Status
                          </label>
                       
                          <StatusIndicator status={companyData?.status}/>
                        </div>
                      </div>

                      <div className="w-full mt-5">
                        <label className="text-primary font-bold">
                          Trial Used
                        </label>
                        <p className="mt-1 text-primary">
                          {companyData?.trialUsed ? "Yes" : "No"}
                          {companyData?.trialUsed ? " (Used)" : " (Not Used)"}
                        </p>
                      </div>

                      <div className="w-full mt-5">
                        <label className="text-primary font-bold">
                          Postal Code
                        </label>
                        <p className="mt-1 text-primary">
                          {companyData?.postalCode || "NA"}
                        </p>
                      </div>

                      <div className="w-full mt-5">
                        <label className="text-primary font-bold">
                          Renewal Date
                        </label>
                        <p className="mt-1 text-primary">
                          {formatDateTime(companyData?.renewalDate || "N/A")}
                        </p>
                      </div>

                      <div className="w-full mt-5 flex justify-between">
                        <div>
                          <label className="text-primary font-bold">
                            Created Date
                          </label>
                          <p className="mt-1 text-primary">
                            {formatDateTime(companyData?.createdAt)}
                          </p>
                        </div>
                        <div>
                          <label className="text-primary font-bold">
                            Updated Date
                          </label>
                          <p className="mt-1 text-primary">
                            {formatDateTime(companyData?.updatedAt)}
                          </p>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="w-full justify-center items-center mt-8 mb-5  gap-y-4 gap-2  lg:items-start md:items-end xl:items-end">
                  <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
                    <div className="w-full md:w-7/12">
                      <span className=" text-primary mb-2">
                        Company Settings
                      </span>
                    </div>
                    <form className="w-full">
                      <div className="flex flex-col">
                        <label className="text-primary font-bold">
                          Date Format
                        </label>
                        <p className="mt-1 text-primary">
                          {companyData?.dateFormat || "NA"}
                        </p>
                      </div>
                      <div className="flex justify-between mt-5 w-full">
                        <div className="flex flex-col">
                          <label className="text-primary font-bold">
                            Time Format
                          </label>
                          <p className="text-primary">
                            {companyData?.timeFormat || "NA"}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <label className="text-primary font-bold">
                            Time Zone
                          </label>
                          <p className="text-primary">
                            {companyData?.timeZone || "NA"}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between mt-5 w-full mb-20">
                        <div className="flex flex-col">
                          <label className="text-primary font-bold">
                            Language
                          </label>
                          <p className="mt-1 text-primary">
                            {companyData?.lang || "NA"}
                          </p>
                        </div>
                        <div className="flex flex-col mr-20">
                          <label className="text-primary font-bold">
                            Currency
                          </label>
                          <p className="mt-1 text-primary">
                            {companyData?.currency || "NA"}
                          </p>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="flex gap-2 w-full justify-end mb-10">
                  <Link
                    id="cancel"
                    to="/companies"
                    className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-darkgray whitespace-nowrap"
                  >
                    Cancel
                  </Link>
                  <Link
                    id="edit"
                    to={`/edit-company/${companyId}`}
                    className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
                  >
                    Edit
                  </Link>
                </div>

              </div>
            )}

            {onTabClick === "Plan-Details" && (
              <PlanDetails companyData={companyData} />
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2 w-full justify-end ">
        <Link
          id="cancel"
          to="/companies"
          className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-darkgray whitespace-nowrap"
        >
          Cancel
        </Link>
        <Link
          id="edit"
          to={`/edit-company/${companyId}`}
          className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default ViewCompany;
