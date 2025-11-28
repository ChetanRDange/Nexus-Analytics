import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import InputComponent from "../Components/InputComponent";
import Brand from "../assets/svgs/settings/brand.svg";
import PhoneInput from "react-phone-input-2";
import ToggleComponent from "../Components/ToggleComponent";
import ImportBlacklistModal from "../Components/ImportBlacklistModal";

const AddPhoneBlacklist = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isEnableUser, setIsEnableUser] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cName: "",
    phone: "",
    password: "",
  });
  const [isScrollable, setIsScrollable] = useState(false);
  const [isImportBlacklistModal, setIsImportBlacklistModal] = useState(false);

  const checkScrollability = () => {
    const contentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    setIsScrollable(contentHeight > windowHeight);
  };

  const fields = [
    {
      label: "Phone Number",
      description: "+91 8888855554",
    },
    {
      label: "Max Fraudulent Activity Complaints",
      description: "15",
    },
    {
      label: "Max Failed OTP Verifications",
      description: "10",
    },
    {
      label: "Max Failed Two-Factor Authentication via SMS",
      description: "5",
    },
    {
      label: "Repetitive Robocall Detection",
      description: "Active",
    },
  ];

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

  const [maxIncorrectLoginAttempts, setMaxIncorrectLoginAttempts] =
    useState("");
  const [
    maxFrequentPasswordResetRequests,
    setMaxFrequentPasswordResetRequests,
  ] = useState("");

  const handleCheckboxChange = () => {
    setIsImportBlacklistModal(true);
  };
  return (
    <>
      <ImportBlacklistModal
        isImportBlacklistModal={isImportBlacklistModal}
        setIsImportBlacklistModal={setIsImportBlacklistModal}
        fields={fields}
        title="Phone Blacklist Details"
      />
      <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
        <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row  xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
          <div>
            <span className="text-3xl font-semibold text-dark">
              Add Phone Blacklist
            </span>
          </div>
          <div className=" w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
            <Link
              id="cancel"
              to="/phone-blacklist"
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
                Add Phone Blacklist Details
              </span>
            </div>

            <div className="w-full">
              <div className="w-full">
                <label htmlFor="phone" className="text-primary">
                  Phone Number
                </label>
                <div
                  className={`relative mt-2 rounded-xl ${
                    isFocused ? " border border-fadedblue" : ""
                  }`}
                >
                  <PhoneInput
                    id={"number"}
                    className="focus:outline-none"
                    preferredCountries={["in"]}
                    placeholder="+91 12345-67890"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    buttonStyle={{
                      border: "1px solid #D1D5DB",
                      borderTopRightRadius: "0px",
                      borderBottomRightRadius: "0px",
                      borderTopLeftRadius: "12px",
                      borderBottomLeftRadius: "12px",
                      width: "52px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "white",
                    }}
                    dropdownStyle={{
                      top: "50px",
                      left: "0px",
                    }}
                    country={"in"}
                    inputStyle={{
                      borderRadius: "12px",
                      fontSize: "16px",
                      border: "1px solid #D1D5DB",
                      marginLeft: "15px",
                      color: "#374151",
                      width: "97.1%",
                      height: "46px",
                      outline: "none",
                      boxShadow: "none",
                    }}
                    onChange={(value, country, e, formattedValue) => {
                      const phone = formattedValue.split(" ");
                      const newPhone = phone
                        .filter((ph, i) => i !== 0)
                        .join("")
                        .replace("-", "");
                      setFormData({
                        ...formData,
                        phone: newPhone,
                        phoneCode: country.dialCode,
                      });
                    }}
                  />
                </div>
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
                  name="maxcomplaint"
                  id="maxcomplaint"
                  labelName="Max Fraudulent Activity Complaints"
                  labelColor="primary"
                  placeholderName="Max Fraudulent Activity Complaints"
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
                  Phone number receives multiple fraud or scam from users or
                  third-party services.
                </p>
              </div>

              <div className="w-full mt-6">
                <InputComponent
                  inputType="number"
                  name="maxotp"
                  id="maxotp"
                  labelName="Max Failed OTP Verifications"
                  labelColor="primary"
                  placeholderName="Max Failed OTP Verifications"
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
                  The phone number has failed OTP verifications multiple times
                  within a short period.
                </p>
              </div>

              <div className="w-full mt-6">
                <InputComponent
                  inputType="number"
                  Icon={Brand}
                  name="authsms"
                  id="authsms"
                  labelName="Max Failed Two-Factor Authentication via SMS"
                  labelColor="primary"
                  placeholderName="Max Failed Two-Factor Authentication via SMS"
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
                  Multiple failed attempts to authenticate via phone-based
                  two-factor authentication (2FA).
                </p>
              </div>
              <div className="w-full mt-6">
                <ToggleComponent
                  label="Repetitive Robocall Detection"
                  isEnableState={isEnableUser}
                  setIsEnableState={setIsEnableUser}
                  tooltipMessage="Turn on Repetitive Robocall Detection"
                />
                <p className="text-sm text-secondary font-normal mt-2">
                  Phone number is detected making robocalls with automated
                  systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPhoneBlacklist;
