import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Eye from "../assets/svgs/eye.svg";
import DeleteConfirm from "../pages/DeleteConfirm";
import ReactDOMServer from "react-dom/server";

const TableActions = ({
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
  view,
  setDeleteRole,
}) => {
  const navigate = useNavigate();
  const [isInviteSentModalOpen, setIsInviteSentModalOpen] = useState(false);
  // const { row, heading } = location.state;

  const handleEditClick = (row) => {
    setOpenDropdownIndex(null);
    const descriptionHtml = ReactDOMServer.renderToStaticMarkup(
      row.description
    );
    navigate(editPage, {
      state: { row: { ...row, description: descriptionHtml } },
    });
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
      setDeleteRole(row);
    }, 0);
  };

  const closeDropdown = () => setOpenDropdownIndex(null);

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(index === openDropdownIndex ? null : index);
  };

  return (
    <>
      <DeleteConfirm
        isInviteSentModalOpen={isInviteSentModalOpen}
        setIsInviteSentModalOpen={setIsInviteSentModalOpen}
        label={`Remove ${row.userName}`}
        para={`This will permanently remove ${row.userName} from the admin panel.`}
        button1="Cancel"
        button2="Delete"
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
          {edit && (
            <button className="w-full flex gap-2 items-center px-4 py-2 text-sm text-primary hover:bg-gray-100 hover:text-gray-900"
              onClick={() => handleEditClick(row)}
             id="button-98">
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
          )}
          {view && (
            <button className="w-full flex gap-2 items-center px-4 py-2 text-sm text-primary hover:bg-gray-100 hover:text-gray-900"
              onClick={() => handleViewClick(row, heading, page)}
             id="button-99">
              <span>
                <img src={Eye} alt="Eye" />
              </span>
              View
            </button>
          )}

          {deletePlan ? (
            <button className="w-full flex gap-2 items-center px-4 py-2 text-sm text-primary hover:bg-gray-100 hover:text-gray-900"
              onClick={handleDeletePlanClick}
             id="button-100">
              <span>
                <svg
                  width={20}
                  height={21}
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http:www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1376_90921)">
                    <path
                      d="M5.0013 16.2396C5.0013 17.1562 5.7513 17.9062 6.66797 17.9062H13.3346C14.2513 17.9062 15.0013 17.1562 15.0013 16.2396V6.23958H5.0013V16.2396ZM15.8346 3.73958H12.918L12.0846 2.90625H7.91797L7.08464 3.73958H4.16797V5.40625H15.8346V3.73958Z"
                      fill="#657488"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1376_90921">
                      <rect
                        width={20}
                        height={20}
                        fill="white"
                        transform="translate(0 0.40625)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              Delete
            </button>
          ) : (
            <button className="flex gap-2 w-full items-center px-4 py-2 text-sm text-primary hover:bg-gray-100 hover:text-gray-900"
              onClick={() => {
                setIsInviteSentModalOpen(true);
                e.currentTarget.closest("details").removeAttribute("open");
              }}
             id="button-101">
              <span>
                <svg
                  width={20}
                  height={21}
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http:www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1376_90921)">
                    <path
                      d="M5.0013 16.2396C5.0013 17.1562 5.7513 17.9062 6.66797 17.9062H13.3346C14.2513 17.9062 15.0013 17.1562 15.0013 16.2396V6.23958H5.0013V16.2396ZM15.8346 3.73958H12.918L12.0846 2.90625H7.91797L7.08464 3.73958H4.16797V5.40625H15.8346V3.73958Z"
                      fill="#657488"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1376_90921">
                      <rect
                        width={20}
                        height={20}
                        fill="white"
                        transform="translate(0 0.40625)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              Delete
            </button>
          )}
        </ul>
      </details>
    </>
  );
};

export default TableActions;
