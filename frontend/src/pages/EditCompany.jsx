import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import ComponentDropdown from "../Components/ComponentDropdown";
import InputComponent from "../Components/InputComponent";
import useMutation from "../hooks/useMutation";
import formatDateTime from "./../utils/DateFormat";
import PlanDetails from "./PlanDetails";
import useFetch from "../hooks/useFetch";

const statuses = [
  {
    id: 0,
    showName: "Pending",
    name: "Pending",
  },
  {
    id: 1,
    showName: "Inactive",
    name: "Inactive",
  },
  {
    id: 2,
    showName: "Active",
    name: "Active",
  },
  {
    id: 3,
    showName: "Blocked",
    name: "Blocked",
  },
];

const EditCompany = () => {
  const { companyId } = useParams();
  const { callApi } = useMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phoneCode: "",
    phone: "",
    status: "",
    name: "",
  });

  const [statusDropdown, setStatusDropDown] = useState({
    showName: "",
    name: "",
  });

  const validate = () => {
    let errors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.companyName.trim()) {
      errors.companyName = "Company name is required. ";
      toast.error(errors.companyName);
      return errors;
    }
    if (!formData.email.trim()) {
      errors.email = "Email ID is required. ";
      toast.error(errors.email);
      return errors;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid Email ID.";
      toast.error(errors.email);
      return errors;
    }

    if (!formData.phoneCode || !formData.phone) {
      errors.phone = "Please enter a valid phone number.";
      toast.error(errors.phone);
      return errors;
    }

    if (!formData.status.trim()) {
      errors.status = "Please select the company status";
      toast.error(errors.status);
      return errors;
    }
    return errors;
  };

  const { data: res, reFetch } = useFetch(`/private/companies/${companyId}`);
  const companyData = res?.data;

  useEffect(() => {
    if (companyData) {
      setFormData({
        _id: companyData?._id,
        companyName: companyData?.companyName || "",
        email: companyData?.email || "",
        phoneCode: companyData?.phoneCode || "",
        phone: companyData?.phone || "",
        status: companyData?.status || "",
        name: companyData?.name || "",
      });
      setStatusDropDown({
        showName: companyData?.status || "",
        name: companyData?.status || "",
      });
    }
  }, [companyData]);

  async function handleUpdateCompany(e) {
    e.preventDefault();
    const companyError = validate();
    if (Object.keys(companyError).length > 0) return;

    const companyData = {
      _id: formData._id,
      companyName: formData.companyName,
      email: formData.email,
      phoneCode: formData.phoneCode,
      phone: formData.phone,
      status: statusDropdown.showName,
    };

    const res = await callApi(`/private/companies`, "PUT", companyData);
    if (res) navigate("/companies");
  }

  return (
    <div className=" mx-auto px-4 py-8 overflow-y mb-20">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex justify-between items-center   ">
        <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
          Edit Company
        </h4>

        <div className="flex gap-2">
          <Link
            id="cancel"
            to="/companies"
            className="px-4 py-2 text-primary font-medium bg-main rounded-xl border hover:bg-hover border-primary whitespace-nowrap"
          >
            Cancel
          </Link>
          <button
            onClick={handleUpdateCompany}
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
            id="button-182"
          >
            Update
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-main rounded-lg shadow-sm p-6 text-primary">
        {/* Company Details Section */}
        <div className="mb-6 border-b border-primary pb-6">
          <h2 className="text-xl font-semibold  mb-6">Company Details</h2>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Column - Labels */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium ">Company Information</h3>
                  <p className=" text-secondary mt-1">
                    Basic details about the company
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Form Fields */}
            <div className="lg:col-span-2">
              <form className="space-y-6">
                <div className="w-full md:w-4/5 lg:w-3/4">
                  <InputComponent
                    inputType="text"
                    name="companyName"
                    id="companyName"
                    labelName="Company Name"
                    labelColor="primary"
                    placeholderName="Company Name"
                    placeholderColor="secondary"
                    textColor="text-dark"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        companyName: e.target.value,
                      })
                    }
                    borderRadius="xl"
                    activeBorderColor="blue"
                  />
                </div>

                <div className="w-full md:w-4/5 lg:w-3/4">
                  <label className="block  font-medium  mb-1">
                    Company Status
                  </label>
                  <ComponentDropdown
                    name="status"
                    data={statusDropdown}
                    SummaryChild={
                      <h5 className="p-0 m-0">
                        {statusDropdown?.showName || "Select Status"}
                      </h5>
                    }
                    dropdownList={statuses}
                    search={false}
                    commonFunction={setStatusDropDown}
                    selected={statusDropdown?.name}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-medium ">Trial Used</label>
                    <p className="mt-1 text-secondary">
                      {companyData?.trialUsed ? "Yes" : "No"}
                    </p>
                  </div>

                  <div>
                    <label className="block  font-medium ">
                      Company Address
                    </label>
                    <p className="mt-1  text-secondary">
                      {companyData?.address || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block  font-medium ">Country</label>
                    <p className="mt-1  text-secondary">
                      {companyData?.country || "N/A"}
                    </p>
                  </div>

                  <div>
                    <label className="block  font-medium ">City</label>
                    <p className="mt-1  text-secondary">
                      {companyData?.city || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block  font-medium ">State</label>
                    <p className="mt-1  text-secondary">
                      {companyData?.state || "N/A"}
                    </p>
                  </div>

                  <div>
                    <label className="block  font-medium ">Postal Code</label>
                    <p className="mt-1  text-secondary">
                      {companyData?.postalCode || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block  font-medium ">Created Date</label>
                    <p className="mt-1  text-secondary">
                      {formatDateTime(companyData?.createdAt) || "N/A"}
                    </p>
                  </div>

                  <div>
                    <label className="block  font-medium ">Updated Date</label>
                    <p className="mt-1  text-secondary">
                      {formatDateTime(companyData?.updatedAt) || "N/A"}
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Company Settings Section */}
        <div>
          <h2 className="text-xl font-semibold  mb-6">Company Settings</h2>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Column - Labels */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium ">System Preferences</h3>
                  <p className=" text-secondary mt-1">
                    Company's system settings
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Form Fields */}
            <div className="lg:col-span-2">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block  font-medium ">Date Format</label>
                    <p className="mt-1  text-secondary">
                      {companyData?.dateFormat || "N/A"}
                    </p>
                  </div>

                  <div>
                    <label className="block  font-medium ">Time Format</label>
                    <p className="mt-1  text-secondary">
                      {companyData?.timeFormat || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block  font-medium ">Time Zone</label>
                    <p className="mt-1  text-secondary">
                      {companyData?.timeZone || "N/A"}
                    </p>
                  </div>

                  <div>
                    <label className="block  font-medium ">Language</label>
                    <p className="mt-1  text-secondary">
                      {companyData?.lang || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block  font-medium ">Currency</label>
                    <p className="mt-1  text-secondary">
                      {companyData?.currency || "N/A"}
                    </p>
                  </div>
                </div>
              </form>
            </div>
            <div className="sm:hidden flex justify-end gap-2 mt-8">
              <Link
                id="cancel"
                to="/companies"
                className="px-4 py-2 text-primary font-medium bg-main rounded-xl border hover:bg-hover border-primary whitespace-nowrap"
              >
                Cancel
              </Link>
              <button
                onClick={handleUpdateCompany}
                className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
                id="button-182"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-end gap-2">
        <Link
          id="cancel"
          to="/companies"
          className="px-4 py-2 text-primary font-medium bg-main rounded-xl border hover:bg-hover border-primary whitespace-nowrap"
        >
          Cancel
        </Link>
        <button
          onClick={handleUpdateCompany}
          className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
          id="button-182"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditCompany;
