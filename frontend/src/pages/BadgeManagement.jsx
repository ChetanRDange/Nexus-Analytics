import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import Download from "../assets/svgs/download.svg";
import Medal1 from "../assets/svgs/medal1.svg";
import Medal2 from "../assets/svgs/medal2.svg";
import SuccessIcon from "../assets/svgs/success-icon.svg";
import DynamicTableComponent from "../Components/DynamicTableComponent";
import ImportCompaniesModal from "../Components/ImportCompaniesModal";
import InvitationSuccessModal from "../Components/InvitationSuccessModal";
import NewTable from "../Components/NewTable";
import formatDateTime from "../utils/DateFormat";
import DeleteConfirm from "./DeleteConfirm";
import BulkTable from "../Components/BulkTable";
import { getBadgeSampleData } from "../utils/SampleFileData";

const newbadgeData = [
  {
    id: "0",
    srNo: "001",
    badgeIcon: "",
    badgeName: "Top Performer",
    badgeType: "Achievement",
    description: "Awarded to users who complete 50 orders.",
    achievementCriteria: "Complete 50 orders",
    status: "Active",
    createdAt: "22-08-2024, 02.00 AM",
    updatedAt: "22-08-2024, 02.00 AM",
  },
  {
    id: "1",
    srNo: "002",
    badgeIcon: Medal1,
    badgeName: "Star Contributor",
    badgeType: "",
    description: "Earn 5-star ratings from 10 users.",
    achievementCriteria: "Earn 5-star ratings from 10 users",
    status: "Active",
    createdAt: "22-08-2024, 02.00 AM",
    updatedAt: "22-08-2024, 02.00 AM",
  },
  {
    id: "2",
    srNo: "003",
    badgeIcon: "",
    badgeName: "Gold Member",
    badgeType: "",
    description: "Given to users who achieve ₹10,000 in purchases.",
    achievementCriteria: "Reach ₹10,000 in purchases",
    status: "Inactive",
    createdAt: "22-08-2024, 02.00 AM",
    updatedAt: "22-08-2024, 02.00 AM",
  },
  {
    id: "3",
    srNo: "004",
    badgeIcon: Medal1,
    badgeName: "Diamond Collector",
    badgeType: "",
    description: "Make 100 purchases.",
    achievementCriteria: "Make 100 purchases",
    status: "Inactive",
    createdAt: "22-08-2024, 02.00 AM",
    updatedAt: "22-08-2024, 02.00 AM",
  },
  {
    id: "4",
    srNo: "005",
    badgeIcon: Medal2,
    badgeName: "Rising Star",
    badgeType: "Achievement",
    description: "Achieve level 5 in user ranking.",
    achievementCriteria: "Achieve level 5 in user ranking",
    status: "Active",
    createdAt: "22-08-2024, 02.00 AM",
    updatedAt: "22-08-2024, 02.00 AM",
  },
  {
    id: "5",
    srNo: "006",
    badgeIcon: "",
    badgeName: "Business Leader",
    badgeType: "Milestone",
    description: "Register a company profile.",
    achievementCriteria: "Register a company profile",
    status: "Active",
    createdAt: "22-08-2024, 02.00 AM",
    updatedAt: "22-08-2024, 02.00 AM",
  },
  {
    id: "6",
    srNo: "007",
    badgeIcon: "",
    badgeName: "Silver Supporter",
    badgeType: "Achievement",
    description: "Contribute to 10 forum discussions.",
    achievementCriteria: "Contribute to 10 forum discussions",
    status: "Active",
    createdAt: "22-08-2024, 02.00 AM",
    updatedAt: "22-08-2024, 02.00 AM",
  },
  {
    id: "7",
    srNo: "008",
    badgeIcon: Medal2,
    badgeName: "Target Reacher",
    badgeType: "",
    description: "Complete 5 goals in the challenge.",
    achievementCriteria: "Complete 5 goals in the challenge",
    status: "Active",
    createdAt: "22-08-2024, 02.00 AM",
    updatedAt: "22-08-2024, 02.00 AM",
  },
  {
    id: "8",
    srNo: "009",
    badgeIcon: Medal1,
    badgeName: "Diamond Collector",
    badgeType: "Reward",
    description: "Earn 500 loyalty points.",
    achievementCriteria: "Earn 500 loyalty points",
    status: "Active",
    createdAt: "22-08-2024, 02.00 AM",
    updatedAt: "22-08-2024, 02.00 AM",
  },
  {
    id: "9",
    srNo: "010",
    badgeIcon: "",
    badgeName: "Learning Master",
    badgeType: "Achievement",
    description: "Complete 5 advanced learning modules.",
    achievementCriteria: "Complete 5 advanced learning modules",
    status: "Active",
    createdAt: "22-08-2024, 02.00 AM",
    updatedAt: "22-08-2024, 02.00 AM",
  },
];

const defaultColumns = [
  {
    Header: "Badge Icon",
    accessor: "icon",
    render: (value) => {
      return value ? (
        <img
          src={value}
          alt="Badge Icon"
          className="w-8 h-8 rounded-full object-cover"
          onError={(e) => (e.target.src = Medal1)}
        />
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      );
    },
    isMandatory: true,
  },

  {
    Header: "Badge Name",
    searchable: true,
    accessor: "name",
    render: (value) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
    isMandatory: true,
  },
  {
    Header: "Badge Type",
    searchable: true,
    accessor: "type",
    render: (value) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
    isMandatory: true,
  },
  {
    Header: "Description",
    searchable: true,
    accessor: "description",
    render: (value) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
    isMandatory: true,
  },
  {
    Header: "Achievement Criteria",
    searchable: true,
    accessor: "criteria", // This will map to the `achievementCriteria` field in badgeData
    render: (value) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
    isMandatory: true,
  },
  {
    Header: "Status",
    searchable: true,
    accessor: "status",
    render: (value) => {
      const statusStyles = {
        Inactive: "bg-[#F2F4F7] text-primary",
        Active: "bg-[#ECFDF3] text-[#027948]",
      };
      const statusColors = {
        Inactive: "#667085",
        Active: "#12B76A",
      };

      return (
        <div
          className={`rounded-xl ${statusStyles[value]} px-2 py-1 w-fit flex gap-2 items-center`}
        >
          <span
            className="min-w-[8px] min-h-[8px] rounded-full"
            style={{ backgroundColor: statusColors[value] }}
          ></span>
          <span>{value}</span>
        </div>
      );
    },
  },
  {
    Header: "Created Date",
    accessor: "createdAt",
    render: (value) =>
      value ? (
        formatDateTime(value)
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
  {
    Header: "Updated Date",
    accessor: "updatedAt",
    render: (value) =>
      value ? (
        formatDateTime(value)
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
];

const bulkTableColumns = [
  {
    Header: "Badge Icon",
    key: "icon",
  },
  {
    Header: "Badge Name",
    key: "name",
    required: true,
  },
  {
    Header: "Badge Type",
    key: "type",
    required: true,
  },
  {
    Header: "Description",
    key: "description",
  },
  {
    Header: "Achievement Criteria",
    key: "criteria",
    required: true,
  },
  {
    Header: "Status",
    key: "status",
  },
];

const statuses = [
  {
    id: 0,
    name: "Active",
    searchBy: "status",
    bgColor: "#ECFDF3",
    color: "#027948",
    dotColor: "#12B76A",
  },
  {
    id: 2,
    name: "Inactive",
    searchBy: "status",
    bgColor: "#F2F4F7",
    color: "#344054",
    dotColor: "#667085",
  },
];

const schemaMapping = {
  name: "name", // Maps directly from processed JSON
  description: "description",
  type: "type",
  criteria: "criteria",
  icon: "icon",
  status: "status", // Default status
};

const BadgeManagement = () => {
  const [successImportModal, setSuccessImportModal] = useState(false);
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const [isInviteSentModalOpen, setIsInviteSentModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState(0);
  const [isImportCompanyModalOpen, setIsImportCompanyModalOpen] =
    useState(false);
  const [isImportSuccess, setIsImportSuccess] = useState(false);
  const [fileImportedData, setFileImportedData] = useState([]);
  const [isFileImported, setIsFileImported] = useState(false);

  const tableMetaData = {
    model: "Badge",
    endpoint: "/private/badge",
    viewPath: "view-badge-details",
    editPath: "edit-badge",
    bulkImport: true,
    showDeleteAll: true,
    deleteField: "name",
  };

  const handleSelectionChange = (selectedIds) => {
    setSelectedIds(selectedIds.length);
    console.log("Selected IDs:", selectedIds);
  };
  if (isImportSuccess) {
    console.log("Success");
  }
  const openImportModal = () => {
    setIsImportCompanyModalOpen(true);
  };
  return (
    <>
      <ImportCompaniesModal
        isImportCompanyModalOpen={isImportCompanyModalOpen}
        setIsImportCompanyModalOpen={setIsImportCompanyModalOpen}
        heading="Badge Management"
        successImportModal={successImportModal}
        setSuccessImportModal={setSuccessImportModal}
      />
      <InvitationSuccessModal
        isInviteSuccessModalOpen={successImportModal}
        setIsInviteSuccessModalOpen={setSuccessImportModal}
        title="Badges Added Successfully!"
        para="200 documents have been add."
        navigation="/badge-management"
        SuccessIcon={SuccessIcon}
        setIsImportSuccess={setIsImportSuccess}
      />
      <div className="min-h-screen py-8 p-4 sm:p-5 overflow-x-hidden mb-20">
        <div className=" w-full">
          <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
            <div className="">
              <h4 className="text-3xl text-dark">Badge Management</h4>
            </div>
            <div className="w-full flex justify-end sm:w-fit">
              <Link
                id="add-badge"
                to="/add-badge"
                className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-primarydark text-white"
              >
                {/* <img src={Add} alt="Add" /> */}
                <IoMdAdd size={22} />
                <span className="hidden md:block">Add Badge</span>
              </Link>
            </div>
          </div>
          {/* {isImportSuccess && (
            <div className="flex flex-col border border-primary my-8 rounded-xl">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full align-middle">
                  <div className="w-full flex flex-col-reverse sm:flex-row flex-wrap gap-y-4 justify-between px-6 ptpb-4 border-b border-primary">
                    <div className="flex gap-1 flex-col justify-start">
                      <h3 className="text-lg font-semibold">
                        10 records couldn’t be added.
                      </h3>
                      <p className="text-secondary font-normal">
                        We couldn’t add these records due to invalid format or
                        missing data.
                      </p>
                    </div>
                    <DeleteConfirm
                      isInviteSentModalOpen={isInviteSentModalOpen}
                      setIsInviteSentModalOpen={setIsInviteSentModalOpen}
                    />
                    <div className="w-full xl:w-fit flex flex-wrap sm:flex-nowrap justify-end gap-2 items-center">
                      <button className="w-[100px] sm:w-fit text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-1.5 sm:py-2 px-2 sm:px-3 whitespace-nowrap flex gap-2" id="button-155">
                        <img src={Download} alt="Download" />
                        <span>Export & Fix</span>
                      </button>
                    </div>
                  </div>
                  <DynamicTableComponent
                    columns={defaultColumns}
                    data={newbadgeData}
                    selectable={true}
                    onSelectChange={handleSelectionChange}
                    actions={true}
                  />
                </div>
              </div>
            </div>
          )} */}

          {isFileImported && (
            // <div className="flex flex-col border border-primary my-8 rounded-xl">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full align-middle">
                <DeleteConfirm
                  isInviteSentModalOpen={isInviteSentModalOpen}
                  setIsInviteSentModalOpen={setIsInviteSentModalOpen}
                />
                <BulkTable
                  bulkendpoint="/badge/bulk"
                  defaultColumns={bulkTableColumns}
                  data={fileImportedData}
                  schemaMapping={schemaMapping}
                  setIsFileImported={setIsFileImported}
                />
              </div>
            </div>
            // </div>
          )}

          <div className="flex flex-col my-8 rounded-xl">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full align-middle">
                {/* <DynamicTableComponent
                  columns={defaultColumns}
                  data={badgeData}
                  selectable={true}
                  onSelectChange={handleSelectionChange}
                  openImportModal={openImportModal}
                  actions={true}
                  view={true}
                  edit={true}
                  page="badge"
                  editPage="/edit-badge"
                  categories={categories}
                  statuses={statuses}
                  deleteBtn={false}
                  printBtn={true}
                  importBtn={true}
                  ExportBtn={true}
                  tableCountLabel={true}
                  filter={true}
                  search={true}
                /> */}

                {!isFileImported && (
                  <NewTable
                    columns={defaultColumns}
                    tableMetaData={tableMetaData}
                    triggerRefetch={triggerRefetch}
                    setTriggerRefetch={setTriggerRefetch}
                    statuses={statuses}
                    sampleFileDataxlsx={getBadgeSampleData}
                    setFileImportedData={setFileImportedData}
                    setIsFileImported={setIsFileImported}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BadgeManagement;
