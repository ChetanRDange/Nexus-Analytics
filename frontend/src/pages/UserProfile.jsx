import React, { useState } from "react";
import { useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import Delete from "../assets/images/delete.png";
import Upload from "../assets/svgs/upload.svg";
import UserLogo from "../assets/images/userlogo.png";
import Lock from "../assets/images/lock.png";
import Delete2 from "../assets/images/del.png";
import ComponentDropdown from "../Components/ComponentDropdown";
import ImportAdminModal from "../Components/ImportAdminModal";
import DeleteConfirm from "./DeleteConfirm";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AddSocialMediaLink from "../Components/AddSocialMediaLink";
import InputComponent from "../Components/InputComponent";
import { Toaster, toast } from "react-hot-toast";
const stauses = [
  {
    id: 0,
    showName: "User",
    name: "User",
  },
  {
    id: 1,
    showName: "Admin",
    name: "Admin",
  },
];

const UserProfile = () => {
  const [isScrollable, setIsScrollable] = useState(false);
  const [selectedCode, setSelectedCode] = useState("normal");
  const [isImportAdminModalOpen, setIsImportAdminModalOpen] = useState(false);
  const [isInviteSentModalOpen, setIsInviteSentModalOpen] = useState(false);
  const [isAddSocialMediaLinkOpen, setIsAddSocialMediaLinkOpen] =
    useState(false);
  const [stausDropdown, setStatusDropDown] = useState({
    showName: "Click to select an option",
    name: "",
  });
  const navigate = useNavigate();
  const checkScrollability = () => {
    const contentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    console.log(windowHeight);
    setIsScrollable(contentHeight > windowHeight);
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);

    return () => {
      window.removeEventListener("resize", checkScrollability);
    };
  }, []);

  const handleCodeChange = (e) => {
    setSelectedCode(e.target.id);
  };

  const location = useLocation();
  const { profileImage, successMessage } = location.state || {};
  useEffect(() => {
    if (successMessage) {
      // toast.success(successMessage, {
      //   className: "text-primary w-full",
      //   style: {
      //     backgroundColor: "#fff",
      //     border: "0.5px solid #319F43",
      //     borderRadius: "12px",
      //     fontSize: "12px",
      //   },
      // });
      toast.success(successMessage, {
        position: "bottom-right",
        duration: 2000, // optional, to control how long the toast stays visible
        style: {
          color: "#175cd3", // Equivalent to `text-primary`
          width: "100%", // Equivalent to `w-full`
          backgroundColor: "#fff",
          border: "0.5px solid #319F43",
          borderRadius: "12px",
          fontSize: "12px",
        },
      });
    }
  }, [successMessage]);

  const handleDelete = () => {
    // toast.success("Profile Picture Deleted Successfully!", {
    //   position: "bottom-right",
    //   autoClose: 2000,
    //   style: {
    //     backgroundColor: "#fff",
    //     border: "0.5px solid #319F43",
    //     borderRadius: "12px",
    //     fontSize: "12px",
    //   },
    //   className: "toast-success",
    // });
    toast.success("Profile Picture Deleted Successfully!", {
      duration: 2000, // equivalent to autoClose
      position: "bottom-right",
      style: {
        backgroundColor: "#fff",
        border: "0.5px solid #319F43",
        borderRadius: "12px",
        fontSize: "12px",
      },
    });
  };
  const handleChangePass = () => {
    navigate("/change-password");
  };

  const handleSocial = (e) => {
    e.preventDefault();
    setIsAddSocialMediaLinkOpen(true);
  };
  return (
    <>
      <ImportAdminModal
        isImportAdminModalOpen={isImportAdminModalOpen}
        setIsImportAdminModalOpen={setIsImportAdminModalOpen}
      />
      <AddSocialMediaLink
        isAddSocialMediaLinkOpen={isAddSocialMediaLinkOpen}
        setIsAddSocialMediaLinkOpen={setIsAddSocialMediaLinkOpen}
      />
      <DeleteConfirm
        isInviteSentModalOpen={isInviteSentModalOpen}
        setIsInviteSentModalOpen={setIsInviteSentModalOpen}
      />
      <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
        <div className="pb-6 w-full sm:flex block gap-6">
          <div className="items-start flex flex-col gap-8 sm:w-[80%] md:w-[65%] lg:w-[75%] xl:w-[38%] 2xl:w-[28%]">
            {/* section 1 */}
            <div className="whitespace-nowrap font-medium text-primary flex gap-5 justify-center items-center">
              <img
                src={profileImage || UserLogo}
                alt="User Profile"
                className="w-20 h-20 object-cover rounded-full"
              />
              <div className="w-full flex flex-col">
                <span className="text-primary text-[20px] mb-1">John Doe</span>
                <label className="text-primary">john doe@gmail.com</label>
              </div>
            </div>
            {/* section 2 */}
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className=" sm:w-fit text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-1.5 px-2 sm:py-2 sm:px-3 whitespace-nowrap flex gap-2 items-center"
                id="button-298"
              >
                <img src={Delete} alt="Delete" />
              </button>
              <button
                onClick={() => setIsImportAdminModalOpen(true)}
                className=" sm:w-fit text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-1.5 px-2 sm:py-2 sm:px-3 whitespace-nowrap flex gap-2 items-center"
                id="button-299"
              >
                <img src={Upload} alt="Upload" />
                <span className="text-primary">Upload</span>
              </button>
            </div>

            {/* section 3 */}
            <div className="items-center w-full">
              <span className="text-secondary text-[18px]">
                Last Seen 4 Minutes Ago
              </span>
            </div>

            {/* section 4 */}
            <div className="items-center w-full">
              <span className="text-primary text-[18px] ">
                Date Joined: 22-08-2024, 02.00 AM{" "}
              </span>
            </div>
            {/* section 5 */}
            <div className="p-2 rounded-xl border border-primary flex justify-between items-center w-full">
              <label className="text-primary text-[18px]">
                Change Password
              </label>
              <button
                onClick={handleChangePass}
                className="w-[100px] sm:w-fit text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-1.5 px-2 sm:py-2 sm:px-3 whitespace-nowrap flex gap-2 items-center"
                id="button-300"
              >
                <img src={Lock} alt="Upload" />
                <span className="text-primary">Change</span>
              </button>
            </div>
            {/* section 6 */}
            <div className="p-2 rounded-xl border border-primary flex justify-between items-center w-full">
              <label className="text-primary text-[18px]">Delete User</label>
              <button
                onClick={() => setIsInviteSentModalOpen(true)}
                className="w-[100px] sm:w-fit text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-1.5 px-2 sm:py-2 sm:px-3 whitespace-nowrap flex gap-2 items-center"
                id="button-301"
              >
                <img src={Delete2} alt="Upload" />
                <span className="text-[#F04438]">Delete</span>
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
                        name="fname"
                        id="fname"
                        labelName="First Name"
                        labelColor="primary"
                        placeholderName="John"
                        placeholderColor="secondary"
                        textColor="text-dark"
                        borderRadius="xl"
                        activeBorderColor="blue"
                      />
                    </div>
                    <div className="w-full xl:mt-0 mt-6">
                      <InputComponent
                        inputType="text"
                        name="lname"
                        id="lname"
                        labelName="Last Name"
                        labelColor="primary"
                        placeholderName="Doe"
                        placeholderColor="secondary"
                        textColor="text-dark"
                        borderRadius="xl"
                        activeBorderColor="blue"
                      />
                    </div>
                  </div>
                  <div className="xl:flex gap-6 block mt-6">
                    <div className="w-full">
                      <InputComponent
                        inputType="text"
                        name="email"
                        id="email"
                        labelName="Email ID"
                        labelColor="primary"
                        placeholderName="Email Address"
                        placeholderColor="secondary"
                        textColor="text-dark"
                        borderRadius="xl"
                        activeBorderColor="blue"
                      />
                    </div>
                    <div className="w-full xl:mt-0 mt-6">
                      <label htmlFor="phone" className="text-primary">
                        Contact Number
                      </label>
                      <div className="mt-1">
                        <PhoneInput
                          id="number"
                          className="focus:outline-none"
                          preferredCountries={["in"]}
                          placeholder="+91 8888855554"
                          buttonStyle={{
                            border: "1px solid #D1D5DB",
                            borderTopRightRadius: "0px",
                            borderBottomRightRadius: "0px",
                            borderTopLeftRadius: "12px",
                            borderBottomLeftRadius: "12px",
                            width: "52px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "white",
                          }}
                          dropdownStyle={{
                            top: "50px",
                            left: "0px",
                          }}
                          country={"in"}
                          inputStyle={{
                            borderRadius: "12px",
                            fontSize: "16px",
                            border: "1px solid #D1D5DB",
                            marginLeft: "15px",
                            color: "#374151",
                            width: "97.1%",
                            height: "46px",
                            outline: "none",
                            boxShadow: "none",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="xl:flex gap-6 block mt-6 w-full">
                    <div className="xl:w-1/2 w-full">
                      <label className="text-primary">Role</label>

                      <div className="dropdown-container relative w-full text-[16px]">
                        <ComponentDropdown
                          name="search"
                          SummaryChild={
                            <h5 className="p-0 m-0">
                              {stausDropdown.showName}
                            </h5>
                          }
                          dropdownList={stauses}
                          search={false}
                          commonFunction={setStatusDropDown}
                          selected={stausDropdown.name}
                        />
                      </div>
                    </div>
                    <div className="xl:w-1/2 w-full xl:mt-0 mt-6 align-middle">
                      <label className="text-primary">Status</label>
                      <div className="rounded-xl bg-[#ECFDF3] text-[#027948] px-2 mt-1 py-1 w-fit flex gap-2 items-center">
                        <span className="min-w-[8px] min-h-[8px] rounded-full bg-[#12B76A]"></span>
                        <span>Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="w-full  gap-y-2 md:flex-row justify-evenly border border-primary rounded-xl p-6 ">
              <div className="w-full mb-6 ">
                <span className=" text-primary text-[20px]">
                  Social Media Account
                </span>
              </div>
              <form className="w-full">
                <div className="">
                  <div className="xl:flex gap-6 block">
                    <div className="w-full">
                      <InputComponent
                        inputType="text"
                        name="facebook"
                        id="facebook"
                        labelName="Facebook"
                        labelColor="primary"
                        placeholderName="https://www.facebook.com"
                        placeholderColor="secondary"
                        textColor="text-dark"
                        borderRadius="xl"
                        activeBorderColor="blue"
                      />
                    </div>
                    <div className="w-full xl:mt-0 mt-6">
                      <InputComponent
                        inputType="text"
                        name="instagram"
                        id="instagram"
                        labelName="Instagram"
                        labelColor="primary"
                        placeholderName="https://www.instagram.com"
                        placeholderColor="secondary"
                        textColor="text-dark"
                        borderRadius="xl"
                        activeBorderColor="blue"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link
                      id="media"
                      onClick={handleSocial}
                      className="px-4 py-2  text-white font-medium bg-primary rounded-xl whitespace-nowrap items-center"
                    >
                      <span className="text-2xl mr-1">&#43;</span> Add Social
                      Media
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <hr />
        {/* <ToastContainer
          position="bottom-right"
          style={{ width: "400px", background: "none" }}
          autoClose={2000}
        /> */}
        <Toaster
          toastOptions={{ duration: 2000 }}
          position="bottom-right"
          containerStyle={{
            zIndex: 999999999999,
          }}
        />
      </div>
    </>
  );
};

export default UserProfile;
