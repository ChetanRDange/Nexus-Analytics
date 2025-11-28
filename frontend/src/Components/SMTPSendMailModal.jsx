import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputComponent from "./InputComponent";
import { invalid_send_test_email_error } from "./AllError";
import useMutation from "../hooks/useMutation";
const SMTPSendMailModal = ({
  isSMTPSendMailModalOpen,
  setIsSMTPSendMailModalOpen,
  smtpData,
}) => {
  const [email, setEmail] = useState("");
  const { callApi } = useMutation();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  if (!isSMTPSendMailModalOpen) return null;

  //handle Test Mail
  async function handleTestMail(e) {
    e.preventDefault();
    await callApi("/private/smtp/test", "POST", {
      ...smtpData,
      toEmail: email,
    });
    setIsSMTPSendMailModalOpen(false);
  }
  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"
          onClick={() => setIsSMTPSendMailModalOpen(false)}
        ></div>
        <div className="flex items-start py-5 justify-center w-full min-h-screen px-4 text-center lg:absolute lg:top-[12%]">
          <form className="bg-[#FFFFFF] rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-[95%] sm:w-[80%] md:w-[75%] lg:w-[70%] xl:w-[664px] 2xl:w-[664px] px-6 2xl:px-8 py-8">
            <div className="w-full flex justify-between items-center border-b border-primary pb-5">
              <span className="text-primary font-semibold text-xl">
                Send Test Mail
              </span>
              <button
                onClick={() => setIsSMTPSendMailModalOpen(false)}
                className="rounded-xl hover:bg-gray-50 "
                id="button-93"
              >
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="#667085"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="w-full ">
              <div className="w-full mt-5">
                <InputComponent
                  inputType="email"
                  name="email"
                  id="email"
                  labelName=" Email Address"
                  labelColor="primary"
                  placeholderName=" Email Address"
                  placeholderColor="secondary"
                  textColor="text-dark"
                  borderRadius="xl"
                  activeBorderColor="blue"
                  value={email}
                  onChange={handleEmailChange}
                  // {...(error? && { error: error })}
                  // {...(typeof error !== "undefined" ? { error } : {})}
                />
                {/* {error && (
                    <div className="mt-2 text-[#F04438] text-sm font-normal">
                      {error}
                      //  {invalid_send_test_email_error}
                    </div>
                  )} */}
              </div>
              <div className="w-full mt-6 flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setIsSMTPSendMailModalOpen(false);
                  }}
                  className="px-8 py-2 text-primary font-medium bg-white hover:bg-gray-50 rounded-xl border border-primary whitespace-nowrap"
                  id="button-94"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTestMail}
                  className="text-center text-white px-4 py-2 rounded-xl bg-primary hover:bg-primarydark whitespace-nowrap font-medium "
                  id="button-95"
                >
                  Send Test Mail
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SMTPSendMailModal;
