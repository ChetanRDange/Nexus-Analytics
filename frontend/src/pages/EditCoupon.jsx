import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
import { Link, useNavigate, useParams } from "react-router-dom";

import Brand from "../assets/svgs/settings/brand.svg";
import ComponentDropdown from "../Components/ComponentDropdown";
import DatePicker from "../Components/DatePicker";
import EndDatePicker from "../Components/EndDatePicker";
import InputComponent from "../Components/InputComponent";
import MultiselectDropdown from "../Components/MultiselectDropdown";
import useMutation from "../hooks/useMutation";
import useFetch from "../hooks/useFetch";
import { Info, Percent } from "lucide-react";

const discountTypes = [
  { id: 0, showName: "Percentage", name: "percentage" },
  { id: 1, showName: "Fixed Amount", name: "amount" },
];

const appPlans = [
  { id: 0, name: "All Plans" },
  { id: 1, name: "Basic" },
  { id: 2, name: "Silver" },
  { id: 3, name: "Gold" },
  { id: 4, name: "Platinum" },
];

const EditCoupon = () => {
  const { couponId } = useParams();
  const { callApi } = useMutation();
  const navigate = useNavigate();

  const [couponData, setCouponData] = useState({
    _id: "",
    name: "",
    description: "",
    code: "",
    discountType: "",
    discountValue: "",
    applicablePlan: [],
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    maxCouponUsage: "",
    isActive: true,
  });

  const [noticeTypesDropdown, setNoticeTypesDropDown] = useState({
    showName: "",
    name: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    code: "",
    description: "",
    startDate: "",
    endDate: "",
    discountType: "",
    discountValue: "",
    applicablePlan: "",
    maxCouponUsage: "",
  });

  const { data: res } = useFetch(`/private/coupons/${couponId}`);
  const couponRecord = res?.data;

  useEffect(() => {
    if (couponRecord) {
      const startDate = couponRecord.startDate
        ? new Date(couponRecord.startDate)
        : null;
      const endDate = couponRecord.endDate
        ? new Date(couponRecord.endDate)
        : null;

      const formatTime = (date) => {
        if (!date) return "";
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
      };

      setCouponData({
        ...couponRecord,
        startDate: startDate ? startDate.toISOString() : "",
        endDate: endDate ? endDate.toISOString() : "",
        startTime: formatTime(startDate),
        endTime: formatTime(endDate),
      });

      setNoticeTypesDropDown({
        showName:
          couponRecord.discountType === "percentage"
            ? "Percentage"
            : "Fixed Amount",
        name: couponRecord.discountType || "",
      });
    }
  }, [couponRecord]);

  const handleFieldChange = (name, value) => {
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value?.trim()) return "Coupon Name is required";
        if (value.length < 2) return "Minimum 2 characters required";
        return "";
      case "code":
        if (!value?.trim()) return "Coupon Code is required";
        if (value.length < 2) return "Minimum 2 characters required";
        return "";
      case "description":
        if (couponData.description && value.length > 500)
          return "Maximum 500 characters allowed";
        return "";
      case "discountType":
        if (!value?.trim()) return "Discount Type is required";
        return "";
      case "discountValue":
        if (!value) return "Discount Value is required";
        if (isNaN(value) || Number(value) <= 0)
          return "Please enter a valid positive number";
        if (couponData.discountType === "percentage" && Number(value) > 100)
          return "Percentage discount cannot be more than 100%";
        return "";
      case "maxCouponUsage":
        if (!value) return "Max Coupon Usage is required";
        if (value && (isNaN(value) || Number(value) <= 0)) {
          return "Please enter a valid positive number";
        }
        return "";
      default:
        return "";
    }
  };

  const validate = () => {
    let newErrors = {
      name: validateField("name", couponData.name),
      code: validateField("code", couponData.code),
      description: validateField("description", couponData.description),
      discountType: validateField("discountType", noticeTypesDropdown?.name),
      discountValue: validateField("discountValue", couponData.discountValue),
      startDate: !couponData.startDate ? "Start Date is required" : "",
      endDate: !couponData.endDate ? "End Date is required" : "",
      maxCouponUsage: validateField(
        "maxCouponUsage",
        couponData.maxCouponUsage
      ),
    };

    if (couponData.startDate && couponData.endDate) {
      const startDate = new Date(couponData.startDate);
      const endDate = new Date(couponData.endDate);
      if (startDate > endDate) {
        newErrors.endDate = "End Date must be after Start Date";
      }
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setCouponData((prev) => ({ ...prev, name: value }));
    handleFieldChange("name", value);
  };

  const handleCodeChange = (e) => {
    const value = e.target.value;
    setCouponData((prev) => ({ ...prev, code: value }));
    handleFieldChange("code", value);
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setCouponData((prev) => ({ ...prev, description: value }));
    handleFieldChange("description", value);
  };

  const handleDiscountTypeChange = (selected) => {
    setNoticeTypesDropDown(selected);
    handleFieldChange("discountType", selected.name);
  };

  const handleDiscountValueChange = (e) => {
    const value = e.target.value;
    setCouponData((prev) => ({ ...prev, discountValue: value }));
    handleFieldChange("discountValue", value);
  };

  const handleMaxCouponUsageChange = (e) => {
    const value = e.target.value;
    setCouponData((prev) => ({ ...prev, maxCouponUsage: value }));
    handleFieldChange("maxCouponUsage", value);
  };

  const handleSelectionChange = (selected) => {
    setCouponData({
      ...couponData,
      applicablePlan: selected.map((item) => item.name),
    });
    setErrors((prev) => ({ ...prev, applicablePlan: "" }));
  };

  const handleCouponUpdate = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const updateData = {
      _id: couponId,
      name: couponData.name,
      code: couponData.code,
      description: couponData.description,
      discountType: noticeTypesDropdown.name,
      discountValue: Number(couponData.discountValue),
      applicablePlan: couponData.applicablePlan,
      maxCouponUsage: couponData.maxCouponUsage
        ? Number(couponData.maxCouponUsage)
        : null,
      startDate: `${couponData.startDate.split("T")[0]}T${
        couponData.startTime
      }`,
      endDate: `${couponData.endDate.split("T")[0]}T${couponData.endTime}`,
      isActive: couponData.isActive,
    };
    const res = await callApi("/private/coupons", "PUT", updateData);
    if (res) navigate("/coupons");
  };

  return (
    <div className="py-8 p-4 sm:p-5 overflow-x-hidden mb-20">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex justify-between items-center   ">
        <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
          Edit Coupon
        </h4>

        <div className="flex gap-2">
          <Link
            id="coupons"
            to="/coupons"
            className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
          >
            Cancel
          </Link>
          <button
            onClick={handleCouponUpdate}
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
            id="button-185"
          >
            Update
          </button>
        </div>
      </div>

      {/* Coupon Details Section */}
      <div className="w-full border-b border-primary justify-center items-center mt-8 pb-8 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="text-primary flex items-center gap-2">
              Coupon Details
            </span>
          </div>
          <div className="w-full">
            {/* Name, Code, Description fields */}
            <InputComponent
              inputType="text"
              name="couponname"
              id="couponname"
              labelName="Coupon Name"
              value={couponData.name}
              onChange={handleNameChange}
              error={errors.name}
              errorMessage={errors.name}
              required
              minLength={2}
            />

            <InputComponent
              inputType="text"
              name="couponcode"
              id="couponcode"
              labelName="Coupon Code"
              value={couponData.code}
              onChange={handleCodeChange}
              error={errors.code}
              errorMessage={errors.code}
              required
              minLength={2}
            />

            <div className="w-full mt-5">
              <label className="text-primary">Description</label>
              <textarea
                value={couponData.description}
                onChange={handleDescriptionChange}
                className={`w-full mt-2 rounded-xl border ${
                  errors.description ? "border-red-500" : "border-primary"
                } focus:outline-none focus:border focus:border-[#A4BCFD] px-4 py-2.5 placeholder:text-secondary text-primary bg-transparent`}
                style={{ resize: "none" }}
                rows="3"
                maxLength="500"
              />
              <div className="w-full flex justify-end">
                <span className="font-normal text-primary">
                  {couponData.description?.length}/500
                </span>
              </div>
              {errors.description && (
                <span className="text-red-500 text-sm">
                  {errors.description}
                </span>
              )}
            </div>

            {/* Date and Time Pickers */}
            <div className="w-full mt-5 flex flex-col md:flex-row gap-y-4 gap-4 md:justify-between">
              <div className="w-full">
                <label className="text-primary">
                  Start Date<span className="text-red-500 ml-1">*</span>
                </label>
                <DatePicker
                  selectedDate={
                    couponData.startDate
                      ? new Date(couponData.startDate)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  setSelectedDate={(date) =>
                    setCouponData({
                      ...couponData,
                      startDate: new Date(date).toISOString(),
                    })
                  }
                />
                {errors.startDate && (
                  <span className="text-red-500 text-sm">
                    {errors.startDate}
                  </span>
                )}
              </div>

              <div className="w-full">
                <label className="text-primary">Start Time</label>
                <input
                  type="time"
                  value={couponData.startTime}
                  onChange={(e) =>
                    setCouponData({ ...couponData, startTime: e.target.value })
                  }
                  className="w-full rounded-xl border border-primary focus:outline-none focus:ring-0 px-4 py-2.5 bg-main text-primary"
                />
              </div>
            </div>

            <div className="w-full mt-5 flex flex-col md:flex-row gap-y-4 gap-4 md:justify-between">
              <div className="w-full">
                <label className="text-primary">
                  End Date<span className="text-red-500 ml-1">*</span>
                </label>
                <EndDatePicker
                  selectedEndDate={
                    couponData.endDate
                      ? new Date(couponData.endDate).toISOString().split("T")[0]
                      : ""
                  }
                  setSelectedEndDate={(date) =>
                    setCouponData({
                      ...couponData,
                      endDate: new Date(date).toISOString(),
                    })
                  }
                  selectedStartDate={
                    couponData.startDate
                      ? new Date(couponData.startDate)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                />
                {errors.endDate && (
                  <span className="text-red-500 text-sm">{errors.endDate}</span>
                )}
              </div>
              <div className="w-full">
                <label className="text-primary">End Time</label>
                <input
                  type="time"
                  value={couponData.endTime}
                  onChange={(e) =>
                    setCouponData({ ...couponData, endTime: e.target.value })
                  }
                  className="w-full rounded-xl border border-primary focus:outline-none focus:ring-0 px-4 py-2.5 bg-main text-primary"
                />
              </div>
            </div>

            {/* Discount Type and Value */}
            <div className="w-full mt-5">
              <label className="text-primary">
                Discount Type<span className="text-red-500 ml-1">*</span>
              </label>
              <ComponentDropdown
                dropdownList={discountTypes}
                commonFunction={handleDiscountTypeChange}
                selected={noticeTypesDropdown.name}
                SummaryChild={
                  <h5 className="p-0 m-0 text-primary">
                    {noticeTypesDropdown.showName}
                  </h5>
                }
              />
              {errors.discountType && (
                <span className="text-red-500 text-sm">
                  {errors.discountType}
                </span>
              )}
            </div>

            <div className="w-full mt-5 relative">
              <InputComponent
                inputType="number"
                name="couponcode"
                id="couponcode"
                labelName="Discount Value"
                labelColor="primary"
                placeholderName="Discount Value"
                placeholderColor="secondary"
                textColor="text-dark"
                borderRadius="xl"
                activeBorderColor="blue"
                value={couponData?.discountValue}
                onChange={handleDiscountValueChange}
                error={errors.discountValue}
                errorMessage={errors.discountValue}
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center mt-8">
                {noticeTypesDropdown.name === "percentage" ? (
                  <Percent />
                ) : (
                  <Info />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coupon Conditions Section */}
      <div className="w-full justify-center items-center mt-8 pb-8 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="text-primary flex items-center gap-2">
              Coupon Conditions
            </span>
          </div>
          <div className="w-full">
            <MultiselectDropdown
              data={appPlans}
              label="Applicable Plan"
              onChange={handleSelectionChange}
              initialSelected={appPlans.filter((plan) =>
                couponData?.applicablePlan?.includes(plan.name)
              )}
              required
            />
            {errors.applicablePlan && (
              <span className="text-red-500 text-sm">
                {errors.applicablePlan}
              </span>
            )}

            <div className="w-full mt-5">
              <InputComponent
                inputType="number"
                name="couponusage"
                id="couponusage"
                labelName="Max coupon Usage"
                labelColor="primary"
                placeholderName="Max coupon Usage"
                placeholderColor="secondary"
                textColor="text-dark"
                borderRadius="xl"
                activeBorderColor="blue"
                value={couponData?.maxCouponUsage}
                onChange={handleMaxCouponUsageChange}
                error={errors.maxCouponUsage}
                errorMessage={errors.maxCouponUsage}
                required
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-8">
        <Link
          id="coupons"
          to="/coupons"
          className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
        >
          Cancel
        </Link>
        <button
          onClick={handleCouponUpdate}
          className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
          id="button-185"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditCoupon;
