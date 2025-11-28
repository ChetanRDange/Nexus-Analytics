import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputComponent from "../Components/InputComponent";
import useMutation from "../hooks/useMutation";
import toast from "react-hot-toast";
import { validateEmail, validatePassword } from "../utils/Validators";
import { useBrand } from "../BrandContext";
import { Eye, EyeOff } from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [timer, setTimer] = useState();
  const [step, setStep] = useState("email");
  const [isDisabled, setIsDisabled] = useState(false);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [otp, setOtp] = useState(["", "", "", ""]);
  const { brand } = useBrand();
  const theme = document.body.getAttribute("theme") || "light";
  const { callApi } = useMutation();
  const [email, setEmail] = useState("");

  console.log(email);
  const validate = (email) => {
    const errors = {};

    if (!email) {
      errors.email = "Email Id is required.";
    } else if (!validateEmail(email)) {
      errors.email = "Email Id must be in the correct format.";
    }

    return errors;
  };

  async function handleForgotPassword(e) {
    e.preventDefault();
    const errors = validate(email);
    if (Object.keys(errors).length > 0) {
      toast.error(errors.email);
      return;
    }
    const res = await callApi("/public/forgotPass", "POST", { email });
    if (res) setStep("otp");
  }

  useEffect(() => {
    inputRefs[0].current?.focus();
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
    if (res) setStep("password");
  };

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

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    const isValidPassword = validatePassword(newPassword);
    const isValidConfirmPassword = validatePassword(confirmPassword);
    if (!newPassword.trim() || !confirmPassword.trim()) {
      toast.error("Password is required");
      return;
    }
    if (!isValidPassword || !isValidConfirmPassword) {
      toast.error(
        "Please type the password with 8 Characters, 1 Uppercase, 1 Lowercase, 1 Special Symbol & 1 number"
      );
      toast.error(
        "Please type the password with 8 Characters, 1 Uppercase, 1 Lowercase, 1 Special Symbol & 1 number"
      );
      return;
    } else if (newPassword !== confirmPassword) {
      toast.error("Password doesn't match");
      return;
    }
    const res = await callApi("/public/resetpassword", "POST", {
      email: email,
      password: newPassword,
    });
    if (res) navigate("/");
  };

  return (
    <div className="w-full h-full py-8 px-3 sm:p-5">
      {step === "email" && (
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
                Forgot Password?
              </h2>
              <p className="text-primary w-full text-center tracking-wide font-medium 2xl:px-10">
                Don&apos;t worry! We will send you a OTP to reset your password.
              </p>
            </div>

            <form onSubmit={handleForgotPassword} className="w-full mt-8">
              <div className="w-full mt-4">
                <InputComponent
                  onChange={(e) => setEmail(e.target.value)}
                  inputType="email"
                  name="email"
                  id="email"
                  labelName="Email ID"
                  labelColor="primary"
                  placeholderName="Email ID"
                  placeholderColor="secondary"
                  textColor="text-secondary"
                  borderRadius="xl"
                  activeBorderColor="blue"
                />
              </div>

              <div className="w-full mt-6 flex justify-center mb-3">
                <button
                  id="submit"
                  type="submit"
                  className={`w-full text-center text-white text-lg py-2 rounded-xl bg-custom-gradient hover:bg-custom-gradient-hover transition duration-300 ease-in-out`}
                >
                  Send Reset OTP
                </button>
              </div>
              <div className="mt-2 w-full flex justify-center">
                <Link
                  id="back-to-login"
                  to="/"
                  className="w-full text-center text-darkblue cursor-pointer"
                >
                  Back To Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
      {step === "otp" && (
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
                  <div className="relative" key={`input-container-${index}`}>
                    <input
                      type="number"
                      id={`input-${index}`}
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
      )}
      {step === "password" && (
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
                {/* <img src={Change} alt="" className="h-14 w-14 mb-3 m-auto" /> */}
                <h2 className="w-full text-center text-3xl sm:text-4xl font-semibold text-dark mb-0.5">
                  Change Password
                </h2>
                <p className="text-primary w-full text-center tracking-wide font-medium">
                  Try changing your password regularly to make your account
                  safer.
                </p>
              </div>

              <form onSubmit={handleSubmitPassword} className="w-full mt-8">
                <div className="relative w-full mt-4">
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
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    borderRadius="xl"
                    activeBorderColor="blue"
                  />

                  <div
                    className="absolute inset-y-0 right-0 pr-3 mt-8  flex items-center text-sm leading-5 text-gray-400 cursor-pointer"
                    onClick={() => setShowPassword1(!showPassword1)}
                  >
                    {showPassword2 ? <Eye size={18} /> : <EyeOff size={18} />}
                  </div>
                </div>

                <div className="relative w-full mt-4">
                  <InputComponent
                    inputType={showPassword2 ? "text" : "password"}
                    maxLength={18}
                    name="password"
                    id="password"
                    labelName=" Confirm Password"
                    labelColor="primary"
                    placeholderName=" Confirm Password"
                    placeholderColor="secondary"
                    textColor="text-dark"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    borderRadius="xl"
                    activeBorderColor="blue"
                  />

                  <div
                    className="absolute inset-y-0 right-0 pr-3 mt-8  flex items-center text-sm leading-5 text-gray-400 cursor-pointer"
                    onClick={() => setShowPassword2(!showPassword2)}
                  >
                    {showPassword2 ? <Eye size={18} /> : <EyeOff size={18} />}
                  </div>
                </div>

                <hr className="h-0.5 px-0 bg-darkgray my-5" />

                <div className="w-full mt-6 flex justify-end gap-3">
                  <Link
                    id="cancel"
                    to="/"
                    className={`w-auto text-center text-black text-md py-2 px-4  bg-white rounded-xl border border-primary hover:bg-gray-50 transition duration-300 ease-in-out`}
                  >
                    Cancel
                  </Link>
                  <button
                    id="submit"
                    type="submit"
                    className={`w-auto text-center text-white text-md py-2 px-4 rounded-xl  bg-primary hover:bg-primarydark transition duration-300 ease-in-out`}
                  >
                    Save
                  </button>
                </div>
                <div className="mt-4 w-full flex justify-center">
                  <span className="w-full text-center">
                    <Link
                      id="back-to-login"
                      to="/"
                      className="pl-1 text-darkblue cursor-pointer"
                    >
                      Back to Login
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
