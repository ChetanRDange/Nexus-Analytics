import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import formatDateTime from "../utils/DateFormat";
import StatusIndicator from "../Components/StatusIndicator";

const ViewPlan = () => {
  const { planId } = useParams();

  const { data: res, reFetch } = useFetch(`/private/plans/${planId}`);
  const row = res?.data;

  const displayData = (value) => {
    return value !== undefined && value !== null ? value : "N/A";
  };

  const displayBoolean = (value) => {
    if (value === undefined || value === null) return "N/A";
    return value ? "Yes" : "No";
  };

  return (
    <div className="min-h-screen py-8 p-4 sm:p-5 overflow-x-hidden">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex justify-between items-center   ">
        <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
          View Plan
        </h4>

        <div className="flex gap-2">
          <Link
            id="back"
            to={row?.type === "Normal" ? "/normal-plans" : "/enterprise-plans"}
            className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
          >
            Back
          </Link>
          <Link
            id="edit"
            to={`/edit-plan/${planId}`}
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
          >
            Edit
          </Link>
        </div>
      </div>

      <div className="pb-14">
        <div className="w-full justify-center items-center mt-8 mb-5 pb-8 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="w-full md:w-7/12">
              <span className="text-primary mb-2 whitespace-nowrap md:whitespace-wrap">
                Plan Details
              </span>
            </div>
            <div className="w-full">
              <div className="w-full flex flex-col gap-y-1">
                <label className="text-primary font-bold">Plan Name</label>
                <span className="text-primary font-medium">
                  {displayData(row?.name)}
                </span>
              </div>

              <div className="w-full flex flex-col gap-y-1 mt-5">
                <label className="text-primary font-bold">
                  Plan Description
                </label>
                <span className="text-primary font-medium">
                  {displayData(row?.description)}
                </span>
              </div>

              <div className="w-full flex flex-col gap-y-1 mt-5">
                <label className="text-primary font-bold">Features</label>
                {row?.features?.length > 0 ? (
                  row?.features?.map((featureGroup, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2"
                    >
                      {Object.entries(featureGroup).map(([key, value]) => {
                        if (key !== "_id" && typeof value === "object") {
                          return (
                            <div key={key} className="flex items-center gap-2">
                              <span
                                className={`w-4 h-4 rounded ${
                                  value?.available
                                    ? "bg-green-500"
                                    : "bg-gray-300"
                                }`}
                              ></span>
                              <span className="text-primary">
                                {displayData(value?.label)}
                              </span>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  ))
                ) : (
                  <span className="text-primary">N/A</span>
                )}
              </div>

              <div className="flex gap-4 flex-col gap-y-3 lg:flex-row items-center mt-5">
                <div className="w-full flex flex-col gap-y-1">
                  <label className="text-primary font-bold">Plan Type</label>
                  <span className="text-primary font-medium">
                    {displayData(row?.type)}
                  </span>
                </div>
                <div className="w-full flex flex-col gap-y-1">
                  <label className="text-primary font-bold">Status</label>
                  <StatusIndicator isActive={row?.isActive} />{" "}
                </div>
              </div>

              <div className="flex gap-4 flex-col gap-y-3 lg:flex-row items-center mt-5">
                <div className="w-full flex flex-col gap-y-1">
                  <label className="text-primary font-bold"> Duration </label>
                  <span className="text-primary font-medium capitalize">
                    {displayData(row?.duration)}
                  </span>
                </div>
                <div className="w-full flex flex-col gap-y-1">
                  <label className="text-primary font-bold"> Currency </label>
                  <span className="text-primary font-medium">
                    {displayData(row?.currency)}
                  </span>
                </div>
              </div>

              <div className="flex gap-4 flex-col gap-y-3 lg:flex-row items-center mt-5">
                <div className="w-full flex flex-col gap-y-1">
                  <label className="text-primary font-bold">
                    {" "}
                    Original Price{" "}
                  </label>
                  <span className="text-primary font-medium">
                    {displayData(row?.originalPrice)}
                  </span>
                </div>
                <div className="w-full flex flex-col gap-y-1">
                  <label className="text-primary font-bold">
                    {" "}
                    Discounted Price{" "}
                  </label>
                  <span className="text-primary font-medium">
                    {displayData(row?.discountedPrice)}
                  </span>
                </div>
              </div>

              <div className="flex gap-4 flex-col gap-y-3 lg:flex-row items-center mt-5">
                <div className="w-full flex flex-col gap-y-1">
                  <label className="text-primary font-bold">
                    Trial Available
                  </label>
                  <span className="text-primary font-medium">
                    {displayBoolean(row?.trial)}
                  </span>
                </div>
                <div className="w-full flex flex-col gap-y-1">
                  <label className="text-primary font-bold">
                    Extra Durations
                  </label>
                  <span className="text-primary font-medium">
                    {displayBoolean(row?.extraDurations)}
                  </span>
                </div>
              </div>

              <div className="flex gap-4 flex-col gap-y-3 lg:flex-row items-center mt-5">
                <div className="w-full flex flex-col gap-y-1">
                  <label className="text-primary font-bold">Created Date</label>
                  <span className="text-primary font-medium">
                    {row?.createdAt ? formatDateTime(row?.createdAt) : "N/A"}
                  </span>
                </div>
                <div className="w-full flex flex-col gap-y-1">
                  <label className="text-primary font-bold">Updated Date</label>
                  <span className="text-primary font-medium">
                    {row?.updatedAt ? formatDateTime(row?.updatedAt) : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPlan;
