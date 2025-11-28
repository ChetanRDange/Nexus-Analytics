import React, { useContext, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import BulkTable from "../Components/BulkTable";
import NewTable from "../Components/NewTable";
import formatDateTime from "../utils/DateFormat";
import { getDocumentationCustomData } from "../utils/SampleFileData";
import DeleteConfirm from "./DeleteConfirm";
import { GlobalContext } from "../App";

const statuses = [
  {
    id: 0,
    name: "Published",
    searchBy: "status",
    bgColor: "#ECFDF3",
    color: "#027948",
    dotColor: "#12B76A",
  },
  {
    id: 1,
    name: "Draft",
    searchBy: "status",
    bgColor: "#FFFAEB",
    color: "#B54708",
    dotColor: "#F79009",
  },
];

const defaultColumns = [
  {
    id: 0,
    Header: "Module Name",
    searchable: true,
    accessor: "module",
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
    id: 1,
    Header: "Title",
    searchable: true,
    accessor: "title",
    render: (value) =>
      value ? (
        <p className="truncate">
          {value.length > 20 ? `${value.slice(0, 20)}...` : value}
        </p>
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
    // isMandatory: true,
  },
  {
    id: 2,
    Header: "Content",
    searchable: true,
    accessor: "content",
    render: (value) =>
      value ? (
        <div className="truncate">
          {Array.isArray(value) ? (
            <span>{`${value.length} video${
              value.length !== 1 ? "s" : ""
            }`}</span>
          ) : (
            <span className="text-gray-400">No videos</span>
          )}
        </div>
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
    // isMandatory: true,
  },
  {
    id: 3,
    Header: "Status",
    searchable: true,
    accessor: "status",
    render: (value) => {
      const statusStyles = {
        light: {
          Draft: "bg-[#FFFAEB] text-[#B54708]",
          Published: "bg-[#ECFDF3] text-[#027948]",
        },
        dark: {
          Draft: "bg-[#3A2A16] text-[#FCD34D]",
          Published: "bg-[#0C3A2C] text-[#4ADE80]",
        },
      };

      const statusColors = {
        light: {
          Draft: "#F79009",
          Published: "#12B76A",
        },
        dark: {
          Draft: "#FCD34D",
          Published: "#4ADE80",
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
    // isMandatory: true,
  },
  {
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
  {
    Header: "Module Name",
    key: "module",
    required: true,
  },
  {
    Header: "Title",
    key: "title",
    required: true,
  },
  {
    Header: "Link Title",
    key: "linkTitle",
    required: true,
  },
  {
    Header: "Link",
    key: "link",
    required: false,
  },
  {
    Header: "Description",
    key: "description",
    required: true,
  },
  {
    Header: "Status",
    key: "status",
    required: true,
  },
  {
    Header: "Created At",
    key: "createdAt",
    required: false,
  },
  {
    Header: "Updated At",
    key: "updatedAt",
    required: false,
  },
];

const schemaMapping = {
  module: "module",
  title: "title",
  status: "status",
  content: (data) => [
    {
      linkTitle: data.linkTitle || "",
      link: data.link ? [data.link] : [],
      description: data.description || "",
      _id: null,
    },
  ],
  createdAt: (data) => data.createdAt || new Date().toISOString(),
  updatedAt: (data) => data.updatedAt || new Date().toISOString(),
};

const Documentation = () => {
  const { fullScreen } = useContext(GlobalContext);
  const [isInviteSentModalOpen, setIsInviteSentModalOpen] = useState(false);
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const [isImportSuccess, setIsImportSuccess] = useState(false);
  const [fileImportedData, setFileImportedData] = useState([]);
  const [isFileImported, setIsFileImported] = useState(false);
  const [isImportCompanyModalOpen, setIsImportCompanyModalOpen] =
    useState(false);
  const [successImportModal, setSuccessImportModal] = useState(false);

  const tableMetaData = {
    tableName: "documentation",
    model: "Documentation",
    endpoint: "/private/documentation",
    viewPath: "documentation/view",
    editPath: "documentation/edit",
    copyPath: "documentation/add",
    bulkImport: true,
    showDeleteAll: true,
    deleteField: "module",
  };

  // enum: ["Published", "Draft"],

  const tableFilters = [
    {
      type: "multiSelect",
      key: "status",
      title: "Status",
      options: [
        { title: "Published", value: "Published" },
        { title: "Draft", value: "Draft" },
      ],
    },
  ];

  const openImportModal = () => {
    setIsImportCompanyModalOpen(true);
  };

  return (
    <>
      {/* <div className="min-h-screen py-8 p-4 sm:p-5 overflow-x-hidden mb-20"> */}
      <div className="py-8 p-4 sm:p-5 overflow-x-hidden">
        <div className=" w-full">
          {!fullScreen && (
            <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex justify-between items-center   ">
              <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
                Documentations
              </h4>
              <div className="flex gap-2">
                <Link
                  id="documentation/add"
                  to="/documentation/add"
                  className="flex gap-1 h-fit items-center px-0.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-primarydark text-white text-sm md:text-base"
                >
                  {/* <img src={Add} alt="Add" /> */}
                  <IoMdAdd size={22} />
                  <span>Add Documentation</span>
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
                  bulkendpoint="/documentation/bulk"
                  defaultColumns={bulkColumns}
                  data={fileImportedData}
                  schemaMapping={schemaMapping}
                  setIsFileImported={setIsFileImported}
                />
              </div>
            </div>
            // </div>
          )}
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full align-middle">
                {!isFileImported && (
                  <NewTable
                    tableFilters={tableFilters}
                    columns={defaultColumns}
                    tableMetaData={tableMetaData}
                    triggerRefetch={triggerRefetch}
                    setTriggerRefetch={setTriggerRefetch}
                    bulkColumns={bulkColumns}
                    statuses={statuses}
                    sampleFileDataxlsx={getDocumentationCustomData}
                    setFileImportedData={setFileImportedData}
                    setIsFileImported={setIsFileImported}
                    showCopyAction={true}
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

export default Documentation;
