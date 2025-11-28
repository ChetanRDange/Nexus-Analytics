import React, { useState } from "react";
import Printer from "../assets/svgs/printer.svg";
import Download from "../assets/svgs/download.svg";
import Search from "../Components/Search";
import Filters from "../Components/Filters";
import Google from "../assets/svgs/google-logo.svg";
import DynamicTableComponent from "../Components/DynamicTableComponent";
import DatePicker from "../Components/DatePicker";

const defaultColumns = [
  {
    Header: "Sr. No.",
    accessor: "srno",
  },
  {
    Header: "Company Logo",
    accessor: "companyLogo",
    Cell: ({ value }) => (
      <img src={value} alt="Company Logo" className="w-8 h-8 rounded" />
    ),
  },
  {
    Header: "Company ID",
    accessor: "companyId",
  },
  {
    Header: "Company Name",
    accessor: "companyName",
  },
  {
    Header: "Full Name",
    accessor: "fullName",
  },
  {
    Header: "Email ID",
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
    Header: "Activity",
    accessor: "activity",
  },
  {
    Header: "Timestamp",
    accessor: "timestamp",
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      const statusStyles = {
        Success: "bg-[#E6F8EF] text-[#027747]",
        Failure: "bg-[#FEF3F2] text-[#B32318]",
      };
      const statusColors = {
        Success: "#12B368",
        Failure: "#F04438",
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
    Header: "IP Address",
    accessor: "ipAddress",
    Cell: ({ value }) => (
      <a
        href={`http://${value}`}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary"
      >
        {value}
      </a>
    ),
  },
  {
    Header: "Device/Browser",
    accessor: "device",
  },
  {
    Header: "Location",
    accessor: "location",
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
    companyLogo: Google,
    companyId: 2564,
    companyName: "Google",
    fullName: "John Michael Smith",
    email: "johnmichael@gmail.com",
    activity: "User login",
    timestamp: "22-08-2024, 09.20 AM",
    status: "Success",
    ipAddress: "192.168.1.10",
    device: "Windows/Chrome",
    location: "Mumbai, India",
  },
  {
    id: "1",
    srno: "002",
    companyLogo: Google,
    companyId: 2564,
    companyName: "Google",
    fullName: "John Michael Smith",
    email: "johnmichael@gmail.com",
    activity: "User login",
    timestamp: "22-08-2024, 09.20 AM",
    status: "Success",
    ipAddress: "192.168.1.10",
    device: "Windows/Chrome",
    location: "Mumbai, India",
  },
  {
    id: "2",
    srno: "003",
    companyLogo: Google,
    companyId: 2564,
    companyName: "Google",
    fullName: "John Michael Smith",
    email: "johnmichael@gmail.com",
    activity: "User login",
    timestamp: "22-08-2024, 09.20 AM",
    status: "Success",
    ipAddress: "192.168.1.10",
    device: "Windows/Chrome",
    location: "Mumbai, India",
  },
  {
    id: "3",
    srno: "004",
    companyLogo: Google,
    companyId: 2564,
    companyName: "Google",
    fullName: "John Michael Smith",
    email: "johnmichael@gmail.com",
    activity: "User login",
    timestamp: "22-08-2024, 09.20 AM",
    status: "Success",
    ipAddress: "192.168.1.10",
    device: "Windows/Chrome",
    location: "Mumbai, India",
  },
  {
    id: "4",
    srno: "005",
    companyLogo: Google,
    companyId: 2564,
    companyName: "Google",
    fullName: "John Michael Smith",
    email: "johnmichael@gmail.com",
    activity: "User login",
    timestamp: "22-08-2024, 09.20 AM",
    status: "Success",
    ipAddress: "192.168.1.10",
    device: "Windows/Chrome",
    location: "Mumbai, India",
  },
  {
    id: "5",
    srno: "006",
    companyLogo: Google,
    companyId: 2564,
    companyName: "Google",
    fullName: "John Michael Smith",
    email: "johnmichael@gmail.com",
    activity: "User login",
    timestamp: "22-08-2024, 09.20 AM",
    status: "Success",
    ipAddress: "192.168.1.10",
    device: "Windows/Chrome",
    location: "Mumbai, India",
  },
  {
    id: "6",
    srno: "007",
    companyLogo: Google,
    companyId: 2564,
    companyName: "Google",
    fullName: "John Michael Smith",
    email: "johnmichael@gmail.com",
    activity: "User login",
    timestamp: "22-08-2024, 09.20 AM",
    status: "Success",
    ipAddress: "192.168.1.10",
    device: "Windows/Chrome",
    location: "Mumbai, India",
  },
  {
    id: "7",
    srno: "008",
    companyLogo: Google,
    companyId: 2564,
    companyName: "Google",
    fullName: "John Michael Smith",
    email: "johnmichael@gmail.com",
    activity: "User login",
    timestamp: "22-08-2024, 09.20 AM",
    status: "Success",
    ipAddress: "192.168.1.10",
    device: "Windows/Chrome",
    location: "Mumbai, India",
  },
  {
    id: "8",
    srno: "009",
    companyLogo: Google,
    companyId: 2564,
    companyName: "Google",
    fullName: "John Michael Smith",
    email: "johnmichael@gmail.com",
    activity: "User login",
    timestamp: "22-08-2024, 09.20 AM",
    status: "Success",
    ipAddress: "192.168.1.10",
    device: "Windows/Chrome",
    location: "Mumbai, India",
  },
  {
    id: "9",
    srno: "010",
    companyLogo: Google,
    companyId: 2564,
    companyName: "Google",
    fullName: "John Michael Smith",
    email: "johnmichael@gmail.com",
    activity: "User login",
    timestamp: "22-08-2024, 09.20 AM",
    status: "Success",
    ipAddress: "192.168.1.10",
    device: "Windows/Chrome",
    location: "Mumbai, India",
  },
  {
    id: "10",
    srno: "011",
    companyLogo: Google,
    companyId: 2564,
    companyName: "Google",
    fullName: "John Michael Smith",
    email: "johnmichael@gmail.com",
    activity: "User login",
    timestamp: "22-08-2024, 09.20 AM",
    status: "Success",
    ipAddress: "192.168.1.10",
    device: "Windows/Chrome",
    location: "Mumbai, India",
  },
];

const ActivityLogs = () => {
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
            <h4 className="text-3xl text-dark">Activity Logs</h4>
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
                    id="button-120"
                  >
                    <img src={Printer} alt="Printer" />
                    <span>Print</span>
                  </button>
                  <button
                    className="text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-1.5 sm:py-2 sm:px-3 whitespace-nowrap flex gap-2"
                    id="button-121"
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
                page="activity"
                heading="API Logs Details"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogs;
