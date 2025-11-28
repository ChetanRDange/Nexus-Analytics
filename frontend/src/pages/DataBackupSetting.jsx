import React, { useState, useEffect } from "react";
import ToggleComponent from "../Components/ToggleComponent";
import InputComponent from "../Components/InputComponent";
import { Link } from "react-router-dom";
import ComponentDropdown from "../Components/ComponentDropdown";
import FolderInputComp from "../Components/FolderInput";

import DynamicTableComponent from "../Components/DynamicTableComponent";
import {
  data_custom_retention_limit_error,
  data_google_folder_path_length_error,
  data_google_folder_path_required_error,
  data_select_time_required_error,
  integration_api_key_permission_error,
  integration_api_key_required_error,
  integration_email_format_error,
  integration_email_required_error,
  invalid_integration_api_key_error,
  invalid_integration_email_error,
} from "../Components/AllError";

const defaultColumns = [
  {
    Header: "Sr. No.",
    accessor: "srno",
  },
  {
    Header: "Alert Date & Time",
    accessor: "alertDate",
  },

  {
    Header: "Alert Type",
    accessor: "type",
  },
  {
    Header: "Backup Type",
    accessor: "messageType",
  },
  {
    Header: "Backup Location",
    accessor: "location",
  },

  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      const statusStyles = {
        Warning: "bg-[#FFF7E1] text-[#FFB904]",
        Delivered: "bg-[#ECFDF3] text-[#027948]",
        Critical: "bg-[#FEF3F2] text-[#B32318]",
      };
      const statusColors = {
        Warning: "#FFB904",
        Delivered: "#12B76A",
        Critical: "#F04438",
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
    Header: "Issue Description",
    accessor: "issueDescription",
  },
];

const comapnyInfo = [
  {
    id: "0",
    srno: "001",
    messageId: 2564,
    location: "Google Drive",
    country: "India",
    countryCode: "+91",
    phone: "7700900123",
    issueDescription: "File Backup Failed: Insufficient Storage",
    type: "Backup Failure",
    messageType: "File ",
    status: "Warning",
    alertDate: "22-08-2024, 09.20 AM",
    responseTime: "320ms",
    error: "N/A",
  },
  {
    id: "1",
    srno: "002",
    messageId: 2564,
    location: "Google Drive",
    country: "India",
    countryCode: "+91",
    phone: "7700900123",
    issueDescription: "File Backup Failed: Insufficient Storage",
    type: "Success with Warnings",
    messageType: "Both ",
    status: "Critical",
    alertDate: "22-08-2024, 09.20 AM",
    responseTime: "320ms",
    error: "Invalid phone number format",
  },
  {
    id: "2",
    srno: "003",
    messageId: 2564,
    location: "Google Drive",
    country: "India",
    countryCode: "+91",
    phone: "7700900123",
    issueDescription: "File Backup Failed: Insufficient Storage",
    type: "Backup Failure",
    messageType: "Database ",
    status: "Warning",
    alertDate: "22-08-2024, 09.20 AM",
    responseTime: "320ms",
    error: "N/A",
  },
  {
    id: "3",
    srno: "004",
    messageId: 2564,
    location: "Google Drive",
    country: "India",
    countryCode: "+91",
    phone: "7700900123",
    issueDescription: "File Backup Failed: Insufficient Storage",
    type: "Backup Success",
    messageType: "File ",
    status: "Delivered",
    alertDate: "22-08-2024, 09.20 AM",
    responseTime: "320ms",
    error: "N/A",
  },
  {
    id: "4",
    srno: "005",
    messageId: 2564,
    location: "Google Drive",
    country: "India",
    countryCode: "+91",
    phone: "7700900123",
    issueDescription: "File Backup Failed: Insufficient Storage",
    type: "Success with Warnings",
    messageType: "Both ",
    status: "Warning",
    alertDate: "22-08-2024, 09.20 AM",
    responseTime: "320ms",
    error: "N/A",
  },
  {
    id: "5",
    srno: "006",
    messageId: 2564,
    location: "Google Drive",
    country: "India",
    countryCode: "+91",
    phone: "7700900123",
    issueDescription: "File Backup Failed: Insufficient Storage",
    type: "Backup Success",
    messageType: "File ",
    status: "Warning",
    alertDate: "22-08-2024, 09.20 AM",
    responseTime: "320ms",
    error: "N/A",
  },
  {
    id: "6",
    srno: "007",
    messageId: 2564,
    location: "Google Drive",
    country: "India",
    countryCode: "+91",
    phone: "7700900123",
    issueDescription: "File Backup Failed: Insufficient Storage",
    type: "Success with Warnings",
    messageType: "Database ",
    status: "Critical",
    alertDate: "22-08-2024, 09.20 AM",
    responseTime: "320ms",
    error: "Invalid phone number format",
  },
  {
    id: "7",
    srno: "008",
    messageId: 2564,
    location: "Google Drive",
    country: "India",
    countryCode: "+91",
    phone: "7700900123",
    issueDescription: "File Backup Failed: Insufficient Storage",
    type: "Success with Warnings",
    messageType: "Both ",
    status: "Warning",
    alertDate: "22-08-2024, 09.20 AM",
    responseTime: "320ms",
    error: "N/A",
  },
  {
    id: "8",
    srno: "009",
    messageId: 2564,
    location: "Google Drive",
    country: "India",
    countryCode: "+91",
    phone: "7700900123",
    issueDescription: "File Backup Failed: Insufficient Storage",
    type: "Success with Warnings",
    messageType: "Database ",
    status: "Warning",
    alertDate: "22-08-2024, 09.20 AM",
    responseTime: "320ms",
    error: "N/A",
  },
  {
    id: "9",
    srno: "010",
    messageId: 2564,
    location: "Google Drive",
    country: "India",
    countryCode: "+91",
    phone: "7700900123",
    issueDescription: "File Backup Failed: Insufficient Storage",
    type: "Success with Warnings",
    messageType: "Both ",
    status: "Delivered",
    alertDate: "22-08-2024, 09.20 AM",
    responseTime: "320ms",
    error: "N/A",
  },
  {
    id: "10",
    srno: "011",
    messageId: 2564,
    location: "Google Drive",
    country: "India",
    countryCode: "+91",
    phone: "7700900123",
    issueDescription: "File Backup Failed: Insufficient Storage",
    type: "Success with Warnings",
    messageType: "Database ",
    status: "Warning",
    alertDate: "22-08-2024, 09.20 AM",
    responseTime: "320ms",
    error: "N/A",
  },
];
const logout = [
  {
    id: 0,

    showName: "Custom",
    name: "Custom",
  },
  {
    id: 1,
    showName: "15 Days",
    name: "15 Days",
  },
  {
    id: 2,
    showName: "30 Days",
    name: "30 Days",
  },
  {
    id: 3,
    showName: "45 Days",
    name: "45 Days",
  },
];

const timeOptions = [
  { id: 0, showName: "01:00:00 AM", name: "01:00:00 AM" },
  { id: 1, showName: "02:00:00 AM", name: "02:00:00 AM" },
  { id: 2, showName: "03:00:00 AM", name: "03:00:00 AM" },
  { id: 3, showName: "04:00:00 AM", name: "04:00:00 AM" },
  { id: 4, showName: "05:00:00 AM", name: "05:00:00 AM" },
  { id: 5, showName: "06:00:00 AM", name: "06:00:00 AM" },
  { id: 6, showName: "07:00:00 AM", name: "07:00:00 AM" },
  { id: 7, showName: "08:00:00 AM", name: "08:00:00 AM" },
  { id: 8, showName: "09:00:00 AM", name: "09:00:00 AM" },
  { id: 9, showName: "10:00:00 AM", name: "10:00:00 AM" },
  { id: 10, showName: "11:00:00 AM", name: "11:00:00 AM" },
  { id: 11, showName: "12:00:00 AM", name: "12:00:00 AM" },
  { id: 12, showName: "01:00:00 PM", name: "01:00:00 PM" },
  { id: 13, showName: "02:00:00 PM", name: "02:00:00 PM" },
  { id: 14, showName: "03:00:00 PM", name: "03:00:00 PM" },
  { id: 15, showName: "04:00:00 PM", name: "04:00:00 PM" },
  { id: 16, showName: "05:00:00 PM", name: "05:00:00 PM" },
  { id: 17, showName: "06:00:00 PM", name: "06:00:00 PM" },
  { id: 18, showName: "07:00:00 PM", name: "07:00:00 PM" },
  { id: 19, showName: "08:00:00 PM", name: "08:00:00 PM" },
  { id: 20, showName: "09:00:00 PM", name: "09:00:00 PM" },
  { id: 21, showName: "10:00:00 PM", name: "10:00:00 PM" },
  { id: 22, showName: "11:00:00 PM", name: "11:00:00 PM" },
  { id: 23, showName: "12:00:00 PM", name: "12:00:00 PM" },
];

const DataBackupSetting = () => {
  const [onTabClick, setOnTabClick] = useState(null);
  const [folderPath, setFolderPath] = useState("");

  const handleDirectoryChange = (event) => {
    const selectedFolderPath = event.target.files[0]?.webkitRelativePath
      ? event.target.files[0].webkitRelativePath.split("/")[0]
      : "";
    setFolderPath(selectedFolderPath);
  };

  const [isEnableDelete, setIsEnableDelete] = useState(false);
  const [isEnableEMsg, setIsEnableEMsg] = useState(false);
  const [isEnableAMsg, setIsEnableAMsg] = useState(false);
  const [isEnableUser, setIsEnableUser] = useState(false);
  const [isEnableFiles, setIsEnableFiles] = useState(false);
  const [isEnableProject, setIsEnableProject] = useState(false);
  const [isEnableDatabase, setIsEnableDatabase] = useState(false);
  const [isEnableLogs, setIsEnableLogs] = useState(false);
  const [input, setInput] = useState("");

  const [timeDropdown, setTimeDropdown] = useState({
    showName: "Click to select an option",
    name: "",
  });

  const setTime = (item) => {
    setTimeDropdown({
      showName: item.showName,
      name: item.name,
    });
  };
  const handleOnChange = () => {
    setInput(e.target.value);
  };

  const [logoutDropdown, setLogoutDropDown] = useState({
    showName: "Click to select an option",
    name: "",
  });

  const handleSelectionChange = (selectedIds) => {
    console.log("Selected IDs:", selectedIds);
  };

  return (
    <div className="py-8 p-4 sm:p-5 overflow-x-hidden mb-20">
      <div className="w-full pb-4  gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">
            Data Backup Settings
          </span>
        </div>
        {onTabClick === null && (
          <div className=" w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
            <button
              className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
              id="button-173"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <div className="w-full align-middle">
          <div className=" flex flex-col gap-y-2 md:flex-row md:justify-between items-center gap-2 pt-3 pb-6 ">
            <div className="w-full flex flex-wrap items-center gap-3 border-b border-primary pb-6">
              <button
                onClick={() => setOnTabClick("Integration")}
                className={`py-2.5 px-4 rounded-xl text-primary font-medium  ${
                  onTabClick === "Integration"
                    ? "bg-fadedblue"
                    : "bg-white border border-primary"
                }`}
                id="button-174"
              >
                Google Drive Integration
              </button>
              <button
                onClick={() => setOnTabClick("Backup")}
                className={`py-2.5 px-4 rounded-xl text-primary font-medium ${
                  onTabClick === "Backup"
                    ? "bg-fadedblue "
                    : "bg-white border border-primary"
                }`}
                id="button-175"
              >
                Backup Alerts
              </button>
            </div>
          </div>

          {onTabClick === "Integration" && (
            <>
              <div className="w-full justify-center items-center mb-5 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end border-b border-primary">
                <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
                  <div className="sm:w-7/12 w-full flex flex-col">
                    <span className=" text-primary flex items-center gap-1">
                      Google Drive Integration
                    </span>
                  </div>
                  <div className="w-full">
                    <div className="w-full">
                      <InputComponent
                        inputType="text"
                        name="email"
                        id="email"
                        labelName="Google Account Email id"
                        labelColor="primary"
                        placeholderName="Google Account Email id"
                        placeholderColor="secondary"
                        textColor="text-dark"
                        borderRadius="xl"
                        activeBorderColor="blue"
                        onChange={handleOnChange}
                        // {...(error? && { error: error })}
                        // {...(typeof error !== "undefined" ? { error } : {})}
                      />
                      {/* {error && (
                      <div className="mt-2 text-[#F04438] text-sm font-normal">
                        {error}
                        // {integration_email_format_error,integration_email_required_error,invalid_integration_email_error}
                      </div>
                    )} */}
                    </div>
                    <div className="w-full mt-6">
                      <InputComponent
                        maxLength={18}
                        name="awsskey"
                        id="awsskey"
                        labelName="Google API Key"
                        labelColor="primary"
                        placeholderName="Google API Key"
                        placeholderColor="secondary"
                        textColor="text-dark"
                        onChange={handleOnChange}
                        borderRadius="xl"
                        activeBorderColor="blue"
                        // {...(error? && { error: error })}
                        // {...(typeof error !== "undefined" ? { error } : {})}
                      />
                      {/* {error && (
                      <div className="mt-2 text-[#F04438] text-sm font-normal">
                        {error}
                        // {integration_api_key_permission_error,integration_api_key_required_error,invalid_integration_api_key_error}
                      </div>
                    )} */}
                    </div>
                    <div className="mt-10">
                      <Link
                        id="connect"
                        to="#"
                        className="px-5 py-3 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
                      >
                        Connect
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {onTabClick === "Backup" && (
            <div className="flex flex-col border rounded-xl">
              <div className="-m-1.5">
                <div className="p-1.5 min-w-full align-middle">
                  <DynamicTableComponent
                    columns={defaultColumns}
                    data={comapnyInfo}
                    selectable={true}
                    onSelectChange={handleSelectionChange}
                    actions={true}
                    edit={false}
                    addColumn={true}
                    deleteBtn={false}
                    printBtn={true}
                    importBtn={false}
                    ExportBtn={true}
                    tableCountLabel={true}
                    filter={false}
                    search={false}
                  />
                </div>
              </div>
            </div>
          )}
          {onTabClick === null && (
            <>
              <div className="w-full justify-center items-center mb-5 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end border-b border-primary">
                <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
                  <div className="sm:w-7/12 w-full flex flex-col">
                    <span className=" text-primary flex items-center gap-1">
                      Backup Settings
                    </span>
                  </div>
                  <div className="w-full">
                    <div className="w-full">
                      <ToggleComponent
                        label={
                          isEnableDelete
                            ? "Disable Auto Backup"
                            : "Enable Auto Backup"
                        }
                        isEnableState={isEnableDelete}
                        setIsEnableState={setIsEnableDelete}
                        tooltipMessage="Turn on/off Auto Backup"
                      />
                    </div>
                    <div className="w-full mt-6">
                      <FolderInputComp
                        inputType="file"
                        webkitdirectory="true"
                        name="folderpath"
                        id="folderpath"
                        folderPath={folderPath}
                        placeholderName="Google Drive Folder Path"
                        labelName="Google Drive Folder Path"
                        labelColor="primary"
                        textColor="text-dark"
                        borderRadius="xl"
                        activeBorderColor="blue"
                        handleInputChange={handleDirectoryChange}

                        // {...(error? && { error: error })}
                        // {...(typeof error !== "undefined" ? { error } : {})}
                      />
                      {/* {error && (
                    <div className="mt-2 text-[#F04438] text-sm font-normal">
                      {error}
                      // {data_google_folder_path_length_error,data_google_folder_path_required_error}
                    </div>
                  )} */}
                    </div>

                    <div className="w-full grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 mt-6">
                      <div className="w-full">
                        <label className="text-primary">Backup Frequency</label>
                        <div className="dropdown-container relative w-full mt-1">
                          <ComponentDropdown
                            name="currency"
                            SummaryChild={
                              <h5 className="p-0 m-0">
                                {logoutDropdown.showName}
                              </h5>
                            }
                            dropdownList={logout}
                            search={false}
                            commonFunction={setLogoutDropDown}
                            selected={logoutDropdown.name}
                          />
                        </div>
                      </div>

                      <div className="w-full">
                        <label className="text-primary">Select Time</label>

                        <div className="mt-1">
                          <ComponentDropdown
                            name="time"
                            SummaryChild={
                              <h5 className="p-0 m-0">
                                {timeDropdown.showName}
                              </h5>
                            }
                            dropdownList={timeOptions}
                            search={false}
                            commonFunction={setTime}
                            selected={timeDropdown.name}
                            // {...(error? && { error: error })}
                            // {...(typeof error !== "undefined" ? { error } : {})}
                          />
                          {/* {error && (
                      <div className="mt-2 text-[#F04438] text-sm font-normal">
                        {error}
                        // {data_select_time_required_error}
                      </div>
                    )} */}
                        </div>
                      </div>
                    </div>
                    {logoutDropdown.name == "Custom" && (
                      <>
                        <div className="w-full mt-5">
                          <InputComponent
                            inputType="text"
                            name="customretention"
                            id="customretention"
                            labelName="Custom Retention Period"
                            labelColor="primary"
                            placeholderName="Custom Retention Period"
                            placeholderColor="secondary"
                            textColor="text-dark"
                            borderRadius="xl"
                            activeBorderColor="blue"
                            // {...(error? && { error: error })}
                            // {...(typeof error !== "undefined" ? { error } : {})}
                          />
                          {/* {error && (
                    <div className="mt-2 text-[#F04438] text-sm font-normal">
                      {error}
                      // {data_custom_retention_limit_error}
                    </div>
                  )} */}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full justify-center items-center mt-8 mb-5 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end border-b border-primary">
                <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
                  <div className="sm:w-7/12 w-full flex flex-col">
                    <span className=" text-primary flex items-center gap-1">
                      Select Data to Backup
                    </span>
                  </div>
                  <div className="w-full">
                    <div className="w-full">
                      <ToggleComponent
                        label="User Data"
                        isEnableState={isEnableUser}
                        setIsEnableState={setIsEnableUser}
                      />
                    </div>
                    <div className="w-full mt-6">
                      <ToggleComponent
                        label="Project Data"
                        isEnableState={isEnableProject}
                        setIsEnableState={setIsEnableProject}
                      />
                    </div>
                    <div className="w-full mt-6">
                      <ToggleComponent
                        label="Files/Media"
                        isEnableState={isEnableFiles}
                        setIsEnableState={setIsEnableFiles}
                      />
                    </div>
                    <div className="w-full mt-6">
                      <ToggleComponent
                        label="Database"
                        isEnableState={isEnableDatabase}
                        setIsEnableState={setIsEnableDatabase}
                      />
                    </div>
                    <div className="w-full mt-6">
                      <ToggleComponent
                        label="Logs"
                        isEnableState={isEnableLogs}
                        setIsEnableState={setIsEnableLogs}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full justify-center items-center mt-8 mb-5 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end border-b border-primary">
                <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
                  <div className="sm:w-7/12 w-full flex flex-col">
                    <span className=" text-primary flex items-center gap-1">
                      Select Data to Backup
                    </span>
                  </div>
                  <div className="w-full">
                    <div className="w-full">
                      <label className="text-primary">
                        Set Retention Period
                      </label>
                      <div className="dropdown-container relative w-full mt-1">
                        <ComponentDropdown
                          name="currency"
                          SummaryChild={
                            <h5 className="p-0 m-0">
                              {logoutDropdown.showName}
                            </h5>
                          }
                          dropdownList={logout}
                          search={false}
                          commonFunction={setLogoutDropDown}
                          selected={logoutDropdown.name}
                        />
                      </div>
                    </div>
                    {logoutDropdown.name == "Custom" && (
                      <>
                        <div className="w-full mt-5">
                          <InputComponent
                            inputType="text"
                            name="customretention"
                            id="customretention"
                            labelName="Custom Retention Period"
                            labelColor="primary"
                            placeholderName="Custom Retention Period"
                            placeholderColor="secondary"
                            textColor="text-dark"
                            borderRadius="xl"
                            activeBorderColor="blue"
                            // {...(error? && { error: error })}
                            // {...(typeof error !== "undefined" ? { error } : {})}
                          />
                          {/* {error && (
                    <div className="mt-2 text-[#F04438] text-sm font-normal">
                      {error}
                      // {log_retention_period_exceed_error}
                    </div>
                  )} */}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full justify-center items-center mt-8 mb-8 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end border-b border-primary">
                <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
                  <div className="sm:w-7/12 w-full flex flex-col">
                    <span className=" text-primary flex items-center gap-1">
                      Notification Settings
                    </span>
                    <span className="text-secondary font-normal ">
                      Enable/Disable Notification
                    </span>
                  </div>
                  <div className="w-full">
                    <div className="w-full">
                      <ToggleComponent
                        label={
                          isEnableAMsg
                            ? "Disable In App Messages"
                            : "Enable In App Messages"
                        }
                        isEnableState={isEnableAMsg}
                        setIsEnableState={setIsEnableAMsg}
                      />
                    </div>
                    <div className="w-full mt-6">
                      <ToggleComponent
                        label={
                          isEnableEMsg
                            ? "Disable Email Messages"
                            : "Enable Email Messages"
                        }
                        isEnableState={isEnableEMsg}
                        setIsEnableState={setIsEnableEMsg}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {onTabClick === null && (
        <div className="w-full flex justify-end items-center gap-4">
          <button
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
            id="button-176"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default DataBackupSetting;
