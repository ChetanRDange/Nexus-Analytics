import React, { useState } from "react";
import Printer from "../assets/svgs/printer.svg";
import Download from "../assets/svgs/download.svg";
import Search from "../Components/Search";
import Filters from "../Components/Filters";
import DynamicTableComponent from "../Components/DynamicTableComponent";
import DatePicker from "../Components/DatePicker";
import NewTable from "../Components/NewTable";

// const defaultColumns = [
//   {
//     Header: "Log ID",
//     accessor: "logId",
//   },
//   {
//     Header: "Timestamp",
//     accessor: "timestamp",
//   },
//   {
//     Header: "Status",
//     accessor: "status",
//     Cell: ({ value }) => {
//       const statusStyles = {
//         Success: "bg-[#E6F8EF] text-[#027747]",
//         Failure: "bg-[#FEF3F2] text-[#B32318]",
//       };
//       const statusColors = {
//         Success: "#12B368",
//         Failure: "#F04438",
//       };

//       return (
//         <div
//           className={`rounded-xl ${statusStyles[value]} px-2 py-1 w-fit flex gap-2 items-center`}
//         >
//           <span
//             className="min-w-[12px] min-h-[12px] rounded-full"
//             style={{ backgroundColor: statusColors[value] }}
//           ></span>
//           <span>{value}</span>
//         </div>
//       );
//     },
//   },
//   {
//     Header: "Message",
//     accessor: "message",
//   },
//   {
//     Header: "User",
//     accessor: "user",
//   },
// ];

const defaultColumns = [
  {
    Header: "Log ID",
    accessor: "_id",
  },
  {
    Header: "IP Address",
    accessor: "ipAddress",
  },
  {
    Header: "Location",
    accessor: "location",
  },
  {
    Header: "Device",
    accessor: "source.device",
  },
  {
    Header: "OS",
    accessor: "source.os",
  },
  {
    Header: "Browser",
    accessor: "source.browser",
  },
  {
    Header: "Login Status",
    accessor: "loginStatus",
    render: ({ value }) => {
      const statusStyles = {
        Success: "bg-[#E6F8EF] text-[#027747]",
        Failed: "bg-[#FEF3F2] text-[#B32318]",
      };
      const statusColors = {
        Success: "#12B368",
        Failed: "#F04438",
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
    Header: "Reason (If Failed)",
    accessor: "reasonIfFailed",
    render: (value) => (value ? value : "-"),
  },
  {
    Header: "2FA Used",
    accessor: "twoFactorAuthUsed",
    render: (value) => (value ? "Yes" : "No"),
  },
  {
    Header: "Endpoint",
    accessor: "endpoint",
  },
  {
    Header: "Method",
    accessor: "method",
    render: (value) => {
      const methodStyles = {
        GET: "bg-[#E6F8EF] text-[#027747]",
        POST: "bg-[#E6F2FF] text-[#0056B3]",
        PUT: "bg-[#FFF5E6] text-[#B36B00]",
        DELETE: "bg-[#FEF3F2] text-[#B32318]",
        PATCH: "bg-[#F8E6FF] text-[#6B0277]",
      };

      return (
        <span className={`px-2 py-1 rounded-xl ${methodStyles[value]}`}>
          {value}
        </span>
      );
    },
  },
  {
    Header: "Timestamp",
    accessor: "loginAt",
    render: (value) => new Date(value).toLocaleString(),
  },
  {
    Header: "Page",
    accessor: "page",
  },
  {
    Header: "Activity",
    accessor: "activity",
  },
  {
    Header: "Status Code",
    accessor: "statusCode",
  },
  {
    Header: "Response Time (ms)",
    accessor: "responseTime",
  },
  {
    Header: "Company Admin",
    accessor: "companyAdmin",
  },
  {
    Header: "Company",
    accessor: "company",
  },
];

const categories = [
  {
    id: 0,
    showName: "Email ID",
    name: "Email ID",
  },
  {
    id: 1,
    showName: "Status",
    name: "Status",
  },
  {
    id: 2,
    showName: "Type",
    name: "Type",
  },
];

const comapnyInfo = [
  {
    id: "0",
    srno: "001",
    logId: 2564,
    timestamp: "22-08-2024, 09.20 AM",
    status: "Success",
    message: "API successfully connected",
    user: "Admin",
  },
  {
    id: "1",
    srno: "002",
    logId: 2564,
    timestamp: "22-08-2024, 09.20 AM",
    status: "Success",
    message: "API successfully connected",
    user: "Admin",
  },
  {
    id: "2",
    srno: "003",
    logId: 2564,
    timestamp: "22-08-2024, 09.20 AM",
    status: "Success",
    message: "API successfully connected",
    user: "Admin",
  },
  {
    id: "3",
    srno: "004",
    logId: 2564,
    timestamp: "22-08-2024, 09.20 AM",
    status: "Success",
    message: "API successfully connected",
    user: "Admin",
  },
  {
    id: "4",
    srno: "005",
    logId: 2564,
    timestamp: "22-08-2024, 09.20 AM",
    status: "Success",
    message: "API successfully connected",
    user: "Admin",
  },
  {
    id: "5",
    srno: "006",
    logId: 2564,
    timestamp: "22-08-2024, 09.20 AM",
    status: "Success",
    message: "API successfully connected",
    user: "Admin",
  },
  {
    id: "6",
    srno: "007",
    logId: 2564,
    timestamp: "22-08-2024, 09.20 AM",
    status: "Success",
    message: "API successfully connected",
    user: "Admin",
  },
  {
    id: "7",
    srno: "008",
    logId: 2564,
    timestamp: "22-08-2024, 09.20 AM",
    status: "Success",
    message: "API successfully connected",
    user: "Admin",
  },
  {
    id: "8",
    srno: "009",
    logId: 2564,
    timestamp: "22-08-2024, 09.20 AM",
    status: "Success",
    message: "API successfully connected",
    user: "Admin",
  },
  {
    id: "9",
    srno: "010",
    logId: 2564,
    timestamp: "22-08-2024, 09.20 AM",
    status: "Success",
    message: "API successfully connected",
    user: "Admin",
  },
  {
    id: "10",
    srno: "011",
    logId: 2564,
    timestamp: "22-08-2024, 09.20 AM",
    status: "Success",
    message: "API successfully connected",
    user: "Admin",
  },
];

const AllLogs = () => {
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const [selectedIds, setSelectedIds] = useState(0);

  const tableMetaData = {
    model: "Companies",
    endpoint: "/private/logs/allActivity",
    viewPath: "view-all-details",
    // editPath: "notices/edit",
    bulkImport: true,
    showDeleteAll: true,
    deleteField: "type",
  };

  const handleSelectionChange = (selectedIds) => {
    setSelectedIds(selectedIds.length);
    console.log("Selected IDs:", selectedIds);
  };

  return (
    <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
      <div className=" w-full">
        <div className="w-full flex justify-between pb-5 mb-5 border-b border-primary">
          <div className="">
            <h4 className="text-3xl text-dark">All Activity Logs</h4>
          </div>
        </div>

        <div className="flex flex-col border rounded-xl mb-20">
          <div className="-m-1.5">
            <div className="p-1.5 min-w-full align-middle">
              <div className="w-full border-b border-primary flex flex-col-reverse sm:flex-row justify-between px-6 ptpb-4">
                <div className="flex gap-4 flex-wrap sm:flex-nowrap justify-start">
                  <div className="px-2 rounded-xl border border-primary flex gap-2 items-center w-full min-w-[300px] md:w-[210px] h-fit">
                    <Search />
                  </div>

                  <div className="w-full">
                    <div className="">
                      <DatePicker
                        selectedStartDate={selectedStartDate}
                        setSelectedStartDate={setSelectedStartDate}
                        placeholder="Select Date"
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <Filters categories={categories} />
                  </div>
                </div>

                <div className="flex justify-end gap-2 items-center">
                  <button
                    className="text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-1.5 sm:py-2 sm:px-3 whitespace-nowrap flex gap-2"
                    id="button-151"
                  >
                    <img src={Printer} alt="Printer" />
                    <span>Print</span>
                  </button>
                  <button
                    className="text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-1.5 sm:py-2 sm:px-3 whitespace-nowrap flex gap-2"
                    id="button-152"
                  >
                    <img src={Download} alt="Download" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
              <div className="w-full ptpb-4 text-center bg-[#F9FAFB] border-b border-primary">
                <p className="text-secondary">
                  All {selectedIds} record from this page is selected
                  <a href="#" className="text-blue pl-2">
                    Select all 200 records from this table
                  </a>
                </p>
              </div>

              {/* <DynamicTableComponent
                columns={defaultColumns}
                data={comapnyInfo}
                selectable={true}
                onSelectChange={handleSelectionChange}
                actions={true}
                addColumn={true}
                edit={false}
                view={true}
                page="all"
                heading="All Activity Logs Details"
              /> */}

              <NewTable
                columns={defaultColumns}
                tableMetaData={tableMetaData}
                triggerRefetch={triggerRefetch}
                setTriggerRefetch={setTriggerRefetch}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllLogs;
