import formatDateTime from "../utils/DateFormat";
import NewTable from "../Components/NewTable";

const statuses = [
  {
    id: 0,
    name: "Active",
    searchBy: "status",
    bgColor: "#ECFDF3",
    color: "#027948",
    dotColor: "#12B76A",
  },
  {
    id: 1,
    name: "Draft",
    searchBy: "status",
    bgColor: "#F2F4F7",
    color: "#344054",
    dotColor: "#667085",
  },
];

const columns = [
  // {
  //   Header: "Plan Name",
  //   accessor: "name",
  //   searchable: true,
  //   isMandatory: true,
  // },
  // {
  //   Header: "Description",
  //   accessor: "description",
  //   searchable: true,
  // },

  // {
  //   Header: "Billed Type",
  //   accessor: "duration",
  //   searchable: true,
  // },
  // {
  //   Header: "Currency",
  //   accessor: "currency",
  //   searchable: true,
  // },
  // {
  //   Header: "Price",
  //   accessor: "originalPrice",
  //   searchable: true,
  // },
  // {
  //   Header: "Discounted Price",
  //   accessor: "discountedPrice",
  //   searchable: true,
  // },
  // {
  //   Header: "Trial Available",
  //   accessor: "trial",
  //   searchable: true,
  //   render: (value) => (value ? "Yes" : "No"),
  // },

  // {
  //   Header: "Status",
  //   accessor: "isActive",
  //   // searchable: true,
  //   render: (value) => {
  //     const statusStyles = {
  //       light: {
  //         Active: "bg-[#ECFDF3] text-[#027948]", // Green background, dark green text
  //         Draft: "bg-[#F2F4F7] text-[#344054]", // Gray background, dark gray text
  //       },
  //       dark: {
  //         Active: "bg-[#0C3A2C] text-[#4ADE80]", // Dark green background, light green text
  //         Draft: "bg-[#1F2937] text-[#9CA3AF]", // Dark gray background, light gray text
  //       },
  //     };

  //     const dotColors = {
  //       light: {
  //         Active: "#12B76A", // Green dot
  //         Draft: "#667085", // Gray dot
  //       },
  //       dark: {
  //         Active: "#4ADE80", // Light green dot
  //         Draft: "#9CA3AF", // Light gray dot
  //       },
  //     };

  //     const status = value ? "Active" : "Draft";
  //     const theme = document.body.getAttribute("theme") || "dark";
  //     const currentStyles = statusStyles[theme];
  //     const currentDotColors = dotColors[theme];

  //     return (
  //       <div
  //         className={`rounded-xl ${currentStyles[status]} px-2 w-fit flex gap-2 items-center`}
  //       >
  //         <span
  //           className="min-w-[8px] min-h-[8px] rounded-full"
  //           style={{ backgroundColor: currentDotColors[status] }}
  //         ></span>
  //         <span>{status}</span>
  //       </div>
  //     );
  //   },
  // },
  {
    Header: "Created At",
    accessor: "createdAt",
    render: (value) => formatDateTime(value),
  },
  {
    Header: "Updated At",
    accessor: "updatedAt",
    render: (value) => formatDateTime(value),
  },
];

const EnterpriseRequests = () => {
  const tableMetaData = {
    endpoint: "/private/enterprise/requests",
    editPath: "edit-enterprise-request",
    viewPath: "view-enterprise-request",
  };

  return (
    <>
      <div className="py-8 p-4 sm:p-5 overflow-x-hidden mb-20">
        <div className="w-full pb-4 gap-y-4 gap-2 flex items-start border-b border-primary justify-between">
          <div className="">
            <h4 className="text-3xl text-dark">Enterprise Plan Requests</h4>
          </div>
        </div>
        <div className="-m-1.5 mt-4">
          <NewTable
            columns={columns}
            tableMetaData={tableMetaData}
            statuses={statuses}
            showDeleteAction={false}
          />
        </div>
      </div>
    </>
  );
};

export default EnterpriseRequests;
