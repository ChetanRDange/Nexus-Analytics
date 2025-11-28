import React, { useContext, useState } from "react";
import { IoMdAdd, IoMdRefresh } from "react-icons/io";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import NewTable from "../Components/NewTable";
import PlanDeleteModal from "../Components/PlanDeleteModal";
import formatDateTime from "../utils/DateFormat";
import useMutation from "../hooks/useMutation";
import { GlobalContext } from "../App";

const staticPositions = [
  {
    title: "Top Left",
    value: "top-left",
  },
  {
    title: "Top Center",
    value: "top-center",
  },
  {
    title: "Top Right",
    value: "top-right",
  },
  {
    title: "Bottom Left",
    value: "bottom-left",
  },
  {
    title: "Bottom Center",
    value: "bottom-center",
  },
  {
    title: "Bottom Right",
    value: "bottom-right",
  },
];

const staticTypes = [
  {
    title: "Success",
    value: "success",
  },
  {
    title: "Error",
    value: "error",
  },
  {
    title: "Info",
    value: "info",
  },
  {
    title: "Loading",
    value: "loading",
  },
  {
    title: "Custom",
    value: "custom",
  },
];

const columns = [
  {
    id: 0,
    Header: "Message",
    accessor: "message",
    isMandatory: true,
  },
  {
    id: 1,
    Header: "Description",
    accessor: "description",
  },

  {
    id: 2,
    Header: "Panel",
    accessor: "panel",
    render: (value) => (value === "admin" ? "Admin" : "Organization"),
  },
  {
    id: 3,
    Header: "Type",
    accessor: "type",
    render: (value) =>
      staticTypes.find((type) => type.value === value)?.title || "NA",
  },
  {
    id: 4,
    Header: "Position",
    accessor: "position",
    render: (value) => {
      const position = staticPositions.find((pos) => pos.value === value);
      return position ? position.title : "NA";
    },
  },
  {
    id: 5,
    Header: "Updated By",
    accessor: "updatedBy.name",
  },
  {
    id: 6,
    Header: "Status",
    accessor: "isActive",
    render: (value) => {
      const statusStyles = {
        light: {
          Active: "bg-[#ECFDF3] text-[#027948]",
          Draft: "bg-[#F2F4F7] text-[#344054]",
        },
        dark: {
          Active: "bg-[#0C3A2C] text-[#4ADE80]",
          Draft: "bg-[#1F2937] text-[#9CA3AF]",
        },
      };

      const dotColors = {
        light: {
          Active: "#12B76A",
          Draft: "#667085",
        },
        dark: {
          Active: "#4ADE80",
          Draft: "#9CA3AF",
        },
      };

      const status = value ? "Active" : "Draft";
      const theme = document.body.getAttribute("theme") || "dark";
      const currentStyles = statusStyles[theme];
      const currentDotColors = dotColors[theme];

      return (
        <div
          className={`rounded-xl ${currentStyles[status]} px-2 w-fit flex gap-2 items-center`}
        >
          <span
            className="min-w-[8px] min-h-[8px] rounded-full"
            style={{ backgroundColor: currentDotColors[status] }}
          ></span>
          <span>{status}</span>
        </div>
      );
    },
  },
  {
    id: 7,
    Header: "Created At",
    accessor: "createdAt",
    render: (value) => formatDateTime(value),
  },
  {
    id: 8,
    Header: "Updated At",
    accessor: "updatedAt",
    render: (value) => formatDateTime(value),
  },
];

const SuccessResponseMessages = () => {
  const { fullScreen } = useContext(GlobalContext);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { callApi } = useMutation();
  const navigate = useNavigate();

  const tableMetaData = {
    model: "Response Message",
    tableName: "responseMessage",
    endpoint: "/private/responseMessage",
    editPath: "response-message/edit",
    viewPath: "response-message/view",
  };

  const tableFilters = [
    {
      type: "multiSelect",
      key: "panel",
      title: "Panel",
      options: [
        { title: "Organization", value: "org" },
        { title: "Admin", value: "admin" },
      ],
    },
    // {
    //   type: "multiSelect",
    //   key: "type",
    //   title: "Type",
    //   options: staticTypes,
    // },
    {
      type: "multiSelect",
      key: "position",
      title: "Position",
      options: staticPositions,
    },
    {
      type: "multiSelect",
      key: "isActive",
      title: "Status",
      options: [
        { title: "Active", value: true },
        { title: "Draft", value: false },
      ],
    },
  ];

  const handleReset = async () => {
    const result = await callApi("/private/responseMessage/refresh", "POST", {
      type: "success",
    });
    if (result) navigate("/response-messages");
  };

  return (
    <>
      <PlanDeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
      <div className="py-8 p-4 sm:p-5 overflow-x-hidden mb-20">
        {!fullScreen && (
          <div className="w-full pb-4 gap-y-4 gap-2 flex items-start border-b border-primary justify-between">
            <h4 className="text-2xl md:text-3xl text-dark">
              Success Response Messages
            </h4>
            <div className="w-full flex justify-end sm:w-fit">
              <button
                onClick={handleReset}
                className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-primarydark text-white"
              >
                <IoMdRefresh size={22} />
                <span>Reset</span>
              </button>
            </div>
          </div>
        )}

        <NewTable
          tableFilters={tableFilters}
          columns={columns}
          tableMetaData={tableMetaData}
          showDeleteAction={false}
          preFilters={{
            type: {
              $in: ["success"],
            },
          }}
          passName="key"
        />
      </div>
    </>
  );
};

export default SuccessResponseMessages;
