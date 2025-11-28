import { useContext, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link, useSearchParams } from "react-router-dom";
import BulkTable from "../Components/BulkTable";
import ExportAdminModal from "../Components/ExportAdminModel";
import ImportCompaniesModal from "../Components/ImportCompaniesModal";
import InvitationSuccessModal from "../Components/InvitationSuccessModal";
import NewTable from "../Components/NewTable";
import SuccessIcon from "../assets/svgs/success-icon.svg";
import formatDateTime from "../utils/DateFormat";
import { getCompaniesSampleData } from "../utils/SampleFileData";
import DeleteConfirm from "./DeleteConfirm";
import { PhoneWithFlag } from "../Components/countryCode";
import useFetch from "../hooks/useFetch";
import { GlobalContext } from "../App";

const defaultColumns = [
  {
    id: 0,
    Header: "Company Name",
    accessor: "companyName",
    isMandatory: true,
  },
  {
    id: 1,
    Header: "Email ID",
    accessor: "email",
  },
  {
    id: 2,
    Header: "Contact Number",
    accessor: "phone",
    render: (value, row) => (
      <PhoneWithFlag phoneCode={row.phoneCode} phone={value} />
    ),
  },
  {
    id: 3,
    Header: "Trial Applicable",
    accessor: "trialApplicable",
    render: (value) => (value ? "Yes" : "No"),
  },
  {
    id: 4,
    Header: "Currency",
    accessor: "currency",
  },
  {
    id: 5,
    Header: "Status",
    searchable: true,
    accessor: "status",
    render: (value) => {
      const statusStyles = {
        light: {
          Pending: "bg-[#F2F4F7] text-primary",
          Active: "bg-[#ECFDF3] text-[#027948]",
          Inactive: "bg-[#FEE2E2] text-[#B32318]",
          Blocked: "bg-[#FDF6E3] text-[#B54708]",
        },
        dark: {
          Pending: "bg-[#1c2849] text-[#E4E7EC]",
          Active: "bg-[#0C3A2C] text-[#4ADE80]",
          Inactive: "bg-[#3A1212] text-[#FCA5A5]",
          Blocked: "bg-[#3A2A16] text-[#FCD34D]",
        },
      };

      const statusColors = {
        light: {
          Pending: "#667085",
          Active: "#12B76A",
          Inactive: "#B32318",
          Blocked: "#F79009",
        },
        dark: {
          Pending: "#9CA3AF",
          Active: "#4ADE80",
          Inactive: "#FCA5A5",
          Blocked: "#FCD34D",
        },
      };

      const theme = document.body.getAttribute("theme") || "dark";
      const currentStyles = statusStyles[theme];
      const currentColors = statusColors[theme];

      return (
        <div
          className={`rounded-xl ${
            currentStyles[value] || currentStyles.Pending
          } px-2 w-fit flex gap-2 items-center`}
        >
          <span
            className="min-w-[8px] min-h-[8px] rounded-full"
            style={{
              backgroundColor: currentColors[value] || currentColors.Pending,
            }}
          ></span>
          <span>{value}</span>
        </div>
      );
    },
  },
  {
    id: 6,
    Header: "Current Plan",
    searchable: true,
    accessor: "plan.name",
    isMandatory: true,
  },
  {
    id: 7,
    Header: "Created At",
    accessor: "createdAt",
    render: (value) => formatDateTime(value),
  },
  {
    id: 8,
    Header: "Updated At",
    accessor: "updatedAt",
    render: (value) => formatDateTime(value),
  },
];

const bulkColumns = [
  {
    Header: "Company Name",
    key: "companyName",
    required: true, // Required field
  },
  {
    Header: "Company Logo",
    key: "companyLogo",
    required: false,
  },
  {
    Header: "Company Size",
    key: "companySize",
    required: false,
  },
  {
    Header: "Country",
    key: "country",
    required: false,
  },
  {
    Header: "State",
    key: "state",
    required: false,
  },
  {
    Header: "City",
    key: "city",
    required: false,
  },
  {
    Header: "Address",
    key: "address",
    required: false,
  },
  {
    Header: "Zip Code",
    key: "zipCode",
    required: false,
  },
  {
    Header: "VAT Number",
    key: "vatNumber",
    required: false,
  },
  {
    Header: "Status",
    key: "status",
    required: false,
  },
  {
    Header: "Admin Name",
    key: "name",
    required: true, // Required field
  },
  {
    Header: "Admin Email ID",
    key: "email",
    required: true, // Required field
  },
  {
    Header: "Phone Code",
    key: "phone.code", // Mapping nested object
    required: true, // Required field
  },
  {
    Header: "Admin Phone",
    key: "phone.number", // Mapping nested object
    required: true, // Required field
  },
  {
    Header: "Date Format",
    key: "companySettings.dateFormat",
    required: false,
  },
  {
    Header: "Time Format",
    key: "companySettings.timeFormat",
    required: false,
  },
  {
    Header: "Time Zone",
    key: "companySettings.timeZone",
    required: false,
  },
];

const schemaMapping = {
  companyName: "companyName",
  companyLogo: "companyLogo",
  companySize: "companySize",
  country: "country",
  state: "state",
  city: "city",
  address: "address",
  zipCode: "zipCode",
  vatNumber: "vatNumber",
  status: "status",
  name: "name",
  email: "email",
  phone: (data) => ({
    code: data["phone.code"] || null,
    number: data["phone.number"] || null,
  }),
};

const Companies = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
    const { fullScreen } = useContext(GlobalContext);
  

  const [isInviteSentModalOpen, setIsInviteSentModalOpen] = useState(false);

  const [isImportSuccess, setIsImportSuccess] = useState(false);
  const [isImportCompanyModalOpen, setIsImportCompanyModalOpen] =
    useState(false);
  const [isExportModelOpen, setIsExportModelOpen] = useState(false);
  const [fileImportedData, setFileImportedData] = useState([]);
  const [isFileImported, setIsFileImported] = useState(false);
  const [successImportModal, setSuccessImportModal] = useState(false);

  const { data: plans, loading: loadingPlans } = useFetch(
    "/private/companies/getDistPlans"
  );

  const tableMetaData = {
    tableName: "companies",
    model: "Companies",
    endpoint: "/private/companies",
    viewPath: "companies/view",
    editPath: "edit-company",
    bulkImport: false,
    showDeleteAll: false,
  };

  const tableFilters = [
    {
      type: "multiSelect",
      key: "status",
      title: "Status",
      options: [
        { title: "Active", value: "Active" },
        { title: "Expired", value: "Expired" },
        { title: "Pending", value: "Pending" },
        { title: "Blocked", value: "Blocked" },
      ],
    },
    {
      type: "multiSelect",
      key: "trialApplicable",
      title: "Trial Applicable",
      options: [
        { title: "Yes", value: true },
        { title: "No", value: false },
      ],
    },
    {
      type: "multiSelect",
      key: "trialUsed",
      title: "Trial Used",
      options: [
        { title: "Yes", value: true },
        { title: "No", value: false },
      ],
    },
    {
      type: "multiSelect",
      key: "currency",
      title: "Currency",
      options: [
        { title: "INR", value: "INR" },
        { title: "USD", value: "USD" },
        { title: "AED", value: "AED" },
      ],
    },
    {
      type: "multiSelect",
      key: "plan",
      title: "Plan",
      options:
        !loadingPlans && plans?.data?.length > 0
          ? plans?.data.map((plan) => ({ title: plan.name, value: plan._id }))
          : [],
    },
  ];

  return (
    <>
      <ImportCompaniesModal
        isImportCompanyModalOpen={isImportCompanyModalOpen}
        setIsImportCompanyModalOpen={setIsImportCompanyModalOpen}
        heading="Companies"
        successImportModal={successImportModal}
        setSuccessImportModal={setSuccessImportModal}
      />
      <InvitationSuccessModal
        isInviteSuccessModalOpen={successImportModal}
        setIsInviteSuccessModalOpen={setSuccessImportModal}
        SuccessIcon={SuccessIcon}
        title="Notices Added Successfully!"
        para="200 notices have been add."
        navigation="/companies"
        setIsImportSuccess={setIsImportSuccess}
      />

      <ExportAdminModal
        isExportModelOpen={isExportModelOpen}
        setIsExportModelOpen={setIsExportModelOpen}
      />

      <div className="py-8 p-4 sm:p-5 overflow-x-hidden">
        <div className=" w-full">
        { !fullScreen &&  <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap items-center justify-between pb-5 border-b border-primary">
            <h4 className="text-2xl md:text-3xl text-dark">Companies</h4>
            <Link
              id="add-company"
              to="/companies/add"
              className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-primarydark text-white"
            >
              <IoMdAdd size={22} />
              <span className="">Add Company</span>
            </Link>
          </div>}

          {isFileImported ? (
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full align-middle">
                <DeleteConfirm
                  isInviteSentModalOpen={isInviteSentModalOpen}
                  setIsInviteSentModalOpen={setIsInviteSentModalOpen}
                />
                <BulkTable
                  bulkendpoint="/companies/bulk"
                  defaultColumns={bulkColumns}
                  data={fileImportedData}
                  schemaMapping={schemaMapping}
                  setIsFileImported={setIsFileImported}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full align-middle">
                  <NewTable
                    tableFilters={tableFilters}
                    columns={defaultColumns}
                    tableMetaData={tableMetaData}
                    endpoint={"/private/companies"}
                    editPath={"edit-company"}
                    viewPath={"companies/view"}
                    bulkColumns={bulkColumns}
                    sampleFileDataxlsx={getCompaniesSampleData}
                    setFileImportedData={setFileImportedData}
                    setIsFileImported={setIsFileImported}
                    showDeleteAction={false}
                    showMagicLogAction={true}
                    preselectedStatus={status}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Companies;
