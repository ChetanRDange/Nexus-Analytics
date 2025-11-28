import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditPermissionTable from "../Components/EditPermissionTable";
import InputComponent from "../Components/InputComponent";
import useFetch from "../hooks/useFetch";
import useMutation from "../hooks/useMutation";
import { Staticdata } from "../utils/StaticData";
const EditRole = () => {
  const [permissionsData, setPermissionsData] = useState(null);
  const { roleId } = useParams();
  const { callApi } = useMutation();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [errors, setErrors] = useState({
    roleName: null,
  });

  const handleOnChange = (e) => {
    setInput(e.target.value);
  };

  const { data: res, loading } = useFetch(`/private/roles/${roleId}`);
  const row = res?.data;

  useEffect(() => {
    if (row) {
      setPermissionsData(row?.permissions);
      setInput(row?.name);
    }
  }, [row]);

  async function hanldeEditRoles(e) {
    e.preventDefault();
    const res = await callApi("/private/roles", "PUT", {
      name: input,
      roleId: row._id,
      permissions: permissionsData,
    });
    if (res) navigate("/role-management");
  }

  return (
    <>
      <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex justify-between items-center   ">
          <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
           Edit Role
          </h4>

          <div className="flex gap-2">
            <Link
              id="cancel"
              to="/role-management"
              className="px-4 py-2 text-primary font-medium bg-main rounded-xl border border-primary whitespace-nowrap"
            >
              Cancel
            </Link>

            <button
              onClick={hanldeEditRoles}
              className="saveBtn px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
              id="button-197"
            >
              Update
            </button>
          </div>
        </div>

        <div className="w-full justify-center items-center mt-8 pb-8 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[100%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-1/4 w-full flex flex-col">
              <span className="block text-primary">
                Role details & Permissions:
              </span>
            </div>

            <form className="w-full" method="post">
              <div className="lg:w-1/2">
                <InputComponent
                  inputType="text"
                  name="roleName"
                  id="roleName"
                  labelName="Role Name"
                  labelColor="primary"
                  placeholderName="Role Name"
                  placeholderColor="secondary"
                  textColor="text-dark"
                  onChange={handleOnChange}
                  borderRadius="xl"
                  activeBorderColor="blue"
                  value={input}
                  required
                  setErrors={setErrors}
                  error={errors.roleName}
                />
              </div>
              <div className="flex flex-col border border-primary mt-8 rounded-xl">
                <div className="-m-1.5 overflow-x-auto">
                  <div className="p-1.5 min-w-full align-middle">
                    {/* <PermissionTable
                      columnsConfig={columnsConfig}
                      permissionsData={permissionsData}
                      handlePermissionChange={handlePermissionChange}
                      selectable={true}
                    /> */}
                    {permissionsData && (
                      <EditPermissionTable
                        permissionsData={permissionsData}
                        data={Staticdata}
                        setPermissionsData={setPermissionsData}
                      />
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="w-full flex justify-end items-center gap-4 pt-2 pb-20">
          <Link
            className="px-4 py-2 text-primary font-medium bg-main rounded-xl border border-primary whitespace-nowrap"
            to="/role-management"
          >
            Cancel
          </Link>

          <button onClick={hanldeEditRoles}
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
           id="button-198">
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default EditRole;
