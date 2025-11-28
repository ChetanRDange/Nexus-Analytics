import React, { useState, useNavigate } from "react";
import Add from "../assets/svgs/add.svg";
import Google from "../assets/svgs/google-logo.svg";
import ImportCompaniesModal from "../Components/ImportCompaniesModal";
import DynamicTableComponent from "../Components/DynamicTableComponent";
import LinkedIn from "../assets/svgs/linkedin.svg";
import CreateNewSegmentModal from "../Components/CreateNewSegmentModal";
import { IoMdAdd } from "react-icons/io";

const categories = [
  {
    id: 0,
    name: "Company Id",
  },
  {
    id: 1,
    name: "Company Size",
  },
  {
    id: 2,
    name: "Latest Payment",
  },
  {
    id: 3,
    name: "Plan Expiry Date",
  },
  {
    id: 4,
    name: "Status",
  },
];

const statuses = [
  {
    id: 0,
    name: "Success",
    bgColor: "#ECFDF3",
    color: "#027948",
    dotColor: "#12B76A",
  },
  {
    id: 1,
    name: "Pending",
    bgColor: "#FFFAEB",
    color: "#B54708",
    dotColor: "#F79009",
  },
  {
    id: 2,
    name: "Inactive",
    bgColor: "#F2F4F7",
    color: "#344054",
    dotColor: "#667085",
  },
  {
    id: 3,
    name: "Blocked",
    bgColor: "#FEF3F2",
    color: "#B32318",
    dotColor: "#F04438",
  },
];

const defaultColumns = [
  {
    Header: "Sr. No.",
    accessor: "srno",
  },
  {
    Header: "Visibility Name",
    accessor: "visibilityName",
  },
  {
    Header: "Conditions",
    accessor: "conditions",
  },

  {
    Header: "Login Date & Time",
    accessor: "loginDate",
  },
  {
    Header: "Logout Date & Time",
    accessor: "logoutDate",
  },
];

const companyInfo = [
  {
    id: "0",
    srno: "001",
    companyLogo: Google,
    companyId: 2564,
    companyName: "Google",
    fullName: "John Michael Smith",
    email: "johnmichael@gmail.com",
    loginDate: "22-08-2024, 08.00 AM",
    logoutDate: "22-08-2024, 08.50 AM",
    location: "Mumbai, India",
    subscriptionPlan: "Free Plan",
    accountCreatedDate: "10-11-2024",
    lastLoginDate: "10-12-2024",
    country: "India",
    visibilityName: "New Companies from India",
    conditions: "Account Created Date is within the last 30 days",
  },
  {
    id: "1",
    srno: "002",
    companyLogo: LinkedIn,
    companyId: 2565,
    companyName: "LinkedIn",
    fullName: "John Michael Smith",
    email: "johnmichael@gmail.com",
    loginDate: "22-08-2024, 08.00 AM",
    logoutDate: "22-08-2024, 08.50 AM",
    location: "Toronto, Canada",
    subscriptionPlan: "Premium Plan",
    accountCreatedDate: "05-08-2023",
    lastLoginDate: "20-11-2024",
    country: "Canada",
    visibilityName: "Premium Plan Companies",
    conditions:
      "Last Login Date is within the last 30 days AND Account Created Date is older than 30 days",
  },
  {
    id: "2",
    srno: "003",
    companyLogo: Google,
    companyId: 2566,
    companyName: "Google",
    fullName: "Jane Doe",
    email: "janedoe@gmail.com",
    loginDate: "20-11-2024, 02.00 PM",
    logoutDate: "20-11-2024, 02.45 PM",
    location: "Bangalore, India",
    subscriptionPlan: "Free Plan",
    accountCreatedDate: "28-11-2024",
    lastLoginDate: "05-12-2024",
    country: "India",
    visibilityName: "New Companies from India",
    conditions: "Subscription Plan is Free Plan",
  },
  {
    id: "3",
    srno: "004",
    companyLogo: "Microsoft",
    companyId: 2567,
    companyName: "Microsoft",
    fullName: "Alice Johnson",
    email: "alicejohnson@gmail.com",
    loginDate: "01-12-2024, 09.00 AM",
    logoutDate: "01-12-2024, 09.30 AM",
    location: "Mumbai, India",
    subscriptionPlan: "Free Plan",
    accountCreatedDate: "15-11-2024",
    lastLoginDate: "05-12-2024",
    country: "India",
    visibilityName: "New Companies",
    conditions:
      "Country is India, AND Account Created Date is within the last 30 days",
  },
  {
    id: "4",
    srno: "005",
    companyLogo: LinkedIn,
    companyId: 2568,
    companyName: "Facebook",
    fullName: "Michael Brown",
    email: "michaelbrown@gmail.com",
    loginDate: "05-12-2024, 03.00 PM",
    logoutDate: "05-12-2024, 03.30 PM",
    location: "Toronto, Canada",
    subscriptionPlan: "Premium Plan",
    accountCreatedDate: "12-11-2023",
    lastLoginDate: "02-12-2024",
    country: "Canada",
    visibilityName: "Premium Plan Companies",
    conditions: "Country is Canada",
  },
  {
    id: "5",
    srno: "006",
    companyLogo: LinkedIn,
    companyId: 2569,
    companyName: "Twitter",
    fullName: "Sam Wilson",
    email: "samwilson@gmail.com",
    loginDate: "06-12-2024, 11.00 AM",
    logoutDate: "06-12-2024, 11.45 AM",
    location: "Vancouver, Canada",
    subscriptionPlan: "Premium Plan",
    accountCreatedDate: "14-10-2023",
    lastLoginDate: "05-12-2024",
    country: "Canada",
    visibilityName: "Premium Plan Companies",
    conditions: "Subscription Plan is Premium Plan",
  },
];

const Segments = () => {
  const [isInviteSentModalOpen, setIsInviteSentModalOpen] = useState(false);
  const [isImportCompanyModalOpen, setIsImportCompanyModalOpen] =
    useState(false);
  const [successImportModal, setSuccessImportModal] = useState(false);
  const [isNewSegment, setIsNewSegment] = useState(false);

  const handleSelectionChange = (selectedIds) => {
    console.log("Selected IDs:", selectedIds);
  };
  const handleSegment = () => {
    setIsNewSegment(true);
  };

  const openImportModal = () => {
    setIsImportCompanyModalOpen(true);
  };
  return (
    <>
      <ImportCompaniesModal
        isImportCompanyModalOpen={isImportCompanyModalOpen}
        setIsImportCompanyModalOpen={setIsImportCompanyModalOpen}
        heading="Notice"
        successImportModal={successImportModal}
        setSuccessImportModal={setSuccessImportModal}
      />

      <CreateNewSegmentModal
        isNewSegment={isNewSegment}
        setIsNewSegment={setIsNewSegment}
      />
      <div className="min-h-screen py-8 p-4 sm:p-5 overflow-x-hidden mb-20">
        <div className=" w-full">
          <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
            <div className="">
              <h4 className="text-3xl text-dark">Segments</h4>
            </div>
            <div className="w-full flex justify-end sm:w-fit">
              <button
                onClick={handleSegment}
                className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-primarydark text-white"
                id="button-280"
              >
                {/* <img src={Add} alt="Add" /> */}
                <IoMdAdd size={22} />
                <span className="hidden md:block">Add Segments</span>
              </button>
            </div>
          </div>

          {/* <div className="flex flex-col border border-primary my-8 rounded-xl"> */}
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <DynamicTableComponent
                columns={defaultColumns}
                data={companyInfo}
                selectable={true}
                onSelectChange={handleSelectionChange}
                actions={true}
                view={false}
                edit={false}
                categories={categories}
                statuses={statuses}
                deletelabel="Are you sure?"
                deletepara="This will permanently delete all 200 companies. This action cannot be undone."
                deletebutton1="Cancel"
                deletebutton2="Delete"
                deleteBtn={true}
                printBtn={true}
                importBtn={false}
                ExportBtn={true}
                tableCountLabel={true}
                filter={true}
                search={true}
              />
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Segments;
