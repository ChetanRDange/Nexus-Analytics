import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ErrorIcon from "../assets/svgs/alertcircle.svg";
import CreateNewSegmentModal from "../Components/CreateNewSegmentModal";
import InputComponent from "../Components/InputComponent";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ComponentDropdown from "../Components/ComponentDropdown";
import DynamicTableComponent from "../Components/DynamicTableComponent";
import EditPermissionTable from "../Components/EditPermissionTable";
import { useNavigate } from "react-router-dom";
import { FaRegCircleCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import useStore from "../state/store";
import Loader from "../Components/Loader";
import {
  Staticdata,
  StaticResponseData,
  baseUsersData,
} from "../utils/StaticData";
import toast from "react-hot-toast";
import useMutation from "../hooks/useMutation";
import getCountryByDialCode from "../utils/CountryData";
import useFetch from "../hooks/useFetch";
import { CircleAlert } from "lucide-react";
import PhoneInputWrapper from "./../Components/PhoneInputWrapper";
import jsonPhoneData from "../utils/PhoneInputNewProcessed.json";

const defaultColumns = [
  {
    Header: "Permission",
    accessor: "permission",
  },
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

const validatePhone = (phone) => {
  if (!phone?.number || !phone?.countryCode) {
    return "Phone number is required";
  }

  const country = jsonPhoneData.find(
    (c) => c.dialingCode === phone.countryCode
  );
  if (!country) {
    return "Invalid country code";
  }

  const format = Array.isArray(country.phoneNumberFormat)
    ? country.phoneNumberFormat
    : [country.phoneNumberFormat];

  const lengths = format.map((f) => (f.match(/#/g) || []).length);
  const minLength = Math.min(...lengths);
  const maxLength = Math.max(...lengths);

  if (phone.number.length < minLength || phone.number.length > maxLength) {
    return `Phone number must be between ${minLength} digits`;
  }

  return "";
};

const AddUser = () => {
  const { callApi } = useMutation();
  const navigate = useNavigate();
  const [isNewSegment, setIsNewSegment] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    roles: {},
  });
  const [roleDropdown, setRoleDropDown] = useState({
    showName: "Click to select an Option",
    name: "",
    description: "",
  });
  const [phoneValues, setPhoneValues] = useState({
    number: "",
    countryCode: "91",
    tempCountryCode: "91",
    editNumber: false,
  });
  const [isPhoneNumberError, setIsPhoneNumberError] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value?.trim()) return "Full name is required";
        if (!/^[a-zA-Z\s]*$/.test(value))
          return "Full Name should only contain letters and spaces";
        if (value.length < 2) return "Minimum 2 characters required";
        return "";
      case "email":
        if (!value?.trim()) return "Email ID is required";
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
          return "Please enter a valid Email ID";
        return "";
      case "role":
        if (!value?.trim()) return "Role is required";
        return "";
      default:
        return "";
    }
  };

  const handleFieldChange = (name, value) => {
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    if (name === "name" || name === "email") {
      setUserDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const { data: res, loading } = useFetch("/private/user/roles");
  const roleName = res?.data || [];

  const roleData = [
    {
      showName: "Custom Permission",
      name: "Custom Permission",
    },
    ...roleName.map((item) => ({
      ...item,
      name: item.name
        ? item.name.charAt(0).toUpperCase() + item.name.slice(1)
        : "",
      showName: item.name
        ? item.name.charAt(0).toUpperCase() + item.name.slice(1)
        : "",
    })),
  ];

  const [permissionsData, setPermissionsData] = useState([]);

  useEffect(() => {
    setPermissionsData(StaticResponseData);
  }, []);

  async function handleAddUser(e) {
    e.preventDefault();

    const nameError = validateField("name", userDetails.name);
    const emailError = validateField("email", userDetails.email);
    const roleError = validateField("role", roleDropdown.name);
    const phoneError = validatePhone(phoneValues);

    setErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
      role: roleError,
    });

    if (nameError || emailError || phoneError || roleError) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    let responseBody = null;
    if (!roleDropdown._id) {
      responseBody = {
        ...userDetails,
        roleId: "custom",
        customPermissions: permissionsData,
      };
    } else {
      responseBody = {
        ...userDetails,
        roleId: roleDropdown._id,
      };
    }
    const res = await callApi("/private/user/register", "POST", responseBody);
    if (res) navigate("/admin-users");
  }

  return (
    <>
      <CreateNewSegmentModal
        isNewSegment={isNewSegment}
        setIsNewSegment={setIsNewSegment}
      />
      <div className="py-8 p-4 sm:p-5 overflow-x-hidden mb-2">
        <div className="w-full pb-4 border-b border-primary  gap-y-4 gap-2 flex items-center md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
          <h4 className="text-2xl md:text-3xl font-semibold text-dark">
            Add Admin User
          </h4>
          <div className="flex gap-2">
            <Link
              id="cancel"
              to="/admin-users"
              className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
            >
              Cancel
            </Link>
            <button
              onClick={handleAddUser}
              className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
              id="button-142"
            >
              Add
            </button>
          </div>
        </div>

        <div className="pb-36">
          <div
            className={`w-full justify-center items-center mt-5 md:mt-8 mb-5 pb-12 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ${
              roleDropdown.name ? "border-b border-primary" : ""
            }`}
          >
            <div className="w-full  flex flex-col gap-y-2 md:flex-row gap-2 justify-start items-start">
              <div className="w-full md:w-1/4">
                <span className=" text-primary">User Details Section:</span>
              </div>
              <div className="w-full sm:w-[90%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
                <InputComponent
                  inputType="text"
                  name="userName"
                  id="userName"
                  labelName="Full Name"
                  labelColor="primary"
                  placeholderName="Full Name"
                  placeholderColor="secondary"
                  textColor="text-dark"
                  borderRadius="xl"
                  activeBorderColor="blue"
                  value={userDetails?.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  error={errors.name}
                  errorMessage={errors.name}
                  maxLength={50}
                  minLength={2}
                  required
                />

                <InputComponent
                  mt="5"
                  inputType="email"
                  name="adminEmail"
                  id="adminEmail"
                  labelName="Email ID"
                  labelColor="primary"
                  placeholderName="Email ID"
                  placeholderColor="secondary"
                  textColor="text-dark"
                  borderRadius="xl"
                  activeBorderColor="blue"
                  value={userDetails?.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  error={errors.email}
                  errorMessage={errors.email}
                  required
                  maxLength={45}
                  minLength={5}
                />

                <div className="w-full mt-5">
                  <label htmlFor="phone" className="text-primary">
                    Contact Number<span className="text-red-500 ml-1">*</span>
                  </label>
                  <PhoneInputWrapper
                    phoneValues={phoneValues}
                    PreferredCountryCodes={["91", "971"]}
                    handlePhoneChange={(e) => {
                      setPhoneValues(e);
                      setErrors((prev) => ({ ...prev, phone: "" }));
                    }}
                    error={isPhoneNumberError}
                    defaultCountryCode="91"
                    setError={setIsPhoneNumberError}
                  />
                  {errors.phone && (
                    <div className="flex items-center mt-1">
                      <CircleAlert color="red" />
                      <p className="text-red-500 text-sm ml-2">
                        {errors.phone}
                      </p>
                    </div>
                  )}
                </div>

                <div className="w-full mt-5">
                  <label className="text-primary">
                    Role<span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative w-full mt-2">
                    <ComponentDropdown
                      name="role"
                      SummaryChild={
                        <h5 className="p-0 m-0 text-primary">
                          {roleDropdown.showName}
                        </h5>
                      }
                      dropdownList={roleData}
                      virtualized={true}
                      search={true}
                      commonFunction={(value) => {
                        setRoleDropDown(value);
                        setErrors((prev) => ({ ...prev, role: "" }));
                      }}
                      selected={roleDropdown.name}
                    />
                    {errors.role && (
                      <div className="flex items-center mt-1">
                        {/* <img src={ErrorIcon} alt="Error" className="mr-2" /> */}
                        <CircleAlert color="red" />
                        <p className="text-red-500 text-sm ml-2">
                          {errors.role}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {roleDropdown.name && (
            <div className="w-full justify-center items-center mt-5 md:mt-8 mb-5 pb-4 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
              <div className="w-full flex flex-col gap-y-2 md:flex-row justify-start items-start">
                <div className="w-full md:w-1/4 mb-3">
                  <span className=" text-primary">
                    {roleDropdown.name !== "Custom Permission"
                      ? "Role Permission:"
                      : "Custom Permissions:"}
                  </span>
                </div>
                <div className="w-full sm:w-[90%] lg:w-[70%]">
                  <div></div>

                  {roleDropdown.name === "Custom Permission" ? (
                    <div className="flex flex-col border border-primary my-8 rounded-xl">
                      <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full align-middle">
                          <EditPermissionTable
                            setPermissionsData={setPermissionsData}
                            permissionsData={permissionsData}
                            data={Staticdata}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    (() => {
                      if (!roleDropdown.name) return null;

                      const matchedRole = roleData.find(
                        (item) => item.name === roleDropdown.name
                      );

                      const updatedUsersData = matchedRole?.permissions
                        ? baseUsersData
                            .map((user) => {
                              const permission =
                                matchedRole?.permissions[user.permissionRender];
                              return (
                                permission && {
                                  ...user,
                                  permission:
                                    user.permission.charAt(0).toUpperCase() +
                                    user.permission.slice(1),
                                  GET: permission.GET || false,
                                  POST: permission.POST || false,
                                  PUT: permission.PUT || false,
                                  DELETE: permission.DELETE || false,
                                }
                              );
                            })
                            .filter(Boolean)
                        : baseUsersData;

                      return (
                        <div className="my-  rounded-xl">
                          <DynamicTableComponent
                            columns={defaultColumns}
                            data={updatedUsersData}
                            selectable={false}
                            page="user"
                            edit={false}
                            view={false}
                            deletePlan={false}
                          />
                        </div>
                      );
                    })()
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-full flex justify-end gap-2 mt-2">
          <Link
            id="cancel"
            to="/admin-users"
            className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
          >
            Cancel
          </Link>
          <button
            onClick={handleAddUser}
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
            id="button-142"
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default AddUser;
