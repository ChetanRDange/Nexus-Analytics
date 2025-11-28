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
        Completed: "bg-[#ECFDF3] text-[#027948]",
        Blocked: "bg-[#FEF3F2] text-[#B32318]",
      };
      const statusColors = {
        Completed: "#12B76A",
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
    Header: "Points Earned",
    accessor: "pointsEarned",
  },
  {
    Header: "Points Redeemed",
    accessor: "pointsRedeemed",
  },
  {
    Header: "Redeemed On",
    accessor: "redeemedOn",
    Cell: ({ value }) =>
      value ? value : <span className="w-full text-center">-</span>,
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
    referredCompany: "Google",
    referredBy: "Manasi",
    status: "Completed",
    pointsEarned: "200",
    pointsRedeemed: "150",
    redeemedOn: "Plan Upgrade",
    referralDate: "22-08-2024, 02.00 AM",
    expirationDate: "22-08-2024, 02.00 AM",
  },
  {
    id: "1",
    srno: "001",
    referredCompany: "Google",
    referredBy: "Manasi",
    status: "Expired",
    pointsEarned: "200",
    pointsRedeemed: "150",
    redeemedOn: "Plan Upgrade",
    referralDate: "22-08-2024, 02.00 AM",
    expirationDate: "22-08-2024, 02.00 AM",
  },
  {
    id: "2",
    srno: "001",
    referredCompany: "Google",
    referredBy: "Manasi",
    status: "Completed",
    pointsEarned: "200",
    pointsRedeemed: "150",
    redeemedOn: "Plan Upgrade",
    referralDate: "22-08-2024, 02.00 AM",
    expirationDate: "22-08-2024, 02.00 AM",
  },
  {
    id: "3",
    srno: "001",
    referredCompany: "Google",
    referredBy: "Manasi",
    status: "Completed",
    pointsEarned: "200",
    pointsRedeemed: "150",
    redeemedOn: "Plan Upgrade",
    referralDate: "22-08-2024, 02.00 AM",
    expirationDate: "22-08-2024, 02.00 AM",
  },
  {
    id: "4",
    srno: "001",
    referredCompany: "Google",
    referredBy: "Manasi",
    status: "Completed",
    pointsEarned: "200",
    pointsRedeemed: "150",
    redeemedOn: "Plan Upgrade",
    referralDate: "22-08-2024, 02.00 AM",
    expirationDate: "22-08-2024, 02.00 AM",
  },
  {
    id: "5",
    srno: "001",
    referredCompany: "Google",
    referredBy: "Manasi",
    status: "Completed",
    pointsEarned: "200",
    pointsRedeemed: "150",
    redeemedOn: "Plan Upgrade",
    referralDate: "22-08-2024, 02.00 AM",
    expirationDate: "22-08-2024, 02.00 AM",
  },
  {
    id: "6",
    srno: "001",
    referredCompany: "Google",
    referredBy: "Manasi",
    status: "Completed",
    pointsEarned: "200",
    pointsRedeemed: "150",
    redeemedOn: "Plan Upgrade",
    referralDate: "22-08-2024, 02.00 AM",
    expirationDate: "22-08-2024, 02.00 AM",
  },
  {
    id: "7",
    srno: "001",
    referredCompany: "Google",
    referredBy: "Manasi",
    status: "Completed",
    pointsEarned: "200",
    pointsRedeemed: "150",
    redeemedOn: "Plan Upgrade",
    referralDate: "22-08-2024, 02.00 AM",
    expirationDate: "22-08-2024, 02.00 AM",
  },
  {
    id: "8",
    srno: "001",
    referredCompany: "Google",
    referredBy: "Manasi",
    status: "Completed",
    pointsEarned: "200",
    pointsRedeemed: "150",
    redeemedOn: "Plan Upgrade",
    referralDate: "22-08-2024, 02.00 AM",
    expirationDate: "22-08-2024, 02.00 AM",
  },
  {
    id: "9",
    srno: "001",
    referredCompany: "Google",
    referredBy: "Manasi",
    status: "Expired",
    pointsEarned: "200",
    pointsRedeemed: "150",
    redeemedOn: "Plan Upgrade",
    referralDate: "22-08-2024, 02.00 AM",
    expirationDate: "22-08-2024, 02.00 AM",
  },
  {
    id: "10",
    srno: "001",
    referredCompany: "Google",
    referredBy: "Manasi",
    status: "Completed",
    pointsEarned: "200",
    pointsRedeemed: "150",
    redeemedOn: "Plan Upgrade",
    referralDate: "22-08-2024, 02.00 AM",
    expirationDate: "22-08-2024, 02.00 AM",
  },
];

const ReferralTransaction = () => {
  const [onTabClick, setOnTabClick] = useState("Referrer");

  const handleSelectionChange = (selectedIds) => {
    console.log("Selected IDs:", selectedIds);
  };

  return (
    <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden ">
      <div className="w-full flex justify-between pb-5 ">
        <div className="">
          <h4 className="text-3xl text-dark">Referral Transaction</h4>
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
                id="button-277"
              >
                Referrer
              </button>
              <button
                onClick={() => setOnTabClick("Referee")}
                className={`py-2 px-3 rounded-xl text-primary  ${
                  onTabClick === "Referee" ? "bg-fadedblue" : "bg-white"
                }`}
                id="button-278"
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

export default ReferralTransaction;
