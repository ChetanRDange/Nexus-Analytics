import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DynamicTableComponent from "../Components/DynamicTableComponent";
import Printer from "../assets/svgs/printer.svg";
import Download from "../assets/svgs/download.svg";
import Search from "../Components/Search";
import Filters from "../Components/Filters";
import { Link } from "react-router-dom";

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

const adminInfo = [
  {
    id: "0",
    srno: "001",
    timestamp: "10:20 AM",
    action: "Updated Project Settings",
    details: 'Changed project status from "In Progress" to "On Hold".',
  },
  {
    id: "1",
    srno: "001",
    timestamp: "10:20 AM",
    action: "Updated Project Settings",
    details: 'Changed project status from "In Progress" to "On Hold".',
  },
  {
    id: "2",
    srno: "001",
    timestamp: "10:20 AM",
    action: "Updated Project Settings",
    details: 'Changed project status from "In Progress" to "On Hold".',
  },
  {
    id: "3",
    srno: "001",
    timestamp: "10:20 AM",
    action: "Updated Project Settings",
    details: 'Changed project status from "In Progress" to "On Hold".',
  },
  {
    id: "4",
    srno: "001",
    timestamp: "10:20 AM",
    action: "Updated Project Settings",
    details: 'Changed project status from "In Progress" to "On Hold".',
  },
  {
    id: "5",
    srno: "001",
    timestamp: "10:20 AM",
    action: "Updated Project Settings",
    details: 'Changed project status from "In Progress" to "On Hold".',
  },
  {
    id: "6",
    srno: "001",
    timestamp: "10:20 AM",
    action: "Updated Project Settings",
    details: 'Changed project status from "In Progress" to "On Hold".',
  },
  {
    id: "7",
    srno: "001",
    timestamp: "10:20 AM",
    action: "Updated Project Settings",
    details: 'Changed project status from "In Progress" to "On Hold".',
  },
  {
    id: "8",
    srno: "001",
    timestamp: "10:20 AM",
    action: "Updated Project Settings",
    details: 'Changed project status from "In Progress" to "On Hold".',
  },
  {
    id: "9",
    srno: "001",
    timestamp: "10:20 AM",
    action: "Updated Project Settings",
    details: 'Changed project status from "In Progress" to "On Hold".',
  },
  {
    id: "10",
    srno: "001",
    timestamp: "10:20 AM",
    action: "Updated Project Settings",
    details: 'Changed project status from "In Progress" to "On Hold".',
  },
];

const defaultColumns = [
  {
    Header: "Sr. No.",
    accessor: "srno",
  },
  {
    Header: "Timestamp",
    accessor: "timestamp",
  },
  {
    Header: "Action Performed",
    accessor: "action",
  },
  {
    Header: "Details",
    accessor: "details",
  },
];

const handleSelectionChange = (selectedIds) => {
  console.log("Selected IDs:", selectedIds);
};
const SupportLogsDetails = () => {
  const location = useLocation();
  const { row, heading } = location.state;
  const [filterDropdown, setFilterDropDown] = useState({
    showName: "Filters",
    name: "",
  });

  const [isScrollable, setIsScrollable] = useState(false);

  const checkScrollability = () => {
    const contentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    console.log(windowHeight);
    setIsScrollable(contentHeight > windowHeight);
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);

    return () => {
      window.removeEventListener("resize", checkScrollability);
    };
  }, []);

  return (
    <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
      <div className="w-full pb-8  gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end border-b border-primary">
        <div>
          <span className="text-3xl font-semibold text-dark">
            Support Login Logs Details
          </span>
        </div>
        <div className="w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
          <Link
            id="back-1"
            to="/advanced-access-logs"
            className="px-4 py-2 text-primary font-medium hover:bg-gray-50  bg-white rounded-xl border border-primary whitespace-nowrap"
          >
            Back
          </Link>
        </div>
      </div>

      <div>
        {row.status === "Success" ? (
          <>
            <div className="w-full justify-center items-center mt-8 mb-5 pb-8 border-b border-primary gap-y-4 gap-2  lg:items-start md:items-end xl:items-end">
              <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
                <div className="w-full md:w-7/12">
                  <span className=" text-primary mb-2 whitespace-nowrap md:whitespace-wrap">
                    User Information
                  </span>
                </div>
                <div className="w-full">
                  <div className="w-full flex flex-col gap-y-1 mb-4">
                    <label className="text-primary font-bold">
                      Company Logo{" "}
                    </label>
                    <img
                      alt={row.companyLogo}
                      width={40}
                      src={row.companyLogo}
                    />
                  </div>
                  <div className="w-full flex gap-4 gap-y-3 justify-start gap-x-10 flex-col sm:flex-row sm:items-center mb-4">
                    <div className="w-full flex flex-col gap-y-1 mb-4 sm:mb-0">
                      <label className="text-primary font-bold">
                        Admin Name
                      </label>
                      <span className="text-primary font-medium">
                        {row.adminName}
                      </span>
                    </div>

                    <div className="w-full flex flex-col gap-y-1 mb-4 sm:mb-0">
                      <label className="text-primary font-bold"> Role</label>
                      <span className="text-primary font-medium">
                        {row.role}
                      </span>
                    </div>
                  </div>
                  <div className="w-full flex gap-4 gap-y-3 justify-start gap-x-10 flex-col sm:flex-row sm:items-center mb-4">
                    <div className="w-[250px] flex flex-col gap-y-1 mb-4 sm:mb-0">
                      <label className="text-primary font-bold">
                        Company ID
                      </label>
                      <span className="text-primary font-medium">
                        {row.companyId}
                      </span>
                    </div>

                    <div className="w-[250px] flex flex-col gap-y-1 mb-4 sm:mb-0">
                      <label className="text-primary font-bold">
                        {" "}
                        Company Name{" "}
                      </label>
                      <span className="text-primary font-medium">
                        {row.companyName}
                      </span>
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-y-1 mb-4">
                    <label className="text-primary font-bold">
                      Reason For Login
                    </label>
                    <span className="text-primary font-medium">
                      {row.reasonLogin}
                    </span>
                  </div>
                  <div className="w-full flex gap-4 gap-y-3 justify-start gap-x-10 mb-4 flex-col sm:flex-row sm:items-center">
                    <div className="w-full flex flex-col gap-y-1 mb-4 sm:mb-0">
                      <label className="text-primary font-bold">
                        Login Date & Time
                      </label>
                      <span className="text-primary font-medium">
                        {row.loginDate}
                      </span>
                    </div>

                    <div className="w-full flex flex-col gap-y-1  mb-4 sm:mb-0">
                      <label className="text-primary font-bold">
                        Logout Date & Time
                      </label>
                      <span className="text-primary font-medium">
                        {row.logoutDate}
                      </span>
                    </div>
                  </div>
                  <div className="w-full flex gap-4 gap-y-3 justify-start gap-x-10 flex-col sm:flex-row sm:items-center">
                    <div className="w-full flex flex-col gap-y-1">
                      <label className="text-primary font-bold">
                        IP Address
                      </label>
                      <a
                        href={`http://${row.ipAddress}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {row.ipAddress}
                      </a>
                    </div>

                    <div className="w-[250px] flex flex-col gap-y-1 mb-4">
                      <label className="text-primary font-bold">
                        {" "}
                        Location{" "}
                      </label>
                      <span className="text-primary font-medium">
                        {row.location}
                      </span>
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-y-1 mb-4">
                    <label className="text-primary font-bold">
                      Device Browser
                    </label>
                    <span className="text-primary font-medium">
                      {row.device}
                    </span>
                  </div>
                  <div className="w-fit flex flex-col gap-y-1 mt-5">
                    <label className="text-primary"> Status </label>
                    {row.status === "Success" ? (
                      <div className="flex gap-2 items-center py-1 px-2 bg-[#ECFDF3] rounded-xl text-[#027948]">
                        <span className="w-[12px] h-[12px] rounded-full bg-[#12B76A]"></span>
                        <span>{row.status}</span>
                      </div>
                    ) : (
                      <div className="flex gap-2 items-center py-1 px-2 bg-[#FEF3F2] rounded-xl text-[#B32318]">
                        <span className="w-[12px] h-[12px] rounded-full bg-[#F04438]"></span>
                        <span>{row.status}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full justify-center items-center mt-8 mb-5 pb-8 border-b border-primary gap-y-4 gap-2  lg:items-start md:items-end xl:items-end">
              <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
                <div className="w-full md:w-7/12">
                  <span className=" text-primary mb-2 whitespace-nowrap md:whitespace-wrap">
                    Activity Logged
                  </span>
                </div>
                <div className="w-full rounded-xl border border-primary p-6">
                  <div className="w-full flex flex-col-reverse sm:flex-row justify-between pb-4 border-b border-primary">
                    {/* <div className="w-full border-b border-primary"> */}
                    <div className="flex gap-4 flex-wrap sm:flex-nowrap justify-start">
                      <div className="px-2 rounded-xl border border-primary flex gap-2 items-center w-full min-w-[300px] md:w-[210px] h-fit">
                        <Search />
                      </div>

                      <div className="w-full">
                        <Filters categories={categories} />
                      </div>
                    </div>
                    {/* </div> */}

                    <div className="flex justify-end gap-2 items-center">
                      <button
                        className="text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-1.5 px-2 sm:py-2 sm:px-3 whitespace-nowrap flex gap-2"
                        id="button-291"
                      >
                        <img src={Printer} alt="Printer" />
                        <span>Print</span>
                      </button>
                      <button
                        className="text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-1.5 sm:py-2 sm:px-3 whitespace-nowrap flex gap-2"
                        id="button-292"
                      >
                        <img src={Download} alt="Download" />
                        <span>Export</span>
                      </button>
                    </div>
                  </div>

                  {/* <div className="w-fit"> */}
                  <DynamicTableComponent
                    columns={defaultColumns}
                    data={adminInfo}
                    selectable={true}
                    onSelectChange={handleSelectionChange}
                    actions={false}
                    addColumn={false}
                    edit={false}
                    page="magic-logs"
                    heading="Organization Login Details"
                  />
                  {/* </div> */}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-full justify-center items-center mt-8 mb-5 pb-8 border-b border-primary gap-y-4 gap-2  lg:items-start md:items-end xl:items-end">
              <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
                <div className="w-full md:w-7/12">
                  <span className=" text-primary mb-2 whitespace-nowrap md:whitespace-wrap">
                    Activity Logged
                  </span>
                </div>

                <div className="w-full">
                  <div className="w-full flex flex-col gap-y-1 mb-4">
                    <label className="text-primary font-bold">
                      Company Logo{" "}
                    </label>
                    <img
                      alt={row.companyLogo}
                      width={40}
                      src={row.companyLogo}
                    />
                  </div>
                  <div className="flex gap-4 gap-y-3 justify-start gap-x-10 flex-col sm:flex-row sm:items-center mb-4">
                    <div className="w-[250px] flex flex-col gap-y-1 mb-4 sm:mb-0">
                      <label className="text-primary font-bold">
                        Admin Name
                      </label>
                      <span className="text-primary font-medium">
                        {row.adminName}
                      </span>
                    </div>

                    <div className="w-[250px] flex flex-col gap-y-1 mb-4 sm:mb-0">
                      <label className="text-primary font-bold"> Role</label>
                      <span className="text-primary font-medium">
                        {row.role}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-4 flex-col gap-y-3 gap-x-2 sm:flex-row items-center mb-4">
                    <div className="w-full flex flex-col gap-y-1">
                      <label className="text-primary font-bold">
                        Company ID
                      </label>
                      <span className="text-primary font-medium">
                        {row.companyId}
                      </span>
                    </div>

                    <div className="w-full flex flex-col gap-y-1">
                      <label className="text-primary font-bold">
                        Company Name
                      </label>
                      <span className="text-primary font-medium">
                        {row.companyName}
                      </span>
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-y-1 mb-4">
                    <label className="text-primary font-bold">
                      Reason For Login
                    </label>
                    <span className="text-primary font-medium">
                      {row.reasonLogin}
                    </span>
                  </div>
                  <div className="flex gap-4 flex-col gap-y-3 gap-x-2 sm:flex-row items-center mb-4">
                    <div className="w-full flex flex-col gap-y-1">
                      <label className="text-primary font-bold">
                        Login Date & Time
                      </label>
                      <span className="text-primary font-medium">
                        {row.loginDate}
                      </span>
                    </div>

                    <div className="w-full flex flex-col gap-y-1">
                      <label className="text-primary font-bold">
                        Login Date & Time
                      </label>
                      <span className="text-primary font-medium">
                        {row.logoutDate}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-4 flex-col gap-y-3 gap-x-2 sm:flex-row items-center">
                    <div className="w-full flex flex-col gap-y-1">
                      <label className="text-primary font-bold">
                        IP Address
                      </label>
                      <a
                        href={`http://${row.ipAddress}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary text-primary"
                      >
                        {row.ipAddress}
                      </a>
                    </div>

                    <div className="w-full flex flex-col gap-y-1">
                      <label className="text-primary font-bold">Location</label>
                      <span className="text-primary font-medium">
                        {row.location}
                      </span>
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-y-1 mb-4">
                    <label className="text-primary font-bold">
                      Device Browser
                    </label>
                    <span className="text-primary font-medium">
                      {row.device}
                    </span>
                  </div>
                  <div className="w-fit flex flex-col gap-y-1 mb-5">
                    <label className="text-primary"> Status </label>
                    {row.status === "Success" ? (
                      <div className="flex gap-2 items-center py-1 px-2 bg-[#ECFDF3] rounded-xl text-[#027948]">
                        <span className="w-[12px] h-[12px] rounded-full bg-[#12B76A]"></span>
                        <span>{row.status}</span>
                      </div>
                    ) : (
                      <div className="flex gap-2 items-center py-1 px-2 bg-[#FEF3F2] rounded-xl text-[#B32318]">
                        <span className="w-[12px] h-[12px] rounded-full bg-[#F04438]"></span>
                        <span>{row.status}</span>
                      </div>
                    )}
                  </div>
                  <div className="w-full flex flex-col gap-y-1 mb-4">
                    <label className="text-primary font-bold">
                      Reason For Failed Login
                    </label>
                    <span className="text-primary font-medium">
                      {row.reason}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="w-full flex justify-end items-center gap-4 pt-8 pb-20 border-t border-primary">
        <Link
          id="back"
          to="/advanced-access-logs"
          className="px-4 py-2 text-primary font-medium bg-white hover:bg-gray-50 rounded-xl border border-primary whitespace-nowrap"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default SupportLogsDetails;
