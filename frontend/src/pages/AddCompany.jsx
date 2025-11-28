import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { CircleAlert } from "lucide-react";
import InputComponent from "../Components/InputComponent";
import useMutation from "../hooks/useMutation";
import useStore from "../state/store";
import PhoneInputWrapper from "./../Components/PhoneInputWrapper";
import jsonPhoneData from "../utils/PhoneInputNewProcessed.json";

const AddCompany = () => {
  const { callApi } = useMutation();
  const { companyDetails, setCompanyDetails } = useStore();
  const navigate = useNavigate();

  const validatePhone = (phone) => {
    if (!phone?.number || !phone?.countryCode) {
      return "Phone number is required";
    }
  
    const country = jsonPhoneData.find(
      (c) => c.dialingCode === phone.countryCode
    );
    if (!country) {
      return "Invalid country code";
    }
  
    const format = Array.isArray(country.phoneNumberFormat)
      ? country.phoneNumberFormat
      : [country.phoneNumberFormat];
  
    const lengths = format.map((f) => (f.match(/#/g) || []).length);
    const minLength = Math.min(...lengths);
    const maxLength = Math.max(...lengths);
  
    if (phone.number.length < minLength || phone.number.length > maxLength) {
      return `Phone number must be between ${minLength} digits`;
    }
  
    return "";
  };

  const [formData, setFormData] = useState({
    companyName: "",
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    companyName: "",
    name: "",
    email: "",
    phone: "",
  });

  const [phoneValues, setPhoneValues] = useState({
    number: "",
    countryCode: "91",
    tempCountryCode: "91",
    editNumber: false,
  });
  const [isPhoneNumberError, setIsPhoneNumberError] = useState("");

  const validateField = (name, value) => {
    switch (name) {
      case "companyName":
        if (!value?.trim()) return "Company name is required";
        return "";
      case "name":
        if (!value?.trim()) return "Full name is required";
        if (!/^[a-zA-Z\s]*$/.test(value))
          return "Name should only contain letters and spaces";
        return "";
      case "email":
        if (!value?.trim()) return "Email ID is required";
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
          return "Please enter a valid email address";
        return "";
      default:
        return "";
    }
  };

  const handleFieldChange = (name, value) => {
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleAddCompany(e) {
    e.preventDefault();

    const companyNameError = validateField("companyName", formData.companyName);
    const nameError = validateField("name", formData.name);
    const emailError = validateField("email", formData.email);
    const phoneError = validatePhone(phoneValues);

    setErrors({
      companyName: companyNameError,
      name: nameError,
      email: emailError,
      phone: phoneError,
    });

    if (companyNameError || nameError || emailError || phoneError) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    const requestBody = {
      companyName: formData.companyName,
      name: formData.name,
      email: formData.email,
      phone: phoneValues.number,
      phoneCode: `+${phoneValues.countryCode}`,
      country: companyDetails.country,
    };

    const res = await callApi("/private/companies", "POST", requestBody);
    if (res) navigate("/companies");
  }

  return (
    <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden relative overflow-y-auto pb-20">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex justify-between items-center   ">
        <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
          Add Company
        </h4>

        <div className="flex gap-2">
          <Link
            id="companies"
            to="/companies"
            className="px-4 py-2 text-primary font-medium bg-main rounded-xl border hover:bg-hover border-primary whitespace-nowrap"
          >
            Cancel
          </Link>
          <button
            onClick={handleAddCompany}
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
            id="button-125"
          >
            Add
          </button>
        </div>
      </div>

      <div className="w-full justify-center items-center mt-6 pb-4 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end border-b border-primary">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block mb-4 md:mb-0 text-primary">
              Company Details
            </span>
          </div>
          <form className="w-full">
            <div className="w-full">
              <InputComponent
                inputType="text"
                name="companyName"
                id="company"
                labelName="Company Name"
                labelColor="primary"
                placeholderName="Company Name"
                placeholderColor="secondary"
                textColor="text-dark"
                value={formData.companyName}
                onChange={(e) =>
                  handleFieldChange("companyName", e.target.value)
                }
                error={errors.companyName}
                errorMessage={errors.companyName}
                maxLength={50}
                minLength={2}
                required
                borderRadius="xl"
                activeBorderColor="blue"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="w-full justify-center items-center mt-8 pb-8 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block mb-4 md:mb-0 text-primary">
              Company User Details
            </span>
          </div>
          <form className="w-full">
            <div className="w-full">
              <InputComponent
                inputType="text"
                name="name"
                id="name"
                labelName="Full Name"
                labelColor="primary"
                placeholderName="Full Name"
                placeholderColor="secondary"
                textColor="text-dark"
                value={formData.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                error={errors.name}
                errorMessage={errors.name}
                maxLength={99}
                minLength={2}
                required
                borderRadius="xl"
                activeBorderColor="blue"
              />
            </div>
            <div className="w-full mt-6">
              <InputComponent
                inputType="text"
                name="email"
                id="email"
                labelName="Email ID"
                labelColor="primary"
                placeholderName="Email ID"
                placeholderColor="secondary"
                textColor="text-dark"
                value={formData.email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
                error={errors.email}
                required
                borderRadius="xl"
                activeBorderColor="blue"
                maxLength={99}
                minLength={5}
              />
            </div>

            <div className="w-full mt-6">
              <label htmlFor="phone" className="text-primary">
                Contact Number<span className="text-red-500 ml-1">*</span>
              </label>
              <PhoneInputWrapper
                phoneValues={phoneValues}
                PreferredCountryCodes={["91", "971"]}
                handlePhoneChange={(e) => {
                  setPhoneValues(e);
                  setErrors((prev) => ({ ...prev, phone: "" }));
                }}
                error={isPhoneNumberError}
                defaultCountryCode="91"
                setError={setIsPhoneNumberError}
              />
              {errors.phone && (
                <div className="flex items-center mt-1">
                  <CircleAlert color="red" />
                  <p className="text-red-500 text-sm ml-2">{errors.phone}</p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="w-full flex justify-end items-center mt-2">
        <div className="flex gap-2 w-fit">
          <Link
            id="companies-bottom"
            to="/companies"
            className="px-4 py-2 text-primary font-medium bg-main rounded-xl border hover:bg-hover border-primary whitespace-nowrap"
          >
            Cancel
          </Link>
          <button
            onClick={handleAddCompany}
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
            id="button-125"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCompany;
