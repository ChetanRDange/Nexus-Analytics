import React, { useContext, useState } from "react";
import NewTable from "../Components/NewTable";
import formatDateTime from "../utils/DateFormat";
import { GlobalContext } from "../App";

const defaultColumns = [
  {
    id: 0,
    Header: "Company Name",
    accessor: "company.companyName",
    searchable: true,
  },
  { id: 1, Header: "User Name", accessor: "user.name" },
  {
    id: 2,
    Header: "Type",
    accessor: "company",
    searchable: true,
    render: (value) => {
      return (
        <span className="px-2 py-1 bg-main rounded-lg">
          {value === "N/A" ? "Admin" : "Organization"}
        </span>
      );
    },
  },
  {
    id: 3,
    Header: "Endpoint",
    accessor: "endPoint",
    searchable: true,
    isMandatory: true,
  },
  {
    id: 4,
    Header: "Method",
    accessor: "method",
    searchable: true,
    Cell: ({ value }) => (
      <span className="px-2 py-1 bg-gray-100 rounded-lg">{value}</span>
    ),
  },
  {
    id: 5,
    Header: "Time",
    accessor: "time",
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
    Header: "Response Time",
    accessor: "responseTime",
    searchable: true,
  },
  {
    id: 7,
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      const statusStyles = {
        200: "bg-[#ECFDF3] text-[#027948]", // Success
        304: "bg-[#ECFDF3] text-[#027948]", // Not Modified
        400: "bg-[#FEF3F2] text-[#B42318]", // Client Error
        500: "bg-[#FFFAEB] text-[#F79009]", // Server Error
      };
      const statusColors = {
        200: "#12B76A",
        304: "#12B76A",
        400: "#F04438",
        500: "#FFB904",
      };

      return (
        <div
          className={`rounded-xl ${
            statusStyles[value] || "bg-gray-100 text-gray-600"
          } px-2 py-1 w-fit flex gap-2 items-center`}
        >
          <span
            className="min-w-[12px] min-h-[12px] rounded-full"
            style={{ backgroundColor: statusColors[value] || "#667085" }}
          ></span>
          <span>{value}</span>
        </div>
      );
    },
  },
  { id: 8, Header: "Device", accessor: "device", searchable: true },
  {
    id: 9,
    Header: "IP Address",
    accessor: "ipAddress",
    searchable: true,

    Cell: ({ value }) => (
      <span className="px-2 py-1 bg-gray-100 rounded-lg">{value}</span>
    ),
  },
  { id: 10, Header: "Country", accessor: "country", searchable: true },
  { id: 11, Header: "City", accessor: "city", searchable: true },
  {
    id: 12,
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
];

const types = [
  {
    id: 1,
    name: "Organization",
    value: "Organization",
  },
  {
    id: 2,
    name: "Admin",
    value: "Admin",
  },
];

const ErrorLogs = () => {
  const { fullScreen } = useContext(GlobalContext);
  const [triggerRefetch, setTriggerRefetch] = useState(false);

  const tableMetaData = {
    tableName: "errorLogs",
    model: "Error Logs",
    endpoint: "/private/logs/error",
    viewPath: "error-logs/view",
    showDeleteAll: true,
    deleteField: "type",
  };

  //method and status
  const tableFilters = [
    {
      type: "multiSelect",
      key: "method",
      title: "Method",
      options: [
        { title: "GET", value: "GET" },
        { title: "POST", value: "POST" },
        { title: "PUT", value: "PUT" },
        { title: "DELETE", value: "DELETE" },
      ],
    },
    {
      type: "multiSelect",
      key: "status",
      title: "Status Code",
      options: [
        { title: "200", value: 200 },
        { title: "201", value: 201 },
        { title: "304", value: 304 },
        { title: "400", value: 400 },
        { title: "401", value: 401 },
        { title: "403", value: 403 },
        { title: "500", value: 500 },
      ],
    },
  ];

  return (
    <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
      <div className=" w-full">
        {!fullScreen && (
          <div className="w-full flex justify-between pb-5 border-b border-primary ">
            <div className="">
              <h4 className="text-3xl text-dark">Success Logs</h4>
            </div>
          </div>
        )}

        <div className="-m-1.5">
          <div className="p-1.5 min-w-full align-middle">
            <NewTable
              tableFilters={tableFilters}
              columns={defaultColumns}
              tableMetaData={tableMetaData}
              triggerRefetch={triggerRefetch}
              setTriggerRefetch={setTriggerRefetch}
              showEditAction={false}
              type={types}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorLogs;
