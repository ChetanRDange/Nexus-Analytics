import React, { useState } from "react";
import Printer from "../assets/svgs/printer.svg";
import Download from "../assets/svgs/download.svg";
import Search from "../Components/Search";
import Filters from "../Components/Filters";
import DynamicTableComponent from "../Components/DynamicTableComponent";
import DatePicker from "../Components/DatePicker";

const defaultColumns = [
  {
    Header: "Sr. No.",
    accessor: "srno",
  },
  {
    Header: "Log ID",
    accessor: "logId",
  },
  {
    Header: "Timestamp",
    accessor: "timestamp",
  },
  {
    Header: "Cron Job Name",
    accessor: "jobName",
  },
  {
    Header: "Recipient Email",
    accessor: "email",
    Cell: ({ value }) => (
      <a
        href={`mailto:${value}`}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary"
      >
        {value}
      </a>
    ),
  },
  {
    Header: " Status",
    accessor: "status",
    Cell: ({ value }) => {
      const statusStyles = {
        Success: "bg-[#E6F8EF] text-[#027747]",
        Failure: "bg-[#FEF3F2] text-[#B32318]",
        Running: "bg-[#F0F4FF] text-[#2563EB]",
      };
      const statusColors = {
        Success: "#12B368",
        Failure: "#F04438",
        Running: "#2563EB",
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
    Header: "Execution Time",
    accessor: "executionTime",
    Cell: ({ value }) =>
      value ? value : <span className="w-full text-center">--</span>,
  },
  {
    Header: "Schedule",
    accessor: "schedule",
    Cell: ({ value }) =>
      value ? value : <span className="w-full text-center">--</span>,
  },
  {
    Header: "Next Scheduled Run",
    accessor: "scheduleRun",
  },
  {
    Header: "Error Details",
    accessor: "errorDetails",
  },
];

const categories = [
  {
    id: 0,
    showName: "Status",
    name: "Status",
  },
];

const comapnyInfo = [
  {
    id: "0",
    srno: "001",
    logId: "CRON-1001",
    timestamp: "22-08-2024, 09.20 AM",
    jobName: "Daily Backup",
    email: "johndoe@gmail.com",
    status: "Success",
    executionTime: "1m 30s",
    schedule: "Every 30 min",
    scheduleRun: "23-08-2024, 09.20 AM",
    errorDetails: "N/A",
  },
  {
    id: "1",
    srno: "002",
    logId: "CRON-1002",
    timestamp: "22-08-2024, 09.20 AM",
    jobName: "Daily Backup",
    email: "johndoe@gmail.com",
    status: "Success",
    executionTime: "1m 30s",
    schedule: "Every 30 min",
    scheduleRun: "23-08-2024, 09.20 AM",
    errorDetails: "N/A",
  },
  {
    id: "2",
    srno: "003",
    logId: "CRON-1003",
    timestamp: "22-08-2024, 09.20 AM",
    jobName: "Daily Backup",
    email: "johndoe@gmail.com",
    status: "Success",
    executionTime: "1m 30s",
    schedule: "Every 45 min",
    scheduleRun: "23-08-2024, 09.20 AM",
    errorDetails: "N/A",
  },
  {
    id: "3",
    srno: "004",
    logId: "CRON-1004",
    timestamp: "22-08-2024, 09.20 AM",
    jobName: "Daily Backup",
    email: "johndoe@gmail.com",
    status: "Failure",
    executionTime: "1m 30s",
    schedule: "Every 30 min",
    scheduleRun: "23-08-2024, 09.20 AM",
    errorDetails: "Memory limit exceeded",
  },
  {
    id: "4",
    srno: "005",
    logId: "CRON-1005",
    timestamp: "22-08-2024, 09.20 AM",
    jobName: "Daily Backup",
    email: "johndoe@gmail.com",
    status: "Success",
    executionTime: "2m 05s",
    schedule: "Every 30 min",
    scheduleRun: "23-08-2024, 09.20 AM",
    errorDetails: "N/A",
  },
  {
    id: "5",
    srno: "006",
    logId: "CRON-1006",
    timestamp: "22-08-2024, 09.20 AM",
    jobName: "Daily Backup",
    email: "johndoe@gmail.com",
    status: "Success",
    executionTime: "1m 30s",
    schedule: "Every 45 min",
    scheduleRun: "23-08-2024, 09.20 AM",
    errorDetails: "N/A",
  },
  {
    id: "6",
    srno: "007",
    logId: "CRON-1007",
    timestamp: "22-08-2024, 09.20 AM",
    jobName: "Daily Backup",
    email: "johndoe@gmail.com",
    status: "Success",
    executionTime: "1m 30s",
    schedule: "Every 30 min",
    scheduleRun: "23-08-2024, 09.20 AM",
    errorDetails: "N/A",
  },
  {
    id: "7",
    srno: "008",
    logId: "CRON-1008",
    timestamp: "22-08-2024, 09.20 AM",
    jobName: "Daily Backup",
    email: "johndoe@gmail.com",
    status: "Running",
    executionTime: "",
    schedule: "",
    scheduleRun: "23-08-2024, 09.20 AM",
    errorDetails: "N/A",
  },
  {
    id: "8",
    srno: "009",
    logId: "CRON-1009",
    timestamp: "22-08-2024, 09.20 AM",
    jobName: "Daily Backup",
    email: "johndoe@gmail.com",
    status: "Failure",
    executionTime: "1m 30s",
    schedule: "Every 1 hour",
    scheduleRun: "23-08-2024, 09.20 AM",
    errorDetails: "SMTP connection failed",
  },
  {
    id: "9",
    srno: "010",
    logId: "CRON-1010",
    timestamp: "22-08-2024, 09.20 AM",
    jobName: "Daily Backup",
    email: "johndoe@gmail.com",
    status: "Failure",
    executionTime: "1m 30s",
    schedule: "Every 30 min",
    scheduleRun: "23-08-2024, 09.20 AM",
    errorDetails: "Memory limit exceeded",
  },
  {
    id: "10",
    srno: "011",
    logId: "CRON-1011",
    timestamp: "22-08-2024, 09.20 AM",
    jobName: "Daily Backup",
    email: "johndoe@gmail.com",
    status: "Success",
    executionTime: "1m 30s",
    schedule: "Every 30 min",
    scheduleRun: "23-08-2024, 09.20 AM",
    errorDetails: "N/A",
  },
];

const CronLogs = () => {
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedIds, setSelectedIds] = useState(0);

  const handleSelectionChange = (selectedIds) => {
    setSelectedIds(selectedIds.length);
    console.log("Selected IDs:", selectedIds);
  };

  return (
    <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
      <div className=" w-full">
        <div className="w-full flex justify-between pb-5 mb-5 border-b border-primary">
          <div className="">
            <h4 className="text-3xl text-dark">Cron Logs</h4>
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
                    id="button-169"
                  >
                    <img src={Printer} alt="Printer" />
                    <span>Print</span>
                  </button>
                  <button
                    className="text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-1.5 sm:py-2 sm:px-3 whitespace-nowrap flex gap-2"
                    id="button-170"
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

              <DynamicTableComponent
                columns={defaultColumns}
                data={comapnyInfo}
                selectable={true}
                onSelectChange={handleSelectionChange}
                actions={true}
                view={true}
                addColumn={true}
                edit={false}
                page="cron"
                heading="Organization Login Details"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CronLogs;
