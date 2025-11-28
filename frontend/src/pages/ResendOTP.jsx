import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TaskManager from "../assets/images/app-logo.png";
import OTPImg from "../assets/svgs/otp.svg";
import useStore from "../state/store";
import toast from "react-hot-toast";
import useMutation from "../hooks/useMutation";
import { useNavigate, useLocation } from "react-router-dom";
import { useBrand } from "../BrandContext";
const ResendOTP = () => {
  const navigate = useNavigate();
  const { brand } = useBrand();
  const theme = document.body.getAttribute("theme") || "light";
  const location = useLocation();
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const email = location.state.body;
  const [timer, setTimer] = useState();
  const { callApi } = useMutation();
  const [isDisabled, setIsDisabled] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
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
  async function handleResetPassword(e) {
    e.preventDefault();
    const res = await callApi("/public/resendotp", "POST", { email });
    if (res) setTimer(15000);
  }

  const validateOtp = () => {
    let errors = {};
    const otpString = otp.join("");
    if (otpString.length !== 4 || !/^\d+$/.test(otpString)) {
      console.log("OTP should be 4 characters long...", otpString.length);
      toast.error("OTP should be 4 characters long...");
      errors.message = "OTP should be 4 characters long...";
    }
    return errors;
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpValidation = validateOtp();
    if (Object.keys(otpValidation).length > 0) return;
    const res = await callApi("/public/verifyForgotOtp", "POST", {
      email,
      otp: otp.join(""),
    });
    if (res) navigate("/change-forgot-password", { state: { body: email } });
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1000);
      }, 1000);
    } else {
      setIsDisabled(false); // Re-enable the button when the timer ends
    }

    return () => clearInterval(interval); // Clean up the interval
  }, [timer]);

  return (
    <div className="w-full h-full py-8 px-3 sm:p-5">
      <div className="py-10 mt-8 w-full h-full flex flex-col justify-center items-center">
        <span>
          {brand && (
            <img
              src={
                theme === "light"
                  ? brand.lightLogo || brand.darkLogo || Leadsmagix
                  : brand.darkLogo || brand.lightLogo || Leadsmagix
              }
              alt="Leadsmagix"
              className="size-52"
            />
          )}
        </span>
        <div className="w-full sm:w-[68%] md:w-[60%] lg:w-[50%] xl:w-[45%] 2xl:w-[27%]">
          <div className="w-full flex flex-col justify-center gap-y-2">
            <h2 className="w-full text-center text-3xl sm:text-4xl font-semibold text-dark mb-0.5">
              Check your inbox
            </h2>
            <p className="text-primary w-full text-center tracking-wide font-medium 2xl:px-10">
              If your Email ID is registered then enter the 4 - digit OTP we
              just sent to reset your password.
            </p>
          </div>

          <form onSubmit={handleOtpSubmit} className="w-full mt-8">
            <div className="w-full flex justify-center items-center gap-4">
              {inputRefs.map((inputRef, index) => (
                <div className="relative">
                  <input
                    type="number"
                    id={`input-${index}`}
                    key={index}
                    ref={inputRef}
                    inputMode="numeric"
                    maxLength="1"
                    placeholder="0"
                    className="w-[64px] h-[64px] bg-white border border-gray-400 rounded-xl focus:ring-0 focus:border focus:outline-none p-2 text-2xl text-center font-medium placeholder:text-2xl"
                    value={otp[index]}
                    onChange={(e) => handleInputChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                  />
                </div>
              ))}
            </div>

            <div className="w-full mt-8 flex justify-center mb-3">
              <button
                id="submit"
                type="submit"
                className={`w-full text-center text-white text-lg py-2 rounded-xl  bg-custom-gradient hover:bg-custom-gradient-hover transition duration-300 ease-in-out`}
              >
                Continue
              </button>
            </div>
            <div className="mt-2 w-full flex justify-center">
              <span className="w-full text-center">
                Didn’t receive the OTP?
                <button
                  id="resend-otp"
                  disabled={isDisabled}
                  onClick={handleResetPassword}
                  className="pl-1 text-darkblue cursor-pointer"
                >
                  Resend OTP
                </button>
              </span>
            </div>
            {timer > 0 && (
              <div className="w-full flex flex-col justify-center gap-y-2">
                <p className="text-primary w-full text-center tracking-wide font-medium 2xl:px-10">
                  Resend OTP in {timer / 1000} seconds
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResendOTP;
