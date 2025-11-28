import React from "react";
import { useState, useEffect } from "react";
import Brand from "../assets/svgs/settings/brand.svg";
import ToggleComponent from "../Components/ToggleComponent";
import InputComponent from "../Components/InputComponent";
import ComponentDropdown from "../Components/ComponentDropdown";

const logout = [
  {
    id: 0,
    showName: "15 Days",
    name: "15 Days",
  },
  {
    id: 1,
    showName: "30 Days",
    name: "30 Days",
  },
  {
    id: 2,
    showName: "45 Days",
    name: "45 Days",
  },
  {
    id: 3,
    showName: "Custom",
    name: "Custom",
  },
];

const LogSetting = () => {
  const [isScrollable, setIsScrollable] = useState(false);
  const [isEnableDelete, setIsEnableDelete] = useState(false);
  const [isEnableTrial, setIsEnableTrial] = useState(false);

  const [logoutDropdown, setLogoutDropDown] = useState({
    showName: "Click to select an option",
    name: "",
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
              Log Settings
            </span>
          </div>
          <div className=" w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
            <button
              className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
              id="button-237"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="w-full justify-center items-center mt-8 mb-5 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end border-b border-primary">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className=" text-primary flex items-center gap-1">
                General Setting <img src={Brand} alt="brand" />
              </span>
              <span className="text-secondary font-normal ">
                Enable/Disable Auto Delete
              </span>
            </div>
            <div className="w-full">
              <div className="w-full">
                <ToggleComponent
                  label={
                    isEnableDelete
                      ? "Disable Auto Delete"
                      : "Enable Auto Delete"
                  }
                  isEnableState={isEnableDelete}
                  setIsEnableState={setIsEnableDelete}
                />
              </div>
              <div className="w-full mt-5 ">
                <label className="text-primary">Set Retention Period</label>
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
                    // {...(error? && { error: error })}
                    // {...(typeof error !== "undefined" ? { error } : {})}
                  />
                  {/* {error && (
                      <div className="mt-2 text-[#F04438] text-sm font-normal">
                        {error}
                        // {log_retention_period_required_error}
                      </div>
                    )} */}
                </div>
              </div>
              {logoutDropdown.name == "Custom" && (
                <>
                  <div className="w-full mt-5">
                    <InputComponent
                      inputType="text"
                      name="customretention"
                      id="customretention"
                      labelName="Custom Retention Period"
                      labelColor="primary"
                      placeholderName="Custom Retention Period"
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
                      // {log_retention_period_exceed_error}
                    </div>
                  )} */}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="w-full justify-center items-center mt-8 mb-5 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end border-b border-primary">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className=" text-primary flex items-center gap-1">
                Log Storage Limit
                <img src={Brand} alt="brand" />
              </span>
              <span className="text-secondary font-normal ">
                Set the maximum storage limit for logs
              </span>
            </div>
            <div className="w-full">
              <div className="">
                <InputComponent
                  inputType="text"
                  name="logstorage"
                  id="logstorage"
                  labelName="Log Storage"
                  labelColor="primary"
                  placeholderName="Log Storage"
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
                        // {log_storage_required_error,log_storage_limit_error}
                      </div>
                    )} */}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full justify-center items-center mt-8 mb-5 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end border-b border-primary">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className=" text-primary flex items-center gap-1">
                Notification Settings <img src={Brand} alt="brand" />
              </span>
              <span className="text-secondary font-normal ">
                Enable/Disable Notification
              </span>
            </div>
            <div className="w-full">
              <ToggleComponent
                label={
                  isEnableTrial
                    ? "Disable Storage Limit Alert"
                    : "Enable Storage Limit Alert"
                }
                isEnableState={isEnableTrial}
                setIsEnableState={setIsEnableTrial}
              />
            </div>
          </div>
        </div>
        {isScrollable && (
          <div className="w-full flex justify-end items-center pt-2 gap-4 ">
            <button
              className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
              id="button-238"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default LogSetting;
