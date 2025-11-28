import React from "react";
import { useState, useEffect } from "react";
import Brand from "../assets/svgs/settings/brand.svg";

import ComponentDropdown from "../Components/ComponentDropdown";
import {
  local_currency_format_selection_error,
  local_data_fromat_selection_error,
  local_number_format_selection_error,
  local_timezone2_selection_error,
  local_timezone_selection_error,
  local_week_start_selection_error,
} from "../Components/AllError";

const numberFormat = [
  {
    id: 0,
    showName: "1,000.00",
    name: "1,000.00",
  },
  {
    id: 1,
    showName: "2,000.00",
    name: "2,000.00",
  },
  {
    id: 2,
    showName: "3,000.00",
    name: "3,000.00",
  },
  {
    id: 3,
    showName: "4,000.00",
    name: "4,000.00",
  },
  {
    id: 4,
    showName: "5,000.00",
    name: "5,000.00",
  },
  {
    id: 5,
    showName: "6,000.00",
    name: "6,000.00",
  },
  {
    id: 6,
    showName: "7,000.00",
    name: "7,000.00",
  },
  {
    id: 7,
    showName: "8,000.00",
    name: "8,000.00",
  },
  {
    id: 8,
    showName: "9,000.00",
    name: "9,000.00",
  },
];

const currencies = [
  {
    id: 0,
    showName: "USD ",
    name: "USD ",
  },
  {
    id: 1,
    showName: "Euro",
    name: "Euro",
  },
  {
    id: 2,
    showName: "INR",
    name: "INR",
  },
];
const timezones = [
  {
    id: 0,
    showName: "UTC - Coordinated Universal Time",
    name: "UTC",
  },
  {
    id: 1,
    showName: "PST - Pacific Standard Time (US)",
    name: "PST",
  },
  {
    id: 2,
    showName: "IST - Indian Standard Time",
    name: "IST",
  },
  {
    id: 3,
    showName: "CET - Central European Time",
    name: "CET",
  },
  {
    id: 4,
    showName: "GMT - Greenwich Mean Time",
    name: "GMT",
  },
];
const region = [
  {
    id: 0,
    showName: "USA",
    name: "United States of America",
  },
  {
    id: 1,
    showName: "CAN",
    name: "Canada",
  },
  {
    id: 2,
    showName: "IND",
    name: "India",
  },
  {
    id: 3,
    showName: "DEU",
    name: "Germany",
  },
  {
    id: 4,
    showName: "GBR",
    name: "United Kingdom",
  },
  {
    id: 5,
    showName: "AUS",
    name: "Australia",
  },
  {
    id: 6,
    showName: "FRA",
    name: "France",
  },
];

const dateFormats = [
  { id: 0, showName: "MM/DD/YYYY", name: "Month/Day/Year" },
  { id: 1, showName: "DD/MM/YYYY", name: "Day/Month/Year" },
  { id: 2, showName: "YYYY/MM/DD", name: "Year/Month/Day" },
];
const LocalizationSetting = () => {
  const [isScrollable, setIsScrollable] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("currency");
  const [selectedTime, setSelectedTime] = useState("locationtime");
  const [selectedTimezone, setSelectedTimezone] = useState("twelve");
  const [selectedWeek, setSelectedWeek] = useState("sunday");

  const [dateFormatDropdown, setDateFormatDropDown] = useState({
    showName: "Click to select an option",
    name: "",
  });

  const [currencyDropdown, setCurrencyDropDown] = useState({
    showName: "Click to select an option",
    name: "",
  });

  const [numberDropdown, setNumberDropDown] = useState({
    showName: "Click to select an option",
    name: "",
  });
  const [timezoneDropdown, setTimezoneDropDown] = useState({
    showName: "Click to select an option",
    name: "",
  });
  const [regionDropdown, setRegionDropDown] = useState({
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

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.id);
  };
  const handleTimeChange = (e) => {
    setSelectedTime(e.target.id);
  };
  const handleTimezoneChange = (e) => {
    setSelectedTimezone(e.target.id);
  };
  const handleWeekChange = (e) => {
    setSelectedWeek(e.target.id);
  };

  return (
    <>
      <div className="py-8 p-4 sm:p-5 overflow-x-hidden mb-20">
        <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
          <div>
            <span className="text-3xl font-semibold text-dark">
              Localization Settings: Currency & Timezone
            </span>
          </div>
          <div className=" w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
            <button
              className="px-4 py-2 text-primary font-medium bg-white hover:bg-gray-50  rounded-xl border border-primary whitespace-nowrap"
              id="button-229"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
              id="button-230"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="w-full justify-center items-center mt-8 mb-5 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end border-b border-primary">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className=" text-primary flex items-center gap-1">
                Currency Settings <img src={Brand} alt="brand" />
              </span>
              <span className="text-secondary font-normal ">
                Manage Default Currency Preferences
              </span>
            </div>
            <div className="w-full">
              <div className="w-full ">
                <label className="text-primary">Default Currency</label>
                <div className="dropdown-container relative w-full mt-1">
                  <ComponentDropdown
                    name="currency"
                    SummaryChild={
                      <h5 className="p-0 m-0">{currencyDropdown.showName}</h5>
                    }
                    dropdownList={currencies}
                    search={false}
                    commonFunction={setCurrencyDropDown}
                    selected={currencyDropdown.name}
                  />
                </div>
              </div>

              <div className="w-full mt-5">
                <label className="text-primary">Number Format</label>
                <div className="dropdown-container relative w-full mt-1">
                  <ComponentDropdown
                    name="numberFormat"
                    SummaryChild={
                      <h5 className="p-0 m-0">{numberDropdown.showName}</h5>
                    }
                    dropdownList={numberFormat}
                    search={false}
                    commonFunction={setNumberDropDown}
                    selected={numberDropdown.name}
                    // {...(error? && { error: error })}
                    // {...(typeof error !== "undefined" ? { error } : {})}
                  />
                  {/* {error && (
                      <div className="mt-2 text-[#F04438] text-sm font-normal">
                        {error}
                        // {local_number_format_selection_error}
                      </div>
                    )} */}
                </div>
              </div>
              <div className="w-full mt-5">
                <label className="text-primary">Currency Format</label>
                <div className="w-full flex gap-4 items-center pt-3">
                  <div className="inline-flex items-center">
                    <label
                      className="relative flex items-center cursor-pointer"
                      htmlFor="currency"
                    >
                      <input
                        name="code"
                        type="radio"
                        className={`peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-primary checked:border-primary transition-all outline-none ${
                          selectedCurrency === "currency"
                            ? "bg-gray-200"
                            : "bg-white"
                        }`}
                        id="currency"
                        checked={selectedCurrency === "currency"}
                        onChange={handleCurrencyChange}
                      />
                      <span className="absolute bg-primary w-2 h-2 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                    </label>
                    <label
                      className="ml-2 text-primary cursor-pointer text-sm font-normal"
                      htmlFor="currency"
                    >
                      Symbol Before
                    </label>
                  </div>

                  <div className="inline-flex items-center">
                    <label
                      className="relative flex items-center cursor-pointer"
                      htmlFor="after"
                    >
                      <input
                        name="code"
                        type="radio"
                        className={`peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-primary checked:border-primary transition-all outline-none ${
                          selectedCurrency === "after"
                            ? "bg-gray-200"
                            : "bg-white"
                        }`}
                        id="after"
                        checked={selectedCurrency === "after"}
                        onChange={handleCurrencyChange}
                      />
                      <span className="absolute bg-primary w-2 h-2 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                    </label>
                    <label
                      className="ml-2 text-primary cursor-pointer text-sm font-normal"
                      htmlFor="after"
                    >
                      Symbol After
                    </label>
                  </div>
                </div>
                {/*  {...(error? && { error: error })}
                   {...(typeof error !== "undefined" ? { error } : {})} */}

                {/* {error && (
                      <div className="mt-2 text-[#F04438] text-sm font-normal">
                        {error}
                        // {local_currency_format_selection_error}
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
                Timezone Settings <img src={Brand} alt="brand" />
              </span>
              <span className="text-secondary font-normal ">
                Set Preferred Timezone Easily
              </span>
            </div>
            <div className="w-full">
              <label className="text-primary">Timezone Type</label>
              <div className="w-full flex gap-4 items-center pt-3">
                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center cursor-pointer"
                    htmlFor="locationtime"
                  >
                    <input
                      name="codee"
                      type="radio"
                      className={`peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-primary checked:border-primary transition-all outline-none ${
                        selectedTime === "locationtime"
                          ? "bg-gray-200"
                          : "bg-white"
                      }`}
                      id="locationtime"
                      checked={selectedTime === "locationtime"}
                      onChange={handleTimeChange}
                    />
                    <span className="absolute bg-primary w-2 h-2 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                  </label>
                  <label
                    className="ml-2 text-primary cursor-pointer text-sm font-normal"
                    htmlFor="locationtime"
                  >
                    Location-based time
                  </label>
                </div>

                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center cursor-pointer"
                    htmlFor="servertime"
                  >
                    <input
                      name="codee"
                      type="radio"
                      className={`peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-primary checked:border-primary transition-all outline-none ${
                        selectedTime === "servertime"
                          ? "bg-gray-200"
                          : "bg-white"
                      }`}
                      id="servertime"
                      checked={selectedTime === "servertime"}
                      onChange={handleTimeChange}
                    />
                    <span className="absolute bg-primary w-2 h-2 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                  </label>
                  <label
                    className="ml-2 text-primary cursor-pointer text-sm font-normal"
                    htmlFor="servertime"
                  >
                    Server time
                  </label>
                </div>
              </div>

              {/* {...(error? && { error: error })}
                   {...(typeof error !== "undefined" ? { error } : {})} */}

              {/* {error && (
                      <div className="mt-2 text-[#F04438] text-sm font-normal">
                        {error}
                        // {local_timezone_selection_error}
                      </div>
                    )} */}
            </div>
          </div>
        </div>
        <div className="w-full justify-center items-center mt-8 mb-5 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end border-b border-primary">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className=" text-primary flex items-center gap-1">
                If location based time is selected
              </span>
            </div>
            <div className="w-full">
              <div className="w-full ">
                <label className="text-primary">Select Timezone</label>
                <div className="dropdown-container relative w-full mt-1">
                  <ComponentDropdown
                    name="currency"
                    SummaryChild={
                      <h5 className="p-0 m-0">{timezoneDropdown.showName}</h5>
                    }
                    dropdownList={timezones}
                    search={false}
                    commonFunction={setTimezoneDropDown}
                    selected={timezoneDropdown.name}
                  />
                </div>
              </div>
              <div className="w-full mt-5 flex gap-3 ">
                <input
                  type="checkbox"
                  id="timezone"
                  name="timezone"
                  value="timezone"
                  className="scale-125"
                />
                <label className="text-primary">
                  Automatically detect my timezone based on location
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full justify-center items-center mt-8 mb-8 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end border-b border-primary">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className=" text-primary flex items-center gap-1">
                Date & Time Settings <img src={Brand} alt="brand" />
              </span>
              <span className="text-secondary font-normal ">
                Configure Date and Time
              </span>
            </div>
            <div className="w-full">
              <div className="w-full">
                <label className="text-primary">Country Region</label>
                <div className="dropdown-container relative w-full mt-1">
                  <ComponentDropdown
                    name="currency"
                    SummaryChild={
                      <h5 className="p-0 m-0">{regionDropdown.showName}</h5>
                    }
                    dropdownList={region}
                    search={false}
                    commonFunction={setRegionDropDown}
                    selected={regionDropdown.name}
                  />
                </div>
              </div>
              <div className="w-full mt-5">
                <label className="text-primary">Select Date Format</label>
                <div className="dropdown-container relative w-full mt-1">
                  <ComponentDropdown
                    name="dateFormat"
                    SummaryChild={
                      <h5 className="p-0 m-0">{dateFormatDropdown.showName}</h5>
                    }
                    dropdownList={dateFormats}
                    search={false}
                    commonFunction={setDateFormatDropDown}
                    selected={dateFormatDropdown.name}
                    // {...(error? && { error: error })}
                    // {...(typeof error !== "undefined" ? { error } : {})}
                  />
                  {/* {error && (
                      <div className="mt-2 text-[#F04438] text-sm font-normal">
                        {error}
                        // {local_data_fromat_selection_error}
                      </div>
                    )} */}
                </div>
              </div>
              <div className="w-full mt-6">
                <label className="text-primary">Timezone Type</label>
                <div className="w-full flex gap-4 items-center pt-3">
                  <div className="inline-flex items-center">
                    <label
                      className="relative flex items-center cursor-pointer"
                      htmlFor="twelve"
                    >
                      <input
                        name="tcode"
                        type="radio"
                        className={`peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-primary checked:border-primary transition-all outline-none ${
                          selectedTimezone === "twelve"
                            ? "bg-gray-200"
                            : "bg-white"
                        }`}
                        id="twelve"
                        checked={selectedTimezone === "twelve"}
                        onChange={handleTimezoneChange}
                      />
                      <span className="absolute bg-primary w-2 h-2 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                    </label>
                    <label
                      className="ml-2 text-primary cursor-pointer text-sm font-normal"
                      htmlFor="twelve"
                    >
                      12 Hours
                    </label>
                  </div>

                  <div className="inline-flex items-center">
                    <label
                      className="relative flex items-center cursor-pointer"
                      htmlFor="twenty-four"
                    >
                      <input
                        name="tcode"
                        type="radio"
                        className={`peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-primary checked:border-primary transition-all outline-none ${
                          selectedTimezone === "twenty-four"
                            ? "bg-gray-200"
                            : "bg-white"
                        }`}
                        id="twenty-four"
                        checked={selectedTimezone === "twenty-four"}
                        onChange={handleTimezoneChange}
                      />
                      <span className="absolute bg-primary w-2 h-2 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                    </label>
                    <label
                      className="ml-2 text-primary cursor-pointer text-sm font-normal"
                      htmlFor="twenty-four"
                    >
                      24 Hours
                    </label>
                  </div>
                </div>
                {/* {...(error? && { error: error })}
                   {...(typeof error !== "undefined" ? { error } : {})} */}

                {/* {error && (
                      <div className="mt-2 text-[#F04438] text-sm font-normal">
                        {error}
                        // {local_timezone2_selection_error}
                      </div>
                    )} */}
              </div>
              <div className="w-full mt-6">
                <label className="text-primary">Week Start</label>
                <div className="w-full flex gap-4 items-center pt-3">
                  <div className="inline-flex items-center">
                    <label
                      className="relative flex items-center cursor-pointer"
                      htmlFor="sunday"
                    >
                      <input
                        name="wcode"
                        type="radio"
                        className={`peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-primary checked:border-primary transition-all outline-none ${
                          selectedWeek === "sunday" ? "bg-gray-200" : "bg-white"
                        }`}
                        id="sunday"
                        checked={selectedWeek === "sunday"}
                        onChange={handleWeekChange}
                      />
                      <span className="absolute bg-primary w-2 h-2 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                    </label>
                    <label
                      className="ml-2 text-primary cursor-pointer text-sm font-normal"
                      htmlFor="sunday"
                    >
                      Sunday
                    </label>
                  </div>

                  <div className="inline-flex items-center">
                    <label
                      className="relative flex items-center cursor-pointer"
                      htmlFor="monday"
                    >
                      <input
                        name="wcode"
                        type="radio"
                        className={`peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-primary checked:border-primary transition-all outline-none ${
                          selectedWeek === "monday" ? "bg-gray-200" : "bg-white"
                        }`}
                        id="monday"
                        checked={selectedWeek === "monday"}
                        onChange={handleWeekChange}
                      />
                      <span className="absolute bg-primary w-2 h-2 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                    </label>
                    <label
                      className="ml-2 text-primary cursor-pointer text-sm font-normal"
                      htmlFor="monday"
                    >
                      Monday
                    </label>
                  </div>
                </div>
                {/* {...(error? && { error: error })}
                   {...(typeof error !== "undefined" ? { error } : {})} */}

                {/* {error && (
                      <div className="mt-2 text-[#F04438] text-sm font-normal">
                        {error}
                        // {local_week_start_selection_error}
                      </div>
                    )} */}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end items-center gap-4 ">
          <button
            className="px-4 py-2 text-primary font-medium bg-white rounded-xl hover:bg-gray-50  border border-primary whitespace-nowrap"
            id="button-231"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
            id="button-232"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default LocalizationSetting;
