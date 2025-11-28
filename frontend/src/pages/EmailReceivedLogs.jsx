import React, { useState } from "react";
import Printer from "../assets/svgs/printer.svg";
import Download from "../assets/svgs/download.svg";
import DynamicTableComponent from "../Components/DynamicTableComponent";
import DatePicker from "../Components/DatePicker";
import Search from "../Components/Search";
import Filters from "../Components/Filters";

const defaultColumns = [
  {
    Header: "Sr. No.",
    accessor: "srno",
  },
  {
    Header: "Message ID",
    accessor: "messageId",
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
    Header: "Sender Name",
    accessor: "senderName",
  },
  {
    Header: "Sender Email ID",
    accessor: "senderMail",
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
    Header: "Recipient Email ID",
    accessor: "recipientMail",
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
    Header: "Subject",
    accessor: "subject",
  },
  {
    Header: "Timestamp",
    accessor: "timestamp",
  },
  {
    Header: "Size (KB)",
    accessor: "size",
  },
  {
    Header: "Who Can Read",
    accessor: "read",
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
    messageId: "EM0001",
    senderName: "Manasi Naik",
    senderMail: "manasi@gmail.com",
    recipientMail: "aaditi@gmail.com",
    subject: "Meeting Update",
    timestamp: "22-08-2024, 09.20 AM",
    size: "140",
    read: "Admin, Manager",
  },
  {
    id: "1",
    srno: "002",
    messageId: "EM0002",
    senderName: "Manasi Naik",
    senderMail: "manasi@gmail.com",
    recipientMail: "aaditi@gmail.com",
    subject: "Weekly Report",
    timestamp: "22-08-2024, 09.20 AM",
    size: "140",
    read: "Admin",
  },
  {
    id: "2",
    srno: "003",
    messageId: "EM0003",
    senderName: "Google",
    senderMail: "info@google.com",
    recipientMail: "info@google.com",
    subject: "Project Status",
    timestamp: "22-08-2024, 09.20 AM",
    size: "140",
    read: "Admin, Project Lead",
  },
  {
    id: "3",
    srno: "004",
    messageId: "EM0004",
    senderName: "Manasi Naik",
    senderMail: "manasi@gmail.com",
    recipientMail: "aaditi@gmail.com",
    subject: "Invoice",
    timestamp: "22-08-2024, 09.20 AM",
    size: "140",
    read: "Admin, Manager",
  },
  {
    id: "4",
    srno: "005",
    messageId: "EM0005",
    senderName: "LInkedIn",
    senderMail: "info@linkedin.com",
    recipientMail: "info@linkedin.com",
    subject: "Event Invitatione",
    timestamp: "22-08-2024, 09.20 AM",
    size: "140",
    read: "Admin, Manager",
  },
  {
    id: "5",
    srno: "006",
    messageId: "EM0006",
    senderName: "Manasi Naik",
    senderMail: "manasi@gmail.com",
    recipientMail: "aaditi@gmail.com",
    subject: "Payment Confirmation",
    timestamp: "22-08-2024, 09.20 AM",
    size: "140",
    read: "Admin, Manager",
  },
  {
    id: "6",
    srno: "007",
    messageId: "EM0007",
    senderName: "Manasi Naik",
    senderMail: "manasi@gmail.com",
    recipientMail: "aaditi@gmail.com",
    subject: "Meeting Update",
    timestamp: "22-08-2024, 09.20 AM",
    size: "140",
    read: "Admin, Project Lead",
  },
  {
    id: "7",
    srno: "008",
    messageId: "EM0008",
    senderName: "Google",
    senderMail: "info@google.com",
    recipientMail: "info@google.com",
    subject: "Meeting Update",
    timestamp: "22-08-2024, 09.20 AM",
    size: "140",
    read: "Admin, Manager",
  },
  {
    id: "8",
    srno: "009",
    messageId: "EM0009",
    senderName: "Manasi Naik",
    senderMail: "manasi@gmail.com",
    recipientMail: "aaditi@gmail.com",
    subject: "Meeting Update",
    timestamp: "22-08-2024, 09.20 AM",
    size: "140",
    read: "Admin",
  },
  {
    id: "9",
    srno: "010",
    messageId: "EM00010",
    senderName: "Manasi Naik",
    senderMail: "manasi@gmail.com",
    recipientMail: "aaditi@gmail.com",
    subject: "Meeting Update",
    timestamp: "22-08-2024, 09.20 AM",
    size: "140",
    read: "Admin",
  },
  {
    id: "10",
    srno: "011",
    messageId: "EM00011",
    senderName: "LinkedIn",
    senderMail: "info@linkedin.com",
    recipientMail: "info@linkedin.com",
    subject: "Meeting Update",
    timestamp: "22-08-2024, 09.20 AM",
    size: "140",
    read: "Admin, Manager",
  },
];

const EmailReceivedLogs = () => {
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
            <h4 className="text-3xl text-dark">Email Received Log</h4>
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
                    id="button-211"
                  >
                    <img src={Printer} alt="Printer" />
                    <span>Print</span>
                  </button>
                  <button
                    className="text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-1.5 sm:py-2 sm:px-3 whitespace-nowrap flex gap-2"
                    id="button-212"
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
                page="email-received"
                heading="Email Received Log Details"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailReceivedLogs;
