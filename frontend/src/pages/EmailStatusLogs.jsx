import React, { useContext, useState } from "react";
import NewTable from "../Components/NewTable";

import formatDateTime from "../utils/DateFormat";
import { GlobalContext } from "../App";

const defaultColumns = [
  {id:0,
    Header: "From",
    accessor: "from",
    searchable: true,
    isMandatory: true,
  },
  {id:1,
    Header: "To",
    accessor: "to",
    searchable: true,
  },
  {id:2,
    Header: "Subject",
    accessor: "subject",
    searchable: true,
  },
  {id:3,
    Header: "Error",
    accessor: "error",
    searchable: true,
  },
  {id:4,
    Header: "Status",
    accessor: "statusCode",
    searchable: true,
    Cell: ({ value }) => {
      console.log("value", value);
      const statusConfig = {
        200: {
          style: "bg-[#ECFDF3] text-[#027948]",
          color: "#12B76A",
          name: "Success",
        },
        400: {
          style: "bg-[#FEF3F2] text-[#B42318]",
          color: "#F04438",
          name: "Client Error",
        },
        500: {
          style: "bg-[#FFFAEB] text-[#F79009]",
          color: "#FFB904",
          name: "Server Error",
        },
      };

      const config = statusConfig[value] || {
        style: "bg-gray-100 text-gray-600",
        color: "#667085",
        name: "Unknown",
      };

      return (
        <div
          className={`rounded-xl ${config.style} px-2 py-1 w-fit flex gap-2 items-center`}
        >
          <span
            className="min-w-[12px] min-h-[12px] rounded-full"
            style={{ backgroundColor: config.color }}
          ></span>
          <span>{config.name}</span>
        </div>
      );
    },
  },
  {id:5,
    Header: "Created At",
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
  {id:6,
    Header: "Updated At",
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
];

const EmailStatusLogs = () => {
  const { fullScreen } = useContext(GlobalContext);
  const [triggerRefetch, setTriggerRefetch] = useState(false);

  const tableMetaData = {
    tableName:"emailLogs",
    model: "Email Logs",
    endpoint: "/private/logs/email",
    viewPath: "email-logs/view",
    // editPath: "notices/edit",
    showDeleteAll: true,
    deleteField: "type",
  };



  return (
    <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
      <div className=" w-full">
      {!fullScreen &&  <div className="w-full flex justify-between pb-5 border-b border-primary">
          <div className="">
            <h4 className="text-3xl text-dark">Email Logs</h4>
          </div>
        </div>}

        {/* <div className="flex flex-col border rounded-xl mb-20"> */}
        <div className="-m-1.5">
          <div className="p-1.5 min-w-full align-middle">
            <NewTable
              columns={defaultColumns}
              tableMetaData={tableMetaData}
              triggerRefetch={triggerRefetch}
              setTriggerRefetch={setTriggerRefetch}
              showEditAction={false}
              // statuses={statuses}
            />
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default EmailStatusLogs;
