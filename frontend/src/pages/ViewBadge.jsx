import React from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import formatDateTime from "../utils/DateFormat";
const ViewBadge = () => {
  const { badgeId } = useParams();
  const { data: res, reFetch } = useFetch(`/private/badge/${badgeId}`);
  const badgeRecord = res?.data;

  return (
    <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
      <div className="w-full pb-8  gap-y-4 gap-2 border-b border-primary flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">
            Badge Management Details
          </span>
        </div>
        <div className=" w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
          <Link
            to="/badge-management"
            className="px-4 py-2 text-primary font-medium bg-white hover:bg-gray-50 rounded-xl border border-darkgray whitespace-nowrap"
          >
            Back
          </Link>
          <Link
            to={`/edit-badge/${badgeId}`}
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
          >
            Edit
          </Link>
        </div>
      </div>

      <div className="w-full justify-center items-center mt-8 pb-8 gap-y-4 border-b border-primary gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">Manage Badge</span>
            <span className="text-secondary font-normal ">
              Badge Overview and Details
            </span>
          </div>
          <form className="w-full">
            <div className="w-full">
              <label className="text-primary font-bold">Badge Name</label>
              <p className="mt-1 text-primary">{badgeRecord?.name || "N/A"}</p>
            </div>

            <div className="w-full mt-5">
              <label className="text-primary font-bold">
                Badge Description
              </label>
              <p className="mt-1 text-primary">
                {badgeRecord?.description || "N/A"}
              </p>
            </div>
            <div className="w-full mt-5">
              <label className="text-primary font-bold">Description</label>
              <p className="mt-1 text-primary">
                {badgeRecord?.description || "N/A"}
              </p>
            </div>

            <div className="w-full mt-5">
              <label className="text-primary font-bold">
                Achievement Criteria
              </label>
              <p className="mt-1 text-primary">
                {badgeRecord?.criteria || "N/A"}
              </p>
            </div>
            <div className="w-full mt-5">
              <label className="text-primary font-bold">Status</label>
              <div className="mt-1">
                {badgeRecord?.status === "Active" ? (
                  <div
                    className={`rounded-xl bg-[#ECFDF3] text-[#027948] px-2 py-1 w-fit flex gap-2 items-center`}
                  >
                    <span
                      className="min-w-[12px] min-h-[12px] rounded-full"
                      style={{ backgroundColor: "#12B76A" }}
                    ></span>
                    <span>Active</span>
                  </div>
                ) : (
                  <div
                    className={`rounded-xl bg-[#F2F4F7] text-primary px-2 py-1 w-fit flex gap-2 items-center`}
                  >
                    <span
                      className="min-w-[12px] min-h-[12px] rounded-full"
                      style={{ backgroundColor: "#667085" }}
                    ></span>
                    <span>Inactive</span>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full mt-5  flex flex-col gap-5 sm:flex-row justify-between">
              <div>
                <label className="text-primary font-bold">Created Date</label>
                <p className="mt-1 text-primary">
                  {formatDateTime(badgeRecord?.createdAt) || "N/A"}
                </p>
              </div>
              <div className="">
                <label className="text-primary font-bold">Updated Date</label>
                <p className="mt-1 text-primary">
                  {formatDateTime(badgeRecord?.updatedAt) || "N/A"}
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pb-20 pt-8 ">
          <Link
            to="/badge-management"
            className="px-4 py-2 text-primary font-medium bg-white border border-primary hover:bg-gray-50 rounded-xl whitespace-nowrap"
          >
            Back
          </Link>
        </div>
      )} */}
    </div>
  );
};

export default ViewBadge;
