import React, { useState } from "react";
import Printer from "../assets/svgs/printer.svg";
import Download from "../assets/svgs/download.svg";

import DynamicTableComponent from "../Components/DynamicTableComponent";
import ComponentDropdown from "../Components/ComponentDropdown";
import DatePicker from "../Components/DatePicker";
import Search from "../Components/Search";
import Filters from "../Components/Filters";

const defaultColumns = [
  {
    Header: "Sr. No.",
    accessor: "srno",
  },
  {
    Header: "Backup Date",
    accessor: "backupDate",
  },
  {
    Header: "Backup Type",
    accessor: "backupType",
  },
  {
    Header: "Backup Location",
    accessor: "backupLocation",
  },
  {
    Header: "Size",
    accessor: "size",
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
    Header: "Error Details",
    accessor: "errorDetails",
  },
];

const categories = [
  {
    id: 0,
    showName: "Company Id",
    name: "Company Id",
  },
  {
    id: 1,
    showName: "Company Size",
    name: "Company Size",
  },
  {
    id: 2,
    showName: "Latest Payment",
    name: "Latest Payment",
  },
  {
    id: 3,
    showName: "Plan Expiry Date",
    name: "Plan Expiry Date",
  },
  {
    id: 4,
    showName: "Status",
    name: "Status",
  },
];

const comapnyInfo = [
  {
    id: "0",
    srno: "001",
    backupDate: "22-08-2024, 09.20 AM",
    backupType: "File",
    backupLocation: "Google Drive",
    size: "1.5 GB",
    status: "Success",
    errorDetails: "N/A",
  },
  {
    id: "1",
    srno: "002",
    backupDate: "22-08-2024, 09.20 AM",
    backupType: "File",
    backupLocation: "Google Drive",
    size: "1.5 GB",
    status: "Success",
    errorDetails: "N/A",
  },
  {
    id: "2",
    srno: "003",
    backupDate: "22-08-2024, 09.20 AM",
    backupType: "File",
    backupLocation: "Google Drive",
    size: "1.5 GB",
    status: "Success",
    errorDetails: "N/A",
  },
  {
    id: "3",
    srno: "004",
    backupDate: "22-08-2024, 09.20 AM",
    backupType: "File",
    backupLocation: "Google Drive",
    size: "1.5 GB",
    status: "Failure",
    errorDetails: "Memory limit exceeded",
  },
  {
    id: "4",
    srno: "005",
    backupDate: "22-08-2024, 09.20 AM",
    backupType: "File",
    backupLocation: "Google Drive",
    size: "1.5 GB",
    status: "Success",
    errorDetails: "N/A",
  },
  {
    id: "5",
    srno: "006",
    backupDate: "22-08-2024, 09.20 AM",
    backupType: "File",
    backupLocation: "Google Drive",
    size: "1.5 GB",
    status: "Success",
    errorDetails: "N/A",
  },
  {
    id: "6",
    srno: "007",
    backupDate: "22-08-2024, 09.20 AM",
    backupType: "File",
    backupLocation: "Google Drive",
    size: "1.5 GB",
    status: "Success",
    errorDetails: "N/A",
  },
  {
    id: "7",
    srno: "008",
    backupDate: "22-08-2024, 09.20 AM",
    backupType: "File",
    backupLocation: "Google Drive",
    size: "1.5 GB",
    status: "Success",
    errorDetails: "N/A",
  },
  {
    id: "8",
    srno: "009",
    backupDate: "22-08-2024, 09.20 AM",
    backupType: "File",
    backupLocation: "Google Drive",
    size: "1.5 GB",
    status: "Failure",
    errorDetails: "SMTP connection failed",
  },
  {
    id: "9",
    srno: "010",
    backupDate: "22-08-2024, 09.20 AM",
    backupType: "File",
    backupLocation: "Google Drive",
    size: "1.5 GB",
    status: "Failure",
    errorDetails: "Memory limit exceeded",
  },
  {
    id: "10",
    srno: "011",
    backupDate: "22-08-2024, 09.20 AM",
    backupType: "File",
    backupLocation: "Google Drive",
    size: "1.5 GB",
    status: "Success",
    errorDetails: "N/A",
  },
];

const DataBackupLogs = () => {
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
            <h4 className="text-3xl text-dark">Data Backup Logs</h4>
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
                    id="button-171"
                  >
                    <img src={Printer} alt="Printer" />
                    <span>Print</span>
                  </button>
                  <button
                    className="text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-1.5 sm:py-2 sm:px-3 whitespace-nowrap flex gap-2"
                    id="button-172"
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
                addColumn={true}
                view={true}
                edit={false}
                page="data-backup"
                heading="Organization Login Details"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataBackupLogs;
