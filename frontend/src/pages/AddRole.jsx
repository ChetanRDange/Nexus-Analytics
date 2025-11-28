import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import EditPermissionTable from "../Components/EditPermissionTable";
import InputComponent from "../Components/InputComponent";
import useMutation from "../hooks/useMutation";
import useStore from "../state/store";
import { Staticdata, StaticResponseData } from "../utils/StaticData";
const AddRole = () => {
  const [isScrollable, setIsScrollable] = useState(false);
  const { admin } = useStore();
  const { callApi } = useMutation();
  const [permissionsData, setPermissionsData] = useState([]);
  const [errors, setErrors] = useState({
    roleName: null,
  });
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    setInput(e.target.value);
  };

  const checkScrollability = () => {
    const contentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    setIsScrollable(contentHeight > windowHeight);
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);

    return () => {
      window.removeEventListener("resize", checkScrollability);
    };
  }, []);
  
  
  useEffect(() => {
    setPermissionsData(StaticResponseData);
  }, []);

  async function handleAddRole(e) {
    e.preventDefault();
    if (!input) {
      toast.error("Role Name cannot be empty");
      return;
    }
    const res = await callApi("/private/roles", "POST", {
      name: input,
      permissions: permissionsData,
    });
    if (res) navigate("/role-management");
  }

  return (
    <>
      <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex justify-between items-center   ">
          <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
           Add Role
          </h4>

          <div className="flex gap-2">
            <Link
              id="cancel"
              to="/role-management"
              className="px-4 py-2 text-primary font-medium bg-main rounded-xl hover:bg-hover  border border-primary whitespace-nowrap"
            >
              Cancel
            </Link>

            <button
              onClick={handleAddRole}
              className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
              id="button-138"
            >
              Add
            </button>
          </div>
        </div>

        <div className="w-full justify-center items-center mt-8 pb-8 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[100%] flex flex-col gap-y-2 md:flex-row justify-evenly ">
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
                  setErrors={setErrors}
                  error={errors.roleName}
                  required
                />
              </div>
              <div className="flex flex-col border border-primary my-8 rounded-xl ">
                <div className="-m-1.5 overflow-x-auto">
                  <div className="p-1.5 min-w-full align-middle">
                
                    <EditPermissionTable
                      permissionsData={permissionsData}
                      data={Staticdata}
                      setPermissionsData={setPermissionsData}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="w-full flex justify-end items-center gap-4 pt-8 pb-16 border-t border-primary">
          <Link
            id="cancel-1"
            className="px-4 py-2 text-primary font-medium bg-main rounded-xl hover:bg-hover  border border-primary whitespace-nowrap"
            to="/role-management"
          >
            Cancel
          </Link>

          <button
            onClick={handleAddRole}
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
            id="button-138"
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default AddRole;
