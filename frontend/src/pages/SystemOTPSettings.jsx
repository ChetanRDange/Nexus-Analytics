import React from "react";
import { useState, useEffect } from "react";
import Brand from "../assets/svgs/settings/brand.svg";
import ToggleComponent from "../Components/ToggleComponent";
import InputComponent from "../Components/InputComponent";
import DatePicker from "../Components/DatePicker";
import EndDatePicker from "../Components/EndDatePicker";
import ComponentDropdown from "../Components/ComponentDropdown";

const logout = [
  {
    id: 0,
    showName: "15 Minutes",
    name: "15 Minutes",
  },
  {
    id: 1,
    showName: "30 Minutes",
    name: "30 Minutes",
  },
  {
    id: 2,
    showName: "Custom",
    name: "Custom",
  },
];
const otpMethods = [
  { id: 0, showName: "SMS", name: "SMS" },
  { id: 1, showName: "Email", name: "Email" },
  { id: 2, showName: "Voice Call", name: "Voice Call" },
  { id: 3, showName: "App Notification", name: "App Notification" },
];

const SystemOTPSettings = () => {
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [isScrollable, setIsScrollable] = useState(false);
  const [isEnableTrial, setIsEnableTrial] = useState(false);

  const [otpMethod, setOtpMethod] = useState({
    showName: "Click to select an option",
    name: "",
  });
  const setMethod = (item) => {
    setOtpMethod({
      showName: item.showName,
      name: item.name,
    });
  };

  const setTime = (item) => {
    setTimeDropdown({
      showName: item.showName,
      name: item.name,
    });
  };
  const [logoutDropdown, setLogoutDropDown] = useState({
    showName: "Click to select an option",
    name: " ",
  });

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
      <div className="py-8 p-4 sm:p-5 overflow-x-hidden mb-20">
        <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
          <div>
            <span className="text-3xl font-semibold text-dark">
              System & OTP Setting
            </span>
          </div>
          <div className=" w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
            <button
              className="px-4 py-2 text-primary font-medium bg-white hover:bg-gray-50  rounded-xl border border-primary whitespace-nowrap"
              id="button-293"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
              id="button-294"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="w-full justify-center items-center mt-8 mb-5 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end border-b border-primary">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className=" text-primary flex items-center gap-1">
                OTP Setting
                <img src={Brand} alt="brand" />
              </span>
              <span className="text-secondary font-normal ">
                Configure OTP Security Settings
              </span>
            </div>
            <div className="w-full">
              <div className="w-full ">
                <label className="text-primary">OTP Expiration Time</label>
                <div className="dropdown-container relative w-full mt-1">
                  <ComponentDropdown
                    name="currency"
                    SummaryChild={
                      <h5 className="p-0 m-0">{logoutDropdown.showName}</h5>
                    }
                    dropdownList={logout}
                    search={false}
                    commonFunction={setLogoutDropDown}
                    selected={logoutDropdown.name}
                  />
                </div>
              </div>
              {logoutDropdown.name == "Custom" && (
                <>
                  <div className="w-full mt-5">
                    <InputComponent
                      inputType="text"
                      name="customotptime"
                      id="customotptime"
                      labelName="Custom OTP Expiration Time"
                      labelColor="primary"
                      placeholderName="Custom OTP Expiration Time"
                      placeholderColor="secondary"
                      textColor="text-dark"
                      borderRadius="xl"
                      activeBorderColor="blue"
                      // {...(error? && { error: error })}
                      // {...(typeof error !== "undefined" ? { error } : {})}
                    />
                    {/* {error && (
                    <div className="mt-2 text-[#F04438] text-sm font-normal">
                      {error}
                      // {invalid_system_otp_exp_time_error}
                    </div>
                  )} */}
                  </div>
                </>
              )}
              <div className="w-full mt-5">
                <InputComponent
                  inputType="number"
                  name="otpattempt"
                  id="otpattempt"
                  labelName="Max OTP Attempts"
                  labelColor="primary"
                  placeholderName="Max OTP Attempts"
                  placeholderColor="secondary"
                  textColor="text-dark"
                  borderRadius="xl"
                  activeBorderColor="blue"
                  // {...(error? && { error: error })}
                  // {...(typeof error !== "undefined" ? { error } : {})}
                />
                {/* {error && (
                      <div className="mt-2 text-[#F04438] text-sm font-normal">
                        {error}
                        // {system_max_otp_attempt_error,system_max_otp_exceed_error}
                      </div>
                    )} */}
              </div>
              <div className="w-full mt-5">
                <label className="text-primary">OTP Delivery Method</label>

                <div className="mt-1">
                  <ComponentDropdown
                    name="otp-method"
                    SummaryChild={
                      <h5 className="p-0 m-0">{otpMethod.showName}</h5>
                    }
                    dropdownList={otpMethods}
                    search={false}
                    commonFunction={setMethod}
                    selected={otpMethod.name}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full justify-center items-center mt-8 mb-5 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end border-b border-primary">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className=" text-primary flex items-center gap-1">
                System Maintenance Mode
                <img src={Brand} alt="brand" />
              </span>
              <span className="text-secondary font-normal ">
                Planned System Maintenance Time
              </span>
            </div>
            <div className="w-full">
              <ToggleComponent
                label="Enable Maintenance Mode"
                isEnableState={isEnableTrial}
                setIsEnableState={setIsEnableTrial}
              />
            </div>
          </div>
        </div>
        <div className="w-full justify-center items-center mt-8 mb-5 pb-8 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end border-b border-primary">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className=" text-primary flex items-center gap-1">
                Schedule Maintenance
                <img src={Brand} alt="brand" />
              </span>
              <span className="text-secondary font-normal ">
                Set System Maintenance Time
              </span>
            </div>
            <div className="w-full">
              <div className="grid grid-cols-2 gap-6">
                <div className="w-full">
                  <label className="text-primary">Start Date</label>
                  <div className="mt-2">
                    <DatePicker
                      selectedDate={
                        selectedStartDate
                          ? new Date(selectedStartDate)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      setSelectedDate={(date) =>
                        setSelectedStartDate(new Date(date).toISOString())
                      }
                      placeholder="Start Date"
                    />
                  </div>
                </div>

                <InputComponent
                  inputType="time"
                  name="startTime"
                  id="startTime"
                  labelName="Start Time"
                  labelColor="primary"
                  placeholderName="Select Start Time"
                  placeholderColor="secondary"
                  textColor="text-dark"
                  borderRadius="xl"
                  activeBorderColor="blue"
                  customClass="start-time-input"
                  // {...(error? && { error: error })}
                  // {...(typeof error !== "undefined" ? { error } : {})}
                />
                {/* {error && (
                      <div className="mt-2 text-[#F04438] text-sm font-normal">
                        {error}
                        // {system_start_time_error}
                      </div>
                    )} */}
              </div>

              <div className="grid grid-cols-2 gap-6 mt-6">
                <div className="w-full">
                  <label className="text-primary">End Date</label>
                  <div className="mt-2">
                    <EndDatePicker
                      selectedEndDate={
                        selectedEndDate
                          ? new Date(selectedEndDate)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      setSelectedEndDate={(date) =>
                        setSelectedEndDate(new Date(date).toISOString())
                      }
                      selectedStartDate={
                        selectedStartDate
                          ? new Date(selectedStartDate)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                    />
                  </div>
                </div>

                <InputComponent
                  inputType="time"
                  name="endTime"
                  id="endTime"
                  labelName="End Time"
                  labelColor="primary"
                  placeholderName="Select End Time"
                  placeholderColor="secondary"
                  textColor="text-dark"
                  borderRadius="xl"
                  activeBorderColor="blue"
                  customClass="end-time-input"
                  // {...(error? && { error: error })}
                  // {...(typeof error !== "undefined" ? { error } : {})}
                />
                {/* {error && (
                      <div className="mt-2 text-[#F04438] text-sm font-normal">
                        {error}
                        // {system_end_time_error}
                      </div>
                    )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SystemOTPSettings;
