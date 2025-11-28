import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link, useSearchParams } from "react-router-dom";
import NewTable from "../Components/NewTable";
import PlanDeleteModal from "../Components/PlanDeleteModal";
import formatDateTime from "../utils/DateFormat";

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

const ResponseMsg = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const typeFromQuery = searchParams.get("type");

  const tableMetaData = {
    tableName: "responseMessage",
    endpoint: "/private/responseMessage",
    editPath: "response-message/edit",
    viewPath: "response-message/view",
  };

  const validType = staticTypes.some((type) => type.value === typeFromQuery)
    ? typeFromQuery
    : undefined;

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
    {
      type: "multiSelect",
      key: "type",
      title: "Type",
      options: staticTypes,
    },
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

  return (
    <>
      <PlanDeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
      <div className="py-8 p-4 sm:p-5 overflow-x-hidden mb-20">
        <div className="w-full pb-4 gap-y-4 gap-2 flex items-start border-b border-primary justify-between">
          <h4 className="text-2xl md:text-3xl text-dark">Response Messages</h4>
        </div>

        <NewTable
          tableFilters={tableFilters}
          columns={columns}
          tableMetaData={tableMetaData}
          showDeleteAction={false}
          preFilters={validType ? { type: validType } : undefined}
          passName="key"
        />
      </div>
    </>
  );
};

export default ResponseMsg;
