import React, { useState, useNavigate, useContext } from "react";
import Add from "../assets/svgs/add.svg";
import LinkedIn from "../assets/svgs/linkedin.svg";
import IndiaFlag from "../assets/svgs/india-flag.svg";
import { Link } from "react-router-dom";
import Help from "../assets/svgs/settings/help-circle.svg";
import DynamicTableComponent from "../Components/DynamicTableComponent";
import SMTPSendMailModal from "../Components/SMTPSendMailModal";
import NewTable from "../Components/NewTable";
import useMutation from "../hooks/useMutation";
import { Plus } from "lucide-react";
import { GlobalContext } from "../App";

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

const AWSSettings = () => {
  const { fullScreen } = useContext(GlobalContext);
  const [isSMTPSendMailModalOpen, setIsSMTPSendMailModalOpen] = useState(false);
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const { callApi } = useMutation();
  const tableMetaData = {
    tableName: "aws",
    model: "AWS",
    endpoint: "/private/aws",
    viewPath: "aws-settings/view",
    editPath: "aws-settings/edit",
    deleteField: "name",
    showDeleteAll: true,
  };

  const defaultColumns = [
    { id: 0, Header: "AWS Name", searchable: true, accessor: "name" },

    {
      id: 1,
      Header: "Default",
      accessor: "default",
      render: (value, row) => (
        <div className="flex items-center justify-center w-fit py-1">
          <input
            checked={value}
            onChange={(e) => handleNewDefault(value, row)}
            type="radio"
          />
        </div>
      ),
    },
  ];

  async function handleNewDefault(value, row) {
    const res = await callApi(`/private/aws/${row._id}`, "PUT", {
      default: value,
    });
    if (res) setTriggerRefetch(!triggerRefetch);
  }

  return (
    <>
      <SMTPSendMailModal
        isSMTPSendMailModalOpen={isSMTPSendMailModalOpen}
        setIsSMTPSendMailModalOpen={setIsSMTPSendMailModalOpen}
      />
      <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
        <div className=" w-full">
        {!fullScreen &&  <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex justify-between items-center   ">
            <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
              AWS Setting
            </h4>
            <div className="flex gap-2">
              <Link
                id="add aws"
                to="/aws-settings/add"
                className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-primarydark text-white"
              >
                <Plus color="#fff" />
                <span>Add AWS Settings</span>
              </Link>
              {/* <button className="flex gap-2 items-center px-2 sm:px-4 rounded-xl py-2 bg-primary hover:bg-primarydark text-white" id="button-153">
                <img src={Help} alt="Add" />
                <button  id="button-154">Get Help</button>
              </button> */}
            </div>
          </div>}

          <div className="flex flex-col mt-2 mb-20 rounded-xl">
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

export default AWSSettings;
