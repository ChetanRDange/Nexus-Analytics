import React, { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ImportCompaniesModal from "../Components/ImportCompaniesModal";
import NewTable from "../Components/NewTable";
import formatDateTime from "../utils/DateFormat";
import { GlobalContext } from "../App";

const defaultColumns = [
  {
    id:0,
    Header: "Company Name",
    accessor: "company.companyName",
    // searchable: true,
    isMandatory: true,
  },
  {
    id:1,
    Header: "Plan Name",
    accessor: "planInfo.name",
  },

  {
    id:2,
    Header: "Country",
    accessor: "country",
    searchable: true,
    Cell: ({ value }) => {
      // You might want to convert country code to full name here
      return <span>{value}</span>;
    },
  },
  {
    id:3,
    Header: "Payment Gateway",
    accessor: "paymentMethod",
    searchable: true,
    Cell: ({ value }) => {
      const paymentMethods = {
        razorpay: "Razorpay",
        // add other payment methods as needed
      };
      return <span>{paymentMethods[value] || value}</span>;
    },
  },
  {
    id:4,
    Header: "Order ID",
    accessor: "intent.id",
  },
  {
    id:5,
    Header: "Amount",
    accessor: "amountPaid",
    Cell: ({ value }) => {
      return <span>₹{value}</span>;
    },
  },
  {
    id:6,
    Header: "Currency",
    accessor: "currencyType",
    searchable: true,
  },
  {
    id:7,
    Header: "Status",
    searchable: true,
    accessor: "status",
    render: (value) => {
      const statuses = [
        {
          id: 0,
          name: "succeeded",
          displayName: "Success",
          light: {
            bgColor: "#ECFDF3",
            textColor: "#027948",
            dotColor: "#12B76A"
          },
          dark: {
            bgColor: "#0C3A2C",
            textColor: "#4ADE80",
            dotColor: "#4ADE80"
          }
        },
        {
          id: 1,
          name: "pending",
          displayName: "Pending",
          light: {
            bgColor: "#FFFAEB",
            textColor: "#B54708",
            dotColor: "#F79009"
          },
          dark: {
            bgColor: "#3A2A16",
            textColor: "#FCD34D",
            dotColor: "#FCD34D"
          }
        },
        {
          id: 2,
          name: "failed",
          displayName: "Failure",
          light: {
            bgColor: "#FEF3F2",
            textColor: "#B32318",
            dotColor: "#F04438"
          },
          dark: {
            bgColor: "#3A1212",
            textColor: "#FDA29B",
            dotColor: "#FDA29B"
          }
        }
      ];
  
      const theme = document.body.getAttribute("theme") || "dark";
      
      if (!value) {
        return (
          <span
            className={`w-full text-center ${
              theme === "dark"
                ? "bg-[#3A1212] text-[#FDA29B]"
                : "bg-[#FEF3F2] text-[#B32318]"
            } px-2 py-1 rounded-lg`}
          >
            Required
          </span>
        );
      }
  
      const status = statuses.find(s => s.name === value);
      if (!status) return <span className="capitalize">{value}</span>;
  
      const themeStyles = status[theme];
  
      return (
        <div
          className={`rounded-xl px-2 w-fit flex gap-2 items-center`}
          style={{
            backgroundColor: themeStyles.bgColor,
            color: themeStyles.textColor
          }}
        >
          <span
            className="min-w-[12px] min-h-[12px] rounded-full"
            style={{ backgroundColor: themeStyles.dotColor }}
          ></span>
          <span>{status.displayName}</span>
        </div>
      );
    },
  },
  {
    id:8,
    Header: "Payment Date",
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

const statuses = [
  {
    id: 0,
    name: "succeeded",
    displayName: "Success",
    bgColor: "#ECFDF3",
    color: "#027948",
    dotColor: "#12B76A",
  },
  {
    id: 1,
    name: "pending",
    displayName: "Pending",
    bgColor: "#FFFAEB",
    color: "#B54708",
    dotColor: "#F79009",
  },
  {
    id: 2,
    name: "failed",
    displayName: "Failure",
    bgColor: "#FEF3F2",
    color: "#B32318",
    dotColor: "#F04438",
  },
];

const tableMetaData = {
  tableName:"payments",
  model: "Payments",
  endpoint: "/private/paymentRecord",
  viewPath: "payments/view",
  // editPath: "notices/edit",
  bulkImport: false,
  showDeleteAll: true,
  deleteField: "type",
};

const Payment = () => {
  const { fullScreen } = useContext(GlobalContext);

  const [searchParams] = useSearchParams();
  const preCurrencyType = searchParams.get("currencyType");
  const [successImportModal, setSuccessImportModal] = useState(false);
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const [isImportCompanyModalOpen, setIsImportCompanyModalOpen] =
    useState(false);
  const [isImportSuccess, setIsImportSuccess] = useState(false);

  if (isImportSuccess) {
    console.log("Success");
  }

  const currencyType = [
    {
      id: 0,
      name: "INR",
      filterBy: "currencyType",
      value: "INR",
    },
    {
      id: 1,
      name: "USD",
      filterBy: "currencyType",
      value: "USD",
    },
    {
      id: 2,
      name: "AED",
      filterBy: "currencyType",
      value: "AED",
    },
  ];

  // currencyType,paymentMethod,status,
  // enum: ["stripe", "razorpay"],
  // ["pending", "canceled", "processing", "failed", "succeeded"]
  const tableFilters = [
    {
      type: "multiSelect",
      key: "currencyType",
      title: "Currency Type",
      options: [
        { title: "INR", value: "INR" },
        { title: "AED", value: "AED" },
        { title: "USD", value: "USD" },
      ],
    },
    {
      type: "multiSelect",
      key: "status",
      title: "Status",
      options: [
        { title: "Success", value: "succeeded" },
        { title: "Pending", value: "pending" },
        { title: "Failure", value: "failed" },
        { title: "Canceled", value: "canceled" },
        { title: "Processing", value: "processing" },
      ],
    },
  ];

  return (
    <>
      <ImportCompaniesModal
        isImportCompanyModalOpen={isImportCompanyModalOpen}
        setIsImportCompanyModalOpen={setIsImportCompanyModalOpen}
        heading="Companies"
        navigate={true}
        successImportModal={successImportModal}
        setSuccessImportModal={setSuccessImportModal}
      />
      {/* <div className="min-h-screen py-8 p-4 sm:p-5 overflow-x-hidden mb-20"> */}
      <div className="py-8 p-4 sm:p-5 overflow-x-hidden">
        <div className=" w-full">
        {!fullScreen &&  <div className="w-full flex flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
            <div className="">
              <h4 className="text-3xl text-dark">Payments</h4>
            </div>
          </div>}

          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <NewTable
                tableFilters={tableFilters}
                columns={defaultColumns}
                tableMetaData={tableMetaData}
                triggerRefetch={triggerRefetch}
                setTriggerRefetch={setTriggerRefetch}
                statuses={statuses}
                showEditAction={false}
                showDeleteAction={false}
                type={currencyType}
                preSelectedType={preCurrencyType}
              />
            </div>
            {/* <ChatBot /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
