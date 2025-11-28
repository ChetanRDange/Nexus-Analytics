import React, { useState } from "react";
import DynamicTableComponent from "../Components/DynamicTableComponent";

const defaultColumns = [
  {
    Header: "Sr. No.",
    accessor: "srno",
  },
  {
    Header: "Referred Company",
    accessor: "referredCompany",
  },
  {
    Header: "Referred By",
    accessor: "referredBy",
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      const statusStyles = {
        Pending: "bg-[#FFFAEB] text-[#B54708]",
        Expired: "bg-[#FEF3F2] text-[#B32318]",
      };
      const statusColors = {
        Pending: "#F79009",
        Expired: "#F04438",
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
    Header: "Referral Condition",
    accessor: "referralCondition",
  },
  {
    Header: "Referral Date",
    accessor: "referralDate",
  },
  {
    Header: "Expiration Date",
    accessor: "expirationDate",
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

const statuses = [
  {
    id: 0,
    name: "Success",
    bgColor: "#ECFDF3",
    color: "#027948",
    dotColor: "#12B76A",
  },
  {
    id: 1,
    name: "Pending",
    bgColor: "#FFFAEB",
    color: "#B54708",
    dotColor: "#F79009",
  },
  {
    id: 2,
    name: "Inactive",
    bgColor: "#F2F4F7",
    color: "#344054",
    dotColor: "#667085",
  },
  {
    id: 3,
    name: "Blocked",
    bgColor: "#FEF3F2",
    color: "#B32318",
    dotColor: "#F04438",
  },
];

const comapnyInfo = [
  {
    id: "0",
    srno: "001",
    referredCompany: "Google",
    referredBy: "Manasi",
    status: "Pending",
    referralCondition: "Referee subscribes to a paid plan",
    referralDate: "22-08-2024, 02.00 AM",
    expirationDate: "22-08-2024, 02.00 AM",
  },
  {
    id: "1",
    srno: "001",
    referredCompany: "Google",
    referredBy: "Manasi",
    status: "Pending",
    referralCondition: "Referee subscribes to a paid plan",
    referralDate: "22-08-2024, 02.00 AM",
    expirationDate: "22-08-2024, 02.00 AM",
  },
  {
    id: "2",
    srno: "001",
    referredCompany: "Google",
    referredBy: "Manasi",
    status: "Pending",
    referralCondition: "Referee subscribes to a paid plan",
    referralDate: "22-08-2024, 02.00 AM",
    expirationDate: "22-08-2024, 02.00 AM",
  },
  {
    id: "3",
    srno: "001",
    referredCompany: "Google",
    referredBy: "Manasi",
    status: "Pending",
    referralCondition: "Referee subscribes to a paid plan",
    referralDate: "22-08-2024, 02.00 AM",
    expirationDate: "22-08-2024, 02.00 AM",
  },
  {
    id: "4",
    srno: "001",
    referredCompany: "Google",
    referredBy: "Manasi",
    status: "Pending",
    referralCondition: "Referee subscribes to a paid plan",
    referralDate: "22-08-2024, 02.00 AM",
    expirationDate: "22-08-2024, 02.00 AM",
  },
  {
    id: "5",
    srno: "001",
    referredCompany: "Google",
    referredBy: "Manasi",
    status: "Pending",
    referralCondition: "Referee subscribes to a paid plan",
    referralDate: "22-08-2024, 02.00 AM",
    expirationDate: "22-08-2024, 02.00 AM",
  },
  {
    id: "6",
    srno: "001",
    referredCompany: "Google",
    referredBy: "Manasi",
    status: "Expired",
    referralCondition: "Referee subscribes to a paid plan",
    referralDate: "22-08-2024, 02.00 AM",
    expirationDate: "22-08-2024, 02.00 AM",
  },
  {
    id: "7",
    srno: "001",
    referredCompany: "Google",
    referredBy: "Manasi",
    status: "Pending",
    referralCondition: "Referee subscribes to a paid plan",
    referralDate: "22-08-2024, 02.00 AM",
    expirationDate: "22-08-2024, 02.00 AM",
  },
  {
    id: "8",
    srno: "001",
    referredCompany: "Google",
    referredBy: "Manasi",
    status: "Pending",
    referralCondition: "Referee subscribes to a paid plan",
    referralDate: "22-08-2024, 02.00 AM",
    expirationDate: "22-08-2024, 02.00 AM",
  },
  {
    id: "9",
    srno: "001",
    referredCompany: "Google",
    referredBy: "Manasi",
    status: "Expired",
    referralCondition: "Referee subscribes to a paid plan",
    referralDate: "22-08-2024, 02.00 AM",
    expirationDate: "22-08-2024, 02.00 AM",
  },
  {
    id: "10",
    srno: "001",
    referredCompany: "Google",
    referredBy: "Manasi",
    status: "Pending",
    referralCondition: "Referee subscribes to a paid plan",
    referralDate: "22-08-2024, 02.00 AM",
    expirationDate: "22-08-2024, 02.00 AM",
  },
];

const PendingReferrals = () => {
  const [onTabClick, setOnTabClick] = useState("Referrer");

  const handleSelectionChange = (selectedIds) => {
    console.log("Selected IDs:", selectedIds);
  };

  return (
    <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
      <div className="w-full flex justify-between pb-5 ">
        <div className="">
          <h4 className="text-3xl text-dark">Pending Referrals</h4>
        </div>
      </div>

      <div className="flex flex-col rounded-xl">
        <div className="w-full align-middle">
          <div className="flex flex-col gap-y-2 md:flex-row md:justify-between items-center gap-2 pt-3 pb-6 ">
            <div className="w-full flex flex-wrap items-center gap-3 border-b border-primary pb-6">
              <button
                onClick={() => setOnTabClick("Referrer")}
                className={`py-2 px-3 rounded-xl text-primary  ${
                  onTabClick === "Referrer" ? "bg-fadedblue" : "bg-white"
                }`}
                id="button-248"
              >
                Referrer
              </button>
              <button
                onClick={() => setOnTabClick("Referee")}
                className={`py-2 px-3 rounded-xl text-primary  ${
                  onTabClick === "Referee" ? "bg-fadedblue" : "bg-white"
                }`}
                id="button-249"
              >
                Referee
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col border rounded-xl mb-20">
        <div className="-m-1.5">
          <div className="p-1.5 min-w-full align-middle">
            {onTabClick === "Referee" && (
              <DynamicTableComponent
                columns={defaultColumns}
                data={comapnyInfo}
                selectable={true}
                onSelectChange={handleSelectionChange}
                actions={true}
                edit={false}
                categories={categories}
                statuses={statuses}
                deleteBtn={false}
                printBtn={true}
                importBtn={false}
                ExportBtn={true}
                tableCountLabel={true}
                filter={true}
                search={true}
              />
            )}

            {onTabClick === "Referrer" && (
              <DynamicTableComponent
                columns={defaultColumns}
                data={comapnyInfo}
                selectable={true}
                onSelectChange={handleSelectionChange}
                actions={true}
                edit={false}
                categories={categories}
                statuses={statuses}
                deleteBtn={false}
                printBtn={true}
                importBtn={false}
                ExportBtn={true}
                tableCountLabel={true}
                filter={true}
                search={true}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingReferrals;
