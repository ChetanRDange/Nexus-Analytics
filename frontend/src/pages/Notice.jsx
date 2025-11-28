import React, { useContext, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import SuccessIcon from "../assets/svgs/success-icon.svg";
import BulkTable from "../Components/BulkTable";
import ImportCompaniesModal from "../Components/ImportCompaniesModal";
import InvitationSuccessModal from "../Components/InvitationSuccessModal";
import NewTable from "../Components/NewTable";
import formatDateTime from "../utils/DateFormat";
import { getNoticeSampleData } from "../utils/SampleFileData";
import DeleteConfirm from "./DeleteConfirm";
import { GlobalContext } from "../App";

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
    id: 1,
    name: "Inactive",
    searchBy: "status",

    bgColor: "#FEF3F2",
    color: "#B32318",
    dotColor: "#F04438",
  },
  // {
  //   id: 2,
  //   name: "Archieved",
  //   searchBy: "status",
  //   bgColor: "#F2F4F7",
  //   color: "#344054",
  //   dotColor: "#667085",
  // },
  {
    id: 2,
    name: "Archieved",
    searchBy: "status",
    bgColor: "#FFFAEB",
    color: "#B54708",
    dotColor: "#F79009",
  },
];

const defaultColumns = [
  {
    id: 0,
    Header: "Notice Description",
    searchable: true,
    accessor: "content",
    render: (value) => {
      return value ? (
        <p className="truncate">{value}</p>
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      );
    },
    isMandatory: true,
  },
  {
    id: 1,
    Header: "Notice Type",
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
    // isMandatory: true,
  },
  {
    id: 2,

    Header: "Start Date",
    accessor: "startDate",
    render: (value) =>
      value ? (
        formatDateTime(value)
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
    // isMandatory: true,
  },
  {
    id: 3,

    Header: "End Date",
    accessor: "endDate",
    render: (value) =>
      value ? (
        formatDateTime(value)
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
    // isMandatory: true,
  },
  {
    id: 4,

    Header: "Status",
    searchable: true,
    accessor: "status",
    render: (value) => {
      const statusStyles = {
        light: {
          Scheduled: "bg-[#EFF8FF] text-[#175CD3]",
          Inactive: "bg-[#FEF3F2] text-[#B32318]",
          Active: "bg-[#ECFDF3] text-[#027948]",
          Draft: "bg-[#FFFBEB] text-[#FFB700]",
        },
        dark: {
          Scheduled: "bg-[#1D2939] text-[#53B1FD]",
          Inactive: "bg-[#3A1212] text-[#FDA29B]",
          Active: "bg-[#0C3A2C] text-[#4ADE80]",
          Draft: "bg-[#3A2A16] text-[#FCD34D]",
        },
      };

      const statusColors = {
        light: {
          Scheduled: "#2E90FA",
          Inactive: "#F04438",
          Active: "#12B76A",
          Draft: "#FFB700",
        },
        dark: {
          Scheduled: "#53B1FD",
          Inactive: "#FDA29B",
          Active: "#4ADE80",
          Draft: "#FCD34D",
        },
      };

      const theme = document.body.getAttribute("theme") || "dark";
      const currentStyles = statusStyles[theme];
      const currentColors = statusColors[theme];

      return value ? (
        <div
          className={`rounded-xl ${currentStyles[value]} px-2 w-fit flex gap-2 items-center`}
        >
          <span
            className="min-w-[12px] min-h-[12px] rounded-full"
            style={{ backgroundColor: currentColors[value] }}
          ></span>
          <span>{value}</span>
        </div>
      ) : (
        <span
          className={`w-full text-center ${
            theme === "dark"
              ? "bg-[#3A1212] text-[#FDA29B]"
              : "bg-[#FEF3F2] text-[#B32318]"
          } px-2 py-1 rounded-lg`}
        >
          Required
        </span>
      );
    },
  },

  {
    id: 5,

    Header: "Created At",
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
    id: 6,

    Header: "Updated At",
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
  {
    id: 7,
    Header: "Created By",
    accessor: "createdBy.email",
    render: (value) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
  {
    id: 8,
    Header: "Updated By",
    accessor: "updatedBy.email",
    render: (value) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
];

const bulkColumns = [
  // {
  //   Header: "Title",
  //   key: "title",
  //   required: true,
  // },
  {
    Header: "Content",
    key: "content",
    required: true,
  },
  {
    Header: "Type",
    key: "type",
    required: true,
  },
  {
    Header: "Start Date",
    key: "startDate",
    required: true,
  },
  {
    Header: "Start Time",
    key: "startTime",
    required: false,
  },
  {
    Header: "End Date",
    key: "endDate",
    required: true,
  },
  {
    Header: "End Time",
    key: "endTime",
    required: false,
  },
  {
    Header: "Status",
    key: "status",
    required: false,
  },
  {
    Header: "Is Activated",
    key: "isActivated",
    required: false,
  },
];

const schemaMapping = {
  // title: "title",
  content: "content",
  type: "type",
  startDate: "startDate",
  endDate: "endDate",
  status: "status",
  startTime: "startTime",
  endTime: "endTime",
  isActivated: "isActivated",
};

const Notice = () => {
  const { fullScreen } = useContext(GlobalContext);

  const [isInviteSentModalOpen, setIsInviteSentModalOpen] = useState(false);
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const [isImportSuccess, setIsImportSuccess] = useState(false);
  const [isImportCompanyModalOpen, setIsImportCompanyModalOpen] =
    useState(false);
  const [successImportModal, setSuccessImportModal] = useState(false);
  const [fileImportedData, setFileImportedData] = useState([]);
  const [isFileImported, setIsFileImported] = useState(false);

  const tableMetaData = {
    tableName: "notice",
    endpoint: "/private/notices",
    viewPath: "notices/view",
    editPath: "notices/edit",
    copyPath: "notices/add",
    bulkImport: true,
    showDeleteAll: true,
    deleteField: "type",
    model: "Notice",
    // targetAudiences: (data) => {},
  };

  // type, isActive
  // ["info", "success", "danger"]

  const tableFilters = [
    {
      type: "multiSelect",
      key: "type",
      title: "Type",
      options: [
        { title: "Info", value: "info" },
        { title: "Success", value: "success" },
        { title: "Danger", value: "danger" },
      ],
    },
    {
      type: "multiSelect",
      key: "status",
      title: "Status",
      options: [
        { title: "Active", value: "Active" },
        { title: "Inactive", value: "Inactive" },
      ],
    },
  ];

  return (
    <>
      <ImportCompaniesModal
        isImportCompanyModalOpen={isImportCompanyModalOpen}
        setIsImportCompanyModalOpen={setIsImportCompanyModalOpen}
        heading="Notice"
        successImportModal={successImportModal}
        setSuccessImportModal={setSuccessImportModal}
      />
      <InvitationSuccessModal
        isInviteSuccessModalOpen={successImportModal}
        setIsInviteSuccessModalOpen={setSuccessImportModal}
        SuccessIcon={SuccessIcon}
        title="Notices Added Successfully!"
        para="200 notices have been add."
        navigation="/notices"
        setIsImportSuccess={setIsImportSuccess}
      />

      <div className=" py-8 p-4 sm:p-5 overflow-x-hidden ">
        <div className=" w-full">
          {!fullScreen && (
            <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
              <div className="">
                <h4 className="text-3xl text-dark">Notices</h4>
              </div>
              <div className="w-full flex justify-end sm:w-fit">
                <Link
                  id="add-notice"
                  to="/notices/add"
                  className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-primarydark text-white"
                >
                  {/* <img src={Add} alt="Add" /> */}
                  <IoMdAdd size={22} />
                  <span>Add Notice</span>
                </Link>
              </div>
            </div>
          )}

          {isFileImported && (
            // <div className="flex flex-col border border-primary my-8 rounded-xl">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full align-middle">
                <DeleteConfirm
                  isInviteSentModalOpen={isInviteSentModalOpen}
                  setIsInviteSentModalOpen={setIsInviteSentModalOpen}
                />
                <BulkTable
                  bulkendpoint="/notices/bulk"
                  defaultColumns={bulkColumns}
                  data={fileImportedData}
                  schemaMapping={schemaMapping}
                  setIsFileImported={setIsFileImported}
                />
              </div>
            </div>
            // </div>
          )}

          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              {!isFileImported && (
                <NewTable
                  tableFilters={tableFilters}
                  columns={defaultColumns}
                  tableMetaData={tableMetaData}
                  triggerRefetch={triggerRefetch}
                  setTriggerRefetch={setTriggerRefetch}
                  statuses={statuses}
                  sampleFileDataxlsx={getNoticeSampleData}
                  setFileImportedData={setFileImportedData}
                  setIsFileImported={setIsFileImported}
                  showCopyAction={true}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notice;
