import { ArrowLeftRight, Plus, Send } from "lucide-react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ImportCompaniesModal from "../Components/ImportCompaniesModal";
import NewTable from "../Components/NewTable";
// import CountryDisplay from "../Components/countryCode";
import Resend from "../assets/svgs/resend.svg";
import useMutation from "../hooks/useMutation";
import useStore from "../state/store";
import formatDateTime from "../utils/DateFormat";
import { CountryDisplay, PhoneWithFlag } from "../Components/countryCode";
import { GlobalContext } from "../App";

export const tableActions = (navigate, setIsModalOpen) => [
  {
    label: "Edit",
    icon: (
      <svg
        width={20}
        height={21}
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
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
    ),
    handler: (rowData) =>
      navigate(`/edit-company/${rowData.id}`, { state: { company: rowData } }),
  },
  {
    label: "Duplicate",
    icon: (
      <svg
        width={20}
        height={21}
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
      >
        <g clipPath="url(#clip0_1376_90902)">
          <path
            d="M13.375 9.44141C14.7583 9.44141 15.8667 8.32474 15.8667 6.94141C15.8667 5.55807 14.7583 4.44141 13.375 4.44141C11.9917 4.44141 10.875 5.55807 10.875 6.94141C10.875 8.32474 11.9917 9.44141 13.375 9.44141ZM6.70833 9.44141C8.09167 9.44141 9.2 8.32474 9.2 6.94141C9.2 5.55807 8.09167 4.44141 6.70833 4.44141C5.325 4.44141 4.20833 5.55807 4.20833 6.94141C4.20833 8.32474 5.325 9.44141 6.70833 9.44141ZM6.70833 11.1081C4.76667 11.1081 0.875 12.0831 0.875 14.0247V15.2747C0.875 15.7331 1.25 16.1081 1.70833 16.1081H11.7083C12.1667 16.1081 12.5417 15.7331 12.5417 15.2747V14.0247C12.5417 12.0831 8.65 11.1081 6.70833 11.1081ZM13.375 11.1081C13.1333 11.1081 12.8583 11.1247 12.5667 11.1497C12.5833 11.1581 12.5917 11.1747 12.6 11.1831C13.55 11.8747 14.2083 12.7997 14.2083 14.0247V15.2747C14.2083 15.5664 14.15 15.8497 14.0583 16.1081H18.375C18.8333 16.1081 19.2083 15.7331 19.2083 15.2747V14.0247C19.2083 12.0831 15.3167 11.1081 13.375 11.1081Z"
            fill="#657488"
          />
        </g>
        <defs>
          <clipPath id="clip0_1376_90902">
            <rect
              width={20}
              height={20}
              fill="white"
              transform="translate(0.0390625 0.275391)"
            />
          </clipPath>
        </defs>
      </svg>
    ),
    handler: (rowData) => {
      // console.log("Duplicate:", rowData);
    },
  },
  {
    label: "Delete",
    icon: (
      <svg
        width={20}
        height={21}
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
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
    ),
    handler: (rowData) => {
      // Implement delete logic here
      // console.log("Delete:", rowData);
      // Example: Remove the rowData from the table
      // This requires access to setState in the parent component
    },
  },
];

const statuses = [
  {
    id: 1,
    name: "Active",
    searchBy: "status",
    bgColor: "#ECFDF3",
    color: "#027948",
    dotColor: "#12B76A",
  },
  {
    id: 2,
    name: "Invited",
    searchBy: "status",
    bgColor: "#F2F4F7",
    color: "#344054",
    dotColor: "#667085",
  },
];

const Users = () => {
  const { admin } = useStore();
  const { fullScreen } = useContext(GlobalContext);

  const [isImportCompanyModalOpen, setIsImportCompanyModalOpen] =
    useState(false);

  const { callApi } = useMutation();

  const resendInvitaion = async (e, row) => {
    e.preventDefault();
    await callApi(`/private/user/resendInvite/${row._id}`, "POST");
  };

  const columns = [
    {
      id: 0,
      Header: "Name",
      accessor: "name",
      isMandatory: true,
    },
    {
      id: 1,
      Header: "Email ID",
      accessor: "email",
    },
    {
      id: 2,
      Header: "Country",
      accessor: "phone.code",
      render: (row) => <CountryDisplay phoneCode={row} />,
    },
    {
      id: 3,

      Header: "Contact Number",
      accessor: "phone",
      // render: (value) => `${value.code} ${value.number}`,
      render: (value, row) => (
        <PhoneWithFlag phoneCode={value.code} phone={value.number} />
      ),
    },
    {
      id: 4,

      Header: "Roles",
      searchable: true,
      accessor: "roles.name",
    },

    {
      id: 5,

      Header: "Last Active",
      accessor: "lastActive",
      render: (value) => {
        if (value && !isNaN(new Date(value).getTime())) {
          return formatDateTime(value);
        }
        return "N/A";
      },
    },
    {
      id: 6,

      Header: "Status",
      searchable: true,
      accessor: "status",
      render: (value) => {
        const statusStyles = {
          light: {
            Active: "bg-[#ECFDF3] text-[#027948]",
            Inactive: "bg-[#E5F6FF] text-[#175CD3]",
          },
          dark: {
            Active: "bg-[#0C3A2C] text-[#4ADE80]",
            Inactive: "bg-[#1D2939] text-[#53B1FD]",
          },
        };

        const statusColors = {
          light: {
            Active: "#12B76A",
            Inactive: "#2E90FA",
            // Add more statuses as needed
          },
          dark: {
            Active: "#4ADE80",
            Inactive: "#53B1FD",
            // Add more statuses as needed
          },
        };

        const theme = document.body.getAttribute("theme") || "dark";
        const currentStyles = statusStyles[theme];
        const currentColors = statusColors[theme];

        const statusKey = value === "Active" ? "Active" : "Inactive";

        return (
          <div
            className={`rounded-xl ${currentStyles[statusKey]} px-2 w-fit flex gap-2 items-center`}
          >
            <span
              className="min-w-[12px] min-h-[12px] rounded-full"
              style={{ backgroundColor: currentColors[statusKey] }}
            ></span>
            <span>{value}</span>
          </div>
        );
      },
    },
  ];
  const actionConditions = [
    {
      label: "Resend Invitation",
      onClick: (e, row) => resendInvitaion(e, row),
      icon: <Send size={18} />,
      condition: (row) => row.status === "Invited",
    },
    {
      label: "Transfer Ownership",
      onClick: () => {}, // Empty function since modal handles the action
      icon: <ArrowLeftRight />,
      condition: (row) => admin.isSuperAdmin && row.status === "Active",
    },
  ];

  const tableMetaData = {
    tableName: "adminUser",
    model: "Admins",
    endpoint: "/private/user",
    editPath: "edit-admin-user",
    viewPath: "admin-user-details",
    bulkImport: false,
    showDeleteAll: false,
    deleteField: "name",
    roleEndpoint: "/private/user/getDistinctRoles",
  };

  //isVerified , status, role

  const tableFilters = [
    // {
    //   type: "multiSelect",
    //   key: "isVerified",
    //   title: "Verified",
    //   options: [
    //     { title: "Yes", value: true },
    //     { title: "No", value: false },
    //   ],
    // },
    {
      type: "multiSelect",
      key: "status",
      title: "Status",
      options: [
        { title: "Active", value: "Active" },
        { title: "Invited", value: "Invited" },
      ],
    },
    // {
    //   type: "multiSelect",
    //   key: "role",
    //   title: "Role",
    //   options: [],
    // },
  ];

  return (
    <>
      <ImportCompaniesModal
        isImportCompanyModalOpen={isImportCompanyModalOpen}
        setIsImportCompanyModalOpen={setIsImportCompanyModalOpen}
      />

      {/* <div className="min-h-screen py-8 p-4 sm:p-5 overflow-x-hidden mb-20"> */}
      <div className="py-8 p-4 sm:p-5 overflow-x-hidden">
        <div className=" w-full">
        {!fullScreen &&  <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between items-center pb-5 border-b border-primary">
            <h4 className="text-2xl md:text-3xl text-dark whitespace-nowrap">
              Admin Users
            </h4>

            <Link
              id="add user"
              to="/add-admin-user"
              className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-primarydark text-white"
            >
              <Plus color="#fff" />
              <span className="">Add Admin User</span>
            </Link>
          </div>}

          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full align-middle">
                <NewTable
                  tableFilters={tableFilters}
                  columns={columns}
                  actions={actionConditions} //for extra action
                  tableMetaData={tableMetaData} // it contains all other metaData of Table
                  statuses={statuses}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
