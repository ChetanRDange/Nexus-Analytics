import React, { useState } from "react";
import Success from "../assets/svgs/success.svg";
import { Link } from "react-router-dom";
import SuccessIcon from "../assets/svgs/success-icon.svg";

const InvitationSuccessModal = ({
  isInviteSuccessModalOpen,
  setIsInviteSuccessModalOpen,
  title = "Invitation Sent Successfully!",
  para = " All invitations have been sent to the 200 companies.",
  navigation,
}) => {
  if (!isInviteSuccessModalOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"
          onClick={() => setIsInviteSuccessModalOpen(false)}
        ></div>
        <div className="flex items-start justify-center w-full min-h-screen px-4 text-center lg:absolute lg:top-[12%]">
          <div className="bg-[#FFFFFF] rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-[95%] sm:w-[80%] md:w-[480px] px-6 2xl:px-8 py-8">
            <div className="w-full flex justify-end items-center">
              <span onClick={() => setIsInviteSuccessModalOpen(false)} className="p-1.5 rounded-xl hover:bg-gray-50">
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="#667085"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            <div className="w-full flex flex-col justify-center items-center pt-4">
              <span>
                <img src={SuccessIcon} alt="Success" />
              </span>

              <h4 className="mt-3 w-full sm:text-xl text-dark text-center">{title}</h4>
              <p className="mt-1 w-full text-center text-primary font-normal">{para}</p>

              <Link
                id="got-it"
                to={navigation}
                onClick={() => {
                  setIsInviteSuccessModalOpen(false);
                }}
                className="w-full text-center rounded-xl bg-primary hover:bg-[#1570EF] text-white py-2 px-2 mt-6"
              >
                Got it
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvitationSuccessModal;
