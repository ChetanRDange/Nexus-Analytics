import { useEffect, useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Link, useParams } from "react-router-dom";
import DynamicTableComponent from "../Components/DynamicTableComponent";
import InputComponent from "../Components/InputComponent";
import useFetch from "../hooks/useFetch";
import { baseUsersData } from "../utils/StaticData";

const ViewRole = () => {
  const [permissionsData, setPermissionsData] = useState(null);
  const { roleId } = useParams();
  const { data: res } = useFetch(`/private/roles/${roleId}`);
  const row = res?.data;

  useEffect(() => {
    if (row) {
      setPermissionsData(row?.permissions || {});
    }
  }, [row]);

  // Dynamically update data based on permissions
  const updatedUsersData = baseUsersData.map((user) => {
    const permission = permissionsData?.[user.permissionRender];
    return {
      ...user,
      permission:
        user.permission.charAt(0).toUpperCase() + user.permission.slice(1),
      GET: permission?.GET || false,
      POST: permission?.POST || false,
      PUT: permission?.PUT || false,
      DELETE: permission?.DELETE || false,
    };
  });

  const defaultColumns = [
    { Header: "Permission", accessor: "permission" },
    {
      Header: "View",
      accessor: "GET",
      Cell: ({ value }) => (
        <span className="text-center">
          {value ? <FaRegCircleCheck /> : <RxCross2 />}
        </span>
      ),
    },
    {
      Header: "Add",
      accessor: "POST",
      Cell: ({ value }) => (
        <span className="text-center">
          {value ? <FaRegCircleCheck /> : <RxCross2 />}
        </span>
      ),
    },
    {
      Header: "Edit",
      accessor: "PUT",
      Cell: ({ value }) => (
        <span className="text-center">
          {value ? <FaRegCircleCheck /> : <RxCross2 />}
        </span>
      ),
    },
    {
      Header: "Delete",
      accessor: "DELETE",
      Cell: ({ value }) => (
        <span className="text-center">
          {value ? <FaRegCircleCheck /> : <RxCross2 />}
        </span>
      ),
    },
  ];

  return (
    <div className="h-full py-8 px-4 sm:px-8 overflow-x-hidden">
      <div className="w-full pb-8 border-b border-primary flex flex-col gap-y-4 gap-2 md:flex-row justify-between items-end">
        <h1 className="text-3xl font-semibold text-dark">Edit Role</h1>
        <div className="flex gap-4">
          <Link
            id="cancel"
            to="/role-management"
            className="px-4 py-2 text-primary font-medium bg-main border border-primary rounded-xl"
          >
            Cancel
          </Link>
          <Link
            id="edit"
            to={`/role-management/edit/${roleId}`}
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl"
          >
            Edit
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <InputComponent
          inputType="text"
          name="roleName"
          id="roleName"
          labelName="Role Name"
          placeholderName="Role Name"
          onChange={(e) =>
            setPermissionsData({ ...permissionsData, name: e.target.value })
          }
          value={row?.name || ""}
        />
        <div className="mt-8 rounded-xl">
          <DynamicTableComponent
            columns={defaultColumns}
            data={updatedUsersData}
            selectable={false}
          />
        </div>
      </div>

      <div className="flex gap-4 w-full justify-end mb-20 mt-8">
          <Link
            id="cancel"
            to="/role-management"
            className="px-4 py-2 text-primary font-medium bg-main border border-primary rounded-xl"
          >
            Cancel
          </Link>
          <Link
            id="edit"
            to={`/role-management/edit/${roleId}`}
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl"
          >
            Edit
          </Link>
        </div>
    </div>
  );
};

export default ViewRole;
