import React from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { DollarSign, IndianRupee } from "lucide-react";
import StatusIndicator from "../Components/StatusIndicator";

const ViewPayment = () => {
  const { paymentRecordId } = useParams();

  const { data: res, reFetch } = useFetch(
    `/private/paymentRecord/${paymentRecordId}`
  );
  const paymentData = res?.data;

  const getCurrencySymbol = (currencyType) => {
    switch (currencyType) {
      case "INR":
        return <IndianRupee size={16} />;
      case "USD":
        return <DollarSign size={16} />;
      case "AED":
        return "AED";
      default:
        return "";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-wrap justify-between items-center   ">
        <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
          Payment Details
        </h4>

        <div className="flex gap-2">
          <Link
            id="back"
            to="/payments"
            className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
          >
            Back
          </Link>
        </div>
      </div>

      {/* Payment Information Section */}
      <div className="w-full mt-8 pb-8 border-b border-primary">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <h3 className="text-xl font-semibold text-primary mb-2">
              Payment Information
            </h3>
            <p className="text-secondary font-normal">
              All payment transaction details
            </p>
          </div>

          <div className="lg:w-2/4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-primary font-bold mb-1">
                Payment ID
              </label>
              <p className="text-primary  font-medium">
                {paymentData?.intent?.id || "N/A"}
              </p>
            </div>

            <div>
              <label className="block text-primary font-bold mb-1">
                Payment Method
              </label>
              <p className="text-primary capitalize  font-medium">
                {paymentData?.paymentMethod || "N/A"}
              </p>
            </div>

            <div>
              <label className="block text-primary font-bold mb-1 ">
                Payment Amount
              </label>
              <p className="text-primary flex items-center gap-1  font-medium">
                {paymentData?.amountPaid ? (
                  <>
                    {getCurrencySymbol(paymentData?.currencyType)}
                    {paymentData?.amountPaid.toFixed(2)}
                  </>
                ) : (
                  "N/A"
                )}
              </p>
            </div>

            <div>
              <label className="block text-primary font-bold mb-1">
                Status
              </label>
              <StatusIndicator status={paymentData?.status} />
            </div>

            <div>
              <label className="block text-primary font-bold mb-1">
                Created Date
              </label>
              <p className="text-primary  font-medium">
                {formatDate(paymentData?.createdAt)}
              </p>
            </div>

            <div>
              <label className="block text-primary font-bold mb-1">
                Updated Date
              </label>
              <p className="text-primary font-medium">
                {formatDate(paymentData?.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Information Section */}
      <div className="w-full mt-8 pb-8 border-b border-primary">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <h3 className="text-xl font-semibold text-primary mb-2">
              Plan Information
            </h3>
            <p className="text-secondary font-normal">
              Details of the subscribed plan
            </p>
          </div>

          <div className="lg:w-2/4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-primary font-bold mb-1">
                Plan Name
              </label>
              <p className="text-primary font-medium">
                {paymentData?.planInfo?.name || "N/A"}
              </p>
            </div>

            <div>
              <label className="block text-primary font-bold mb-1">
                Original Price
              </label>
              <p className="text-primary flex items-center gap-1 font-medium">
                {paymentData?.planInfo?.originalPrice ? (
                  <>
                    {getCurrencySymbol(paymentData?.currencyType)}
                    {paymentData?.planInfo?.originalPrice.toFixed(2)} / Per user
                  </>
                ) : (
                  "N/A"
                )}
              </p>
            </div>

            {/* <div>
              <label className="block text-primary font-bold mb-1">
                Discounted Price
              </label>
              <p className="text-primary flex items-center gap-1">
                {paymentData?.planInfo?.discountedPrice ? (
                  <>
                    {getCurrencySymbol(paymentData?.currencyType)}
                    {paymentData?.discount.toFixed(2)}
                  </>
                ) : (
                  "N/A"
                )}
              </p>
            </div> */}

            <div>
              <label className="block text-primary font-bold mb-1">
                Discount Applied
              </label>
              <p className="text-primary font-medium">
                {paymentData?.discount
                  ? `${paymentData.discount}%`
                  : "No discount"}
              </p>
            </div>

            <div>
              <label className="block text-primary font-bold mb-1">
                Coupon Used
              </label>
              <p className="text-primary font-medium">
                {paymentData?.coupon ? "Yes" : "No"}
              </p>
            </div>

            <div>
              <label className="block text-primary font-bold mb-1">
                Plan Start Date
              </label>
              <p className="text-primary font-medium">
                {formatDate(paymentData?.planInfo?.startDate)}
              </p>
            </div>

            <div>
              <label className="block text-primary font-bold mb-1">
                Plan End Date
              </label>
              <p className="text-primary font-medium">
                {formatDate(paymentData?.planInfo?.endDate)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Billing Information Section */}
      <div className="w-full mt-8 pb-8 border-b border-primary">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <h3 className="text-xl font-semibold text-primary mb-2">
              Billing Information
            </h3>
            <p className="text-secondary font-normal">
              Company billing details
            </p>
          </div>

          <div className="lg:w-2/4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-primary font-bold mb-1">
                Company Name
              </label>
              <p className="text-primary font-medium">
                {paymentData?.company?.companyName || "N/A"}
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-primary font-bold mb-1">
                Address
              </label>
              <p className="text-primary font-medium">
                {paymentData?.address || "N/A"}
              </p>
            </div>

            <div>
              <label className="block text-primary font-bold mb-1">City</label>
              <p className="text-primary font-medium">
                {paymentData?.city || "N/A"}
              </p>
            </div>

            <div>
              <label className="block text-primary font-bold mb-1">State</label>
              <p className="text-primary font-medium">
                {paymentData?.state || "N/A"}
              </p>
            </div>

            <div>
              <label className="block text-primary font-bold mb-1">
                Country
              </label>
              <p className="text-primary font-medium">
                {paymentData?.country || "N/A"}
              </p>
            </div>

            <div>
              <label className="block text-primary font-bold mb-1">
                Postal Code
              </label>
              <p className="text-primary font-medium">
                {paymentData?.postalCode || "N/A"}
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-primary font-bold mb-1">
                Tax Number
              </label>
              <p className="text-primary font-medium">
                {paymentData?.taxNum || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-end items-center gap-4 pb-20">
        <Link
          id="back-1"
          to="/payments"
          className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap mt-4"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default ViewPayment;
