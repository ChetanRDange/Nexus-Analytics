import { Plus } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import NewTable from "../Components/NewTable";
import useMutation from "../hooks/useMutation";
import formatDateTime from "../utils/DateFormat";
import { GlobalContext } from "../App";

const RoleManagement = () => {
  const { fullScreen } = useContext(GlobalContext);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const [deleteRole, setDeleteRole] = useState({});

  const { callApi } = useMutation();

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
      Header: "Role Name",
      searchable: true,
      accessor: "name",
      render: (value) => (value ? value : "-"),
    },
    {
      id: 1,
      Header: "Users Assigned",
      accessor: "admins",
      render: (value = []) => {
        const maxImages = Math.min(value.length, 3);
        const showMoreCount = value.length > 3 ? `+${value.length - 3}` : "";

        return (
          <div className="flex items-center">
            {value.slice(0, maxImages).map((item, index) => (
              <div key={index} className="shrink-0">
                <div className="tooltip-container">
                  <IconRenderer name={item.name} avatar={item?.avatar} />
                  <span className="tooltip-text">{item.name}</span>
                </div>
              </div>
            ))}

            {showMoreCount && (
              <div className="tooltip-container shrink-0">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 border border-dashed border-gray-400 text-xs font-medium text-gray-700">
                  {showMoreCount}
                </div>
                <span className="tooltip-text">View all users</span>
              </div>
            )}
          </div>
        );
      },
    },
    {
      id: 2,
      Header: "Type",
      accessor: "type",
    },
    {
      id: 2,
      Header: "Created By",
      accessor: "createdBy.name",
    },
    {
      id: 3,
      Header: "Last Updated By",
      accessor: "updatedBy.name",
    },
    {
      id: 4,
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
    {
      id: 5,
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

  const printTableData = [
    {
      Header: "Role Name",
      accessor: "name",
      render: (value) => value || "-",
    },
    {
      Header: "Users Assigned",
      accessor: "admins",
      render: (value = []) => {
        if (!value || value.length === 0) return "-";
        return value.map((user) => user.name).join(", ");
      },
    },
    {
      Header: "Created By",
      accessor: "createdBy.name",
      render: (value) => value || "-",
    },
    {
      Header: "Last Updated By",
      accessor: "updatedBy.name",
      render: (value) => value || "-",
    },
    {
      Header: "Created At",
      accessor: "createdAt",
      render: (value) => (value ? formatDateTime(value) : "-"),
    },
    {
      Header: "Updated At",
      accessor: "updatedAt",
      render: (value) => (value ? formatDateTime(value) : "-"),
    },
  ];

  const IconRenderer = React.memo(({ name, avatar }) => {
    const lightColors = [
      "#ffccbc", "#ffab91", "#ff8a65", "#ff7043",
      "#f4511e", "#ff5722", "#f44336", "#e57373",
      "#81c784", "#4caf50", "#66bb6a", "#29b6f6",
      "#64b5f6", "#f06292", "#ffd54f"
    ];

    function getRandomColor() {
      return lightColors[Math.floor(Math.random() * lightColors.length)];
    }

    const initial = name?.charAt(0).toUpperCase();
    const color = getRandomColor();

    return (
      <div className="relative w-6 h-6 flex justify-center items-center">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <>
            <FaCircle
              className="text-[32px]"
              style={{ color: color }}
            />
            <div className="absolute inset-0 rounded-full border border-gray-400"></div>
            <span className="absolute text-sm font-bold text-white">
              {initial}
            </span>
          </>
        )}
      </div>
    );
  });

  const tableMetaData = {
    tableName: "roles",
    model: "Roles",
    endpoint: "/private/roles",
    viewPath: "role-management/view",
    editPath: "role-management/edit",
    deleteField: "name",
    showDeleteAll: true,
  };

  useEffect(() => {
    if (isDeleteModalOpen) {
      async function deleteTheRole() {
        const res = await callApi("/private/roles", "DELETE", {
          ids: deleteRole._id,
        });
        if (res) {
          setIsDeleteModalOpen(false);
          toast.success(res.message);
        }
      }
      deleteTheRole();
    }
  }, [isDeleteModalOpen, deleteRole]);

  return (
    <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
      <div className=" w-full">
        {!fullScreen && <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex justify-between items-center   ">
          <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
            Role Management
          </h4>

          <div className="flex gap-2">
            <Link
              id="add-roles"
              to="/role-management/add"
              className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-primarydark text-white"
            >
              {/* <img src={Add} alt="Add" /> */}
              <Plus color="#fff" />
              <span>Add Role</span>
            </Link>
          </div>
        </div>}
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <NewTable
                columns={defaultColumns}
                tableMetaData={tableMetaData}
                triggerRefetch={triggerRefetch}
                setTriggerRefetch={setTriggerRefetch}
                // statuses={statuses}
                printTableData={printTableData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = `
.tooltip-container {
  position: relative;
}

.tooltip-text {
  visibility: hidden;
  background-color: #333;
  color: white;
  text-align: center;
  padding: 5px 10px;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip-container:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default RoleManagement;
