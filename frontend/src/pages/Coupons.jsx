import React, { useContext, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import BulkTable from "../Components/BulkTable";
import NewTable from "../Components/NewTable";
import formatDateTime from "../utils/DateFormat";
import { getCouponsCustomData } from "../utils/SampleFileData";
import DeleteConfirm from "./DeleteConfirm";
import { GlobalContext } from "../App";

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
    name: "Upcoming",
    searchBy: "status",
    bgColor: "#FFFAEB",
    color: "#B54708",
    dotColor: "#F79009",
  },
  {
    id: 2,
    name: "Expired",
    searchBy: "status",
    bgColor: "#FEF3F2",
    color: "#B32318",
    dotColor: "#F04438",
  },
];

const defaultColumns = [
  {
    id: 0,
    Header: "Coupon Name",
    searchable: true,
    accessor: "name",
    isMandatory: true,
  },
  { id: 1, Header: "Description", searchable: true, accessor: "description" },
  {
    id: 2,
    Header: "Coupon Code",
    searchable: true,
    accessor: "code",
    // isMandatory: true,
  },
  {
    id: 3,
    Header: "Discount Type",
    searchable: true,
    accessor: "discountType",
    // isMandatory: true,
  },
  {
    id: 4,
    Header: "Discount Value",
    searchable: true,
    accessor: "discountValue",
    render: (value) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
    // isMandatory: true,
  },
  {
    id: 2,
    Header: "Usage Count",
    searchable: true,
    accessor: "usageCount",
  },
  {
    id: 5,
    Header: "Status",
    searchable: true,
    accessor: "status",
    render: (value) => {
      const statusStyles = {
        light: {
          Upcoming: "bg-[#F2F4F7] text-[#344054]",
          Active: "bg-[#ECFDF3] text-[#027948]",
          Expired: "bg-[#FEE2E2] text-[#B32318]",
        },
        dark: {
          Upcoming: "bg-[#1F2937] text-[#E5E7EB]",
          Active: "bg-[#0C3A2C] text-[#4ADE80]",
          Expired: "bg-[#3A1212] text-[#FDA29B]",
        },
      };

      const statusColors = {
        light: {
          Upcoming: "#667085",
          Active: "#12B76A",
          Expired: "#B32318",
        },
        dark: {
          Upcoming: "#9CA3AF",
          Active: "#4ADE80",
          Expired: "#FDA29B",
        },
      };

      const theme = document.body.getAttribute("theme") || "dark";
      const currentStyles = statusStyles[theme];
      const currentColors = statusColors[theme];

      return (
        <div
          className={`rounded-xl ${
            currentStyles[value] || currentStyles.Upcoming
          } px-2 w-fit flex gap-2 items-center`}
        >
          <span
            className="min-w-[8px] min-h-[8px] rounded-full"
            style={{
              backgroundColor: currentColors[value] || currentColors.Upcoming,
            }}
          ></span>
          <span>{value}</span>
        </div>
      );
    },
    // isMandatory: true,
  },
  {
    id: 6,
    Header: "Start Date",
    accessor: "startDate",
    render: (value) =>
      value ? (
        formatDateTime(value)
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
  {
    id: 7,
    Header: "End Date",
    accessor: "endDate",
    render: (value) =>
      value ? (
        formatDateTime(value)
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
  // {
  //   Header: "Applicable Plan",
  //   searchable: true,
  //   accessor: "applicablePlan",
  // },
  // {
  //   Header: "Applicable Users",
  //   searchable: true,
  //   accessor: "targetAudience",
  //   render: (value) => {
  //     if (value) {
  //       const trueKey = Object.keys(value || {}).find(
  //         (key) => value[key] === true
  //       );
  //       const matchingAudience = targetAudiences.find(
  //         (audience) => audience.accessor === trueKey
  //       );
  //       return matchingAudience?.showName || "";
  //     } else {
  //       return (
  //         <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
  //           Required
  //         </span>
  //       );
  //     }
  //   },
  // },
  {
    id: 8,
    Header: "Max Coupon Usage",
    searchable: true,
    accessor: "maxCouponUsage",
  },
  {
    id: 9,
    Header: "Created Date",
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
  {
    id: 10,
    Header: "Updated Date",
    accessor: "updatedAt",
    render: (value) =>
      value ? (
        formatDateTime(value)
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
  {
    id: 11,
    Header: "Created By",
    accessor: "createdBy",
    render: (value) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
  {
    id: 12,
    Header: "Updated By",
    accessor: "updatedBy",
    render: (value) =>
      value ? (
        value
      ) : (
        <span className="w-full text-center bg-[#FEF3F2] text-[#B32318] px-2 py-1 rounded-lg">
          Required
        </span>
      ),
  },
];

const categories = [
  {
    id: 0,
    name: "Company Id",
  },
  {
    id: 1,
    name: "Company Size",
  },
  {
    id: 2,
    name: "Latest Payment",
  },
  {
    id: 3,
    name: "Plan Expiry Date",
  },
  {
    id: 4,
    name: "Status",
  },
];

const bulkTableColumns = [
  {
    Header: "Coupon Name",
    key: "name",
    required: true,
  },
  {
    Header: "Description",
    key: "description", // This is for the data key in testData
    required: true,
  },
  {
    Header: "Coupon Code",
    key: "code",
    required: true,
  },
  {
    Header: "Discount Value",
    key: "discountValue",
    required: true,
  },
  {
    Header: "Discount Type",
    key: "discountType",
    required: true,
  },
  {
    Header: "Start Date",
    key: "startDate",
    required: true,
  },
  {
    Header: "End Date",
    key: "endDate",
    required: true,
  },
  {
    Header: "Applicable Plan",
    key: "applicablePlan",
    required: true,
  },
  {
    Header: "Applicable Users",
    key: "targetAudience",
    required: true,
  },
  {
    Header: "Max Coupon Usage",
    key: "maxCouponUsage",
    required: true,
  },
];

const schemaMapping = {
  _id: () => null,
  name: "name",
  code: "code",
  description: "description",
  startDate: (data) => data.startDate.split("T")[0], // Extract date only
  startTime: () => "00:00", // Default start time
  endDate: (data) => data.endDate.split("T")[0], // Static end date (modify as needed)
  endTime: () => "23:59", // Default end time
  discountType: "discountType",
  discountValue: (data) =>
    data.discountValue === "N/A" ? null : parseFloat(data.discountValue), // Convert if not "N/A"
  applicablePlan: (data) => [data.applicablePlan], // Convert to array
  targetAudience: (data) => ({
    newCompanies: data.targetAudience === "newCompanies",
    allCompanies: data.targetAudience === "allCompanies",
    returningCompanies: data.targetAudience === "returningCompanies",
    freePlanCompanies: data.targetAudience === "freePlanCompanies",
  }),
  maxCouponUsage: (data) => parseInt(data.maxCouponUsage, 10), // Convert to number
  status: () => "Active", // Assuming imported coupons are active
  createdAt: () => new Date().toISOString(), // Current timestamp
  updatedAt: () => "N/A",
  __v: () => 0, // Default versioning
};

const Coupons = () => {
  const { fullScreen } = useContext(GlobalContext);
  const [fileImportedData, setFileImportedData] = useState([]);
  const [isFileImported, setIsFileImported] = useState(false);
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const [isInviteSentModalOpen, setIsInviteSentModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState(0);
  // const { isFileImported, fileImportedData } = useStore();
  const [isImportCompanyModalOpen, setIsImportCompanyModalOpen] =
    useState(false);
  const [isImportSuccess, setIsImportSuccess] = useState(false);
  const handleSelectionChange = (selectedIds) => {
    setSelectedIds(selectedIds.length);
    console.log("Selected IDs:", selectedIds);
  };
  if (isImportSuccess) {
    console.log("Success");
  }
  const openImportModal = () => {
    setIsImportCompanyModalOpen(true);
  };

  const tableMetaData = {
    tableName: "coupons",
    model: "Coupons",
    endpoint: "/private/coupons",
    viewPath: "coupons/view",
    editPath: "coupons/edit",
    copyPath: "coupons/add",
    bulkImport: true,
    showDeleteAll: true,
    deleteField: "name",
  };

  // discountType,newUserOnly,isActive,status
  // enum: ["Upcoming", "Active", "Expired"],
  const tableFilters = [
    {
      type: "multiSelect",
      key: "discountType",
      title: "Discount Type",
      options: [
        { title: "Percentage", value: "percentage" },
        { title: "Amount", value: "amount" },
      ],
    },
    {
      type: "multiSelect",
      key: "status",
      title: "Status",
      options: [
        { title: "Active", value: "Active" },
        { title: "Upcoming", value: "Upcoming" },
        { title: "Expired", value: "Expired" },
      ],
    },
    // {
    //   type: "multiSelect",
    //   key: "newUserOnly",
    //   title: "New User Only",
    //   options: [
    //     { title: "Yes", value: true },
    //     { title: "No", value: false },
    //   ],
    // },
  ];

  return (
    <>
      {/* <ImportCompaniesModal
        isImportCompanyModalOpen={isImportCompanyModalOpen}
        setIsImportCompanyModalOpen={setIsImportCompanyModalOpen}
        heading="FAQ Management"
        successImportModal={successImportModal}
        setSuccessImportModal={setSuccessImportModal}
      />
      <InvitationSuccessModal
        isInviteSuccessModalOpen={successImportModal}
        setIsInviteSuccessModalOpen={setSuccessImportModal}
        title="FAQ Added Successfully!"
        para="200 FAQ have been add."
        navigation="/coupons"
        SuccessIcon={SuccessIcon}
        setIsImportSuccess={setIsImportSuccess}
      /> */}
      {/* <div className="min-h-screen py-8 p-4 sm:p-5 overflow-x-hidden mb-20"> */}
      <div className="py-8 p-4 sm:p-5 overflow-x-hidden">
        <div className=" w-full">
          {!fullScreen && (
            <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
              <div className="">
                <h4 className="text-3xl text-dark">Coupons</h4>
              </div>
              <div className="w-full flex justify-end sm:w-fit">
                <Link
                  id="coupons/add"
                  to="/coupons/add"
                  className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-primarydark text-white"
                >
                  {/* <img src={Add} alt="Add" /> */}
                  <IoMdAdd size={22} />
                  <span>Add Coupon</span>
                </Link>
              </div>
            </div>
          )}
          {isFileImported && (
            // <div className="flex flex-col border border-primary my-8 rounded-xl">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full align-middle">
                <DeleteConfirm
                  isInviteSentModalOpen={isInviteSentModalOpen}
                  setIsInviteSentModalOpen={setIsInviteSentModalOpen}
                />
                <BulkTable
                  bulkendpoint="/coupons/bulk"
                  defaultColumns={bulkTableColumns}
                  data={fileImportedData}
                  schemaMapping={schemaMapping}
                  setIsFileImported={setIsFileImported}
                />
              </div>
            </div>
            // </div>
          )}
          <div className="flex flex-col  my- rounded-xl">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full align-middle">
                {!isFileImported && (
                  <NewTable
                    tableFilters={tableFilters}
                    columns={defaultColumns}
                    tableMetaData={tableMetaData}
                    triggerRefetch={triggerRefetch}
                    setTriggerRefetch={setTriggerRefetch}
                    statuses={statuses}
                    bulkColumns={bulkTableColumns}
                    sampleFileDataxlsx={getCouponsCustomData}
                    setFileImportedData={setFileImportedData}
                    setIsFileImported={setIsFileImported}
                    showCopyAction={true}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coupons;
