import React, { useContext, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import NewTable from "../Components/NewTable";
import PlanDeleteModal from "../Components/PlanDeleteModal";
import formatDateTime from "../utils/DateFormat";
import { GlobalContext } from "../App";

const columns = [
  {
    id: 0,
    Header: "Plan Name",
    accessor: "name",
    searchable: true,
    isMandatory: true,
  },
  {
    id: 1,
    Header: "Description",
    accessor: "description",
    searchable: true,
  },
  {
    id: 2,
    Header: "Billed Type",
    accessor: "duration",
    searchable: true,
    render: (value) =>
      value ? value.charAt(0).toUpperCase() + value.slice(1) : "",
  },
  {
    id: 3,
    Header: "Currency",
    accessor: "currency",
    searchable: true,
  },
  {
    id: 4,
    Header: "Price",
    accessor: "originalPrice",
    searchable: true,
  },
  {
    id: 5,
    Header: "Discounted Price",
    accessor: "discountedPrice",
    searchable: true,
  },
  {
    id: 6,
    Header: "Trial Available",
    accessor: "trial",
    searchable: true,
    render: (value) => (value ? "Yes" : "No"),
  },
  {
    id: 7,
    Header: "Status",
    accessor: "isActive",
    // searchable: true,
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
    id: 8,
    Header: "Created At",
    accessor: "createdAt",
    render: (value) => formatDateTime(value),
  },
  {
    id: 9,
    Header: "Updated At",
    accessor: "updatedAt",
    render: (value) => formatDateTime(value),
  },
  {
    id: 10,
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
    id: 11,
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

const Plans = () => {
  const { fullScreen } = useContext(GlobalContext);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const tableMetaData = {
    model: "Plans",
    tableName: "plans",
    endpoint: "/private/plans/all/Normal", //backend
    deleteEndPoint: "/private/plans", //backend
    editPath: "edit-plan", //frontend
    viewPath: "view-plan-details",
    copyPath: "add-plan",
    sort: {
      sortBy: "originalPrice",
      order: "asc",
    },
  };

  const tableFilters = [
    {
      type: "multiSelect",
      key: "duration",
      title: "Billed Type",
      options: [
        { title: "Monthly", value: "monthly" },
        { title: "Yearly", value: "yearly" },
      ],
    },
    {
      type: "multiSelect",
      key: "currency",
      title: "Currency",
      options: [
        { title: "USD", value: "USD" },
        { title: "INR", value: "INR" },
        { title: "AED", value: "AED" },
      ],
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
    {
      type: "multiSelect",
      key: "trial",
      title: "Trial Applicable",
      options: [
        { title: "Yes", value: true },
        { title: "No", value: false },
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
        {!fullScreen && (
          <div className="w-full pb-4 gap-y-4 gap-2 flex items-start border-b border-primary justify-between">
            <h4 className="text-2xl md:text-3xl text-dark">Normal Plans</h4>
            <Link
              id="add-plan"
              to="/add-plan"
              className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-primarydark text-white"
            >
              <IoMdAdd size={22} />
              <span className="">Add Plan</span>
            </Link>
          </div>
        )}

        <div className="-m-1.5 mt-4">
          <NewTable
            tableFilters={tableFilters}
            columns={columns}
            tableMetaData={tableMetaData}
            showDeleteAction={false}
            showCopyAction={true}

          />
        </div>
      </div>
    </>
  );
};

export default Plans;
