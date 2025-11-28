import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import NewTable from "../Components/NewTable";
import formatDateTime from "../utils/DateFormat";
import { Download } from "lucide-react";
import { GlobalContext } from "../App";
import { useContext } from "react";

const defaultColumns = [
  { id: 0, Header: "Version", accessor: "version", isMandatory: true },
  {
    Header: "Download",
    accessor: "link",
    render: (value, raw) =>
      raw.link ? (
        <span className="">
          <a
            href={value}
            target="_blank"
            download={raw.version}
            className="text-primary text-center"
          >
            <Download />
          </a>
        </span>
      ) : (
        "NA"
      ),
  },
  { id: 1, Header: "Created By", accessor: "createdBy.email" },
  {
    id: 2,
    Header: "Breaking Change",
    accessor: "isBreakingChange",
    render: (value) => (value ? "Yes" : "No"),
  },
  {
    id: 3,
    Header: "Created At",
    accessor: "createdAt",
    render: (value) => formatDateTime(value),
  },
];

const VersionControl = () => {
  const { fullScreen } = useContext(GlobalContext);
  const tableMetaData = {
    tableName: "versionControl",
    model: "Version Control",
    endpoint: "/private/versionControl",
    deleteEndPoint: "/private/versionControl",
    viewPath: "view-version-control",
    bulkImport: false,
    showDeleteAll: true,
  };
  return (
    <div className="py-8 p-4 sm:p-5 overflow-x-hidden">
      <div className=" w-full">
      {!fullScreen &&  <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap items-center justify-between pb-5 border-b border-primary">
          <h4 className="text-2xl md:text-3xl text-dark">Version Control</h4>
          <Link
            id="add-company"
            to="/add-version-control"
            className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-primarydark text-white"
          >
            <IoMdAdd size={22} />
            <span className="">Add Version Control</span>
          </Link>
        </div>}

        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <NewTable
                // tableFilters={tableFilters}
                columns={defaultColumns}
                tableMetaData={tableMetaData}
                endpoint={"/private/versionControl"}
                deleteEndPoint={"/private/versionControl"}
                viewPath={"view-version-control"}
                showDeleteAction={true}
                showEditAction={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VersionControl;
