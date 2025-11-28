import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useBrand } from "../BrandContext";
import useMutation from "../hooks/useMutation";
import ChangePassword from "./ChangePassword";

const FactorAuthentication = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { callApi } = useMutation();

  const { brand } = useBrand();
  const theme = document.body.getAttribute("theme") || "light";

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const location = useLocation();
  const email = location.state?.body;
  if (!email) {
    navigate("/");
    return;
  }
  const rememberMe = location.state?.rememberMe;

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState();
  const [isDisabled, setIsDisabled] = useState(false);
  const [notVerified, setnotVerified] = useState(false);

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
    setIsDisabled(true);
    const res = await callApi("/public/factor-auth-resendotp", "POST", {
      email,
    });
    if (res) {
      setTimer(15000);
    } else {
      setIsDisabled(false);
    }
  }

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1000);
      }, 1000);
    } else {
      setIsDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const validateOtp = () => {
    let errors = {};
    const otpString = otp.join("");

    if (otpString.trim() === "") {
      errors.message = "Kindly enter the OTP";
      toast.error("Kindly enter the OTP");
      console.log("Kindly enter the OTP");
      return errors;
    }

    if (otpString.length !== 4 || !/^\d+$/.test(otpString)) {
      console.log("OTP should be 4 characters long", otpString.length);
      toast.error("OTP should be 4 characters long");
      errors.message = "OTP should be 4 characters long";
    }
    return errors;
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpValidation = validateOtp();
    if (Object.keys(otpValidation).length > 0) return;

    const res = await callApi("/public/verifyotp", "POST", {
      email,
      otp: otp.join(""),
    });

    if (res) {
      if (!res.verified) {
        setnotVerified(true);
      }
      if (res.verified) {
        navigate("/");
      }
      if (res?.token) {
        login(res?.token, rememberMe);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").trim();
    if (/^\d{4}$/.test(pasteData)) {
      const newOtp = pasteData.split("").slice(0, 4);
      setOtp(newOtp);
      if (newOtp.length === 4) {
        inputRefs[3].current.focus();
      }
    }
  };

  return (
    <>
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

          {!notVerified ? (
            <div className="w-full sm:w-[68%] md:w-[60%] lg:w-[50%] xl:w-[45%] 2xl:w-[27%]">
              <div className="w-full flex flex-col justify-center gap-y-2">
                <h2 className="w-full text-center text-xl sm:text-2xl font-semibold text-dark mb-0.5">
                  Enter Your One-Time Password
                </h2>
                <p className="text-primary w-full text-center tracking-wide font-medium">
                  We've sent you a one-time password at{" "}
                  <strong>{email || "your email"}</strong>. Please enter that
                  code below.
                </p>
              </div>

              <form onSubmit={handleOtpSubmit} className="w-full mt-8">
                <div className="w-full flex justify-center items-center gap-4">
                  {inputRefs.map((inputRef, index) => (
                    <div key={index} className="relative">
                      <input
                        id={`input-${index}`}
                        key={index}
                        ref={inputRef}
                        inputMode="numeric"
                        maxLength="1"
                        className="w-[64px] h-[64px] bg-white border border-gray-400 rounded-xl focus:ring-0  focus:border focus:outline-none p-2 text-3xl  text-center font-medium "
                        value={otp[index]}
                        placeholder="0"
                        onChange={(e) => handleInputChange(index, e)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste} // Add this line
                        onBeforeInput={(e) => {
                          if (!/\d/.test(e.data)) {
                            e.preventDefault();
                          }
                        }}
                      />
                      {/* {!otp[index] && (
                        <img
                          src={OTPImg}
                          alt=""
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none size-10"
                        />
                      )} */}
                    </div>
                  ))}
                </div>

                <div className="w-full mt-6 flex justify-center mb-3">
                  <button
                    id="submit"
                    type="submit"
                    className={`w-full text-center text-white text-lg py-2 rounded-xl bg-custom-gradient hover:bg-custom-gradient-hover transition duration-300 ease-in-out`}
                  >
                    Continue
                  </button>
                </div>
                {/* <div className="mt-4 w-full flex justify-center">
                  <span className="w-full text-center">
                    <Link
                      id="cancel"
                      to="/"
                      className="pl-1 text-primary font-medium cursor-pointer"
                    >
                      Cancel
                    </Link>
                  </span>
                </div> */}
              </form>
              <div className="mt-3 w-full flex justify-center">
                {!timer && (
                  <span className="w-full text-center">
                    Didn’t receive the OTP?
                    <button
                      type="button"
                      id="resend-otp"
                      disabled={isDisabled}
                      onClick={handleResetPassword}
                      className="pl-1 text-darkblue cursor-pointer"
                    >
                      Resend OTP
                    </button>
                  </span>
                )}
              </div>
              <div className="mt-4 w-full flex justify-center">
                <span className="w-full text-center">
                  {/* Remember the Password?{" "} */}
                  <Link
                    id="back-to-login"
                    to="/"
                    className="pl-1 text-darkblue cursor-pointer"
                  >
                    Back to Login
                  </Link>
                </span>
              </div>
              {timer > 0 && (
                <div className="w-full flex flex-col justify-center gap-y-2">
                  <p className="text-primary w-full text-center tracking-wide font-medium 2xl:px-10">
                    Resend OTP in {timer / 1000} seconds
                  </p>
                </div>
              )}
            </div>
          ) : (
            <ChangePassword email={email} setnotVerified={setnotVerified} />
          )}
        </div>
      </div>
    </>
  );
};

export default FactorAuthentication;
