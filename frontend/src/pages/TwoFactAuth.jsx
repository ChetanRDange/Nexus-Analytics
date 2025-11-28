import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TaskManager from "../assets/images/app-logo.png";
import OTPImg from "../assets/svgs/otp.svg";
import useMutation from "../hooks/useMutation";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../AuthContext";
import {
  invalid_credential_error,
  second_attempt_error,
  third_attempt_error,
} from "../Components/AllError";

const TwoFactAuth = () => {
  const { login } = useAuth();
  const { callApi } = useMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [attempts, setAttempts] = useState(0); //
  const [notVerified, setnotVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    inputRefs[0].current.focus();
  }, []);

  const handleInputChange = (index, e) => {
    const { value } = e.target;
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        if (index > 0) {
          const newOtp = [...otp];
          newOtp[index - 1] = "";
          setOtp(newOtp);
          inputRefs[index - 1].current.focus();
        }
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleOtpSubmit(e);
    }
  };

  const validateOtp = () => {
    let errors = {};
    const otpString = otp.join("");
    if (otpString.length !== 6 || !/^\d+$/.test(otpString)) {
      console.log("OTP should be 6 characters long...", otpString.length);
      toast.error("OTP should be 6 characters long...");
      errors.message = "OTP should be 6 characters long...";
    }
    return errors;
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpValidation = validateOtp();
    if (Object.keys(otpValidation).length > 0) return;
    const res = await callApi("/public/gAuth", "POST", {
      email: location.state?.body,
      code: otp.join(""),
    });
    if (res) login(res?.token);
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
              Two Factor Authentication
            </h2>
            <p className="text-primary w-full text-center tracking-wide font-medium 2xl:px-10">
              Enter the OTP from your authenticator app
            </p>
          </div>

          <form className="w-full mt-8">
            <div className="w-full flex justify-center items-center gap-4">
              {inputRefs.map((inputRef, index) => (
                <div className="relative" key={index}>
                  <input
                    id={`input-${index}`}
                    type="number"
                    ref={inputRef}
                    inputMode="numeric"
                    maxLength="1"
                    className={`w-[64px] h-[64px] bg-white border rounded-xl focus:ring-0 focus:outline-none p-2 text-2xl text-center font-medium placeholder-transparent ${
                      errorMessage ? "border-fadered" : "border-primary"
                    }`}
                    value={otp[index]}
                    onChange={(e) => handleInputChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onKeyPress={handleKeyPress}
                    disabled={isLocked} // Disable input if locked
                  />
                  {!otp[index] && (
                    <img
                      src={OTPImg}
                      alt=""
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    />
                  )}
                </div>
              ))}
            </div>
            {errorMessage && (
              <p className="text-[#F04438] w-full mt-2 text-center tracking-wide font-medium">
                {errorMessage}
              </p>
            )}

            <div className="w-full mt-8 flex justify-center mb-3">
              <button
                to="/profile"
                className={`w-full text-center text-white text-lg py-2 rounded-xl bg-custom-gradient hover:bg-custom-gradient-hover transition duration-300 ease-in-out`}
                onClick={handleOtpSubmit}
                id="button-295"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TwoFactAuth;
