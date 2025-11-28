import React, { useState } from "react";
import InputComponent from "./InputComponent";
import AddIcon from "../assets/svgs/add-black.svg";
import CloseImg from "../assets/svgs/close.svg";
import ComponentDropdown from "./ComponentDropdown";

const countries = [
  {
    id: 0,
    showName: "India",
    name: "India",
  },
  {
    id: 1,
    showName: "United States",
    name: "United States",
  },
  {
    id: 2,
    showName: "China",
    name: "China",
  },
  {
    id: 3,
    showName: "Japan",
    name: "Japan",
  },
  {
    id: 4,
    showName: "Indonesia",
    name: "Indonesia",
  },
  {
    id: 5,
    showName: "Spain",
    name: "Spain",
  },
  {
    id: 6,
    showName: "Italy",
    name: "Italy",
  },
  {
    id: 7,
    showName: "France",
    name: "France",
  },
  {
    id: 8,
    showName: "Germany",
    name: "Germany",
  },
];

const conditions1 = [
  {
    id: 0,
    showName: "Country",
    name: "Country",
  },
  {
    id: 1,
    showName: "State",
    name: "State",
  },
  {
    id: 2,
    showName: "City",
    name: "City",
  },
];

const conditions = [
  {
    id: 0,
    showName: "is equal to",
    name: "is equal to",
  },
  {
    id: 1,
    showName: "is not equal to",
    name: "is not equal to",
  },
];

const CreateNewSegmentModal = ({ isNewSegment, setIsNewSegment }) => {
  if (!isNewSegment) return null;

  const [countrySelectDropdown, setCountrySelectDropDown] = useState({
    showName: "India",
    name: "",
  });

  const [conditionSelectDropdown1, setConditionSelectDropDown1] = useState({
    showName: "Country",
    name: "",
  });

  const [conditionSelectDropdown, setConditionSelectDropDown] = useState({
    showName: "Select Condition",
    name: "",
  });

  return (
    <>
      <div className="fixed inset-0 z-40 overflow-y-auto">
        <div
          className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"
          onClick={() => setIsNewSegment(false)}
        ></div>
        <div className="flex items-start justify-center w-full min-h-screen px-4 text-center lg:absolute lg:top-[12%]">
          <div className="bg-[#FFFFFF] rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-[98%] sm:w-[90%] md:w-[780px] px-6 2xl:px-8 py-8">
            <div className="w-full flex justify-between items-center gap-2 flex-wrap pb-3 border-b border-primary">
              <h2 className="text-dark text-xl font-bold">Create Segment</h2>
              <div className="w-full md:w-fit flex justify-end items-center">
                <span
                  onClick={() => setIsNewSegment(false)}
                  className="p-1.5 rounded-xl hover:bg-gray-50"
                >
                  <img src={CloseImg} alt="" className="cursor-pointer" />
                </span>
              </div>
            </div>

            <div className="w-full mt-5 pb-3">
              <div className="w-full">
                <InputComponent
                  inputType="text"
                  name="storageLimit"
                  id="storageLimit"
                  labelName="Segment Name"
                  labelColor="primary"
                  placeholderName="Segment Name"
                  placeholderColor="secondary"
                  textColor="text-dark"
                  borderRadius="xl"
                  activeBorderColor="blue"
                  // {...(error? && { error: error })}
                  // {...(typeof error !== "undefined" ? { error } : {})}
                />
                {/* {error && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <img src={ErrorIcon} alt="" />
                    </div>
                  )} */}
                {/* {error && (
                    <div className="mt-2 text-[#F04438] text-sm font-normal">
                      {error}
                      // {segment_name_already_exist_error,segment_name_char_error,segment_name_required_error}
                    </div>
                  )} */}
              </div>

              <div className="my-5 w-full rounded-xl p-4 border border-primary">
                <div className="w-full text-primary pb-3 border-b border-primary">
                  Conditions
                </div>
                <div className="w-full flex justify-between gap-4 gap-x-6 md:flex-row flex-col gap-y-4 ptpb-4">
                  <div className="w-full md:w-1/6 text-primary">Where</div>
                  <div className="w-full flex gap-4 gap-x-5 flex-wrap justify-between">
                    <div className="dropdown-container relative w-fit">
                      <ComponentDropdown
                        name="condition1"
                        width="fit"
                        SummaryChild={
                          <h5 className="p-0 m-0 text-primary">
                            {conditionSelectDropdown1.showName}
                          </h5>
                        }
                        dropdownList={conditions1}
                        search={false}
                        commonFunction={setConditionSelectDropDown1}
                        selected={conditionSelectDropdown1.name}
                      />
                    </div>
                    <div className="dropdown-container relative w-fit">
                      <ComponentDropdown
                        name="condition"
                        width="fit"
                        SummaryChild={
                          <h5 className="p-0 m-0 text-primary">
                            {conditionSelectDropdown.showName}
                          </h5>
                        }
                        dropdownList={conditions}
                        search={false}
                        commonFunction={setConditionSelectDropDown}
                        selected={conditionSelectDropdown.name}
                      />
                    </div>
                    <div className="dropdown-container relative w-fit">
                      <ComponentDropdown
                        name="country"
                        width="fit"
                        SummaryChild={
                          <h5 className="p-0 m-0 text-primary">
                            {countrySelectDropdown.showName}
                          </h5>
                        }
                        dropdownList={countries}
                        search={false}
                        commonFunction={setCountrySelectDropDown}
                        selected={countrySelectDropdown.name}
                      />
                    </div>

                    <div className="flex gap-4 gap-x-5 justify-start mt-">
                      <button className="flex px-4 py-2.5 items-center gap-2 w-fit border border-primary rounded-xl text-primary tracking-wide" id="button-29">
                        <span>
                          <img src={AddIcon} alt="AddIcon" />
                        </span>
                        <span>New Filter</span>
                      </button>
                      <button className="flex px-4 py-2.5 items-center gap-2 w-fit border border-primary rounded-xl text-primary tracking-wide" id="button-30">
                        <span>
                          <img src={AddIcon} alt="AddIcon" />
                        </span>
                        <span>New Group</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* {error && (
                  <div className="mt-2 text-[#F04438] text-sm font-normal">
                    {error}
                    // {segment_conditions_required_error}
                  </div>
                )} */}
            </div>

            <div className="w-full flex gap-4 justify-end items-center pt-3 border-t-2 border-primary">
              <button onClick={() => setIsNewSegment(false)}
                className="w-fit text-center rounded-xl border border-primary hover:bg-gray-50 py-2 px-4"
               id="button-31">
                Cancel
              </button>
              <button onClick={() => setIsNewSegment(false)}
                className="w-fit text-center rounded-xl bg-primary hover:bg-primarydark text-white py-2 px-4"
               id="button-32">
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNewSegmentModal;
