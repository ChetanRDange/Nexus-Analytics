import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CircleAlert, Loader } from "lucide-react";
import InputComponent from "../Components/InputComponent";
import toast from "react-hot-toast";
import useMutation from "../hooks/useMutation";
import useFetch from "../hooks/useFetch";
import PhoneInputWrapper from "./../Components/PhoneInputWrapper";
import jsonPhoneData from "../utils/PhoneInputNewProcessed.json";

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

const EditCompanyUser = () => {
  const { callApi, isLoading } = useMutation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isScrollable] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
  });
  const [phoneValues, setPhoneValues] = useState({
    number: "",
    countryCode: "91",
    tempCountryCode: "91",
    editNumber: "",
  });
  const [isPhoneNumberError, setIsPhoneNumberError] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value?.trim()) return "Full Name is required";
        if (!/^[a-zA-Z\s]*$/.test(value))
          return "Full Name should only contain letters and spaces";
        if (value.length < 2) return "Minimum 2 characters required";
        return "";
      case "email":
        if (!value?.trim()) return "Email ID is required";
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
          return "Please enter a valid Email ID";
        return "";
    }
  };

  const handleFieldChange = (name, value) => {
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    if (name === "name" || name === "email") {
      setUserDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const { data: companyUserDetails } = useFetch(
    `/private/companies/getCompanyUser/${id}`
  );

  useEffect(() => {
    if (companyUserDetails?.data) {
      setUserDetails({
        name: companyUserDetails?.data?.name || "",
        email: companyUserDetails?.data?.email || "",
      });

      // Safely handle phoneCode conversion
      if (
        companyUserDetails?.data?.phoneCode &&
        companyUserDetails?.data?.phone
      ) {
        const phoneCode = String(companyUserDetails?.data?.phoneCode);
        setPhoneValues({
          number: companyUserDetails?.data?.phone,
          countryCode: phoneCode.startsWith("+")
            ? phoneCode.slice(1)
            : phoneCode,
          tempCountryCode: phoneCode.startsWith("+")
            ? phoneCode.slice(1)
            : phoneCode,
          editNumber: companyUserDetails?.data?.phone,
        });
      }
    }
  }, [companyUserDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameError = validateField("name", userDetails.name);
    const emailError = validateField("email", userDetails.email);
    const phoneError = validatePhone(phoneValues);

    setErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
    });

    if (nameError || emailError || phoneError) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    const submitData = {
      ...userDetails,
      phone: phoneValues.number,
      phoneCode: `+${phoneValues.countryCode}`,
    };

    const res = await callApi(
      `/private/companies/companyUser/${id}`,
      "PUT",
      submitData
    );
    if (res) navigate("/company-users", { replace: true });
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="py-8 p-4 sm:p-5 overflow-x-hidden mb-20">
        <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-wrap justify-between items-center   ">
          <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
            Edit Company User
          </h4>

          <div className="flex gap-2">
            <Link
              id="cancel"
              to="/company-users"
              className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
            >
              Cancel
            </Link>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
              id="button-142"
            >
              Update
            </button>
          </div>
        </div>

        <div className="pb-36">
          <div
            className={`w-full justify-center items-center mt-5 md:mt-8 mb-5 pb-12 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end`}
          >
            <div className="w-full  flex flex-col gap-y-2 md:flex-row gap-2 justify-start items-start">
              <div className="w-full md:w-1/4">
                <span className=" text-primary">User Details Section:</span>
              </div>
              <div className="w-full sm:w-[90%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
                <InputComponent
                  inputType="text"
                  name="userName"
                  id="userName"
                  labelName="Full Name"
                  labelColor="primary"
                  placeholderName="Full Name"
                  placeholderColor="secondary"
                  textColor="text-dark"
                  borderRadius="xl"
                  activeBorderColor="blue"
                  value={userDetails?.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  error={!!errors.name}
                  errorMessage={errors.name}
                  maxLength={50}
                  minLength={2}
                  required
                />

                <InputComponent
                  mt="5"
                  inputType="email"
                  name="adminEmail"
                  id="adminEmail"
                  labelName="Email ID"
                  labelColor="primary"
                  placeholderName="Email ID"
                  placeholderColor="secondary"
                  textColor="text-dark"
                  borderRadius="xl"
                  activeBorderColor="blue"
                  value={userDetails?.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  error={!!errors.email}
                  errorMessage={errors.email}
                  required
                  maxLength={45}
                  minLength={5}
                />

                <div className="w-full mt-5">
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
                      <p className="text-red-500 text-sm ml-2">
                        {errors.phone}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {isScrollable && (
          <div className="w-full flex justify-end items-center gap-4 pt-8 border-t border-primary">
            <Link
              id="cancel-1"
              to="/admin-users"
              className="px-4 py-2 text-primary font-medium hover:bg-hover bg-main rounded-xl border border-primary whitespace-nowrap"
            >
              Cancel
            </Link>
            <button
              className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
              id="button-143"
            >
              Add
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default EditCompanyUser;
