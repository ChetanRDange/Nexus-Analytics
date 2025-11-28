import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import TaskManager from "../assets/images/app-logo.png";
import { code_error } from "../Components/AllError";
import OTPImg from "../assets/svgs/otp.svg";

const EmailVerification = () => {
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
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
              Verify your email
            </h2>
            <p className="text-primary w-full text-center tracking-wide font-medium">
              Enter the 4 - digit OTP we just sent to johndoe@gmail.com to
              continue.
            </p>
          </div>

          <form className="w-full mt-8">
            <div className="w-full flex justify-center items-center gap-4">
              {inputRefs.map((inputRef, index) => (
                <div className="relative">
                  <input
                    type="number"
                    key={index}
                    ref={inputRef}
                    inputMode="numeric"
                    maxLength="1"
                    className="w-[64px] h-[64px] bg-white border border-gray-400 rounded-xl focus:ring-0 focus:border focus:outline-none p-2 text-2xl text-center font-medium placeholder-transparent"
                    value={otp[index]}
                    onChange={(e) => handleInputChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onKeyPress={handleKeyPress}
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
            {/* code_error */}
            <div className="w-full mt-8 flex justify-center mb-3">
              <Link
                id="continue"
                to="/register"
                className={`w-full text-center text-white text-lg py-2 rounded-xl bg-custom-gradient hover:bg-custom-gradient-hover transition duration-300 ease-in-out`}
              >
                Continue
              </Link>
            </div>
            <div className="mt-4 w-full flex justify-center">
              <span className="w-full text-center">
                Didn’t receive the OTP?{" "}
                <Link
                  id="resend-otp"
                  to="/"
                  className="pl-1 text-darkblue cursor-pointer"
                >
                  Resend OTP
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
