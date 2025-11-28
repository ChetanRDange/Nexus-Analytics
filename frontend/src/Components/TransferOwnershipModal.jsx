import React, { useRef, useEffect } from "react";
import { useAuth } from "../AuthContext";
import useMutation from "../hooks/useMutation";
import { X } from "lucide-react";

const TransferOwnershipModal = ({
  isOwnershipModalOpen,
  setIsOwnershipModalOpen,
  row,
}) => {
  const { callApi } = useMutation();
  const { logOut } = useAuth();
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOwnershipModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOwnershipModalOpen]);

  if (!isOwnershipModalOpen) return null;

  async function handleTransferOwnerShip(e) {
    e.preventDefault();
    const res = await callApi(`/private/user/transferOwner/${row._id}`, "PUT");
    if (res) {
      setIsOwnershipModalOpen(false);
      // logOut();
      window.location.reload();
    }
  }

  return (
    <div className="fixed inset-0 z-50 mt-52">
      <div className="fixed inset-0 bg-gray-100 bg-opacity-50 transition-opacity"></div>
      <div className="flex items-start justify-center w-full min-h-screen px-2 text-center lg:absolute lg:top-[12%]">
        <div
          ref={modalRef}
          className="bg-main rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-[95%] sm:w-[80%] md:w-[580px] px-6 2xl:px-8 py-6"
        >
          <div className="w-full flex justify-end items-center">
            <div
              onClick={() => setIsOwnershipModalOpen(false)}
              className="flex justify-between w-full border-b border-primary mb-4 pb-4"
            >
              <h4 className="w-full sm:text-xl text-dark text-left">
                Transfer Ownership
              </h4>
              <X />
            </div>
          </div>

          <div className="w-full flex flex-col justify-center items-center ">
            <div className="border-b border-primary w-full ">
              <p className="mb-2 w-full text-primary font-normal text-base ">
                Are you sure you want to transfer ownership to{" "}
                <strong>{row?.name || "this user"}</strong>?
              </p>
              <p className="mb-4 w-full text-primary font-normal text-base">
                This action cannot be undone and you will be logged out.
              </p>
            </div>

            <div className="flex justify-end gap-5 w-full mt-6">
              <button
                onClick={() => setIsOwnershipModalOpen(false)}
                className="w-1/4 rounded-xl border border-primary text-primary py-2"
                id="button-111"
              >
                Cancel
              </button>
              <button
                onClick={handleTransferOwnerShip}
                className="w-1/4 rounded-xl bg-primary hover:bg-primarydark text-white py-2"
                id="button-112"
              >
                Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferOwnershipModal;
