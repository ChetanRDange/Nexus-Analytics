import React, { useState } from "react";
import { Link } from "react-router-dom";
import TaskManager from "../assets/images/app-logo.png";
import ErrorIcon from "../assets/svgs/alertcircle.svg";
import PhoneInput from "react-phone-input-2";
import ShowPass from "../assets/svgs/settings/passshow.svg";
import HidePass from "../assets/svgs/settings/hidepass.svg";

import "react-phone-input-2/lib/style.css";
import {
  full_name_error,
  email_already_registred_error,
  valid_email_address_error,
  pass_error,
  company_name_error,
  pass_symbol_missing_error,
  valid_phone_number_error,
} from "../Components/AllError";

const Register2 = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cName: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let errors = {};
    if (!formData.name.trim()) {
      errors.name = "This field is required. ";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      errors.name = "Full Name should only contain alphabets and spaces";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email ID is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.cName.trim()) {
      errors.cName = "This field is required. ";
    } else if (!/^[A-Za-z\s]+$/.test(formData.cName.trim())) {
      errors.cName =
        "Company Name should only contain letters and spaces, no digits or special symbols.";
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      errors.phone = "Please enter a valid phone number.";
    }

    if (!formData.password) {
      errors.password =
        "Use at least 8 characters, including uppercase, lowercase, a number, and a special symbol.";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      errors.password = "Add a special symbol to your password.";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(
        formData.password
      )
    ) {
      errors.password = "";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted successfully", formData);
      window.location.href = "/email-verification";
    }
  };

  return (
    <div className="w-full h-full py-8 px-3 sm:p-5">
      <div className="w-full flex gap-2 items-center">
        <span>
          <img src={TaskManager} alt="TaskManager" />
        </span>
      </div>

      <div className="py-10 mt-8 w-full h-full flex justify-center items-center">
        <div className="w-full sm:w-[68%] md:w-[60%] lg:w-[50%] xl:w-[45%] 2xl:w-[27%]">
          <div className="w-full flex flex-col justify-center gap-y-2">
            <h2 className="w-full text-center text-3xl sm:text-4xl font-semibold text-dark mb-0.5">
              Create your account
            </h2>
            <p className="text-primary w-full text-center tracking-wide font-medium">
              Please fill the details below to get started.
            </p>
          </div>

          <form className="w-full mt-8" onSubmit={handleSubmit}>
            <div className="w-full mt-3">
              <label className="text-primary">Full Name</label>
              <div className="relative">
                <input
                  htmlFor="name"
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className={`w-full mt-1 rounded-xl border py-2.5 placeholder:text-gray-400 text-primary placeholder:tracking-wide focus:ring-0 focus:outline-none focus:border px-3 ${
                    errors.name
                      ? "border-fadered focus:border-fadered"
                      : "border-primary focus:border-fadedblue"
                  }`}
                />
                {errors.name && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <img src={ErrorIcon} alt="" />
                  </div>
                )}
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm">
                  {errors.name}

                  {/* full_name_error  */}
                </p>
              )}
            </div>

            <div className="w-full mt-4">
              <label htmlFor="email" className="text-primary">
                Email ID
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email ID"
                  className={`w-full mt-1 rounded-xl border py-2.5 placeholder:text-gray-400 text-primary placeholder:tracking-wide focus:ring-0 focus:outline-none focus:border px-3 ${
                    errors.email
                      ? "border-fadered focus:border-fadered"
                      : "border-primary focus:border-fadedblue"
                  }`}
                />
                {errors.email && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <img src={ErrorIcon} alt="" />
                  </div>
                )}
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email}
                  {/* 
                email_already_registred_error
                valid_email_address_error */}
                </p>
              )}
            </div>

            <div className="w-full mt-4">
              <label htmlFor="cName" className="text-primary">
                Company Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="cName"
                  id="cName"
                  value={formData.cName}
                  onChange={handleInputChange}
                  placeholder="Company Name"
                  className={`w-full mt-1 rounded-xl border py-2.5 placeholder:text-secondary text-primary placeholder:tracking-wide focus:ring-0 focus:outline-none focus:border px-3 ${
                    errors.name
                      ? "border-fadered focus:border-fadered"
                      : "border-primary focus:border-fadedblue"
                  }`}
                />
                {errors.cName && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <img src={ErrorIcon} alt="" />
                  </div>
                )}
              </div>
              {errors.cName && (
                <p className="text-red-500 text-sm">
                  {errors.cName}
                  {/* company_name_error */}
                </p>
              )}
            </div>

            <div className="w-full mt-4">
              <label htmlFor="phone" className="text-primary">
                Phone Number
              </label>
              <div
                className={`relative mt-2 rounded-xl ${
                  isFocused ? " border border-fadedblue" : ""
                }`}
              >
                <PhoneInput
                  id="number"
                  className="focus:outline-none"
                  preferredCountries={["in"]}
                  placeholder="+91 12345-67890"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  buttonStyle={{
                    borderTop: isFocused ? "none" : "1px solid #D1D5DB",
                    borderBottom: isFocused ? "none" : "1px solid #D1D5DB",
                    borderLeft: isFocused ? "none" : "1px solid #D1D5DB",
                    borderRight: isFocused
                      ? "1px solid #D1D5DB"
                      : "1px solid #D1D5DB",
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "0px",
                    borderTopLeftRadius: "12px",
                    borderBottomLeftRadius: "12px",
                    width: isFocused ? "51px" : "52px",
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
                    border: isFocused ? "none" : "1px solid #D1D5DB",
                    marginLeft: "15px",
                    color: "#374151",
                    width: "97.1%",
                    height: isFocused ? "46px" : "48px",
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
                {errors.phone && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <img src={ErrorIcon} alt="" />
                  </div>
                )}
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm">
                  {errors.phone}
                  {/* valid_phone_number_error */}
                </p>
              )}
            </div>

            <div className="w-full mt-4">
              <label htmlFor="password" className="text-primary">
                Password
              </label>
              <div className="w-full">
                <div className="relative w-full mb-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`w-full border py-2.5 px-3 placeholder:text-base rounded-xl focus:ring-0 focus:outline-0 focus:border mt-1 ${
                      errors.password
                        ? "border-fadered focus:border-fadered"
                        : "border-primary focus:border-fadedblue"
                    }`}
                    placeholder="Password"
                    maxLength={18}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />

                  <div
                    className="absolute inset-y-0 right-0 pr-3 mt-2  flex items-center text-sm leading-5 text-secondary cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <img
                      src={showPassword ? HidePass : ShowPass}
                      alt="toggle password visibility"
                    />
                  </div>
                </div>

                {errors.password ? (
                  <p className="text-red-500 text-sm">
                    {errors.password}
                    {/* pass_error
                  
                  pass_symbol_missing_error
                  */}
                  </p>
                ) : (
                  <p className="mt-2 w-full text-secondary font-normal">
                    Use at least 8 characters, including uppercase, lowercase, a
                    number, and a special symbol.
                  </p>
                )}
              </div>
            </div>

            <div className="w-full mt-6 flex justify-center mb-3">
              <button // to='/email-verification'
                type="submit"
                className={`w-full text-center text-white text-lg py-2 rounded-xl  bg-custom-gradient hover:bg-custom-gradient-hover transition duration-300 ease-in-out`}
                id="button-279"
              >
                Create Account
              </button>
            </div>
            <div className="mt-2 w-full flex justify-center">
              <span className="w-full text-center">
                Already have an account?{" "}
                <Link to="/" className="pl-1 text-darkblue cursor-pointer">
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register2;
