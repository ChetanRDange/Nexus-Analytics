import React, { useState, useEffect, useRef } from "react";
import Success from "../assets/images/success.png";
import CloseImg from "../assets/svgs/close-black.svg";

import useMutation from "../hooks/useMutation";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const DeleteConfirm = ({
  isInviteSentModalOpen,
  setIsInviteSentModalOpen,
  label,
  para,
  name,
  handleDeleteUser,
}) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsInviteSentModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsInviteSentModalOpen]);

  if (!isInviteSentModalOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-10 mt-52">
        <div className="fixed inset-0 bg-gray-100 bg-opacity-50 transition-opacity"></div>
        <div className="flex items-start justify-center w-full min-h-screen px-2 text-center lg:absolute lg:top-[12%]">
          <div
            ref={modalRef}
            className="bg-main rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-[95%] sm:w-[80%] md:w-[580px] px-6 2xl:px-8 py-6"
          >
            <div className="w-full flex justify-end items-center">
              <div
                onClick={() => setIsInviteSentModalOpen(false)}
                className=" flex justify-between w-full border-b border-primary mb-4 pb-4"
              >
                <h4 className="w-full sm:text-xl text-dark text-left ">
                  {label || "Delete"}
                </h4>
                {/* <img src={CloseImg} alt="" className="cursor-pointer" /> */}
                <X />
              </div>
            </div>

            <div className="w-full flex flex-col justify-center items-center ">
              <div className="border-b border-primary w-full">
                <p className="mb-4 w-full text-primary font-normal text-base ">
                  Are you sure to delete <strong>{name}</strong>
                </p>
              </div>

              <div className="flex justify-end gap-5 w-full mt-6 ">
                <button onClick={() => setIsInviteSentModalOpen(false)}
                  className=" w-1/4 rounded-xl border border-primary text-primary py-2 "
                 id="button-177">
                  Cancel
                </button>
                <button onClick={(e) => handleDeleteUser(e)}
                  className="w-1/4 rounded-xl bg-red-500 text-white py-2 "
                 id="button-178">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirm;
