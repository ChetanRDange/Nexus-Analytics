import React, { useContext } from "react";
import NewTable from "../Components/NewTable";
import { GlobalContext } from "../App";
import { IoMdRefresh } from "react-icons/io";
import useMutation from "../hooks/useMutation";
import { useNavigate } from "react-router-dom";

const EmailTemplate = () => {
  const { fullScreen } = useContext(GlobalContext);
  const { callApi } = useMutation();
  const navigate = useNavigate();
  const columns = [
    {
      id: 0,
      Header: "Template Name",
      accessor: "name",
      searchable: true,
      isMandatory: true,
    },
    {
      id: 1,
      Header: "Type",
      accessor: "type",
      searchable: true,
      render: (value) => (value === "org" ? "Organization" : "Admin"),
    },
    {
      id: 2,
      Header: "Subject",
      accessor: "subject",
      searchable: true,
    },
    {
      id: 3,
      Header: "Updated By",
      accessor: "updatedBy.email",
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

  const tableMetaData = {
    // staticData: templatesList, // Add static data
    tableName: "emailTemplate",
    endpoint: "/private/emailTemplates",
    editPath: "email-template/edit",
    viewPath: "email-template/view",
    model: "Email Templates",
  };

  const tableFilters = [
    {
      type: "multiSelect",
      key: "type",
      title: "Panel",
      options: [
        { title: "Organization", value: "org" },
        { title: "Admin", value: "admin" },
      ],
    },
  ];

  const handleReset = async () => {
    const result = await callApi("/private/emailTemplates/reset", "GET");
  };

  return (
    <div className="py-8 p-4 sm:p-5 overflow-x-hidden mb-20">
      {!fullScreen && (
        <div className="w-full pb-4 gap-y-4 gap-2 flex items-start border-b border-primary justify-between">
          <div className="">
            <h4 className="text-3xl text-dark">Email Templates</h4>
          </div>
          <div className="w-full flex justify-end sm:w-fit">
            <button
              onClick={handleReset}
              className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-primarydark text-white"
            >
              <IoMdRefresh size={22} />
              <span>Reset</span>
            </button>
          </div>
        </div>
      )}

      <div className="-m-1.5 mt-4">
        <NewTable
          tableFilters={tableFilters}
          columns={columns}
          tableMetaData={tableMetaData}
          showDeleteAction={false}
          passName="module"
        />
      </div>
    </div>
  );
};

export default EmailTemplate;
