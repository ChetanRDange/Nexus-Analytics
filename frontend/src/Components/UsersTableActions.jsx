import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Eye from "../assets/svgs/eye.svg";
import Resend from "../assets/svgs/resend.svg";
import Cancel from "../assets/svgs/cancel.svg";
import Remove from "../assets/svgs/remove.svg";
import Ownership from "../assets/svgs/ownership.svg";
import DeleteConfirm from "../pages/DeleteConfirm";
import TransferOwnershipModal from "./TransferOwnershipModal";
const UsersTableActions = ({
  index,
  setOpenDropdownIndex,
  openDropdownIndex,
  row,
  edit,
  heading,
  page,
  deletePlan,
  setIsDeleteModalOpen,
  editPage,
  planName,
  userType,
  view,
  reFetch,
}) => {
  const navigate = useNavigate();
  const [isInviteSentModalOpen, setIsInviteSentModalOpen] = useState(false);
  const [isOwnershipModalOpen, setIsOwnershipModalOpen] = useState(false);
  const handleEditClick = (row) => {
    setOpenDropdownIndex(null);
    navigate(`${editPage}${row.id}`);
  };
  const handleViewClick = (row, heading, page) => {
    console.log(`/view-${page}-details/${row.id}`);
    navigate(`/view-${page}-details/${row.id}`);
    setOpenDropdownIndex(null);
    console.log("page", page);
  };

  const handleDeletePlanClick = () => {
    setOpenDropdownIndex(null);

    setTimeout(() => {
      setIsDeleteModalOpen(true);
    }, 0);
  };

  return (
    <>
      <DeleteConfirm
        isInviteSentModalOpen={isInviteSentModalOpen}
        setIsInviteSentModalOpen={setIsInviteSentModalOpen}
        label={`Remove ${row.name}`}
        para={`This will permanently remove ${row.name} from the admin panel.`}
        row={row}
        reFetch={reFetch}
        button1="Cancel"
        button2="Remove Access"
      />

      <TransferOwnershipModal
        isOwnershipModalOpen={isOwnershipModalOpen}
        setIsOwnershipModalOpen={setIsOwnershipModalOpen}
        row={row}
        label="Transfer Ownership"
        para="Are you sure you want to transfer ownership to Olivia Richie? This action is irreversible, and you will lose your super admin privileges."
        para2="Your role will be changed to admin."
        button1="Cancel"
        button2="Confirm"
      />
      <details
        open={openDropdownIndex === index}
        className="relative inline-block text-left"
      >
        <summary className="text-white p-1.5 rounded-xl bg-white cursor-pointer focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="22px"
            viewBox="0 -960 960 960"
            width="22px"
            fill="#5f6368"
          >
            <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
          </svg>
        </summary>

        <ul className="absolute right-0 mt-2 z-40 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          {console.log(userType)}
          {userType === "Owner" && row.role === "Owner" ? (
            <>
              <button className="w-full flex gap-2 items-center px-4 py-2 text-sm text-primary hover:bg-gray-100 hover:text-gray-900"
                onClick={() => handleViewClick(row, heading, page)}
               id="button-114">
                <span>
                  <img src={Eye} alt="Eye" />
                </span>
                View
              </button>
              <button className="w-full flex gap-2 items-center px-4 py-2 text-sm text-primary hover:bg-gray-100 hover:text-gray-900"
                onClick={() => handleEditClick(row)}
               id="button-115">
                <span>
                  <svg
                    width={20}
                    height={21}
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http:www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1376_90888)">
                      <path
                        d="M2.53906 14.6505V17.7755H5.66406L14.8807 8.55885L11.7557 5.43385L2.53906 14.6505ZM17.2974 6.14219C17.6224 5.81719 17.6224 5.29219 17.2974 4.96719L15.3474 3.01719C15.0224 2.69219 14.4974 2.69219 14.1724 3.01719L12.6474 4.54219L15.7724 7.66719L17.2974 6.14219Z"
                        fill="#657488"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1376_90888">
                        <rect
                          width={20}
                          height={20}
                          fill="white"
                          transform="translate(0 0.275391)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Edit
              </button>
            </>
          ) : row.status === "Invited" || row.status === "Active" ? (
            <>
              <button className="w-full flex gap-2 items-center px-4 py-2 text-sm text-primary hover:bg-gray-100 hover:text-gray-900"
                onClick={() => handleViewClick(row, heading, page)}
               id="button-116">
                <span>
                  <img src={Eye} alt="Eye" />
                </span>
                View
              </button>
              <button className="w-full flex gap-2 items-center px-4 py-2 text-sm text-primary hover:bg-gray-100 hover:text-gray-900"
                onClick={() => handleEditClick(row)}
               id="button-117">
                <span>
                  <svg
                    width={20}
                    height={21}
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http:www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1376_90888)">
                      <path
                        d="M2.53906 14.6505V17.7755H5.66406L14.8807 8.55885L11.7557 5.43385L2.53906 14.6505ZM17.2974 6.14219C17.6224 5.81719 17.6224 5.29219 17.2974 4.96719L15.3474 3.01719C15.0224 2.69219 14.4974 2.69219 14.1724 3.01719L12.6474 4.54219L15.7724 7.66719L17.2974 6.14219Z"
                        fill="#657488"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1376_90888">
                        <rect
                          width={20}
                          height={20}
                          fill="white"
                          transform="translate(0 0.275391)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Edit
              </button>
              <button className="flex gap-2 w-full items-center px-4 py-2 text-sm text-primary hover:bg-gray-100 hover:text-gray-900"
                onClick={() => setIsInviteSentModalOpen(true)}
               id="button-118">
                <span className="">
                  <img src={Remove} alt="Remove" />
                </span>
                <span className="text-[#F04438]">Remove Access</span>
              </button>
              <button className="flex gap-2 w-full items-center px-4 py-2 text-sm text-primary hover:bg-gray-100 hover:text-gray-900"
                onClick={(e) => {
                  setIsOwnershipModalOpen(true);
                  e.currentTarget.closest("details").removeAttribute("open");
                }}
               id="button-119">
                <span className="">
                  <img src={Ownership} alt="Remove" />
                </span>
                <span className="text-primary">Transfer Ownership</span>
              </button>
            </>
          ) : (
            ""
          )}
        </ul>
      </details>
    </>
  );
};

export default UsersTableActions;
