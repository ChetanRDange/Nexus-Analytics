import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InputComponent from "../Components/InputComponent";
import Brand from "../assets/svgs/settings/brand.svg";
import ImportBlacklistModal from "../Components/ImportBlacklistModal";
import ComponentDropdown from "../Components/ComponentDropdown";

const country = [
  { id: 0, showName: "India", name: "India" },
  { id: 1, showName: "America", name: "America" },
  { id: 2, showName: "China", name: "China" },
  { id: 3, showName: "Japan", name: "Japan" },
  { id: 4, showName: "Europe", name: "Europe" },
  { id: 5, showName: "Pakistan", name: "Pakistan" },
  { id: 6, showName: "Danish (Denmark)", name: "Danish (Denmark)" },
];
const AddEmailBlacklist = () => {
  const [isScrollable, setIsScrollable] = useState(false);
  const [isImportBlacklistModal, setIsImportBlacklistModal] = useState(false);
  const fields = [
    {
      label: "Email ID",
      description: "spammer@example.com",
    },
    {
      label: "Max Incorrect Login Attempts",
      description: "10",
    },
    {
      label: "Max Frequent Password Reset Requests",
      description: "5",
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
  return (
    <>
      <ImportBlacklistModal
        isImportBlacklistModal={isImportBlacklistModal}
        setIsImportBlacklistModal={setIsImportBlacklistModal}
        fields={fields}
        title="Email Blacklist Details"
      />
      <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
        <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row  xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
          <div>
            <span className="text-3xl font-semibold text-dark">
              Add Email Blacklist
            </span>
          </div>
          <div className=" w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
            <Link
              id="cancel"
              to="/email-blacklist"
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
                Add Email Blacklist Details
              </span>
            </div>

            <div className="w-full">
              <div className="w-full">
                <InputComponent
                  inputType="text"
                  name="email"
                  id="email"
                  labelName="Email ID"
                  labelColor="primary"
                  placeholderName="Email ID"
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
        <div className="w-full justify-center items-center mt-8 pb-8 gap-y-4 gap-2 border-b border-primary lg:items-start md:items-end xl:items-end ">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className="block   text-primary">Reasons</span>
            </div>

            <div className="w-full">
              <div className="w-full">
                <InputComponent
                  inputType="number"
                  name="maxattempt"
                  id="maxattempt"
                  labelName="Max Incorrect Login Attempts"
                  labelColor="primary"
                  placeholderName="Max Incorrect Login Attempts"
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
                  Trigger a blacklist after failed login attempts in a short
                  period.
                </p>
              </div>

              <div className="w-full mt-6">
                <InputComponent
                  inputType="number"
                  name="maxpattempt"
                  id="maxpattempt"
                  labelName="Max Frequent Password Reset Requests"
                  labelColor="primary"
                  placeholderName="Max Frequent Password Reset Requests"
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
                  Emails requesting password resets too frequently are added to
                  the abuse list.
                </p>
              </div>

              <div className="w-full mt-6">
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

                <p className="text-sm text-secondary font-normal mt-2">
                  Emails with login attempts from unusual locations added to the
                  abuse list.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmailBlacklist;
