import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AdminLogo from "../assets/images/adminlogo.png";
import Lock from "../assets/images/lock.png";
import AddSocialMediaLink from "../Components/AddSocialMediaLink";
import ImagePreviewModal from "../Components/ImagePreviewModal";
import ImportAdminModal from "../Components/ImportAdminModal";
import ImportVerificationModal from "../Components/ImportVerificationModal";
import InputComponent from "../Components/InputComponent";
import useMutation from "../hooks/useMutation";
import useStore from "../state/store";

const AdminProfile = () => {
  const { admin } = useStore();
  const { callApi } = useMutation();

  const [isImportAdminModalOpen, setIsImportAdminModalOpen] = useState(false);
  const [isAddSocialMediaLinkOpen, setIsAddSocialMediaLinkOpen] =
    useState(false);
  const [isImportVerificationModalOpen, setIsImportVerificationModalOpen] =
    useState(false);

  const [isFocused, setIsFocused] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const [adminName, setAdminName] = useState("");

  const [adminPhone, setAdminPhone] = useState(
    `${admin?.phone?.code}${admin?.phone?.number}`
  );

  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    setAdminName(admin?.name);
  }, [admin?.name]);

  useEffect(() => {
    setAdminPhone(`${admin?.phone?.code}${admin?.phone?.number}`);
  }, [admin?.phone?.code, admin?.phone?.number]);

  useEffect(() => {
    const isNameChanged = adminName !== admin?.name;
    const isPhoneChanged =
      adminPhone !== `${admin?.phone?.code}${admin?.phone?.number}`;
    setIsFormChanged(isNameChanged || isPhoneChanged);
  }, [adminName, adminPhone, admin]);

  const navigate = useNavigate();

  const location = useLocation();
  const { successMessage } = location.state || {};

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, {
        position: "bottom-right",
        duration: 2000,
        style: {
          color: "#175cd3",
          width: "100%",
          backgroundColor: "#fff",
          border: "0.5px solid #319F43",
          borderRadius: "12px",
          fontSize: "12px",
        },
      });
    }
  }, [successMessage]);

  const handleDelete = async () => {
    if (!adminName || adminName === "") {
      toast.error("Name Cannot be empty.");
    }
    if (!adminPhone || adminPhone === "") {
      toast.error("Contact Number Cannot be empty.");
    }
    const res = await callApi("/private/user/upload", "DELETE");
    if (res) {
      useStore.setState({
        admin: {
          ...admin,
          avatar: null,
        },
      });
    }
  };

  const handleUpdateProfile = async () => {
    const countryCode = adminPhone?.substring(0, adminPhone.length - 10);
    const phoneNumber = adminPhone?.substring(adminPhone.length - 10);
    const data = {
      name: adminName,
      phone: phoneNumber,
      phoneCode: countryCode,
    };
    console.log("the data is", data);
    if (data.name === "") {
      return toast.error("Full Name Cannot be empty.");
    } else if (data.phone === "") {
      return toast.error("Contact Number Cannot be empty.");
    }

    const res = await callApi("/private/user/profile/update", "PUT", data);
    if (res) {
      useStore.setState({
        admin: {
          ...admin,
          name: adminName,
          phone: { code: countryCode, number: phoneNumber },
        },
      });
      setAdminName(res?.data?.name);
    }
  };

  return (
    <>
      <ImagePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        imageUrl={admin?.avatar || AdminLogo}
      />
      <ImportAdminModal
        isImportAdminModalOpen={isImportAdminModalOpen}
        setIsImportAdminModalOpen={setIsImportAdminModalOpen}
        handleDelete={handleDelete}
      />
      <AddSocialMediaLink
        isAddSocialMediaLinkOpen={isAddSocialMediaLinkOpen}
        setIsAddSocialMediaLinkOpen={setIsAddSocialMediaLinkOpen}
      />
      <ImportVerificationModal
        isImportVerificationModalOpen={isImportVerificationModalOpen}
        setIsImportVerificationModalOpen={setIsImportVerificationModalOpen}
      />
      <div className="min-h-screen py-8 p-4 sm:p-5 overflow-x-hidden">
        <div className=" w-full pb-8 border-b border-border gap-y-4 gap-2 flex items-center justify-between mb-8">
          <span className="text-3xl font-semibold text-dark">Profile</span>
          <div className="flex gap-2">
            <Link
              to="/dashboard"
              className="px-4 py-2 text-primary font-medium bg-main rounded-xl border hover:bg-hover border-primary whitespace-nowrap"
            >
              Back
            </Link>
            <button
              onClick={handleUpdateProfile}
              // disabled={!isFormChanged}
              className="px-4 py-2 text-white font-medium rounded-xl whitespace-nowrap bg-primary hover:bg-primarydark"
              id="button-144"
            >
              Update
            </button>
          </div>
        </div>
        <div className="pb-6 w-full sm:flex block gap-6  mb-10">
          <div className="items-start flex flex-col gap-8 sm:w-[80%] md:w-[65%] lg:w-[75%] xl:w-[38%] 2xl:w-[28%]">
            {/* Combined section 1 */}
            <div className="font-medium text-primary flex items-center gap-5 ">
              <div
                className="relative rounded-full"
                style={{
                  // height: "70px",
                  width: "90px",
                  aspectRatio: 1,
                  boxSizing: "border-box",
                }}
              >
                <img
                  src={admin?.avatar || AdminLogo}
                  alt="Admin Profile"
                  className="rounded-full object-contain"
                  onClick={() => setIsPreviewOpen(true)}
                />
                <button
                  onClick={() => setIsImportAdminModalOpen(true)}
                  className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full hover:bg-hover"
                  id="button-145"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
              <div className="w-full flex flex-col">
                <span className="text-primary text-[20px]">{admin?.name}</span>
                <label className="text-primary">{admin?.email}</label>
              </div>
            </div>

            <div className="p-2 rounded-xl border border-primary flex justify-between items-center w-full">
              <label className="text-primary text-[18px]">
                Change Password
              </label>
              <button
                onClick={() => navigate("/change-admin-password")}
                className="w-[100px] sm:w-fit text-primary font-normal hover:bg-hover rounded-xl border border-primary py-1.5 px-2 sm:py-2 sm:px-3 whitespace-nowrap flex gap-2 items-center"
                id="button-146"
              >
                <img src={Lock} alt="Upload" />
                <span className="text-primary">Change</span>
              </button>
            </div>
          </div>

          <div className="sm:mt-0 mt-8 flex flex-col gap-6 2xl:w-[65%] xl:w-[74%] lg:w-[90%] md:w-[80%] sm:w-[85%]">
            <div className="w-full gap-y-2 md:flex-row justify-evenly border border-primary rounded-xl p-6 ">
              <div className="w-full mb-6 ">
                <span className=" text-primary text-[18px]">
                  Personal Information
                </span>
              </div>
              <form className="w-full">
                <div className="">
                  <div className="xl:flex gap-6 block">
                    <div className="w-full">
                      <InputComponent
                        inputType="text"
                        name="name"
                        id="fname"
                        labelName="Full Name"
                        labelColor="primary"
                        placeholderName="Full Name"
                        placeholderColor="secondary"
                        textColor="text-dark"
                        borderRadius="xl"
                        activeBorderColor="blue"
                        value={adminName}
                        onChange={(e) => {
                          setAdminName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="w-full">
                      <InputComponent
                        inputType="text"
                        name="email"
                        id="email"
                        labelName="Email ID"
                        labelColor="primary"
                        placeholderName="Email ID"
                        placeholderColor="secondary"
                        textColor="text-dark"
                        borderRadius="xl"
                        activeBorderColor="blue"
                        value={admin?.email}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="xl:flex gap-6 block mt-6">
                    <div className="w-full">
                      <label htmlFor="phone" className="text-primary">
                        Contact Number
                      </label>
                      <div
                        className={`relative mt-2 rounded-xl ${
                          isFocused ? " border border-fadedblue" : ""
                        }`}
                      >
                        <PhoneInput
                          id="number"
                          value={`${admin?.phone?.code}${admin?.phone?.number}`}
                          className="focus:outline-none"
                          preferredCountries={["in"]}
                          placeholder="+91 12345-67890"
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          buttonStyle={{
                            borderTop: isFocused ? "none" : "1px solid #D1D5DB",
                            borderBottom: isFocused
                              ? "none"
                              : "1px solid #D1D5DB",
                            borderLeft: isFocused
                              ? "none"
                              : "1px solid #D1D5DB",
                            borderRight: isFocused
                              ? "1px solid #D1D5DB"
                              : "1px solid #D1D5DB",
                            borderTopRightRadius: "0px",
                            borderBottomRightRadius: "0px",
                            borderTopLeftRadius: "12px",
                            borderBottomLeftRadius: "12px",
                            width: isFocused ? "51px" : "52px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "white",
                          }}
                          dropdownStyle={{
                            top: "50px",
                            left: "0px",
                          }}
                          inputStyle={{
                            borderRadius: "12px",
                            fontSize: "16px",
                            border: isFocused ? "none" : "1px solid #D1D5DB",
                            marginLeft: "15px",
                            color: "#374151",
                            width: "97.1%",
                            height: isFocused ? "46px" : "48px",
                            outline: "none",
                            boxShadow: "none",
                          }}
                          onChange={(phone) => {
                            setAdminPhone(phone);
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <InputComponent
                        inputType="text"
                        name="role"
                        id="role"
                        labelName="Role"
                        labelColor="primary"
                        placeholderName="Role"
                        placeholderColor="secondary"
                        textColor="text-dark"
                        borderRadius="xl"
                        activeBorderColor="blue"
                        value={
                          admin?.roles?.name || admin.isSuperAdmin
                            ? "Super Admin"
                            : ""
                        }
                        disabled={true}
                      />
                    </div>
                  </div>
                  {/* <div className="flex xl:mr-6 mt-6"></div> */}
                </div>
              </form>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};

export default AdminProfile;
