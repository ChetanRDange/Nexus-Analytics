import React, { useState, useEffect } from "react";
import ComponentDropdown from "../Components/ComponentDropdown";
import { Link } from "react-router-dom";
import Brand from "../assets/svgs/settings/brand.svg";
import ImportBlacklistModal from "../Components/ImportBlacklistModal";
import ToggleComponent from "../Components/ToggleComponent";
import InputComponent from "../Components/InputComponent";
const country = [
  { id: 0, showName: "India", name: "India" },
  { id: 1, showName: "America", name: "America" },
  { id: 2, showName: "China", name: "China" },
  { id: 3, showName: "Japan", name: "Japan" },
  { id: 4, showName: "Europe", name: "Europe" },
  { id: 5, showName: "Pakistan", name: "Pakistan" },
  { id: 6, showName: "Danish (Denmark)", name: "Danish (Denmark)" },
];
const AddIPBlacklist = () => {
  const [isScrollable, setIsScrollable] = useState(false);
  const [isEnableUser, setIsEnableUser] = useState(false);
  const [isImportBlacklistModal, setIsImportBlacklistModal] = useState(false);
  const fields = [
    {
      label: "IP Address",
      description: "192.168.1.100",
    },
    {
      label: "Max Failed Login Attempts",
      description: "10",
    },
    {
      label: "Max Repeated API Misuse",
      description: "50",
    },
    {
      label: "Max Repeatedly Submits Incorrect Forms",
      description: "8",
    },
    {
      label: "DDoS (Distributed Denial of Service) Attack Detection",
      description: "1000 requests in 1 minute",
    },
    {
      label: "Suspicious Login Locations",
      description: "Denmark",
    },
  ];

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

  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);
    return () => {
      window.removeEventListener("resize", checkScrollability);
    };
  }, []);

  const [input, setInput] = useState("false");

  const [countryDropdown, setCountryDropdown] = useState({
    showName: "Click to select an option",
    name: "",
  });

  const [maxIncorrectLoginAttempts, setMaxIncorrectLoginAttempts] =
    useState("");
  const [
    maxFrequentPasswordResetRequests,
    setMaxFrequentPasswordResetRequests,
  ] = useState("");

  const handleOnChange = () => {
    setInput(e.target.value);
  };
  const handleCheckboxChange = () => {
    setIsImportBlacklistModal(true);
  };
  const shouldShowSpamToggler =
    parseInt(maxIncorrectLoginAttempts) > 10 ||
    parseInt(maxFrequentPasswordResetRequests) > 5;

  return (
    <>
      <ImportBlacklistModal
        isImportBlacklistModal={isImportBlacklistModal}
        setIsImportBlacklistModal={setIsImportBlacklistModal}
        fields={fields}
        title="Email Blacklist Details"
      />
      <div className="min-h-screen py-8 p-4 sm:p-5 overflow-x-hidden mb-20">
        <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row  xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
          <div>
            <span className="text-3xl font-semibold text-dark">
              Add IP Blacklist
            </span>
          </div>
          <div className=" w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
            <Link
              id="cancel"
              to="/ip-blacklist"
              className="px-4 py-2 text-primary font-medium bg-white hover:bg-gray-50  rounded-xl border border-primary whitespace-nowrap"
            >
              Cancel
            </Link>

            <Link
              id="add"
              onClick={handleCheckboxChange}
              className="saveBtn px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
            >
              Add
            </Link>
          </div>
        </div>
        <div className="w-full justify-center items-center mt-8 pb-8 gap-y-4 gap-2 border-b border-primary lg:items-start md:items-end xl:items-end ">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className="block   text-primary">
                Add IP Blacklist Details
              </span>
            </div>

            <div className="w-full">
              <div className="w-full">
                <InputComponent
                  inputType="text"
                  name="ipaddress"
                  id="ipaddress"
                  labelName="IP Address"
                  labelColor="primary"
                  placeholderName="IP Address"
                  placeholderColor="secondary"
                  textColor="text-dark"
                  onChange={handleOnChange}
                  borderRadius="xl"
                  activeBorderColor="blue"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full justify-center items-center mt-8 mb-8 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end border-b border-primary">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className=" text-primary  flex items-center gap-1">
                Reasons
              </span>
            </div>
            <div className="w-full">
              <div className="w-full">
                <InputComponent
                  Icon={Brand}
                  inputType="number"
                  name="maxlogin"
                  id="maxlogin"
                  labelName="Max Failed Login Attempts"
                  labelColor="primary"
                  placeholderName="Max Failed Login Attempts"
                  placeholderColor="secondary"
                  textColor="text-dark"
                  borderRadius="xl"
                  activeBorderColor="blue"
                  value={maxIncorrectLoginAttempts}
                  onChange={(e) => {
                    setMaxIncorrectLoginAttempts(e.target.value);
                  }}
                />

                <p className="text-sm text-secondary font-normal mt-2">
                  IP address exceeds a set number of failed login attempts
                  within a specific time frame.
                </p>
              </div>

              <div className="w-full mt-6">
                <InputComponent
                  inputType="number"
                  Icon={Brand}
                  name="maxapi"
                  id="maxapi"
                  labelName="Max Repeated API Misuse"
                  labelColor="primary"
                  placeholderName="Max Repeated API Misuse"
                  placeholderColor="secondary"
                  textColor="text-dark"
                  borderRadius="xl"
                  activeBorderColor="blue"
                  value={maxFrequentPasswordResetRequests}
                  onChange={(e) => {
                    setMaxFrequentPasswordResetRequests(e.target.value);
                  }}
                />

                <p className="text-sm text-secondary font-normal mt-2">
                  IP makes an excessive number of unauthorized or incorrect API
                  requests.
                </p>
              </div>
              <div className="w-full mt-6">
                <InputComponent
                  inputType="number"
                  name="maxform"
                  Icon={Brand}
                  id="maxform"
                  labelName="Max repeatedly submits incorrect forms"
                  labelColor="primary"
                  placeholderName="Max repeatedly submits incorrect forms"
                  placeholderColor="secondary"
                  textColor="text-dark"
                  borderRadius="xl"
                  activeBorderColor="blue"
                  value={maxFrequentPasswordResetRequests}
                  onChange={(e) => {
                    setMaxFrequentPasswordResetRequests(e.target.value);
                  }}
                />

                <p className="text-sm text-secondary font-normal mt-2">
                  IP address repeatedly submits invalid forms or fails captchas.
                </p>
              </div>
              <div className="w-full mt-6">
                <InputComponent
                  inputType="number"
                  Icon={Brand}
                  name="dodetection"
                  id="dodetection"
                  labelName="DDoS (Distributed Denial of Service) Attack Detection"
                  labelColor="primary"
                  placeholderName="DDoS (Distributed Denial of Service) Attack Detection"
                  placeholderColor="secondary"
                  textColor="text-dark"
                  borderRadius="xl"
                  activeBorderColor="blue"
                  value={maxFrequentPasswordResetRequests}
                  onChange={(e) => {
                    setMaxFrequentPasswordResetRequests(e.target.value);
                  }}
                />

                <p className="text-sm text-secondary font-normal mt-2">
                  IP sends an overwhelming number of requests, potentially
                  flooding the server.
                </p>
              </div>

              <div className="w-full mt-6 pb-8">
                <label className="text-primary flex items-center gap-1">
                  Suspicious Login Locations
                  <img src={Brand} alt="brand" />
                </label>

                <div className="dropdown-container mt-2 relative w-full ">
                  <ComponentDropdown
                    name="search"
                    SummaryChild={
                      <h5 className="p-0 m-0">{countryDropdown.showName}</h5>
                    }
                    dropdownList={country}
                    search={true}
                    commonFunction={setCountryDropdown}
                    selected={countryDropdown.name}
                  />
                </div>
                {!shouldShowSpamToggler && (
                  <p className="text-sm text-secondary font-normal mt-2">
                    The IP originates from a region or country flagged for high
                    malicious activity.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        {!isScrollable && (
          <div className="w-full flex justify-end items-center gap-4">
            <Link
              id="cancel-1"
              to="/ip-blacklist"
              className="px-4 py-2 text-primary font-medium bg-white hover:bg-gray-50  rounded-xl border border-primary whitespace-nowrap"
            >
              Cancel
            </Link>

            <Link
              id="add-1"
              onClick={handleCheckboxChange}
              className="saveBtn px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
            >
              Add
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default AddIPBlacklist;
