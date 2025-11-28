import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import ComponentDropdown from "../Components/ComponentDropdown";
import InputComponent from "../Components/InputComponent";
import useFetch from "../hooks/useFetch";
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
const categories = [
  {
    id: 0,
    showName: "General",
    name: "General",
  },
  {
    id: 1,
    showName: "Payments",
    name: "Payments",
  },
  {
    id: 2,
    showName: "Account",
    name: "Account",
  },
  {
    id: 3,
    showName: "Billing",
    name: "Billing",
  },
  {
    id: 4,
    showName: "Security",
    name: "Security",
  },
  {
    id: 5,
    showName: "Support",
    name: "Support",
  },
  {
    id: 6,
    showName: "Product",
    name: "Product",
  },
];
const visibilityOptions = [
  {
    id: 0,
    showName: "Public",
    name: "Public",
  },
  {
    id: 1,
    showName: "Admin Only",
    name: "Admin Only",
  },
];
const featureOptions = [
  {
    id: 0,
    showName: "Yes",
    name: "Yes",
  },
  {
    id: 1,
    showName: "No",
    name: "No",
  },
];
const priority = [
  {
    id: 0,
    showName: "High",
    name: "High",
  },
  {
    id: 1,
    showName: "Low",
    name: "Low",
  },
  {
    id: 2,
    showName: "Medium",
    name: "Medium",
  },
];

const EditFAQManagement = () => {
  const { faqId } = useParams();
  const { callApi } = useMutation();
  const navigate = useNavigate();
  const [isScrollable, setIsScrollable] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [currentTags, setCurrentTags] = useState("");
  const [faqDetails, setFAQDetails] = useState({
    faqId: "",
    category: "",
    question: "",
    answer: "",
    keywords: [],
    status: "",
    visibilty: "",
    featured: false,
    tags: [],
    priority: "",
  });
  const [catagoryDropdown, setCatagoryDropdown] = useState({
    showName: "",
    name: "",
  });

  const [statusDropDown, setStatusDropDown] = useState({
    showName: "",
    name: "",
  });
  const [visibilityDropDown, setVisibilityDropDown] = useState({
    showName: "",
    name: "",
  });
  const [featureDropDown, setFeatureDropDown] = useState({
    showName: "",
    name: "",
  });

  const [priorityDropDown, setPriorityDropDown] = useState({
    showName: "",
    name: "",
  });

  const { data: res, loading } = useFetch(`/private/faqs/${faqId}`);
  const faqRecord = res?.data;

  useEffect(() => {
    if (faqRecord) {
      setFAQDetails(faqRecord);
      setCurrentKeyword(faqRecord?.keywords.join(", "));
      setCurrentTags(faqRecord?.tags.join(", "));
      setCatagoryDropdown({
        showName: faqRecord?.category,
        name: faqRecord?.category,
      });
      setStatusDropDown({
        showName: faqRecord?.status,
        name: faqRecord?.status,
      });
      setVisibilityDropDown({
        showName: faqRecord?.visibilty,
        name: faqRecord?.visibilty,
      });
      setFeatureDropDown({
        showName: faqRecord?.featured === true ? "Yes" : "No",
        name: faqRecord?.featured === true ? "Yes" : "No",
      });
      setPriorityDropDown({
        showName: faqRecord?.priority,
        name: faqRecord?.priority,
      });
    }
  }, [faqRecord]);
  const handleTextChange = (event) => {
    setCharCount(event.target.value.length);
  };

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

  const handleUpdateFAQS = async () => {
    const updatedFAQData = {
      ...faqDetails,
      keywords: currentKeyword.split(","),
      tags: currentTags.split(","),
      category: catagoryDropdown?.name,
      status: statusDropDown?.name,
      visibilty: visibilityDropDown?.name,
      featured: featureDropDown?.name === "Yes" ? true : false,
      priority: priorityDropDown?.name,
    };
    const res = await callApi("private/faqs", "PUT", updatedFAQData);
  };

  return (
    <>
      <div className="py-8 p-4 sm:p-5 overflow-x-hidden mb-20">
        <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
          <div>
            <span className="text-3xl font-semibold text-dark">Edit FAQ</span>
          </div>
          <div className=" w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
            <Link
              id="cancel"
              to="/faq-management"
              className="px-4 py-2 text-primary font-medium bg-white hover:bg-gray-50 rounded-xl border border-primary whitespace-nowrap"
            >
              Cancel
            </Link>
            <button
              onClick={handleUpdateFAQS}
              className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
              id="button-192"
            >
              Update
            </button>
          </div>
        </div>

        <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className=" text-primary ">
                General Information Section
              </span>
            </div>
            <div className="w-full">
              <InputComponent
                inputType="text"
                name="faqid"
                id="faqid"
                labelName="FAQ ID"
                labelColor="primary"
                placeholderName="FAQ ID"
                placeholderColor="secondary"
                textColor="text-dark"
                borderRadius="xl"
                activeBorderColor="blue"
                value={faqDetails?.faqId}
                onChange={(e) =>
                  setFAQDetails((prevData) => ({
                    ...prevData,
                    faqId: e.target.value,
                  }))
                }
              />

              <div className="w-full mt-5">
                <label className="text-primary">Category</label>
                <div className="dropdown-container relative w-full mt-2">
                  <ComponentDropdown
                    name="duration"
                    SummaryChild={
                      <h5 className="p-0 m-0 text-primary">
                        {catagoryDropdown.showName}
                      </h5>
                    }
                    dropdownList={categories}
                    search={true}
                    commonFunction={setCatagoryDropdown}
                    selected={catagoryDropdown.name}
                  />
                </div>
              </div>
              <div className="mt-5">
                <InputComponent
                  inputType="text"
                  name="question"
                  id="question"
                  labelName="Question"
                  labelColor="primary"
                  placeholderName="Question"
                  placeholderColor="secondary"
                  textColor="text-dark"
                  borderRadius="xl"
                  activeBorderColor="blue"
                  value={faqDetails?.question || "N/A"}
                  onChange={(e) =>
                    setFAQDetails((prevData) => ({
                      ...prevData,
                      question: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="w-full mt-5">
                <label className="text-primary">Answer</label>
                <textarea
                  id="answer"
                  name="answer"
                  rows="5"
                  cols="50"
                  placeholder="Answer"
                  maxLength="500"
                  minLength="10"
                  required
                  value={faqDetails?.answer || "N/A"}
                  disabled={false}
                  readOnly={false}
                  autoFocus
                  wrap="soft"
                  spellCheck={true}
                  onChange={(e) =>
                    setFAQDetails((prevData) => ({
                      ...prevData,
                      answer: e.target.value,
                    }))
                  }
                  className="w-full mt-2 rounded-xl border border-primary focus:outline-none focus:border focus:border-[#A4BCFD] px-4 py-2.5 placeholder:text-secondary text-primary bg-transparent placeholder:font-normal"
                  style={{ resize: "none" }}
                />
                <div className="w-full flex justify-end">
                  <span className="font-normal text-primary">
                    {faqDetails?.answer?.length || 0}/500
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className="block text-primary">
                SEO and Visibility Settings Section
              </span>
            </div>
            <div className="w-full">
              <div className="w-full">
                <InputComponent
                  inputType="text"
                  name="keyword"
                  id="keyword"
                  labelName="Keywords"
                  labelColor="primary"
                  placeholderName="Keywords"
                  placeholderColor="secondary"
                  textColor="text-dark"
                  borderRadius="xl"
                  activeBorderColor="blue"
                  value={currentKeyword || "N/A"}
                  onChange={(e) => setCurrentKeyword(e.target.value)}
                />
              </div>
              <div className="w-full mt-5">
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
              <div className="w-full mt-5">
                <label className="text-primary">Visibility</label>
                <div className="dropdown-container relative w-full mt-2">
                  <ComponentDropdown
                    name="duration"
                    SummaryChild={
                      <h5 className="p-0 m-0 text-primary">
                        {visibilityDropDown.showName}
                      </h5>
                    }
                    dropdownList={visibilityOptions}
                    search={false}
                    commonFunction={setVisibilityDropDown}
                    selected={visibilityDropDown.name}
                  />
                </div>
              </div>
              <div className="w-full mt-5">
                <label className="text-primary">Featured</label>
                <div className="dropdown-container relative w-full mt-2">
                  <ComponentDropdown
                    name="duration"
                    SummaryChild={
                      <h5 className="p-0 m-0 text-primary">
                        {featureDropDown.showName}
                      </h5>
                    }
                    dropdownList={featureOptions}
                    search={false}
                    commonFunction={setFeatureDropDown}
                    selected={featureDropDown.name}
                  />
                </div>
              </div>
              <div className="w-full mt-5">
                <InputComponent
                  inputType="text"
                  name="tags"
                  id="tags"
                  labelName="Tags"
                  labelColor="primary"
                  placeholderName="Tags"
                  placeholderColor="secondary"
                  textColor="text-dark"
                  borderRadius="xl"
                  activeBorderColor="blue"
                  value={currentTags || "N/A"}
                  onChange={(e) => setCurrentTags(e.target.value)}
                />
                <span className="text-secondary font-normal text-sm">
                  Add relevant tags.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className="block text-primary">
                Priority and Engagement Section
              </span>
            </div>
            <div className="w-full">
              <div className="w-full">
                <label className="text-primary">Priority Level</label>
                <div className="dropdown-container relative w-full mt-2">
                  <ComponentDropdown
                    name="duration"
                    SummaryChild={
                      <h5 className="p-0 m-0 text-primary">
                        {priorityDropDown.showName}
                      </h5>
                    }
                    dropdownList={priority}
                    search={false}
                    commonFunction={setPriorityDropDown}
                    selected={priorityDropDown.name}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* {!isScrollable && (
          <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
            <Link
              to="/faq-management"
              className="px-4 py-2 text-primary font-medium bg-white hover:bg-gray-50 rounded-xl border border-primary whitespace-nowrap"
            >
              Cancel
            </Link>
            <button className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap" id="button-193">
              Add
            </button>
          </div>
        )} */}
      </div>
    </>
  );
};

export default EditFAQManagement;
