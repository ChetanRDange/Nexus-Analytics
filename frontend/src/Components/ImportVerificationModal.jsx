import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import QRCode from "../assets/svgs/qr.svg";
import Success from "../assets/svgs/admin/success.svg";
import Sms from "../assets/svgs/admin/sms.svg";
import Registerr from "../assets/svgs/admin/register.svg";
import Googlee from "../assets/svgs/admin/google.svg";
import CopyImg from "../assets/svgs/admin/copy.svg";
import Close from "../assets/svgs/close.svg";
import toast from "react-hot-toast";
import useMutation from "../hooks/useMutation";
const ImportVerificationModal = ({
  isImportVerificationModalOpen,
  setIsImportVerificationModalOpen,
}) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isSmsModalOpen, setIsSmsModalOpen] = useState(false);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [isBackupcodeOpen, setIsBackupcodeOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [qrImage, setQrImage] = useState("");
  const { callApi } = useMutation();

  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const backupCodes = [
    "8F32-7A9D",
    "A9E4-1B8C",
    "B4C5-9E3F",
    "7E23-5D1A",
    "C9A8-6B3E",
    "D5E2-7C8A",
    "F3B7-9D4E",
    "A7C4-8B9F",
  ];

  const [copySuccess, setCopySuccess] = useState("");

  const handleCopyAllClick = () => {
    const codesToCopy = backupCodes.join("\n");

    navigator.clipboard
      .writeText(codesToCopy)
      .then(() => {
        setCopySuccess("All backup codes copied!");
      })
      .catch((error) => {
        setCopySuccess("Failed to copy");
      });
  };

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

  console.log("otp", otp);

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

  if (!isImportVerificationModalOpen) return null;

  const handleContinue = async () => {
    const res = await callApi("/private/user/gAuth", "POST");
    if (res) {
      setQrImage(res?.data);
      setIsGoogleModalOpen(true);
    }
  };

  const handleSendOtp = () => {
    setIsOtpModalOpen(true);
  };
  const handleRegitser = () => {
    setIsRegisterModalOpen(true);
  };
  const handleVerify = async () => {
    const sendOtp = otp.join("");
    const res = await callApi(`/private/user/gAuth`, "PUT", { code: sendOtp });
    if (res) {
      setIsVerifyOpen(true);
    }
  };

  const handleBackupCode = () => {
    setIsBackupcodeOpen(true);
  };

  const handleSuccess = () => {
    setIsSuccessModalOpen(true);
  };

  const handleClose = () => {
    setIsOtpModalOpen(false);
    setIsVerifyOpen(false);
    setIsBackupcodeOpen(false);
    setIsSuccessModalOpen(false);
    setIsSmsModalOpen(false);
    setIsGoogleModalOpen(false);
    setIsImportVerificationModalOpen(false);
  };
  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"
          onClick={() => setIsImportVerificationModalOpen(false)}
        ></div>
        <div className="flex items-start py-5 justify-center w-full min-h-screen px-4 text-center lg:absolute lg:top-[12%] ">
          <form
            className={`bg-[#FFFFFF] rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-[95%] sm:w-[80%] md:w-[75%] lg:w-[70%] xl:w-[664px] 2xl:w-[664px] px-6 2xl:px-8 py-10 ${
              isSmsModalOpen || isGoogleModalOpen ? "hidden" : ""
            }`}
          >
            <div className="w-full flex flex-col justify-between items-center ">
              <div className="flex justify-between items-center w-full mb-4">
                <span className="text-primary font-semibold text-xl mx-auto">
                  One-Time Password Preferences
                </span>

                <button
                  onClick={() => setIsImportVerificationModalOpen(false)}
                  className="flex justify-end"
                  id="button-67"
                >
                  <img src={Close} alt="" />
                </button>
              </div>

              <label className="w-full text-secondary font-medium my-5 px-4 text-sm text-center">
                Every time you log in, you will be given a one-time password.
                How would you prefer to receive one-time passcodes?
              </label>
            </div>

            <div className="w-full">
              <div className="w-full flex flex-col gap-y-2 ">
                <div className="w-full flex flex-col sm:flex-row gap-6 justify-between my-2">
                  <div className="w-full flex flex-col gap-3 ">
                    <Link
                      id="link-1"
                      className={`w-full flex gap-4 sm:gap-3 text-center items-center justify-center py-5 rounded-xl border ${
                        selectedMethod === "google"
                          ? "bg-fadedblue"
                          : "bg-white hover:bg-fadedblue"
                      } border-[#2563EB]`}
                      onClick={() => setSelectedMethod("google")}
                    >
                      <span>
                        <img src={Googlee} alt="" />
                      </span>
                      <span className="whitespace-nowrap text-primary text-sm sm:text-base">
                        Use Google <br />
                        Authenticator App
                      </span>
                    </Link>
                    <p className="w-full text-secondary font-medium text-xs px-2 text-center">
                      One-time passcodes are generated by the mobile app.
                    </p>
                  </div>

                  <div className="w-full flex flex-col gap-3 ">
                    <Link
                      id="link-2"
                      className={`w-full flex gap-4 sm:gap-3 text-center items-center justify-center py-5 rounded-xl border ${
                        selectedMethod === "sms"
                          ? "bg-fadedblue"
                          : "bg-white hover:bg-fadedblue"
                      } border-[#2563EB]`}
                      onClick={() => setSelectedMethod("sms")}
                    >
                      <span>
                        <img src={Sms} alt="" />
                      </span>
                      <span className="whitespace-nowrap  text-primary text-sm sm:text-base">
                        Use SMS <br />
                        Text Messaging
                      </span>
                    </Link>
                    <p className="w-full text-secondary font-medium text-xs px-2 text-center">
                      One-time passcodes will be sent to your mobile phone as a
                      text.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full mt-6 flex flex-col gap-y-6 justify-center">
                <Link
                  id="link-3"
                  onClick={handleContinue}
                  className="w-full px-4 py-2  text-white text-center font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap items-center"
                >
                  Continue
                </Link>
              </div>
            </div>
          </form>
        </div>

        {/* Google PopUp */}

        {isGoogleModalOpen && (
          <div
            className={`fixed inset-0 z-20 overflow-y-auto ${
              isVerifyOpen ? "hidden" : ""
            }`}
          >
            <div className="flex items-start py-5 justify-center w-full min-h-screen px-4 text-center lg:absolute lg:top-[12%]">
              <form className="bg-[#FFFFFF] rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-[95%] sm:w-[80%] md:w-[75%] lg:w-[70%] xl:w-[664px] 2xl:w-[664px] px-6 2xl:px-8 py-10">
                <div className="w-full flex flex-col justify-between items-center ">
                  <span className="text-primary font-semibold text-xl">
                    Scan QR Code
                  </span>
                  <label className=" text-secondary font-medium my-5  text-sm text-center">
                    You will need a{" "}
                    <span className="font-bold">Google Authenticator</span> to
                    complete this process.
                  </label>
                  <label className=" text-primary font-medium  text-sm text-center">
                    Scan the QR code into your app
                  </label>
                  <span className="mt-5">
                    <img src={qrImage} alt="QRCode" />
                  </span>
                </div>
                <hr className="h-0.5 px-0 bg-darkgray my-6" />
                <div className="w-full">
                  <div className="w-full flex flex-col gap-y-2 ">
                    <div className="w-full flex justify-center items-center gap-4">
                      {inputRefs.map((inputRef, index) => (
                        <div className="relative" key={index}>
                          <input
                            type="number"
                            id={index}
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
                            <svg
                              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                              width={26}
                              height={37}
                              viewBox="0 0 26 37"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.0192 36.5795C10.326 36.5682 8.02486 35.858 6.11577 34.4489C4.20668 33.0398 2.74645 30.9886 1.73509 28.2955C0.723722 25.6023 0.21804 22.358 0.21804 18.5625C0.21804 14.7784 0.723722 11.5455 1.73509 8.86364C2.75781 6.18182 4.22372 4.13636 6.13281 2.72727C8.05327 1.31818 10.3487 0.613635 13.0192 0.613635C15.6896 0.613635 17.9794 1.32386 19.8885 2.74432C21.7976 4.15341 23.2578 6.19886 24.2692 8.88068C25.2919 11.5511 25.8033 14.7784 25.8033 18.5625C25.8033 22.3693 25.2976 25.6193 24.2862 28.3125C23.2749 30.9943 21.8146 33.0455 19.9055 34.4659C17.9964 35.875 15.701 36.5795 13.0192 36.5795ZM13.0192 32.0284C15.3828 32.0284 17.2294 30.875 18.5589 28.5682C19.8999 26.2614 20.5703 22.9261 20.5703 18.5625C20.5703 15.6648 20.2635 13.2159 19.6499 11.2159C19.0476 9.20454 18.1783 7.68182 17.0419 6.64773C15.9169 5.60227 14.576 5.07954 13.0192 5.07954C10.6669 5.07954 8.82031 6.23863 7.4794 8.55682C6.13849 10.875 5.46236 14.2102 5.45099 18.5625C5.45099 21.4716 5.75213 23.9318 6.3544 25.9432C6.96804 27.9432 7.83736 29.4602 8.96236 30.4943C10.0874 31.517 11.4396 32.0284 13.0192 32.0284Z"
                                fill="#D0D5DD"
                              />
                            </svg>
                          )}
                        </div>
                      ))}
                    </div>
                    <label className="text-secondary font-medium text-sm text-center my-4">
                      Enter the 6-digit authentication code generated by your
                      app:
                    </label>
                    <div className="w-full flex justify-center ">
                      <Link
                        id="link-8"
                        onClick={handleVerify}
                        className="w-full px-4 py-2  text-white text-center font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap items-center"
                      >
                        Continue
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {isVerifyOpen && (
          <div
            className={`fixed inset-0 z-20 overflow-y-auto ${
              isBackupcodeOpen ? "hidden" : ""
            }`}
          >
            <div className="flex items-start py-5 justify-center w-full min-h-screen px-4 text-center lg:absolute lg:top-[12%]">
              <div className="flex items-start justify-center w-full min-h-screen px-2 text-center lg:absolute lg:top-[12%]">
                <div className="bg-[#FFFFFF] rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-[95%] sm:w-[80%] md:w-[580px] px-6 2xl:px-8 py-6">
                  <div className="w-full flex justify-end items-center">
                    <div className=" flex justify-between w-full border-b items-center border-primary mb-4">
                      <h4 className="w-full sm:text-xl text-dark text-left mb-6 ">
                        Verified successfully
                      </h4>
                      <button
                        onClick={() => setIsVerifyOpen(false)}
                        className="mb-6"
                        id="button-68"
                      >
                        <img src={Close} alt="" />
                      </button>
                    </div>
                  </div>

                  <div className="w-full flex flex-col justify-center items-center ">
                    <div className="border-b border-primary w-full">
                      <p className="mb-6 w-full text-primary font-normal text-base ">
                        Two-Factor Authentication has been successfully enabled.
                      </p>
                    </div>

                    <div className="w-full mt-6 flex gap-4 justify-end">
                      <Link
                        id="link-9"
                        className="px-4 py-2 text-primary font-medium bg-white hover:bg-gray-50 rounded-xl border border-primary whitespace-nowrap"
                        onClick={() => setIsVerifyOpen(false)}
                      >
                        Cancel
                      </Link>

                      <Link
                        onClick={handleBackupCode}
                        className="px-4 py-2 text-white font-medium rounded-xl whitespace-nowrap bg-primary hover:bg-primarydark"
                      >
                        Done
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isBackupcodeOpen && (
          <div
            className={`fixed inset-0 z-20 overflow-y-auto ${
              isSuccessModalOpen ? "hidden" : ""
            }`}
          >
            <div className="flex items-start py-5 justify-center w-full min-h-screen px-4 text-center lg:absolute lg:top-[12%]">
              <div className="flex items-start justify-center w-full min-h-screen px-2 text-center lg:absolute lg:top-[12%]">
                <div className="bg-[#FFFFFF] rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-[95%] sm:w-[80%] md:w-[580px] px-6 2xl:px-8 py-6">
                  <h2 className="text-2xl font-semibold text-center mb-4">
                    List of Backup Codes
                  </h2>
                  <p className="text-sm text-primary font-medium text-center mb-6 px-4">
                    Store these backup codes safely. If you lose access to your
                    authenticator app, you can use these codes to log in.
                  </p>
                  <div className="flex justify-between items-start space-x-4">
                    <ol className="space-y-1 text-center list-decimal w-full">
                      {backupCodes.map((code, index) => (
                        <li
                          key={index}
                          className="flex text-sm items-center justify-center space-x-4"
                        >
                          <span className="text-primary font-medium">
                            {code}
                          </span>
                        </li>
                      ))}
                    </ol>

                    <Link
                      id="link-4"
                      onClick={handleCopyAllClick}
                      className="text-blue-500 hover:text-blue-700 mr-0"
                      aria-label="Copy all backup codes"
                    >
                      <img src={CopyImg} alt="" />
                    </Link>
                  </div>

                  {copySuccess && (
                    <div className="mt-4 text-center text-green-500 font-semibold text-sm">
                      {copySuccess}
                    </div>
                  )}

                  <div className="w-full flex justify-center mt-6">
                    <Link
                      onClick={handleSuccess}
                      className="w-full px-4 py-2  text-white text-center font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap items-center"
                    >
                      Continue
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isSuccessModalOpen && (
          <div className="fixed inset-0 z-20 overflow-y-auto">
            <div className="flex items-start py-5 justify-center w-full min-h-screen px-4 text-center lg:absolute lg:top-[12%]">
              <form className="bg-[#FFFFFF] rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-[95%] sm:w-[80%] md:w-[75%] lg:w-[70%] xl:w-[664px] 2xl:w-[664px] px-6 2xl:px-8 py-10">
                <div className="w-full flex flex-col justify-between items-center gap-6 ">
                  <img src={Success} alt="" />

                  <span className="text-primary font-semibold text-xl text-center">
                    Successfully completed
                  </span>
                  <label className=" text-secondary font-medium text-sm text-center">
                    Your 2FA setup is complete. You will now need to enter a
                    6-digit code from your Authenticator App each time you log
                    in. <br />{" "}
                  </label>
                </div>

                <div className="w-full flex justify-center mt-10">
                  <Link
                    id="done"
                    onClick={handleClose}
                    className="w-full px-4 py-2  text-white text-center font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap items-center"
                  >
                    Done
                  </Link>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* SMS PopUp */}

        {isSmsModalOpen && (
          <div
            className={`fixed inset-0 z-20 overflow-y-auto ${
              isOtpModalOpen ? "hidden" : ""
            }`}
          >
            <div className="flex items-start py-5 justify-center w-full min-h-screen px-4 text-center lg:absolute lg:top-[12%]">
              <form className="bg-[#FFFFFF] rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-[95%] sm:w-[80%] md:w-[75%] lg:w-[70%] xl:w-[664px] 2xl:w-[664px] px-6 2xl:px-8 py-10">
                <div className="w-full flex flex-col justify-between items-center ">
                  <span className="text-primary font-semibold text-xl">
                    Register a Device
                  </span>
                  <label className=" text-secondary font-medium my-5 w-3/4 sm:px-3 text-sm text-center">
                    Enter the mobile number where you would like to receive your
                    one-time passcodes.
                  </label>
                </div>

                <div className="w-full">
                  <div className="w-full flex flex-col gap-y-2 ">
                    <div className="w-full xl:mt-0 mt-6">
                      <label htmlFor="phone" className="text-primary">
                        Contact Number
                      </label>
                      <div className="mt-1">
                        <PhoneInput
                          className="focus:outline-none"
                          preferredCountries={["in"]}
                          placeholder="+91 12345-67890"
                          buttonStyle={{
                            border: "1px solid #D1D5DB",
                            borderTopRightRadius: "0px",
                            borderBottomRightRadius: "0px",
                            borderTopLeftRadius: "12px",
                            borderBottomLeftRadius: "12px",
                            width: "52px",
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
                            border: "1px solid #D1D5DB",
                            marginLeft: "15px",
                            color: "#374151",
                            width: "97.1%",
                            height: "46px",
                            outline: "none",
                            boxShadow: "none",
                          }}
                        />
                      </div>
                    </div>

                    <div className="w-full flex justify-center mt-6">
                      <Link
                        id="link-5"
                        onClick={handleSendOtp}
                        className="w-full px-4 py-2  text-white text-center font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap items-center"
                      >
                        Send Code
                      </Link>
                    </div>

                    <div className="w-full flex justify-center mt-3">
                      <Link
                        className="w-full px-4 py-2 text-secondary  hover:text-primary text-center font-medium rounded-xl hover:bg-gray-50  whitespace-nowrap"
                        onClick={() => setIsSmsModalOpen(false)}
                      >
                        Cancel
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {isOtpModalOpen && (
          <div
            className={`fixed inset-0 z-20 overflow-y-auto ${
              isRegisterModalOpen ? "hidden" : ""
            }`}
          >
            <div className="flex items-start py-5 justify-center w-full min-h-screen px-4 text-center lg:absolute lg:top-[12%]">
              <form className="bg-[#FFFFFF] rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-[95%] sm:w-[80%] md:w-[75%] lg:w-[70%] xl:w-[664px] 2xl:w-[664px] px-6 2xl:px-8 py-10">
                <div className="w-full flex flex-col justify-between items-center ">
                  <span className="text-primary font-semibold text-xl">
                    Enter Your One-Time Password
                  </span>
                  <label className=" text-secondary font-medium my-5 w-3/4 sm:px-3 text-sm text-center">
                    We’ve send you a one-time password to (+91) 8888855554.
                    Please enter that OTP below.
                  </label>
                </div>
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
                        <svg
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                          width={26}
                          height={37}
                          viewBox="0 0 26 37"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.0192 36.5795C10.326 36.5682 8.02486 35.858 6.11577 34.4489C4.20668 33.0398 2.74645 30.9886 1.73509 28.2955C0.723722 25.6023 0.21804 22.358 0.21804 18.5625C0.21804 14.7784 0.723722 11.5455 1.73509 8.86364C2.75781 6.18182 4.22372 4.13636 6.13281 2.72727C8.05327 1.31818 10.3487 0.613635 13.0192 0.613635C15.6896 0.613635 17.9794 1.32386 19.8885 2.74432C21.7976 4.15341 23.2578 6.19886 24.2692 8.88068C25.2919 11.5511 25.8033 14.7784 25.8033 18.5625C25.8033 22.3693 25.2976 25.6193 24.2862 28.3125C23.2749 30.9943 21.8146 33.0455 19.9055 34.4659C17.9964 35.875 15.701 36.5795 13.0192 36.5795ZM13.0192 32.0284C15.3828 32.0284 17.2294 30.875 18.5589 28.5682C19.8999 26.2614 20.5703 22.9261 20.5703 18.5625C20.5703 15.6648 20.2635 13.2159 19.6499 11.2159C19.0476 9.20454 18.1783 7.68182 17.0419 6.64773C15.9169 5.60227 14.576 5.07954 13.0192 5.07954C10.6669 5.07954 8.82031 6.23863 7.4794 8.55682C6.13849 10.875 5.46236 14.2102 5.45099 18.5625C5.45099 21.4716 5.75213 23.9318 6.3544 25.9432C6.96804 27.9432 7.83736 29.4602 8.96236 30.4943C10.0874 31.517 11.4396 32.0284 13.0192 32.0284Z"
                            fill="#D0D5DD"
                          />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
                <div className="w-full flex justify-center mt-6">
                  <Link
                    id="link-6"
                    onClick={handleRegitser}
                    className="w-full px-4 py-2  text-white text-center font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap items-center"
                  >
                    Continue
                  </Link>
                </div>

                <div className="w-full flex justify-center mt-3">
                  <Link
                    id="link-7"
                    className="w-full px-4 py-2 text-secondary  hover:text-primary text-center font-medium rounded-xl  hover:bg-gray-50 whitespace-nowrap"
                    onClick={() => setIsOtpModalOpen(false)}
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        )}

        {isRegisterModalOpen && (
          <div className="fixed inset-0 z-20 overflow-y-auto">
            <div className="flex items-start py-5 justify-center w-full min-h-screen px-4 text-center lg:absolute lg:top-[12%]">
              <form className="bg-[#FFFFFF] rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-[95%] sm:w-[80%] md:w-[75%] lg:w-[70%] xl:w-[664px] 2xl:w-[664px] px-6 2xl:px-8 py-10">
                <div className="w-full flex flex-col justify-between items-center gap-6 ">
                  <img src={Registerr} alt="" />

                  <span className="text-primary font-semibold text-xl text-center">
                    Your Device is Now Registered
                  </span>
                  <label className=" text-secondary font-medium text-sm text-center">
                    In the future, all passcodes will be send to the following
                    mobile number. <br />{" "}
                    <span className="font-bold">(+91) 8888855554.</span>
                  </label>
                </div>

                <div className="w-full flex justify-center mt-10">
                  <Link
                    id="link-7"
                    onClick={handleClose}
                    className="w-full px-4 py-2  text-white text-center font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap items-center"
                  >
                    Continue
                  </Link>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ImportVerificationModal;
