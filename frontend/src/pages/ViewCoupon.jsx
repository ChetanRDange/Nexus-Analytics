import { Info } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import formatDateTime from "../utils/DateFormat";
import StatusIndicator from "../Components/StatusIndicator";

const ViewCoupon = () => {
  const { couponId } = useParams();
  const { data: res, reFetch } = useFetch(`/private/coupons/${couponId}`);
  const couponRecord = res?.data;

  return (
    <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-wrap justify-between items-center   ">
        <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
          View Coupons Details
        </h4>

        <div className="flex gap-2">
          <Link
            id="back"
            to="/coupons"
            className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-darkgray whitespace-nowrap"
          >
            Back
          </Link>
          <Link
            id="edit"
            to={`/coupons/edit/${couponId}`}
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
          >
            Edit
          </Link>
        </div>
      </div>

      <div className="w-full justify-center items-center mt-8 pb-8 gap-y-4 border-b border-primary gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary flex items-center gap-2">
              Coupon Details <Info />
            </span>
          </div>
          <form className="w-full">
            <div className="w-full flex flex-col gap-x-16 gap-y-6 sm:flex-row justify-between">
              <div className="w-full">
                <label className="text-primary font-bold">Coupon Name</label>
                <p className="mt-1 text-primary  font-medium">
                  {couponRecord?.name || "N/A"}
                </p>
              </div>
              <div className="w-full">
                <label className="text-primary font-bold">Coupon Code</label>
                <p className="mt-1 text-primary  font-medium">
                  {couponRecord?.code || "N/A"}
                </p>
              </div>
            </div>
            <div className="w-full mt-5  flex flex-col gap-x-16 gap-y-6  sm:flex-row justify-between">
              <div className="w-full">
                <label className="text-primary font-bold">Start Date</label>
                <p className="mt-1 text-primary font-medium">
                  {formatDateTime(couponRecord?.startDate) || "N/A"}
                </p>
              </div>
              <div className="w-full">
                <label className="text-primary font-bold">End Date</label>
                <p className="mt-1 text-primary font-medium">
                  {formatDateTime(couponRecord?.endDate) || "N/A"}
                </p>
              </div>
            </div>
            <div className="w-full mt-5  flex flex-col gap-x-16 gap-y-6  sm:flex-row justify-between">
              <div className="w-full">
                <label className="text-primary font-bold">Discount Type</label>
                <p className="mt-1 text-primary font-medium">
                  {couponRecord?.discountType || "N/A"}
                </p>
              </div>
              <div className="w-full">
                <label className="text-primary font-bold">Discount Value</label>
                <p className="mt-1 text-primary font-medium">
                  {couponRecord?.discountValue || "N/A"}
                </p>
              </div>
            </div>
            <div className="w-full mt-5  flex flex-col gap-x-16 gap-y-6  sm:flex-row justify-between">
              <div className="w-full">
                <label className="text-primary font-bold">Discount Type</label>
                <StatusIndicator status={couponRecord?.status}/>
              </div>
            </div>
            <div className="w-full mt-5  flex flex-col gap-x-16 gap-y-6 sm:flex-row justify-between">
              <div className="w-full">
                <label className="text-primary font-bold">Created Date</label>
                <p className="mt-1 text-primary font-medium">
                  {formatDateTime(couponRecord?.createdAt)}
                </p>
              </div>
              <div className="w-full">
                <label className="text-primary font-bold">Updated Date</label>
                <p className="mt-1 text-primary font-medium">
                  {formatDateTime(couponRecord?.updatedAt)}
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="w-full justify-center items-center mt-8 mb-8 pb-8 border-b border-primary gap-y-4 gap-2  lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="w-full md:w-7/12">
            <span className=" text-primary flex items-center gap-2">
              Coupon Details <Info />
            </span>
          </div>
          <form className="w-full">
            <div className="w-full flex flex-col gap-x-16 gap-y-6  sm:flex-row justify-between ">
              <div className="w-full">
                <label className="text-primary font-bold">
                  Applicable Plan
                </label>
                <p className="mt-1 text-primary font-medium">
                  {couponRecord?.applicablePlan?.join(", ") || "N/A"}
                </p>
              </div>
              <div className="w-full">
                <label className="text-primary font-bold">
                  Target Audience
                </label>
                <p className="mt-1 text-primary font-medium">All Companies</p>
              </div>
            </div>

            <div className="w-full mt-5">
              <label className="text-primary font-bold">Max coupon Usage</label>
              <p className="mt-1 text-primary font-medium">
                {couponRecord?.maxCouponUsage || "N/A"}
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pb-20 ">
          <Link
            to="/coupons"
            className="px-4 py-2 text-primary font-medium bg-main border border-primary hover:bg-hover rounded-xl whitespace-nowrap"
          >
            Back
          </Link>
        </div>
      )} */}
    </div>
  );
};

export default ViewCoupon;
