import React, { useState } from "react";
import TaskManager from "../assets/images/app-logo.png";
import { Link } from "react-router-dom";
import ShowPass from "../assets/svgs/settings/passshow.svg";
import HidePass from "../assets/svgs/settings/hidepass.svg";
import InputComponent from "../Components/InputComponent";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword1, setShowPassword1] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [showPassword2, setShowPassword2] = useState(false);

  const validatePassword = (pwd) => {
    const minLength = pwd.length >= 8;
    const hasUppercase = /[A-Z]/.test(pwd);
    const hasLowercase = /[a-z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

    return (
      minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar
    );
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (validatePassword(newPassword)) {
      setShowHint(false);
    } else {
      setShowHint(true);
    }
  };

  return (
    <div className="w-full h-full py-8 px-3 sm:p-5">
      <div className="w-full flex gap-2 items-center">
        <span>
          <img src={TaskManager} alt="TaskManager" />
        </span>
      </div>

      <div className="py-10 mt-2 w-full h-full flex justify-center items-center">
        <div className="w-full sm:w-[68%] md:w-[60%] lg:w-[50%] xl:w-[45%] 2xl:w-[27%]">
          <div className="w-full flex flex-col justify-center gap-y-2">
            <h2 className="w-full text-center text-3xl sm:text-4xl font-semibold text-dark mb-0.5">
              Reset Password?
            </h2>
            <p className="text-primary w-full text-center tracking-wide font-medium">
              Create new password and you are good to go.
            </p>
          </div>

          <form className="w-full mt-8">
            <div className="w-full mt-4">
              <div className="relative items-center w-full ">
                <InputComponent
                  inputType={showPassword1 ? "text" : "password"}
                  maxLength={18}
                  name="password"
                  id="password"
                  labelName="New Password"
                  labelColor="primary"
                  placeholderName="New Password"
                  placeholderColor="secondary"
                  textColor="text-dark"
                  onChange={handlePasswordChange}
                  borderRadius="xl"
                  activeBorderColor="blue"
                />

                <div
                  className="absolute inset-y-0 right-0 pr-3 mt-8  flex items-center text-sm leading-5 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword1(!showPassword1)}
                >
                  <img
                    src={showPassword1 ? HidePass : ShowPass}
                    alt="toggle password visibility"
                  />
                </div>
              </div>
              {showHint && (
                <p className="w-full text-left text-secondary font-normal mt-1">
                  Use at least 8 characters, including uppercase, lowercase, a
                  number, and a special symbol.
                </p>
              )}
              {errors.password && (
                <div className="mt-2 text-red-500 text-sm font-normal">
                  {errors.password}
                </div>
              )}
            </div>

            <div className="w-full mt-4">
              <div className="relative items-center w-full ">
                <InputComponent
                  inputType={showPassword2 ? "text" : "password"}
                  maxLength={18}
                  name="confirmPassword"
                  id="confirmPassword"
                  labelName="Confirm Password"
                  labelColor="primary"
                  placeholderName="Confirm Password"
                  placeholderColor="secondary"
                  textColor="text-dark"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  borderRadius="xl"
                  activeBorderColor="blue"
                />

                <div
                  className="absolute inset-y-0 right-0 pr-3 mt-8  flex items-center text-sm leading-5 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword2(!showPassword2)}
                >
                  <img
                    src={showPassword2 ? HidePass : ShowPass}
                    alt="toggle password visibility"
                  />
                </div>
              </div>
              {password !== confirmPassword && (
                <p className="w-full text-left text-secondary text-[14px] font-normal mt-1">
                  Re-type the new created password.
                </p>
              )}
              {errors.password && (
                <div className="mt-2 text-red-500 text-sm font-normal">
                  {errors.password}
                </div>
              )}
            </div>

            <div className="w-full mt-6 flex justify-center">
              <Link
                id="reset-password"
                to="/register"
                className={`w-full text-center text-white text-lg py-2 rounded-xl  bg-custom-gradient hover:bg-custom-gradient-hover transition duration-300 ease-in-out`}
              >
                Reset Password
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
