import { IoMdAdd } from "react-icons/io";
import formatDateTime from "../utils/DateFormat";
import { Link } from "react-router-dom";
import NewTable from "../Components/NewTable";
import { PhoneWithFlag } from "../Components/countryCode";
import { useContext } from "react";
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
    name: "Pending",
    searchBy: "status",

    bgColor: "#F2F4F7",
    color: "#344054",
    dotColor: "#667085",
  },
  {
    id: 2,
    name: "Inactive",
    searchBy: "status",
    bgColor: "#FEF3F2",
    color: "#B32318",
    dotColor: "#F04438",
  },
  {
    id: 3,
    name: "Blocked",
    searchBy: "status",

    bgColor: "#FFFAEB",
    color: "#B54708",
    dotColor: "#F79009",
  },
];
const defaultColumns = [
  {
    id: 0,
    Header: "Name",
    // searchable: true,
    accessor: "name",
    isMandatory: true,
  },
  {
    id: 1,
    Header: "Email ID",
    // searchable: true,
    accessor: "email",
    // isMandatory: true,
  },
  {
    id: 2,
    Header: "Company Name",
    accessor: "company.companyName",
  },
  {
    id: 3,
    Header: "Super Admin",
    searchable: true,
    accessor: "isSuperAdmin",
    render: (value) => (value ? "Yes" : "No"),
    // isMandatory: true,
  },
  {
    id: 4,
    Header: "Verified",
    searchable: true,
    accessor: "isVerified",
    render: (value) => (value ? "Yes" : "No"),
    // isMandatory: true,
  },
  {
    id: 5,
    Header: "Contact Number",
    accessor: "phone",
    render: (value, row) => (
      <PhoneWithFlag phoneCode={row.phoneCode} phone={value} />
    ),
  },
  {
    id: 6,
    Header: "Created At",
    accessor: "createdAt",
    render: (value) => formatDateTime(value),
  },
  {
    id: 7,
    Header: "Updated At",
    accessor: "updatedAt",
    render: (value) => formatDateTime(value),
  },
];


const tableMetaData = {
  tableName: "companyUser",
  model: "Comapany Users",
  endpoint: "/private/companies/getCompanyUsers",
  viewPath: "company-user-details",
  editPath: "edit-company-user",
  bulkImport: false,
  showDeleteAll: false,
  showMagicLogAction: false,
};

const tableFilters = [
  {
    type: "multiSelect",
    key: "isVerified",
    title: "Verified",
    options: [
      { title: "Yes", value: true },
      { title: "No", value: false },
    ],
  },
  {
    type: "multiSelect",
    key: "isSuperAdmin",
    title: "Super Admin",
    options: [
      { title: "Yes", value: true },
      { title: "No", value: false },
    ],
  },
];

const booleanTypes = [
  {
    id: 0,
    name: "Yes",
    filterBy: "isSuperAdmin",
    value: true,
  },
  {
    id: 1,
    name: "No",
    filterBy: "isSuperAdmin",
    value: false,
  },
];

const CompanyUsers = () => {
      const { fullScreen } = useContext(GlobalContext);
  
  return (
    <>
      {/* <div className="min-h-screen py-8 p-4 sm:p-5 overflow-x-hidden mb-20"> */}
      <div className="py-8 p-4 sm:p-5 overflow-x-hidden">
        <div className=" w-full">
        {!fullScreen &&  <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
            <div className="">
              <h4 className=" sm:text-3xl text-2xl  text-dark">Company Users</h4>
            </div>
          </div>}

          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full align-middle">
                <NewTable
                  tableFilters={tableFilters}
                  columns={defaultColumns}
                  tableMetaData={tableMetaData}
                  endpoint={"/private/companies/getCompanyUsers"} //backend
                  // deleteEndPoint={"/private/companies"} //backend
                  editPath={"edit-company-user"} //frontend
                  viewPath={"company-user-details"}
                  statuses={statuses}
                  showDeleteAction={false}
                  showMagicLogAction={false}
                  type={booleanTypes}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyUsers;
