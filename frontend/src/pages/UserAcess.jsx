import React from "react";
import { useState, useEffect } from "react";
import Brand from "../assets/svgs/settings/brand.svg";
import ToggleComponent from "../Components/ToggleComponent";
import InputComponent from "../Components/InputComponent";
import ComponentDropdown from "../Components/ComponentDropdown";

const lockout = [
  {
    id: 0,
    showName: "2 Hour",
    name: "2 Hour",
  },
  {
    id: 1,
    showName: "1 Day",
    name: "1 Day",
  },
  {
    id: 2,
    showName: "2 Day",
    name: "2 Day",
  },
  {
    id: 3,
    showName: "3 Day",
    name: "3 Day",
  },
];
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
const timeOptions = [
  { id: 0, showName: "01:00:00 AM", name: "01:00:00 AM" },
  { id: 1, showName: "02:00:00 AM", name: "02:00:00 AM" },
  { id: 2, showName: "03:00:00 AM", name: "03:00:00 AM" },
  { id: 3, showName: "04:00:00 AM", name: "04:00:00 AM" },
  { id: 4, showName: "05:00:00 AM", name: "05:00:00 AM" },
  { id: 5, showName: "06:00:00 AM", name: "06:00:00 AM" },
  { id: 6, showName: "07:00:00 AM", name: "07:00:00 AM" },
  { id: 7, showName: "08:00:00 AM", name: "08:00:00 AM" },
  { id: 8, showName: "09:00:00 AM", name: "09:00:00 AM" },
  { id: 9, showName: "10:00:00 AM", name: "10:00:00 AM" },
  { id: 10, showName: "11:00:00 AM", name: "11:00:00 AM" },
  { id: 11, showName: "12:00:00 AM", name: "12:00:00 AM" },
  { id: 12, showName: "01:00:00 PM", name: "01:00:00 PM" },
  { id: 13, showName: "02:00:00 PM", name: "02:00:00 PM" },
  { id: 14, showName: "03:00:00 PM", name: "03:00:00 PM" },
  { id: 15, showName: "04:00:00 PM", name: "04:00:00 PM" },
  { id: 16, showName: "05:00:00 PM", name: "05:00:00 PM" },
  { id: 17, showName: "06:00:00 PM", name: "06:00:00 PM" },
  { id: 18, showName: "07:00:00 PM", name: "07:00:00 PM" },
  { id: 19, showName: "08:00:00 PM", name: "08:00:00 PM" },
  { id: 20, showName: "09:00:00 PM", name: "09:00:00 PM" },
  { id: 21, showName: "10:00:00 PM", name: "10:00:00 PM" },
  { id: 22, showName: "11:00:00 PM", name: "11:00:00 PM" },
  { id: 23, showName: "12:00:00 PM", name: "12:00:00 PM" },
];

const UserAccess = () => {
  const [isScrollable, setIsScrollable] = useState(false);
  const [isEnableTrial, setIsEnableTrial] = useState(false);

  const [timeDropdown, setTimeDropdown] = useState({
    showName: "Click to select an option",
    name: "",
  });

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
  const [lockoutDropdown, setLockoutDropDown] = useState({
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
              User Access & Security Settings
            </span>
          </div>
          <div className=" w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
            <button
              className="px-4 py-2 text-primary font-medium bg-white hover:bg-gray-50  rounded-xl border border-primary whitespace-nowrap"
              id="button-296"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
              id="button-297"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="w-full justify-center items-center mt-8 mb-5 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end border-b border-primary">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className=" text-primary flex items-center gap-1">
                User Auto Logout Time Setting <img src={Brand} alt="brand" />
              </span>
              <span className="text-secondary font-normal ">
                Auto Logout Inactivity Timer
              </span>
            </div>
            <div className="w-full">
              <div className="w-full ">
                <label className="text-primary">Auto Logout Time</label>
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
                      name="customlogout"
                      id="customlogout"
                      labelName="Custom Logout Time"
                      labelColor="primary"
                      placeholderName="Custom Logout Time"
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
                      // {user_custom_logout_limit_error}
                    </div>
                  )} */}
                  </div>
                </>
              )}
              <div className="w-full mt-5">
                <label className="text-primary">Select Time</label>

                <div className="mt-1">
                  <ComponentDropdown
                    name="time"
                    SummaryChild={
                      <h5 className="p-0 m-0">{timeDropdown.showName}</h5>
                    }
                    dropdownList={timeOptions}
                    search={false}
                    commonFunction={setTime}
                    selected={timeDropdown.name}
                    // {...(error? && { error: error })}
                    // {...(typeof error !== "undefined" ? { error } : {})}
                  />
                  {/* {error && (
                    <div className="mt-2 text-[#F04438] text-sm font-normal">
                      {error}
                      // {user_select_time_empty_error}
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full justify-center items-center mt-8 mb-5 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end border-b border-primary">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className=" text-primary flex items-center gap-1">
                Logout All Users To Hold <img src={Brand} alt="brand" />
              </span>
              <span className="text-secondary font-normal ">
                Force Logout All Users
              </span>
            </div>
            <div className="w-full">
              <ToggleComponent
                label="Are you sure you want to log out all users?"
                isEnableState={isEnableTrial}
                setIsEnableState={setIsEnableTrial}
              />
            </div>
          </div>
        </div>
        <div className="w-full justify-center items-center mt-8 mb-5 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end border-b border-primary">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className=" text-primary flex items-center gap-1">
                Login Attempts setting <img src={Brand} alt="brand" />
              </span>
              <span className="text-secondary font-normal ">
                Failed Login Attempt Limit
              </span>
            </div>
            <div className="w-full">
              <div className="">
                <InputComponent
                  inputType="number"
                  name="loginattempt"
                  id="loginattempt"
                  labelName="Max Login Attempts"
                  labelColor="primary"
                  placeholderName="Max Login Attempts"
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
                      // {user_login_attempt_error,invalid_user_max_login_attempt_error}
                    </div>
                  )} */}
              </div>
              <div className="w-full mt-5">
                <label className="text-primary">Lockout Time</label>
                <div className="dropdown-container relative w-full mt-1 pb-20">
                  <ComponentDropdown
                    name="dateFormat"
                    SummaryChild={
                      <h5 className="p-0 m-0">{lockoutDropdown.showName}</h5>
                    }
                    dropdownList={lockout}
                    search={false}
                    commonFunction={setLockoutDropDown}
                    selected={lockoutDropdown.name}
                    // {...(error? && { error: error })}
                    // {...(typeof error !== "undefined" ? { error } : {})}
                  />
                  {/* {error && (
                    <div className="mt-2 text-[#F04438] text-sm font-normal">
                      {error}
                      // {user_lockout_empty_error}
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAccess;
