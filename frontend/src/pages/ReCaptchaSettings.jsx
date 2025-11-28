import React, { useState } from "react";
import { Link } from "react-router-dom";
import ComponentDropdown from "../Components/ComponentDropdown";
import InputComponent from "../Components/InputComponent";
import Toggle from "../Components/Toggle";
import Brand from "../assets/svgs/settings/brand.svg";

const recaptchas = [
  {
    id: 0,
    showName: "ReCaptcha V2",
    name: "ReCaptcha V2",
  },
  {
    id: 1,
    showName: "ReCaptcha V3",
    name: "ReCaptcha V3",
  },
  {
    id: 2,
    showName: "ReCaptcha V4",
    name: "ReCaptcha V4",
  },
];

const ReCaptchaSettings = () => {
  const [isEnableTrial, setIsEnableTrial] = useState(false);
  const [enableToggle, setEnableToggle] = useState(false);

  const [recaptchaSelectDropdown, setRecaptchaSelectDropDown] = useState({
    showName: "Click to select an option",
    name: "",
  });

  return (
    <div className="min-h-screen mb-10 py-8 p-4 sm:p-5 overflow-x-hidden">
      <div className="w-full flex flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
        <div className="flex gap-4 items-center">
          <h4 className="text-3xl text-dark">ReCaptcha Settings</h4>
          <Toggle enableState={enableToggle} setEnableState={setEnableToggle} />
        </div>
        <div className="w-full flex justify-end sm:w-fit gap-4">
          <button
            className="flex gap-2 items-center px-2 sm:px-4 rounded-xl py-2 bg-primary hover:bg-primarydark text-white"
            id="button-264"
          >
            <Link id="save-changes">Save Changes</Link>
          </button>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary flex items-center gap-1">
              ReCaptcha Settings <img src={Brand} alt="brand" />
            </span>
          </div>

          <form className="w-full">
            <div className="w-full">
              <label className="text-primary">Select ReCaptcha</label>
              <div className="dropdown-container relative w-full mt-2">
                <ComponentDropdown
                  name="company"
                  SummaryChild={
                    <h5 className="p-0 m-0 text-primary">
                      {recaptchaSelectDropdown.showName}
                    </h5>
                  }
                  dropdownList={recaptchas}
                  search={false}
                  commonFunction={setRecaptchaSelectDropDown}
                  selected={recaptchaSelectDropdown.name}
                  // {...(error? && { error: error })}
                  // {...(typeof error !== "undefined" ? { error } : {})}
                />
                {/* {error && (
                    <div className="mt-2 text-[#F04438] text-sm font-normal">
                      {error}
                      // {recaptcha_selection_error}
                    </div>
                  )} */}
              </div>
            </div>
            <InputComponent
              mt="5"
              inputType="text"
              name="key"
              id="key"
              labelName="Google Recaptcha Key"
              labelColor="primary"
              placeholderName="Google Recaptcha Key"
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
                    // {google_recaptcha_key_empty_error,invalid_google_recaptcha_key_error}
                  </div>
                )} */}

            <InputComponent
              mt="5"
              inputType="text"
              name="version"
              id="version"
              labelName="Google Recaptcha Version"
              labelColor="primary"
              placeholderName="Google Recaptcha Version"
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
                      // {recaptcha_version_empty_error,invalid_recaptcha_version_error}
                    </div>
                  )} */}
            <InputComponent
              mt="5"
              inputType="text"
              name="secret"
              id="secret"
              labelName="Google Recaptcha Secret"
              labelColor="primary"
              placeholderName="Google Recaptcha Secret"
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
                      // {recaptcha_secret_empty_error,invalid_recaptcha_secret_error}
                    </div>
                  )} */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReCaptchaSettings;
