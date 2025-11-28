import React, { useState, useEffect, useRef } from "react";
import Info from "../assets/svgs/info.svg";
import Percent from "../assets/svgs/percent.svg";
// import ExpandTaskSetupModal from '../Components/ExpandTaskSetupModal';
// import BulkAddChecklistModal from '../Components/BulkAddChecklistModal';
// import ConfirmChecklistModal from '../Components/ConfirmChecklistModal';
// import AddChecklistModal from '../Components/AddChecklistModal';
// import AddComment from '../Components/AddComment';
import ToggleComponent from "../Components/ToggleComponent";
import InputComponent from "../Components/InputComponent";
import ComponentDropdown from "../Components/ComponentDropdown";

const rewardtypes = [
  {
    id: 0,
    showName: "Cash Reward",
    name: "Cash Reward",
  },
  {
    id: 1,
    showName: "Credit Points",
    name: "Credit Points",
  },
  {
    id: 2,
    showName: "Discount",
    name: "Discount",
  },
];

const expirations = [
  {
    id: 0,
    showName: "7 Days",
    name: "7 Days",
  },
  {
    id: 1,
    showName: "14 Days",
    name: "14 Days",
  },
  {
    id: 2,
    showName: "30 Days",
    name: "30 Days",
  },
  {
    id: 3,
    showName: "90 Days",
    name: "90 Days",
  },
  {
    id: 4,
    showName: "Custom",
    name: "Custom",
  },
];

const userLimits = [
  {
    id: 0,
    showName: "10",
    name: "10",
  },
  {
    id: 1,
    showName: "20",
    name: "20",
  },
  {
    id: 2,
    showName: "30",
    name: "30",
  },
  {
    id: 3,
    showName: "40",
    name: "40",
  },
  {
    id: 4,
    showName: "Custom",
    name: "Custom",
  },
];

const rewardConditions = [
  {
    id: 0,
    showName: "Referee signs up",
    name: "Referee signs up",
  },
  {
    id: 1,
    showName: "Referee subscribes to a paid plan",
    name: "Referee subscribes to a paid plan",
  },
  {
    id: 2,
    showName: "Referee completes their profile",
    name: "Referee completes their profile",
  },
];

const ReferralSetting2 = () => {
  const [isScrollable, setIsScrollable] = useState(false);
  const [isEnableReferral, setIsEnableReferral] = useState(true);
  const [isEnableReferral2, setIsEnableReferral2] = useState(true);
  const [isCustomExpiration, setIsCustomExpiration] = useState(false);
  const [isCustomCodeExpiration, setIsCustomCodeExpiration] = useState(false);
  const [isCustomUserLimit, setIsCustomUserLimit] = useState(false);
  const [selectedCode, setSelectedCode] = useState("auto");

  const [expirationDropdown, setExpirationDropDown] = useState({
    showName: "Click to select an option",
    name: "",
  });
  const [rewardDropdown, setRewardDropDown] = useState({
    showName: "Click to select an option",
    name: "",
  });
  const [conditionDropdown, setConditionDropDown] = useState({
    showName: "Click to select an option",
    name: "",
  });
  const [userDropdown, setUserDropDown] = useState({
    showName: "Click to select an option",
    name: "",
  });
  const [discountDropdown, setDiscountDropDown] = useState({
    showName: "Click to select an option",
    name: "",
  });

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);

  useEffect(() => {
    if (expirationDropdown?.name === "Custom") {
      setIsCustomExpiration(true);
    }
    if (discountDropdown?.name === "Custom") {
      setIsCustomCodeExpiration(true);
    }
    if (userDropdown?.name === "Custom") {
      setIsCustomUserLimit(true);
    }
  }, [expirationDropdown, discountDropdown, userDropdown]);

  useEffect(() => {
    if (isCustomExpiration && inputRef1.current) {
      inputRef1.current.focus();
    }
    if (isCustomCodeExpiration && inputRef3.current) {
      inputRef3.current.focus();
    }
    if (isCustomUserLimit && inputRef2.current) {
      inputRef2.current.focus();
    }
  }, [isCustomExpiration, isCustomUserLimit, isCustomCodeExpiration]);

  const checkScrollability = () => {
    const contentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    console.log(windowHeight);
    setIsScrollable(contentHeight > windowHeight);
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);

    return () => {
      window.removeEventListener("resize", checkScrollability);
    };
  }, []);

  const handleCodeChange = (e) => {
    setSelectedCode(e.target.id);
  };

  return (
    <div className="w-full p-8 px-10 min-h-screen mb-20">
      <div className="w-full flex justify-between gap-2 items-center md:flex-row flex-col gap-y-3 pb-8 border-b border-primary">
        <div>
          <span className="text-3xl font-semibold text-primary whitespace-nowrap">
            Referral Settings
          </span>
        </div>
        <div className="w-full flex justify-end">
          <div className="w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit mt-3">
            <button className="px-4 py-2 text-primary font-medium bg-white hover:bg-gray-50 rounded-xl border border-primary whitespace-nowrap" id="button-269">
              Cancel
            </button>
            <button className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap" id="button-270">
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="w-full justify-center border-b border-primary items-center mt-8 mb-5 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="w-full md:w-7/12">
            <span className="text-primary whitespace-nowrap">
              Referral Program Details
            </span>
          </div>
          <div className="w-full">
            <div className="w-full">
              <InputComponent
                inputType="text"
                name="name"
                id="name"
                labelName="Program Name"
                labelColor="primary"
                placeholderName="Program Name"
                placeholderColor="secondary"
                textColor="text-dark"
                borderRadius="xl"
                activeBorderColor="blue"
              />
            </div>

            <div className="w-full mt-5">
              <label className="text-primary">Link Expiration</label>
              <div className="dropdown-container relative w-full mt-2">
                <ComponentDropdown
                  name="search"
                  SummaryChild={
                    <h5 className="p-0 m-0">{expirationDropdown.showName}</h5>
                  }
                  dropdownList={expirations}
                  search={false}
                  commonFunction={setExpirationDropDown}
                  selected={expirationDropdown.name}
                />
              </div>
            </div>

            {isCustomExpiration && (
              <div className="w-full mt-5">
                <div className="w-full">
                  <InputComponent
                    ref={inputRef1}
                    inputType="text"
                    name="customExpiration"
                    id="customExpiration"
                    labelName=" Enter No. of Days for Link Expiration"
                    labelColor="primary"
                    placeholderName=" Enter No. of Days for Link Expiration"
                    placeholderColor="secondary"
                    textColor="text-dark"
                    borderRadius="xl"
                    activeBorderColor="blue"
                  />
                </div>
              </div>
            )}
            <div className="w-full mt-5">
              <label className="text-primary">Reward Type</label>
              <div className="dropdown-container relative w-full mt-2">
                <ComponentDropdown
                  name="search"
                  SummaryChild={
                    <h5 className="p-0 m-0">{rewardDropdown.showName}</h5>
                  }
                  dropdownList={rewardtypes}
                  search={false}
                  commonFunction={setRewardDropDown}
                  selected={rewardDropdown.name}
                />
              </div>
            </div>

            {/* {isCustomUserLimit && (
                <div className="w-full mt-4">
                  <div className="w-full">
                    <label className="text-primary">
                      Enter the Number of Users
                    </label>
                    <input
                      ref={inputRef2}
                      type="text"
                      name="userLimit"
                      id="userLimit"
                      required
                      placeholder="Enter the Number of Users"
                      className="w-full mt-2 rounded-xl border border-primary focus:outline-none focus:ring-0 px-4 py-2.5 focus:border focus:border-[#A4BCFD] placeholder:text-secondary text-primary placeholder:font-normal bg-transparent"
                    />
                  </div>
                </div>
              )} */}

            <div className="w-full mt-5">
              <label className="text-primary">Discount Code</label>
              <div className="w-full flex gap-4 items-center pt-4">
                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center cursor-pointer"
                    htmlFor="auto"
                  >
                    <input
                      name="code"
                      type="radio"
                      className={`peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-primary checked:border-primary transition-all ${
                        selectedCode === "auto" ? "bg-gray-200" : "bg-white"
                      }`}
                      id="auto"
                      checked={selectedCode === "auto"}
                      onChange={handleCodeChange}
                    />
                    <span className="absolute bg-primary w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                  </label>
                  <label
                    className="ml-2 text-primary cursor-pointer text-sm font-normal"
                    htmlFor="auto"
                  >
                    Auto - Generate
                  </label>
                </div>

                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center cursor-pointer"
                    htmlFor="custom"
                  >
                    <input
                      name="code"
                      type="radio"
                      className={`peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-primary checked:border-primary transition-all ${
                        selectedCode === "custom" ? "bg-gray-200" : "bg-white"
                      }`}
                      id="custom"
                      checked={selectedCode === "custom"}
                      onChange={handleCodeChange}
                    />
                    <span className="absolute bg-primary w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                  </label>
                  <label
                    className="ml-2 text-primary cursor-pointer text-sm font-normal"
                    htmlFor="custom"
                  >
                    Custom Create
                  </label>
                </div>
              </div>
            </div>

            <div className="w-full mt-5">
              <label className="text-primary">Discount Percentage</label>
              <div className="w-full relative">
                <input
                  type="text"
                  name="percentange"
                  id="percentange"
                  required
                  placeholder="Discount Percentage"
                  onInput={(e) =>
                    (e.target.value = e.target.value.replace(/[^0-9.%]/g, ""))
                  }
                  className="w-full mt-2 rounded-xl border border-primary focus:outline-none focus:ring-0 px-4 py-2.5 focus:border focus:border-[#A4BCFD] placeholder:text-secondary text-primary placeholder:font-normal bg-transparent relative"
                />

                <span className="absolute end-2 top-5">
                  <img src={Percent} alt="Percent" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center border-b border-primary items-center mt-8 mb-5 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary flex items-center gap-1">
              Referral Reward Condition <img src={Info} alt="Info" />
            </span>
          </div>

          <div className="w-full ">
            <div className="w-full">
              <label className="text-primary">Referrer Reward Conditions</label>
              <div className="dropdown-container relative w-full mt-2">
                <ComponentDropdown
                  name="search"
                  SummaryChild={
                    <h5 className="p-0 m-0">{conditionDropdown.showName}</h5>
                  }
                  dropdownList={rewardConditions}
                  search={false}
                  commonFunction={setConditionDropDown}
                  selected={conditionDropdown.name}
                />
              </div>
            </div>
            <div className="w-full mt-5">
              <label className="text-primary">Referral Limit Per User</label>
              <div className="dropdown-container relative w-full mt-2">
                <ComponentDropdown
                  name="search"
                  SummaryChild={
                    <h5 className="p-0 m-0">{userDropdown.showName}</h5>
                  }
                  dropdownList={userLimits}
                  search={false}
                  commonFunction={setUserDropDown}
                  selected={userDropdown.name}
                />
              </div>
            </div>

            {isCustomUserLimit && (
              <div className="w-full mt-5">
                <div className="w-full">
                  <InputComponent
                    ref={inputRef2}
                    inputType="text"
                    name="userLimit"
                    id="userLimit"
                    labelName="Enter the Number of Users"
                    labelColor="primary"
                    placeholderName="Enter the Number of Users"
                    placeholderColor="secondary"
                    textColor="text-dark"
                    borderRadius="xl"
                    activeBorderColor="blue"
                  />
                </div>
              </div>
            )}

            <div className="w-full mt-5">
              <label className="text-primary">Discount Code Expiration</label>
              <div className="dropdown-container relative w-full mt-2">
                <ComponentDropdown
                  name="search"
                  SummaryChild={
                    <h5 className="p-0 m-0">{discountDropdown.showName}</h5>
                  }
                  dropdownList={expirations}
                  search={false}
                  commonFunction={setDiscountDropDown}
                  selected={discountDropdown.name}
                />
              </div>
            </div>

            {isCustomCodeExpiration && (
              <div className="w-full mt-5">
                <div className="w-full">
                  <InputComponent
                    ref={inputRef3}
                    inputType="text"
                    name="codeExpiration"
                    id="codeExpiration"
                    labelName=" Enter the Number of Users"
                    labelColor="primary"
                    placeholderName=" Enter the Number of Users"
                    placeholderColor="secondary"
                    textColor="text-dark"
                    borderRadius="xl"
                    activeBorderColor="blue"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full justify-center border-b border-primary items-center mt-8 mb-5 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="w-full md:w-7/12">
            <span className="text-primary whitespace-nowrap">
              Referral Reward Details
            </span>
          </div>
          <div className="w-full ">
            <div className="w-full">
              <ToggleComponent
                label="Referee Reward Enable"
                isEnableState={isEnableReferral}
                setIsEnableState={() => setIsEnableReferral(!isEnableReferral)}
              />
            </div>

            <div className="w-full mt-5">
              <label className="text-primary">Discount Percentage</label>
              <div className="w-full relative">
                <input
                  type="text"
                  name="percentange"
                  id="percentange"
                  required
                  placeholder="Discount Percentage"
                  onInput={(e) =>
                    (e.target.value = e.target.value.replace(/[^0-9.%]/g, ""))
                  }
                  className="w-full mt-2 rounded-xl border border-primary focus:outline-none focus:ring-0 px-4 py-2.5 focus:border focus:border-[#A4BCFD] placeholder:text-secondary text-primary placeholder:font-normal bg-transparent relative"
                />

                <span className="absolute end-2 top-5">
                  <img src={Percent} alt="Percent" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center border-b border-primary items-center mt-8 mb-8 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="w-full md:w-7/12">
            <span className="text-primary whitespace-nowrap">
              Activate Referral
            </span>
          </div>
          <div className="w-full ">
            <div className="w-full">
              <ToggleComponent
                label=" Enable Referral Program"
                isEnableState={isEnableReferral2}
                setIsEnableState={() =>
                  setIsEnableReferral2(!isEnableReferral2)
                }
              />
            </div>
          </div>
        </div>
      </div>

      {!isScrollable && (
        <div className="w-full flex justify-end gap-4 items-center">
          <button className="px-4 py-2 text-primary font-medium bg-white hover:bg-gray-50 rounded-xl border border-primary whitespace-nowrap" id="button-271">
            Cancel
          </button>
          <button className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap" id="button-272">
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default ReferralSetting2;
