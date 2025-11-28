import React, { useState } from "react";
import Google from "../assets/svgs/google-logo.svg";
import Verified from "../assets/svgs/verified.svg";
import NotVerified from "../assets/svgs/not-verified.svg";
import LinkedIn from "../assets/svgs/linkedin.svg";
import IndiaFlag from "../assets/svgs/india-flag.svg";
import Send from "../assets/svgs/send-white.svg";
import InvitationSuccessModal from "./InvitationSuccessModal";
import DynamicTableComponent from "./DynamicTableComponent";
import Search from "./Search";
import Filters from "./Filters";

const companyInfo = [
  {
    id: "0",
    srno: "001",
    companyLogo: Google,
    companyID: "2564",
    companyName: "Google",
    companySize: "50 - 100",
    ExpireLabel: "true",
    adminName: "Manasi",
    adminEmail: "manasi123@gmail.com",
    emailStatus: "Verified",
    country: "india",
    countryLogo: IndiaFlag,
    countryCode: "+91",
    mobile: "1234567890",
    status: "Pending",
    plan: "",
    latestPayment: "22-08-2024, 02.00 AM",
    planExpiry: "22-09-2024, 02.00 AM",
    createdAt: "22-08-2024, 02.00 AM",
    updatedAt: "22-08-2024, 02.00 AM",
    ipAddress: "192.0.2.1",
  },
  {
    id: "0",
    srno: "001",
    companyLogo: Google,
    companyID: "2564",
    companyName: "Google",
    companySize: "500+",
    ExpireLabel: "true",
    adminName: "Ashwini",
    adminEmail: "manasi123@gmail.com",
    emailStatus: "Verified",
    country: "india",
    countryLogo: IndiaFlag,
    countryCode: "+91",
    mobile: "1234567890",
    status: "Inactive",
    plan: "",
    latestPayment: "22-08-2024, 02.00 AM",
    planExpiry: "22-09-2024, 02.00 AM",
    createdAt: "22-08-2024, 02.00 AM",
    updatedAt: "22-08-2024, 02.00 AM",
    ipAddress: "192.0.2.1",
  },
  {
    id: "0",
    srno: "001",
    companyLogo: LinkedIn,
    companyID: "2564",
    companyName: "Google",
    companySize: "50 - 100",
    ExpireLabel: "true",
    adminName: "Manasi",
    adminEmail: "manasi123@gmail.com",
    emailStatus: "Verified",
    country: "india",
    countryLogo: IndiaFlag,
    countryCode: "+91",
    mobile: "1234567890",
    status: "Active",
    plan: "",
    latestPayment: "22-08-2024, 02.00 AM",
    planExpiry: "22-09-2024, 02.00 AM",
    createdAt: "22-08-2024, 02.00 AM",
    updatedAt: "22-08-2024, 02.00 AM",
    ipAddress: "192.0.2.1",
  },
  {
    id: "0",
    srno: "001",
    companyLogo: Google,
    companyID: "2564",
    companyName: "Google",
    companySize: "50 - 100",
    ExpireLabel: "true",
    adminName: "Ashwini",
    adminEmail: "manasi123@gmail.com",
    emailStatus: "Verified",
    country: "india",
    countryLogo: IndiaFlag,
    countryCode: "+91",
    mobile: "1234567890",
    status: "Pending",
    plan: "",
    latestPayment: "22-08-2024, 02.00 AM",
    planExpiry: "22-09-2024, 02.00 AM",
    createdAt: "22-08-2024, 02.00 AM",
    updatedAt: "22-08-2024, 02.00 AM",
    ipAddress: "192.0.2.1",
  },
  {
    id: "0",
    srno: "001",
    companyLogo: LinkedIn,
    companyID: "2564",
    companyName: "Google",
    companySize: "50 - 100",
    ExpireLabel: "true",
    adminName: "Ashwini",
    adminEmail: "manasi123@gmail.com",
    emailStatus: "Verified",
    country: "india",
    countryLogo: IndiaFlag,
    countryCode: "+91",
    mobile: "1234567890",
    status: "Blocked",
    plan: "",
    latestPayment: "22-08-2024, 02.00 AM",
    planExpiry: "22-09-2024, 02.00 AM",
    createdAt: "22-08-2024, 02.00 AM",
    updatedAt: "22-08-2024, 02.00 AM",
    ipAddress: "192.0.2.1",
  },
  {
    id: "0",
    srno: "001",
    companyLogo: Google,
    companyID: "2564",
    companyName: "Google",
    companySize: "50 - 100",
    ExpireLabel: "true",
    adminName: "Manasi",
    adminEmail: "manasi123@gmail.com",
    emailStatus: "Verified",
    country: "india",
    countryLogo: IndiaFlag,
    countryCode: "+91",
    mobile: "1234567890",
    status: "Active",
    plan: "",
    latestPayment: "22-08-2024, 02.00 AM",
    planExpiry: "22-09-2024, 02.00 AM",
    createdAt: "22-08-2024, 02.00 AM",
    updatedAt: "22-08-2024, 02.00 AM",
    ipAddress: "192.0.2.1",
  },
  {
    id: "0",
    srno: "001",
    companyLogo: LinkedIn,
    companyID: "2564",
    companyName: "Google",
    companySize: "50 - 100",
    ExpireLabel: "true",
    adminName: "Ashwini",
    adminEmail: "manasi123@gmail.com",
    emailStatus: "Verified",
    country: "india",
    countryLogo: IndiaFlag,
    countryCode: "+91",
    mobile: "1234567890",
    status: "Pending",
    plan: "",
    latestPayment: "22-08-2024, 02.00 AM",
    planExpiry: "22-09-2024, 02.00 AM",
    createdAt: "22-08-2024, 02.00 AM",
    updatedAt: "22-08-2024, 02.00 AM",
    ipAddress: "192.0.2.1",
  },
  {
    id: "0",
    srno: "001",
    companyLogo: Google,
    companyID: "2564",
    companyName: "Google",
    companySize: "50 - 100",
    ExpireLabel: "true",
    adminName: "Manasi",
    adminEmail: "manasi123@gmail.com",
    emailStatus: "Verified",
    country: "india",
    countryLogo: IndiaFlag,
    countryCode: "+91",
    mobile: "1234567890",
    status: "Inactive",
    plan: "",
    latestPayment: "22-08-2024, 02.00 AM",
    planExpiry: "22-09-2024, 02.00 AM",
    createdAt: "22-08-2024, 02.00 AM",
    updatedAt: "22-08-2024, 02.00 AM",
    ipAddress: "192.0.2.1",
  },
  {
    id: "0",
    srno: "001",
    companyLogo: LinkedIn,
    companyID: "2564",
    companyName: "Google",
    companySize: "50 - 100",
    ExpireLabel: "true",
    adminName: "Ashwini",
    adminEmail: "manasi123@gmail.com",
    emailStatus: "Verified",
    country: "india",
    countryLogo: IndiaFlag,
    countryCode: "+91",
    mobile: "1234567890",
    status: "Inactive",
    plan: "",
    latestPayment: "22-08-2024, 02.00 AM",
    planExpiry: "22-09-2024, 02.00 AM",
    createdAt: "22-08-2024, 02.00 AM",
    updatedAt: "22-08-2024, 02.00 AM",
    ipAddress: "192.0.2.1",
  },
  {
    id: "0",
    srno: "001",
    companyLogo: Google,
    companyID: "2564",
    companyName: "Google",
    companySize: "50 - 100",
    ExpireLabel: "true",
    adminName: "Manasi",
    adminEmail: "manasi123@gmail.com",
    emailStatus: "Verified",
    country: "india",
    countryLogo: IndiaFlag,
    countryCode: "+91",
    mobile: "1234567890",
    status: "Active",
    plan: "",
    latestPayment: "22-08-2024, 02.00 AM",
    planExpiry: "22-09-2024, 02.00 AM",
    createdAt: "22-08-2024, 02.00 AM",
    updatedAt: "22-08-2024, 02.00 AM",
    ipAddress: "192.0.2.1",
  },
  {
    id: "0",
    srno: "001",
    companyLogo: LinkedIn,
    companyID: "2564",
    companyName: "Google",
    companySize: "50 - 100",
    ExpireLabel: "true",
    adminName: "Ashwini",
    adminEmail: "manasi123@gmail.com",
    emailStatus: "Verified",
    country: "india",
    countryLogo: IndiaFlag,
    countryCode: "+91",
    mobile: "1234567890",
    status: "Pending",
    plan: "",
    latestPayment: "22-08-2024, 02.00 AM",
    planExpiry: "22-09-2024, 02.00 AM",
    createdAt: "22-08-2024, 02.00 AM",
    updatedAt: "22-08-2024, 02.00 AM",
    ipAddress: "192.0.2.1",
  },
];

const defaultColumns = [
  {
    Header: "Sr. No.",
    accessor: "srno",
  },
  {
    Header: "Company Logo",
    accessor: "companyLogo",
    Cell: ({ value }) => (
      <img src={value} alt="Company Logo" className="w-8 h-8 rounded" />
    ),
  },
  {
    Header: "Company ID",
    accessor: "companyID",
  },
  {
    Header: "Company Name",
    accessor: "companyName",
  },
  {
    Header: "Company Size",
    accessor: "companySize",
  },
  {
    Header: "Admin Name",
    accessor: "adminName",
  },
  {
    Header: "Admin Email ID",
    accessor: "adminEmail",
  },
  {
    Header: "Email Verification",
    accessor: "emailStatus",
    Cell: ({ value }) =>
      value === "Verified" ? (
        <div className="flex gap-2 items-center justify-center w-fit px-2 py-1 rounded-xl bg-[#ECFDF3] text-[#027948]">
          <img src={Verified} alt="Verified" /> <span>Verified</span>
        </div>
      ) : (
        <div className="flex gap-2 items-center justify-center w-fit px-2 py-1 rounded-xl bg-[#FEF3F2] text-[#B42318]">
          <img src={NotVerified} alt="Not Verified" /> <span>Not Verified</span>
        </div>
      ),
  },
  {
    Header: "Country",
    accessor: "country",
    Cell: ({ value }) => (
      <div className="flex gap-2 items-center">
        <img src={IndiaFlag} alt="Country Flag" className="w-4 h-4" />
        <span>{value}</span>
      </div>
    ),
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      const statusStyles = {
        Pending: "bg-[#FFFAEB] text-[#B54708]",
        Inactive: "bg-[#F2F4F7] text-primary",
        Active: "bg-[#ECFDF3] text-[#027948]",
        Blocked: "bg-[#FEF3F2] text-[#B32318]",
      };
      const statusColors = {
        Pending: "#F79009",
        Inactive: "#667085",
        Active: "#12B76A",
        Blocked: "#F04438",
      };

      return (
        <div
          className={`rounded-xl ${statusStyles[value]} px-2 py-1 w-fit flex gap-2 items-center`}
        >
          <span
            className="min-w-[12px] min-h-[12px] rounded-full"
            style={{ backgroundColor: statusColors[value] }}
          ></span>
          <span>{value}</span>
        </div>
      );
    },
  },
  {
    Header: "Current Plan",
    accessor: "plan",
    Cell: ({ value }) =>
      value ? value : <span className="w-full text-center">-</span>,
  },
  {
    Header: "Latest Payment",
    accessor: "latestPayment",
  },
  {
    Header: "Plan Expiry Date",
    accessor: "planExpiry",
  },
  {
    Header: "Created Date",
    accessor: "createdAt",
  },
  {
    Header: "Updated Date",
    accessor: "updatedAt",
  },
  {
    Header: "IP Address",
    accessor: "ipAddress",
  },
];

const categories = [
  {
    id: 0,
    showName: "Software Development",
    name: "Software Development",
  },
  {
    id: 1,
    showName: "Marketing",
    name: "Marketing",
  },
  {
    id: 2,
    showName: "Design",
    name: "Design",
  },
  {
    id: 3,
    showName: "Operations",
    name: "Operations",
  },
  {
    id: 4,
    showName: "Human Resources",
    name: "Human Resources",
  },
  {
    id: 5,
    showName: "Finance",
    name: "Finance",
  },
];

const BulkInviteCompanySuccess = () => {
  const [isInviteSuccessModalOpen, setIsInviteSuccessModalOpen] =
    useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSelectionChange = (selectedIds) => {
    console.log("Selected IDs:", selectedIds);
  };

  return (
    <>
      <InvitationSuccessModal
        isInviteSuccessModalOpen={isInviteSuccessModalOpen}
        setIsInviteSuccessModalOpen={setIsInviteSuccessModalOpen}
      />
      <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
        <div className=" w-full">
          <div className="w-full flex justify-between pb-5 border-b border-primary">
            <div className="">
              <h4 className="text-3xl text-dark">Companies</h4>
            </div>
            <div className="w-full flex gap-3 justify-end items-center">
              <button
                className="px-2 sm:px-4 rounded-xl py-2 border border-primary bg-white text-primary"
                id="button-14"
              >
                <span className="">Back</span>
              </button>
              <button
                onClick={() => setIsInviteSuccessModalOpen(true)}
                className="flex gap-2 items-center px-2 sm:px-4 rounded-xl py-2 bg-primary hover:bg-primarydark text-white"
                id="button-15"
              >
                <img src={Send} alt="Send" />
                <span className="">Send Invitation</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col border border-primary my-8 rounded-xl">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full align-middle">
                <div className="w-full flex justify-start md:justify-between md:flex-row flex-col gap-y-3 items-center px-6 ptpb-4 border-b border-primary">
                  <div className="flex gap-2 justify-start items-center">
                    <span className="text-primary text-left">Companies</span>
                    <span className="p-1 rounded-xl text-primary bg-fadedblue whitespace-nowrap h-fit">
                      200 Companies
                    </span>
                  </div>
                  <div className="w-full justify-end flex flex-col-reverse sm:flex-row">
                    <div className="flex gap-4 flex-wrap sm:flex-nowrap justify-start">
                      <div className="px-2 rounded-xl border border-primary flex gap-2 items-center w-full md:w-[210px]">
                        <Search />
                      </div>

                      <div className="w-full">
                        <Filters categories={categories} />
                      </div>
                    </div>
                  </div>
                </div>

                <DynamicTableComponent
                  columns={defaultColumns}
                  data={companyInfo}
                  selectable={true}
                  onSelectChange={handleSelectionChange}
                  actions={true}
                />
              </div>
            </div>
          </div>

          {/* <div className='w-full flex gap-4 items-center justify-end pt-10'>
                    <button className='px-4 py-2 rounded-xl border border-primary text-primary' id="button-16">
                        Back
                    </button>
                    <button onClick={() => setIsInviteSentModalOpen(true)} className='px-4 py-2 rounded-xl border border-primary text-white bg-[#175CD3]' id="button-17">
                        Send Invitation
                    </button>
                </div> */}
        </div>
      </div>
    </>
  );
};

export default BulkInviteCompanySuccess;
