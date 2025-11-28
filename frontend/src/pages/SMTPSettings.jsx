import { Plus } from "lucide-react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import NewTable from "../Components/NewTable";
import SMTPSendMailModal from "../Components/SMTPSendMailModal";
import useMutation from "../hooks/useMutation";
import { GlobalContext } from "../App";



const SMTPSettings = () => {
  const { callApi } = useMutation();
  const { fullScreen } = useContext(GlobalContext);
  const [isSMTPSendMailModalOpen, setIsSMTPSendMailModalOpen] = useState(false);
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  async function handleNewDefault(value, row) {
    const res = await callApi(`/private/smtp/${row._id}`, "PUT", {});
    if (res) setTriggerRefetch(!triggerRefetch);
  }

  const defaultColumns = [
    { id: 0, Header: "SMTP Name", searchable: true, accessor: "name",       isMandatory: true    },

    {
      id: 1,
      Header: "Default",
      accessor: "default",
      render: (value, row) => (
        <div className="flex items-center justify-center w-fit  py-1">
          <input
            checked={value}
            onChange={(e) => handleNewDefault(value, row)}
            type="radio"
          />
        </div>
      ),
    },
    {
      id: 2,
      Header: "Email Verification",
      accessor: "isVerified",
      render: (value) => {
        const statusStyles = {
          light: {
            verified: "bg-[#ECFDF3] text-[#027948]",
            notVerified: "bg-[#E5F6FF] text-[#175CD3]",
          },
          dark: {
            verified: "bg-[#0C3A2C] text-[#4ADE80]",
            notVerified: "bg-[#1D2939] text-[#53B1FD]",
          },
        };

        const statusColors = {
          light: {
            verified: "#12B76A",
            notVerified: "#2E90FA",
          },
          dark: {
            verified: "#4ADE80",
            notVerified: "#53B1FD",
          },
        };

        const theme = document.body.getAttribute("theme") || "dark";
        const statusKey = value ? "verified" : "notVerified";
        const currentStyles = statusStyles[theme][statusKey];
        const currentColors = statusColors[theme][statusKey];
        const statusText = value ? "Verified" : "Not Verified";

        return (
          <div
            className={`rounded-xl ${currentStyles} px-2 w-fit flex gap-2 items-center`}
          >
            <span
              className="min-w-[12px] min-h-[12px] rounded-full"
              style={{ backgroundColor: currentColors }}
            ></span>
            <span>{statusText}</span>
          </div>
        );
      },
    },
  ];

  const tableMetaData = {
    tableName: "smtp",
    model: "SMTPs",
    endpoint: "/private/smtp",
    viewPath: "smtp-settings/view",
    editPath: "smtp-settings/edit",
    bulkImport: false,
    showDeleteAll: true,
  };

  return (
    <>
      <SMTPSendMailModal
        isSMTPSendMailModalOpen={isSMTPSendMailModalOpen}
        setIsSMTPSendMailModalOpen={setIsSMTPSendMailModalOpen}
      />
      <div className="py-8 p-4 sm:p-5 overflow-x-hidden">
        <div className=" w-full">
       {!fullScreen &&   <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex justify-between items-center   ">
            <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
              SMTP Settings
            </h4>

            <div className="flex gap-2">
              <Link
                id="smtp-settings/add"
                to="/smtp-settings/add"
                className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-primarydark text-white"
              >
                <Plus color="#fff" />
                <span>Add SMTP</span>
              </Link>
            </div>
          </div>}

          <div className="flex flex-col mt-2 rounded-xl">
            <div className="-m-1.5 ">
              <div className="p-1.5 min-w-full align-middle">
                <NewTable
                  columns={defaultColumns}
                  tableMetaData={tableMetaData}
                  triggerRefetch={triggerRefetch}
                  setTriggerRefetch={setTriggerRefetch}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SMTPSettings;
