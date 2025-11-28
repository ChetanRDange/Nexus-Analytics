import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import BadgeLogo from "../assets/svgs/badgelogo.svg";
import BrandComp from "../Components/BrandComp";
import ComponentDropdown from "../Components/ComponentDropdown";
import InputComponent from "../Components/InputComponent";
import useMutation from "../hooks/useMutation";

const status = [
  {
    id: 0,
    showName: "Active",
    name: "Active",
  },
  {
    id: 1,
    showName: "Inactive",
    name: "Inactive",
  },
];
const badgetype = [
  {
    id: 0,
    showName: "Achievement",
    name: "Achievement",
  },
  {
    id: 1,
    showName: "Milestone",
    name: "Milestone",
  },
  {
    id: 2,
    showName: "Reward",
    name: "Reward",
  },
];

const AddBadge = () => {
  const [isScrollable, setIsScrollable] = useState(false);
  const { callApi } = useMutation();
  const navigate = useNavigate();
  const [iconLink, setIconLink] = useState(null);
  const [badgeDetails, setBadgeDetails] = useState({
    name: "",
    description: "",
    type: "",
    criteria: "",
    icon: "",
    status: "",
  });
  const [badgetypeDropdown, setBadgetypeDropdown] = useState({
    showName: "Click to select an option",
    name: "",
  });

  const [statusDropDown, setStatusDropDown] = useState({
    showName: "Click to select an option",
    name: "",
  });

  const validateForm = () => {
    if (!badgeDetails.name.trim()) {
      toast.error("Badge name is required.");
      return false;
    }
    if (badgeDetails.name.length > 50) {
      toast.error("Badge name cannot exceed 50 characters.");
      return false;
    }
    if (!badgeDetails.description.trim()) {
      toast.error("Badge description is required.");
      return false;
    }
    if (badgeDetails.description.length > 500) {
      toast.error("Badge description cannot exceed 500 characters.");
      return false;
    }
    if (!badgetypeDropdown.name) {
      toast.error("Please select a badge type.");
      return false;
    }
    if (!badgeDetails.criteria.trim()) {
      toast.error("Achievement criteria is required.");
      return false;
    }
    if (!iconLink) {
      toast.error("Badge icon is required.");
      return false;
    }
    if (!statusDropDown.name) {
      toast.error("Please select a status.");
      return false;
    }
    return true;
  };

  const handleAddBadge = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const formData = new FormData();
    formData.append("name", badgeDetails.name);
    formData.append("description", badgeDetails.description);
    formData.append("type", badgetypeDropdown.name);
    formData.append("criteria", badgeDetails.criteria);
    formData.append("status", statusDropDown.name);
    formData.append("icon", iconLink);
    const res = await callApi("/private/badge", "POST", formData, {
      contentType: "multipart/form-data",
    });
    if (res) navigate("/badge-management");
  };

  return (
    <>
      <div className="py-8 p-4 sm:p-5 overflow-x-hidden mb-20">
        <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
          <div>
            <span className="text-3xl font-semibold text-dark">Add Badge</span>
          </div>
          <div className=" w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
            <Link
              id="badge-management"
              to="/badge-management"
              className="px-4 py-2 text-primary font-medium bg-white hover:bg-gray-50 rounded-xl border border-primary whitespace-nowrap"
            >
              Cancel
            </Link>
            <button
              onClick={handleAddBadge}
              className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
              id="button-123"
            >
              Add
            </button>
          </div>
        </div>

        <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className=" text-primary ">Manage Badge</span>
              <span className="text-secondary font-normal ">
                Badge Overview and Details
              </span>
            </div>
            <div className="w-full">
              <div>
                <InputComponent
                  inputType="text"
                  name="bname"
                  id="bname"
                  labelName="Badge Name"
                  labelColor="primary"
                  placeholderName="Badge Name"
                  placeholderColor="secondary"
                  textColor="text-dark"
                  borderRadius="xl"
                  activeBorderColor="blue"
                  value={badgeDetails?.name}
                  onChange={(e) =>
                    setBadgeDetails({ ...badgeDetails, name: e.target.value })
                  }
                />
              </div>

              <div className="w-full mt-5">
                <label className="text-primary">Badge Description</label>
                <textarea
                  id="bdescription"
                  name="bdescription"
                  rows="3"
                  cols="50"
                  placeholder="Badge Description"
                  maxLength="500"
                  minLength="10"
                  required
                  disabled={false}
                  readOnly={false}
                  autoFocus
                  wrap="soft"
                  spellCheck={true}
                  value={badgeDetails?.description}
                  onChange={(e) =>
                    setBadgeDetails({
                      ...badgeDetails,
                      description: e.target.value,
                    })
                  }
                  className="w-full mt-2 rounded-xl border border-primary focus:outline-none focus:border focus:border-[#A4BCFD] px-4 py-2.5 placeholder:text-secondary text-primary bg-transparent placeholder:font-normal"
                  style={{ resize: "none" }}
                />
                <p className="w-full text-right font-normal text-primary">
                  {badgeDetails?.description?.length}/500
                </p>
              </div>
              <div className="w-full mt-5">
                <label className="text-primary">Badge Type</label>
                <div className="dropdown-container relative w-full mt-2">
                  <ComponentDropdown
                    name="duration"
                    SummaryChild={
                      <h5 className="p-0 m-0 text-primary">
                        {badgetypeDropdown.showName}
                      </h5>
                    }
                    dropdownList={badgetype}
                    search={false}
                    commonFunction={setBadgetypeDropdown}
                    selected={badgetypeDropdown.name}
                  />
                </div>
              </div>
              <div>
                <InputComponent
                  mt="5"
                  inputType="text"
                  name="criteria"
                  id="criteria"
                  labelName="Achievement Criteria"
                  labelColor="primary"
                  placeholderName="Achievement Criteria"
                  placeholderColor="secondary"
                  textColor="text-dark"
                  borderRadius="xl"
                  activeBorderColor="blue"
                  value={badgeDetails?.criteria}
                  onChange={(e) =>
                    setBadgeDetails({
                      ...badgeDetails,
                      criteria: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className="block text-primary">Badge Icon Upload</span>
            </div>
            <div className="w-full">
              <div className="w-full">
                <BrandComp
                  setIcon={setIconLink}
                  compLogo={BadgeLogo}
                  title="Badge Icon"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className="block text-primary">Additional Options</span>
            </div>
            <div className="w-full">
              <div className="w-full">
                <label className="text-primary">Status</label>
                <div className="dropdown-container relative w-full mt-2">
                  <ComponentDropdown
                    name="duration"
                    SummaryChild={
                      <h5 className="p-0 m-0 text-primary">
                        {statusDropDown.showName}
                      </h5>
                    }
                    dropdownList={status}
                    search={false}
                    commonFunction={setStatusDropDown}
                    selected={statusDropDown.name}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* {!isScrollable && (
          <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
            <Link
              to="/badge-management"
              className="px-4 py-2 text-primary font-medium bg-white hover:bg-gray-50 rounded-xl border border-primary whitespace-nowrap"
            >
              Cancel
            </Link>
            <button className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap" id="button-124">
              Add
            </button>
          </div>
        )} */}
      </div>
    </>
  );
};

export default AddBadge;
