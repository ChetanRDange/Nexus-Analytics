import React, { useState } from "react";
import Printer from "../assets/svgs/printer.svg";
import Download from "../assets/svgs/download.svg";
import Search from "../Components/Search";
import Filters from "../Components/Filters";
import IndiaFlag from "../assets/svgs/india-flag.svg";
import DynamicTableComponent from "../Components/DynamicTableComponent";
import DatePicker from "../Components/DatePicker";

const defaultColumns = [
  {
    Header: "Sr. No.",
    accessor: "srno",
  },
  {
    Header: "Message ID",
    accessor: "messageId",
  },
  {
    Header: "Recipient Name",
    accessor: "recipientName",
  },
  {
    Header: "Country",
    accessor: "country",
    Cell: ({ value }) => (
      <div className="flex gap-2 items-center">
        <img src={IndiaFlag} alt="Country Flag" className="w-4 h-4" />
        <span>{value}</span>
      </div>
    ),
  },
  {
    Header: "Phone Number",
    accessor: "phone",
    Cell: ({ value }) => {
      return (
        <div className="flex gap-2 items-center">
          <span className="pr-2">+91 </span>
          <span>{value}</span>
        </div>
      );
    },
  },
  {
    Header: "Message Content",
    accessor: "messageContent",
  },
  {
    Header: "Type",
    accessor: "type",
  },
  {
    Header: "Message Type",
    accessor: "messageType",
  },
  {
    Header: "API Status",
    accessor: "status",
    Cell: ({ value }) => {
      const statusStyles = {
        Sent: "bg-[#FFF7E1] text-[#FFB904]",
        Delivered: "bg-[#ECFDF3] text-[#027948]",
        Failure: "bg-[#FEF3F2] text-[#B32318]",
      };
      const statusColors = {
        Sent: "#FFB904",
        Delivered: "#12B76A",
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
    Header: "Sent Date & Time",
    accessor: "sentDate",
  },
  {
    Header: "Response Time",
    accessor: "responseTime",
  },
  {
    Header: "Error",
    accessor: "error",
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
    messageId: 2564,
    recipientName: "Manasi Naik",
    country: "India",
    countryCode: "+91",
    phone: "7700900123",
    messageContent: "Your verification code is 12345",
    type: "Domestic",
    messageType: "Transactional ",
    status: "Sent",
    sentDate: "22-08-2024, 09.20 AM",
    responseTime: "320ms",
    error: "N/A",
  },
  {
    id: "1",
    srno: "002",
    messageId: 2564,
    recipientName: "Manasi Naik",
    country: "India",
    countryCode: "+91",
    phone: "7700900123",
    messageContent: "Your verification code is 12345",
    type: "Domestic",
    messageType: "Transactional ",
    status: "Failure",
    sentDate: "22-08-2024, 09.20 AM",
    responseTime: "320ms",
    error: "Invalid phone number format",
  },
  {
    id: "2",
    srno: "003",
    messageId: 2564,
    recipientName: "Manasi Naik",
    country: "India",
    countryCode: "+91",
    phone: "7700900123",
    messageContent: "Your verification code is 12345",
    type: "Domestic",
    messageType: "Transactional ",
    status: "Sent",
    sentDate: "22-08-2024, 09.20 AM",
    responseTime: "320ms",
    error: "N/A",
  },
  {
    id: "3",
    srno: "004",
    messageId: 2564,
    recipientName: "Manasi Naik",
    country: "India",
    countryCode: "+91",
    phone: "7700900123",
    messageContent: "Your verification code is 12345",
    type: "Domestic",
    messageType: "Transactional ",
    status: "Delivered",
    sentDate: "22-08-2024, 09.20 AM",
    responseTime: "320ms",
    error: "N/A",
  },
  {
    id: "4",
    srno: "005",
    messageId: 2564,
    recipientName: "Manasi Naik",
    country: "India",
    countryCode: "+91",
    phone: "7700900123",
    messageContent: "Your verification code is 12345",
    type: "Domestic",
    messageType: "Transactional ",
    status: "Sent",
    sentDate: "22-08-2024, 09.20 AM",
    responseTime: "320ms",
    error: "N/A",
  },
  {
    id: "5",
    srno: "006",
    messageId: 2564,
    recipientName: "Manasi Naik",
    country: "India",
    countryCode: "+91",
    phone: "7700900123",
    messageContent: "Your verification code is 12345",
    type: "Domestic",
    messageType: "Transactional ",
    status: "Sent",
    sentDate: "22-08-2024, 09.20 AM",
    responseTime: "320ms",
    error: "N/A",
  },
  {
    id: "6",
    srno: "007",
    messageId: 2564,
    recipientName: "Manasi Naik",
    country: "India",
    countryCode: "+91",
    phone: "7700900123",
    messageContent: "Your verification code is 12345",
    type: "Domestic",
    messageType: "Transactional ",
    status: "Failure",
    sentDate: "22-08-2024, 09.20 AM",
    responseTime: "320ms",
    error: "Invalid phone number format",
  },
  {
    id: "7",
    srno: "008",
    messageId: 2564,
    recipientName: "Manasi Naik",
    country: "India",
    countryCode: "+91",
    phone: "7700900123",
    messageContent: "Your verification code is 12345",
    type: "Domestic",
    messageType: "Transactional ",
    status: "Sent",
    sentDate: "22-08-2024, 09.20 AM",
    responseTime: "320ms",
    error: "N/A",
  },
  {
    id: "8",
    srno: "009",
    messageId: 2564,
    recipientName: "Manasi Naik",
    country: "India",
    countryCode: "+91",
    phone: "7700900123",
    messageContent: "Your verification code is 12345",
    type: "Domestic",
    messageType: "Transactional ",
    status: "Sent",
    sentDate: "22-08-2024, 09.20 AM",
    responseTime: "320ms",
    error: "N/A",
  },
  {
    id: "9",
    srno: "010",
    messageId: 2564,
    recipientName: "Manasi Naik",
    country: "India",
    countryCode: "+91",
    phone: "7700900123",
    messageContent: "Your verification code is 12345",
    type: "Domestic",
    messageType: "Transactional ",
    status: "Delivered",
    sentDate: "22-08-2024, 09.20 AM",
    responseTime: "320ms",
    error: "N/A",
  },
  {
    id: "10",
    srno: "011",
    messageId: 2564,
    recipientName: "Manasi Naik",
    country: "India",
    countryCode: "+91",
    phone: "7700900123",
    messageContent: "Your verification code is 12345",
    type: "Domestic",
    messageType: "Transactional ",
    status: "Sent",
    sentDate: "22-08-2024, 09.20 AM",
    responseTime: "320ms",
    error: "N/A",
  },
];

const SMSLogs = () => {
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
            <h4 className="text-3xl text-dark">SMS Logs</h4>
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
                    id="button-281"
                  >
                    <img src={Printer} alt="Printer" />
                    <span>Print</span>
                  </button>
                  <button
                    className="text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-1.5 sm:py-2 sm:px-3 whitespace-nowrap flex gap-2"
                    id="button-282"
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
                edit={false}
                view={true}
                page="sms"
                heading="API Logs Details"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMSLogs;
