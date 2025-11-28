import React, { useState, useEffect } from "react";
import InputComponent from "../Components/InputComponent";
import ToggleComponent from "../Components/ToggleComponent";
import Info from "../assets/svgs/info.svg";
import Brand from "../assets/svgs/settings/brand.svg";
import ComponentDropdown from "../Components/ComponentDropdown";
import {
  eblacklist_login_required_error,
  eblacklist_pass_required_error,
  failed_otp_limit_error,
  fraudal_activity_limit_error,
  iblacklist_api_misuse_empty_error,
  iblacklist_ddod_detection_empty_error,
  iblacklist_incorrect_form_empty_error,
  iblacklist_location_selection_error,
  iblacklist_login_empty_error,
  invalid_eblacklist_login_error,
  invalid_eblacklist_pass_error,
  invalid_iblacklist_api_misuse_error,
  invalid_iblacklist_ddod_detection_error,
  invalid_iblacklist_incorrect_form_error,
  invalid_iblacklist_login_error,
  location_selection_error,
  pblacklist_failed_otp_required_error,
  pblacklist_fraudal_activity_required_error,
  pblacklist_two_factauth_required_error,
  two_factauth_limit_error,
} from "../Components/AllError";

const country = [
  { id: 0, showName: "India", name: "India" },
  { id: 1, showName: "America", name: "America" },
  { id: 2, showName: "China", name: "China" },
  { id: 3, showName: "Japan", name: "Japan" },
  { id: 4, showName: "Europe", name: "Europe" },
  { id: 5, showName: "Pakistan", name: "Pakistan" },
  { id: 6, showName: "Danish (Denmark)", name: "Danish (Denmark)" },
];

const SecuritySettings = () => {
  const [onTabClick, setOnTabClick] = useState("email");
  const [isEnableTrial, setIsEnableTrial] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);

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

  const [isEnableUser, setIsEnableUser] = useState(false);
  const [isEnableBlacklist, setIsEnableBlacklist] = useState(false);
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

  const handleToggleSpam = () => setIsEnableTrial(!isEnableTrial);

  const shouldShowSpamToggler =
    parseInt(maxIncorrectLoginAttempts) > 10 ||
    parseInt(maxFrequentPasswordResetRequests) > 5;

  return (
    <div className="py-8 p-4 sm:p-5 overflow-x-hidden mb-20">
      <div className="w-full pb-4 gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">
            Blacklist Settings
          </span>
        </div>

        <div className="w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
          <button
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
            id="button-156"
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="w-full align-middle">
            <div className="flex flex-col gap-y-2 md:flex-row md:justify-between items-center gap-2 pt-3 pb-6 ">
              <div className="w-full flex flex-wrap items-center gap-3 border-b border-primary pb-6">
                <button
                  onClick={() => setOnTabClick("email")}
                  className={`py-2.5 px-4 rounded-xl text-primary font-medium  ${
                    onTabClick === "email" ? "bg-fadedblue" : "bg-white "
                  }`}
                  id="button-157"
                >
                  Email Conditions
                </button>
                <button
                  onClick={() => setOnTabClick("phone")}
                  className={`py-2.5 px-4 rounded-xl text-primary font-medium  ${
                    onTabClick === "phone" ? "bg-fadedblue" : "bg-white "
                  }`}
                  id="button-158"
                >
                  Phone Conditions
                </button>
                <button
                  onClick={() => setOnTabClick("ipcondition")}
                  className={`py-2.5 px-4 rounded-xl text-primary font-medium  ${
                    onTabClick === "ipcondition" ? "bg-fadedblue" : "bg-white "
                  }`}
                  id="button-159"
                >
                  IP Conditions
                </button>
              </div>
            </div>

            {onTabClick === "email" && (
              <div className="w-full justify-center items-center mb-5 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end border-b border-primary">
                <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
                  <div className="sm:w-7/12 w-full flex flex-col">
                    <span className=" text-primary  flex items-center gap-1">
                      Email Blacklisting Conditions
                      <img src={Brand} alt="brand" />
                    </span>
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
                        // {...(error? && { error: error })}
                        // {...(typeof error !== "undefined" ? { error } : {})}
                      />
                      {/* {error && (
                        <div className="mt-2 text-[#F04438] text-sm font-normal">
                          {error}
                          // {eblacklist_login_required_error,invalid_eblacklist_login_error}
                        </div>
                      )} */}
                      {!shouldShowSpamToggler && (
                        <p className="text-sm text-secondary font-normal mt-2">
                          Trigger a blacklist after failed login attempts in a
                          short period.
                        </p>
                      )}
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
                        // {...(error? && { error: error })}
                        // {...(typeof error !== "undefined" ? { error } : {})}
                      />
                      {/* {error && (
                        <div className="mt-2 text-[#F04438] text-sm font-normal">
                          {error}
                          // {eblacklist_pass_required_error,invalid_eblacklist_pass_error}
                        </div>
                      )} */}
                      {!shouldShowSpamToggler && (
                        <p className="text-sm text-secondary font-normal mt-2">
                          Emails requesting password resets too frequently are
                          added to the abuse list.
                        </p>
                      )}
                    </div>

                    {shouldShowSpamToggler && (
                      <div className="w-full mt-7">
                        <ToggleComponent
                          label="Marked as Spam by Multiple Recipients"
                          isIcon={true}
                          icon={Info}
                          isEnableState={isEnableTrial}
                          setIsEnableState={handleToggleSpam}
                          tooltipMessage="Marked as Spam by Multiple Recipients"
                        />
                      </div>
                    )}

                    <div className="w-full mt-6 pb-10">
                      <label className="text-primary flex items-center gap-1">
                        Suspicious Login Locations
                        <img src={Brand} alt="brand" />
                      </label>

                      <div className="dropdown-container mt-2 relative w-full ">
                        <ComponentDropdown
                          name="search"
                          SummaryChild={
                            <h5 className="p-0 m-0">
                              {countryDropdown.showName}
                            </h5>
                          }
                          dropdownList={country}
                          search={true}
                          commonFunction={setCountryDropdown}
                          selected={countryDropdown.name}
                          // {...(error? && { error: error })}
                          // {...(typeof error !== "undefined" ? { error } : {})}
                        />
                        {/* {error && (
                      <div className="mt-2 text-[#F04438] text-sm font-normal">
                        {error}
                        // {location_selection_error}
                      </div>
                    )} */}
                      </div>
                      {!shouldShowSpamToggler && (
                        <p className="text-sm text-secondary font-normal mt-2">
                          Emails with login attempts from unusual locations
                          added to the abuse list.
                        </p>
                      )}
                    </div>

                    <div className="w-full">
                      <ToggleComponent
                        label="Auto add abuser's blacklist?"
                        isEnableState={isEnableUser}
                        setIsEnableState={setIsEnableUser}
                        tooltipMessage="Turn on Auto add abuser's blacklist?"
                      />
                      <p className="text-sm text-secondary font-normal mt-2">
                        Automatically add users to the Abusers List when
                        suspicious activity is detected.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {onTabClick === "phone" && (
              <div className="w-full justify-center items-center mb-5 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end border-b border-primary">
                <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
                  <div className="sm:w-7/12 w-full flex flex-col">
                    <span className=" text-primary  flex items-center gap-1">
                      Phone Blacklisting Conditions
                      <img src={Brand} alt="brand" />
                    </span>
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
                        // {...(error? && { error: error })}
                        // {...(typeof error !== "undefined" ? { error } : {})}
                      />
                      {/* {error && (
                        <div className="mt-2 text-[#F04438] text-sm font-normal">
                          {error}
                          // {pblacklist_fraudal_activity_required_error,fraudal_activity_limit_error}
                        </div>
                      )} */}

                      <p className="text-sm text-secondary font-normal mt-2">
                        Phone number receives multiple fraud or scam from users
                        or third-party services.
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
                        // {...(error? && { error: error })}
                        // {...(typeof error !== "undefined" ? { error } : {})}
                      />
                      {/* {error && (
                        <div className="mt-2 text-[#F04438] text-sm font-normal">
                          {error}
                          // {pblacklist_failed_otp_required_error,failed_otp_limit_error}
                        </div>
                      )} */}

                      <p className="text-sm text-secondary font-normal mt-2">
                        The phone number has failed OTP verifications multiple
                        times within a short period.
                      </p>
                    </div>
                    <div className="w-full mt-6">
                      <InputComponent
                        inputType="number"
                        name="maxsms"
                        id="maxsms"
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
                        // {...(error? && { error: error })}
                        // {...(typeof error !== "undefined" ? { error } : {})}
                      />
                      {/* {error && (
                        <div className="mt-2 text-[#F04438] text-sm font-normal">
                          {error}
                          // {pblacklist_two_factauth_required_error,two_factauth_limit_error}
                        </div>
                      )} */}

                      <p className="text-sm text-secondary font-normal mt-2">
                        Multiple failed attempts to authenticate via phone-based
                        two-factor authentication (2FA).
                      </p>
                    </div>

                    <div className="w-full mt-7">
                      <ToggleComponent
                        label="Repetitive Robocall Detection"
                        isEnableState={isEnableUser}
                        setIsEnableState={setIsEnableUser}
                        tooltipMessage="Repetitive Robocall Detection"
                      />
                      <p className="text-sm text-secondary font-normal mt-2">
                        Phone number is detected making robocalls with automated
                        systems.
                      </p>
                    </div>
                    <div className="w-full mt-7">
                      <ToggleComponent
                        label="Auto add abuser's blacklist?"
                        isEnableState={isEnableBlacklist}
                        setIsEnableState={setIsEnableBlacklist}
                        tooltipMessage="Turn on Auto add abuser's blacklist?"
                      />
                      <p className="text-sm text-secondary font-normal mt-2">
                        Automatically add users to the Abusers List when
                        suspicious activity is detected.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {onTabClick === "ipcondition" && (
              <div className="w-full justify-center items-center mb-8 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end border-b border-primary">
                <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
                  <div className="sm:w-7/12 w-full flex flex-col">
                    <span className=" text-primary  flex items-center gap-1">
                      IP Blacklisting Conditions
                      <img src={Brand} alt="brand" />
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
                        // {...(error? && { error: error })}
                        // {...(typeof error !== "undefined" ? { error } : {})}
                      />
                      {/* {error && (
                        <div className="mt-2 text-[#F04438] text-sm font-normal">
                          {error}
                          // {iblacklist_login_empty_error,invalid_iblacklist_login_error}
                        </div>
                      )} */}

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
                        // {...(error? && { error: error })}
                        // {...(typeof error !== "undefined" ? { error } : {})}
                      />
                      {/* {error && (
                        <div className="mt-2 text-[#F04438] text-sm font-normal">
                          {error}
                          // {iblacklist_api_misuse_empty_error,invalid_iblacklist_api_misuse_error}
                        </div>
                      )} */}

                      <p className="text-sm text-secondary font-normal mt-2">
                        IP makes an excessive number of unauthorized or
                        incorrect API requests.
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
                        // {...(error? && { error: error })}
                        // {...(typeof error !== "undefined" ? { error } : {})}
                      />
                      {/* {error && (
                        <div className="mt-2 text-[#F04438] text-sm font-normal">
                          {error}
                          // {iblacklist_incorrect_form_empty_error,invalid_iblacklist_incorrect_form_error}
                        </div>
                      )} */}

                      <p className="text-sm text-secondary font-normal mt-2">
                        IP address repeatedly submits invalid forms or fails
                        captchas.
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
                        // {...(error? && { error: error })}
                        // {...(typeof error !== "undefined" ? { error } : {})}
                      />
                      {/* {error && (
                        <div className="mt-2 text-[#F04438] text-sm font-normal">
                          {error}
                          // {iblacklist_ddod_detection_empty_error,invalid_iblacklist_ddod_detection_error}
                        </div>
                      )} */}

                      <p className="text-sm text-secondary font-normal mt-2">
                        IP sends an overwhelming number of requests, potentially
                        flooding the server.
                      </p>
                    </div>

                    <div className="w-full mt-6 pb-10">
                      <label className="text-primary flex items-center gap-1">
                        Suspicious Login Locations
                        <img src={Brand} alt="brand" />
                      </label>

                      <div className="dropdown-container mt-2 relative w-full ">
                        <ComponentDropdown
                          name="search"
                          SummaryChild={
                            <h5 className="p-0 m-0">
                              {countryDropdown.showName}
                            </h5>
                          }
                          dropdownList={country}
                          search={true}
                          commonFunction={setCountryDropdown}
                          selected={countryDropdown.name}
                          // {...(error? && { error: error })}
                          // {...(typeof error !== "undefined" ? { error } : {})}
                        />
                        {/* {error && (
                      <div className="mt-2 text-[#F04438] text-sm font-normal">
                        {error}
                        // {iblacklist_location_selection_error}
                      </div>
                    )} */}
                      </div>
                      {!shouldShowSpamToggler && (
                        <p className="text-sm text-secondary font-normal mt-2">
                          The IP originates from a region or country flagged for
                          high malicious activity.
                        </p>
                      )}
                    </div>

                    <div className="w-full">
                      <ToggleComponent
                        label="Auto add abuser's blacklist?"
                        isEnableState={isEnableUser}
                        setIsEnableState={setIsEnableUser}
                        tooltipMessage="Turn on Auto add abuser's blacklist?"
                      />
                      <p className="text-sm text-secondary font-normal mt-2">
                        Automatically add users to the Abusers List when
                        suspicious activity is detected.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {onTabClick === "ipcondition" && (
        <div className="w-full flex justify-end items-center gap-4">
          <button
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
            id="button-160"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default SecuritySettings;
