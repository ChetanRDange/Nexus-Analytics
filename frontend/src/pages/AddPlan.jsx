import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import ComponentDropdown from "../Components/ComponentDropdown";
import CreateNewSegmentModal from "../Components/CreateNewSegmentModal";
import InputComponent from "../Components/InputComponent";
import MultiselectDropdown from "../Components/MultiselectDropdown";
import ToggleComponent from "../Components/ToggleComponent";

import { CircleAlert } from "lucide-react";
import Info from "../assets/svgs/info.svg";
import useFetch from "../hooks/useFetch";
import useMutation from "../hooks/useMutation";

const planFeatures = [
  { id: 0, key: "bulkUpload", label: "Bulk Lead Upload", status: "active" },
  { id: 2, key: "siteCrawl", label: "Website Crawler", status: "active" },
  { id: 3, key: "gmb", label: "Google Maps Leads", status: "active" },
  { id: 5, key: "leadManagement", label: "Lead Management", status: "active" },
  { id: 6, key: "leadFiltering", label: "Lead Filtering", status: "active" },
  { id: 7, key: "emailCampaigns", label: "Email Campaigns", status: "active" },
  { id: 8, key: "emailTemplates", label: "Email Templates", status: "active" },
  { id: 9, key: "multipleTags", label: "Multiple Tags", status: "active" },
  {
    id: 10,
    key: "tagCategories",
    label: "Tag & Thoughts Categories",
    status: "active",
  },
  { id: 11, key: "customFields", label: "Custom Fields", status: "active" },
  { key: "thoughts", label: "Thoughts", status: "active" },
  {
    id: 12,
    key: "customColumnMapping",
    label: "Custom Column Mapping",
    status: "active",
  },
  {
    id: 13,
    key: "blockedContacts",
    label: "Blocked Contacts",
    status: "active",
  },
  {
    id: 14,
    key: "userRoles",
    label: "User Roles & Permissions",
    status: "active",
  },
  {
    id: 15,
    key: "gmailIntegration",
    label: "Gmail Integration",
    status: "active",
  },
  { id: 16, key: "dataSecurity", label: "Data Security", status: "active" },
  { id: 17, key: "whiteLabelling", label: "White Labelling", status: "active" },
  {
    id: 18,
    key: "smtpConfiguration",
    label: "SMTP Configuration",
    status: "active",
  },
  {
    id: 19,
    key: "s3Configuration",
    label: "S3 Configuration",
    status: "active",
  },
  {
    id: 20,
    key: "smsCampaigns",
    label: "SMS Campaigns",
    status: "upcoming",
  },
  {
    id: 21,
    key: "whatsappCampaigns",
    label: "WhatsApp Campaigns",
    status: "upcoming",
  },
  { id: 22, key: "aiAssistant", label: "AI Assistant", status: "upcoming" },
  {
    id: 23,
    key: "leadSegmentation",
    label: "Lead Segmentation",
    status: "upcoming",
  },
  {
    id: 24,
    key: "duplicateLeadManagement",
    label: "Duplicate Lead Management",
    status: "upcoming",
  },
  { id: 25, key: "apiAccess", label: "API Access", status: "upcoming" },
  {
    id: 26,
    key: "reportingAnalytics",
    label: "Reporting & Analytics",
    status: "upcoming",
  },
  {
    id: 27,
    key: "supportTiers",
    label: "Customer Support Tiers",
    status: "upcoming",
  },
  { id: 28, key: "systemLogs", label: "System Logs", status: "upcoming" },
  {
    id: 29,
    key: "activityLogs",
    label: "Activity Logs",
    status: "upcoming",
  },
  { id: 30, key: "dataStorage", label: "Data Storage", status: "upcoming" },
];

const durations = [
  {
    id: 0,
    showName: "Monthly",
    name: "monthly",
  },
  {
    id: 2,
    showName: "Yearly",
    name: "yearly",
  },
];

const currencies = [
  {
    id: 0,
    showName: "USD",
    name: "USD",
  },
  {
    id: 1,
    showName: "AED",
    name: "AED",
  },
  {
    id: 2,
    showName: "INR",
    name: "INR",
  },
];

const statusOptions = [
  { id: "active", name: "active", showName: "Active" },
  { id: "maintenance", name: "maintenance", showName: "Under Maintenance" },
  { id: "upcoming", name: "upcoming", showName: "Coming Soon" },
];

const AddPlan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { callApi } = useMutation();
  const { id } = useParams();

  const [selectedType, setSelectedType] = useState("Normal");
  const [charCount, setCharCount] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [isTrial, setIsTrial] = useState(false);
  const [isNewSegment, setIsNewSegment] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [featureStatuses, setFeatureStatuses] = useState({});

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    originalPrice: "",
    company: "",
    discountedPrice: "",
    features: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "Normal",
    company: "",
    features: [],
    duration: "monthly",
    currency: "INR",
    originalPrice: "",
    discountedPrice: "",
    trial: false,
    trialDays: 0,
    isActive: true,
  });

  if (id) {
    const { data: planDetails } = useFetch(`/private/plans/${id}`);

    useEffect(() => {
      if (planDetails?.data) {
        const plan = planDetails.data;

        let selectedFeatures = [];
        let statusMap = {};
        if (plan?.features?.length > 0) {
          const featureData = plan.features[0];

          // Get all features that are available
          Object.entries(featureData).forEach(([key, value]) => {
            if (
              value &&
              typeof value === "object" &&
              value.available === true
            ) {
              const matchingFeature = planFeatures.find((f) => f.key === key);
              if (matchingFeature) {
                selectedFeatures.push({
                  id: key,
                  key: key,
                  name: matchingFeature.label,
                });
                statusMap[key] = value.status || "active";
              }
            }
          });
        }

        setFeatureStatuses(statusMap);
        setFormData((prev) => ({
          ...prev,
          name: plan.name,
          description: plan.description,
          type: plan.type,
          company: plan.company || "",
          features: selectedFeatures,
          duration: plan.duration,
          currency: plan.currency,
          originalPrice: plan.originalPrice,
          discountedPrice: plan.discountedPrice,
          trial: plan.trial,
          trialDays: plan.trialDays || 0,
          isActive: plan.isActive,
        }));
        setIsTrial(plan.trial);
        setIsActive(plan.isActive);
        setSelectedType(plan.type);
        setSelectedFeatures(selectedFeatures);
        setCharCount(plan.description?.length || 0);
      }
    }, [planDetails]);
  }

  useEffect(() => {
    if (location?.state?.planType === "Enterprise") {
      setSelectedType("Enterprise");
    }
  }, [location?.state, selectedType]);

  const { data: companies, loading: loadingCompanies } = useFetch(
    "/private/companies",
    {},
    formData?.type === "Enterprise"
  );

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value?.trim()) return "Name is required.";
        if (value.length < 2) return "Minimum 2 characters required";
        return "";
      case "description":
        if (!value?.trim()) return "Description is required";
        if (value.length < 10) return "Minimum 10 characters required";
        return "";
      case "originalPrice":
        if (!value) return "Original price is required";
        if (value <= 0) return "Price must be greater than 0";
        return "";
      case "discountedPrice":
        if (value && parseFloat(value) > parseFloat(formData.originalPrice)) {
          return "Discounted price cannot be more than original price";
        }
        if (value && value <= 0) return "Price must be greater than 0";
        return "";
      case "company":
        if (selectedType === "Enterprise" && !value)
          return "Company is required for Enterprise plans";
        return "";
      case "features":
        if (!value || value.length === 0)
          return "At least one feature is required";
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "originalPrice" && formData.discountedPrice) {
      const discountError = validateField(
        "discountedPrice",
        formData.discountedPrice
      );
      setErrors((prev) => ({
        ...prev,
        discountedPrice: discountError,
      }));
    }

    if (name === "description") {
      setCharCount(value.length);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate required fields
    Object.keys(formData).forEach((key) => {
      if (["name", "description", "originalPrice", "features"].includes(key)) {
        const error = validateField(key, formData[key]);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      }
    });

    // Validate company for Enterprise plans
    if (selectedType === "Enterprise") {
      const error = validateField("company", formData.company);
      if (error) {
        newErrors.company = error;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFeatureSelection = (selected) => {
    const featuresArray = selected.map((item) => {
      return {
        id: item.key,
        key: item.key,
        name: item.name,
        status: featureStatuses[item.key] || "active",
      };
    });

    const error = validateField("features", featuresArray);
    setErrors((prev) => ({
      ...prev,
      features: error,
    }));

    setSelectedFeatures(featuresArray);
    setFormData((prev) => ({
      ...prev,
      features: featuresArray,
    }));
  };

  const handleStatusChange = (featureKey, newStatus) => {
    setFeatureStatuses((prev) => ({
      ...prev,
      [featureKey]: newStatus,
    }));

    setSelectedFeatures((prev) =>
      prev.map((feature) =>
        feature.key === featureKey ? { ...feature, status: newStatus } : feature
      )
    );

    setFormData((prev) => ({
      ...prev,
      features: prev.features.map((feature) =>
        feature.key === featureKey ? { ...feature, status: newStatus } : feature
      ),
    }));
  };

  const handleDurationChange = (duration) => {
    setFormData((prev) => ({
      ...prev,
      duration: duration.name,
    }));
  };

  const handleCurrencyChange = (currency) => {
    setFormData((prev) => ({
      ...prev,
      currency: currency.name,
    }));
  };

  const handleTypeChange = (e) => {
    const type = e.target.id === "normal" ? "Normal" : "Enterprise";
    setSelectedType(type);
    setFormData((prev) => ({
      ...prev,
      type,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasExistingErrors = Object.values(errors).some(
      (error) => error !== ""
    );
    if (hasExistingErrors) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }
    let featuresObj = {};

    planFeatures.map(({ key, label }) => {
      const featureData = formData.features.find((f) => f.key === key);
      featuresObj[key] = {
        label,
        status: featureData?.status,
        available: !!featureData,
      };
    });

    const requestData = {
      ...formData,
      features: featuresObj,
      type: selectedType,
      trial: isTrial,
      isActive,
    };

    if (selectedType === "Enterprise" && formData.company) {
      requestData.company = formData.company; // Adjust depending on the structure
    } else {
      delete requestData.company; // Ensure company is not sent for non-Enterprise plans
    }
    const res = await callApi("/private/plans", "POST", requestData);
    if (res) navigate("/normal-plans");
  };

  return (
    <>
      <CreateNewSegmentModal
        isNewSegment={isNewSegment}
        setIsNewSegment={setIsNewSegment}
      />
      <div className="py-8 p-4 sm:p-5 overflow-x-hidden overflow-y-auto mb-20">
        <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex justify-between items-center   ">
          <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
            Add Plan
          </h4>

          <div className="flex gap-2">
            <Link
              id="plan"
              to="/normal-plans"
              className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
            >
              Cancel
            </Link>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
              id="button-137"
            >
              Add
            </button>
          </div>
        </div>

        <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className="block text-primary">Plan Details</span>
            </div>
            <div className="w-full">
              <InputComponent
                inputType="text"
                name="name"
                id="name"
                labelName="Name"
                labelColor="primary"
                placeholderName="Name"
                placeholderColor="secondary"
                textColor="text-dark"
                borderRadius="xl"
                activeBorderColor="blue"
                value={formData.name}
                onChange={handleInputChange}
                error={!!errors.name}
                errorMessage={errors.name}
                required
                minLength={50}
                maxLength={50}
                // setErrors={setErrors}
              />
              {errors.name && (
                <div className="flex items-center">
                  <CircleAlert color="red" />
                  <p className="text-red-500 text-sm ml-2">{errors.name}</p>
                </div>
              )}

              <div className="w-full mt-5">
                <label className="text-primary">
                  Description<span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  cols="50"
                  placeholder="Description"
                  maxLength="500"
                  minLength="10"
                  required
                  onChange={handleInputChange}
                  className={`w-full mt-2 rounded-xl border ${
                    errors.description ? "border-fadered" : "border-primary"
                  } focus:outline-none focus:border focus:border-[#A4BCFD] px-4 py-2.5 placeholder:text-secondary text-primary bg-transparent placeholder:font-normal`}
                  style={{ resize: "none" }}
                  value={formData.description}
                />
                {errors.description && (
                  <div className="flex items-center mt-1">
                    {/* <img src={ErrorIcon} alt="Error" className="mr-2" /> */}
                    <CircleAlert color="red" />
                    <p className="text-red-500 text-sm ml-2">
                      {errors.description}
                    </p>
                  </div>
                )}
                <div className="w-full flex flex-col-reverse md:flex-row gap-4 justify-between">
                  <p className="mt-1 text-primary text-[14px]"></p>
                  <span className="font-normal text-primary">
                    {charCount}/500
                  </span>
                </div>
              </div>
              <div className="w-full mt-5">
                <label className="text-primary">
                  Plan Type<span className="text-red-500 ml-1">*</span>
                </label>
                <div className="w-full flex gap-4 items-center pt-3">
                  <div className="inline-flex items-center">
                    <label
                      className="relative flex items-center cursor-pointer"
                      htmlFor="normal"
                    >
                      <input
                        name="type"
                        type="radio"
                        className={`peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-primary checked:border-primary transition-all outline-none ${
                          selectedType === "Normal" ? "bg-gray-200" : "bg-main"
                        }`}
                        id="normal"
                        checked={selectedType === "Normal"}
                        onChange={handleTypeChange}
                      />
                      <span className="absolute bg-primary w-2 h-2 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                    </label>
                    <label
                      className="ml-2 text-primary cursor-pointer text-sm font-normal"
                      htmlFor="normal"
                    >
                      Normal
                    </label>
                  </div>

                  <div className="inline-flex items-center">
                    <label
                      className="relative flex items-center cursor-pointer"
                      htmlFor="enterprise"
                    >
                      <input
                        name="type"
                        type="radio"
                        className={`peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-primary checked:border-primary transition-all outline-none ${
                          selectedType === "Enterprise"
                            ? "bg-gray-200"
                            : "bg-main"
                        }`}
                        id="enterprise"
                        checked={selectedType === "Enterprise"}
                        onChange={(e) => {
                          handleTypeChange(e);
                        }}
                      />
                      <span className="absolute bg-primary w-2 h-2 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                    </label>
                    <label
                      className="ml-2 text-primary cursor-pointer text-sm font-normal"
                      htmlFor="enterprise"
                    >
                      Enterprise
                    </label>
                  </div>
                </div>
              </div>

              {selectedType === "Enterprise" && (
                <div className="w-full mt-5 ">
                  <label className="text-primary">
                    Select Company<span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="dropdown-container relative w-full mt-2 ">
                    {loadingCompanies ? (
                      <div className="p-2 text-primary">
                        Loading companies...
                      </div>
                    ) : (
                      <ComponentDropdown
                        name="company"
                        SummaryChild={
                          <h5 className="p-0 m-0 text-primary">
                            {formData.company
                              ? companies?.data?.find(
                                  (c) => c._id === formData.company
                                )?.companyName || "Select company"
                              : "Select company"}
                          </h5>
                        }
                        dropdownList={companies?.data?.map((company) => ({
                          id: company._id,
                          showName: company.companyName,
                          name: company._id,
                        }))}
                        search={true}
                        commonFunction={(selectedCompany) => {
                          setFormData((prev) => ({
                            ...prev,
                            company: selectedCompany.id, // ✅ Set company _id here
                          }));
                        }}
                        selected={formData.company}
                      />
                    )}
                  </div>
                  {errors.company && (
                    <div className="flex items-center mt-1">
                      {/* <img src={ErrorIcon} alt="Error" className="mr-2" /> */}
                      <CircleAlert />
                      <p className="text-red-500 text-sm ml-2">
                        {errors.company}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="w-full mt-5">
                <MultiselectDropdown
                  data={planFeatures.map((feature) => ({
                    id: feature.key,
                    key: feature.key,
                    name: feature.label || feature.name,
                  }))}
                  label="Select Plan Features"
                  onChange={handleFeatureSelection}
                  defaultLabel={
                    selectedFeatures.length > 0
                      ? selectedFeatures.map((f) => f.name).join(", ")
                      : ""
                  }
                  required
                />
                {errors.features && (
                  <div className="flex items-center mt-1">
                    <CircleAlert color="red" />
                    <p className="text-red-500 text-sm ml-2">
                      {errors.features}
                    </p>
                  </div>
                )}

                {selectedFeatures.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {selectedFeatures.map((feature) => (
                      <div
                        key={feature.key}
                        className="flex justify-between items-center"
                      >
                        <span className="text-primary w-[65%]">
                          {
                            planFeatures.find((f) => f.key === feature.key)
                              ?.label
                          }
                        </span>
                        <div className="w-[30%]">
                          <ComponentDropdown
                            name={`status-${feature.key}`}
                            SummaryChild={
                              <h5 className="p-0 m-0 text-primary capitalize">
                                {featureStatuses[feature.key] || "active"}
                              </h5>
                            }
                            dropdownList={statusOptions}
                            search={false}
                            commonFunction={(selectedStatus) => {
                              handleStatusChange(
                                feature.key,
                                selectedStatus.name
                              );
                            }}
                            selected={featureStatuses[feature.key] || "active"}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className="block text-primary">
                Billing & Pricing Information
              </span>
            </div>
            <div className="w-full">
              <div className="w-full">
                <label className="text-primary">
                  Plan Duration<span className="text-red-500 ml-1">*</span>
                </label>
                <div className="dropdown-container relative w-full mt-2">
                  <ComponentDropdown
                    name="duration"
                    SummaryChild={
                      <h5 className="p-0 m-0 text-primary">
                        {formData.duration}
                      </h5>
                    }
                    dropdownList={durations}
                    search={false}
                    commonFunction={handleDurationChange}
                    selected={formData.duration}
                  />
                </div>
              </div>

              <div className="w-full mt-5">
                <label className="text-primary">
                  Select Currency<span className="text-red-500 ml-1">*</span>
                </label>
                <div className="dropdown-container relative w-full mt-2">
                  <ComponentDropdown
                    name="currency"
                    SummaryChild={
                      <h5 className="p-0 m-0">{formData.currency}</h5>
                    }
                    dropdownList={currencies}
                    search={false}
                    commonFunction={handleCurrencyChange}
                    selected={formData.currency}
                  />
                </div>
              </div>

              <div className="mt-5 w-full grid grid-cols-1 xl:grid-cols-2 gap-4">
                <div className="w-full ">
                  <div className="relative w-full mb-2">
                    <InputComponent
                      inputType="number"
                      name="originalPrice"
                      id="originalPrice"
                      labelName="Original Price"
                      labelColor="primary"
                      placeholderName="Original Price"
                      placeholderColor="secondary"
                      textColor="text-dark"
                      borderRadius="xl"
                      maxLength={5}
                      activeBorderColor="blue"
                      value={formData.originalPrice}
                      onChange={handleInputChange}
                      error={!!errors.originalPrice}
                      errorMessage={errors.originalPrice}
                      required
                      min={1}
                      max={999}
                      step={1}
                    />
                    {errors.originalPrice && (
                      <div className="flex items-center mt-1">
                        <CircleAlert color="red" />
                        <p className="text-red-500 text-sm ml-2">
                          {errors.originalPrice}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full">
                  <div className="relative w-full mb-2">
                    <InputComponent
                      inputType="number"
                      name="discountedPrice"
                      id="discountedPrice"
                      labelName="Discount Price - Optional"
                      labelColor="primary"
                      placeholderName="Sale Price - Optional"
                      placeholderColor="secondary"
                      textColor="text-dark"
                      borderRadius="xl"
                      maxLength={5}
                      activeBorderColor="blue"
                      value={formData.discountedPrice}
                      onChange={handleInputChange}
                      error={!!errors.discountedPrice}
                      errorMessage={errors.discountedPrice}
                      min={0}
                    />
                    {errors.discountedPrice && (
                      <div className="flex items-center mt-1 ">
                        <CircleAlert color="red" />
                        <p className="text-red-500 text-sm ml-2">
                          {errors.discountedPrice}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className="block text-primary">Trial Applicable</span>
            </div>
            <div className="w-full">
              <ToggleComponent
                label="Activate Trial"
                isIcon={true}
                icon={Info}
                isEnableState={isTrial}
                setIsEnableState={setIsTrial}
                tooltipMessage="Set the trial period of plan"
              />
              {isTrial && (
                <div className="w-full mt-5">
                  <InputComponent
                    inputType="number"
                    name="trialDays"
                    id="trialDays"
                    labelName="Trial Days"
                    labelColor="primary"
                    placeholderName="Enter trial days"
                    placeholderColor="secondary"
                    textColor="text-dark"
                    borderRadius="xl"
                    activeBorderColor="blue"
                    value={formData.trialDays}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full justify-center items-center mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className="block text-primary">Plan Status</span>
            </div>
            <div className="w-full">
              <ToggleComponent
                label="Activate Plan"
                isIcon={true}
                icon={Info}
                isEnableState={isActive}
                tooltipMessage="Set the status of plan to active or inactive"
                setIsEnableState={setIsActive}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end gap-2 mt-2">
          <Link
            id="plan"
            to="/normal-plans"
            className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
            id="button-137"
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default AddPlan;
