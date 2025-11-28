import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import InputComponent from "../Components/InputComponent";
import useMutation from "../hooks/useMutation";
import { validatePassword } from "../utils/Validators";
const AdminChangePassword = () => {
  const { callApi } = useMutation();
  const { logOut } = useAuth();

  const [currentpassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleChangeAdminPassword = async (e) => {
    e.preventDefault();
    const isValidPassword = validatePassword(newPassword);
    const isValidConfirmPassword = validatePassword(confirmPassword);
    if (!isValidPassword || !isValidConfirmPassword) {
      toast.error(
        "Please type the password with 8 Characters, 1 Uppercase, 1 Lowercase, 1 Special Symbol & 1 number"
      );
      return;
    } else if (newPassword !== confirmPassword) {
      toast.error("Password doesn't match");
      return;
    }
    const res = await callApi("/protect/profile/changePassword", "PUT", {
      currentPassword: currentpassword,
      newPassword: newPassword,
    });
    if (res) logOut();
  };

  return (
    <div className="w-full py-8 px-3 sm:p-5">
      {/* <div className="w-full flex gap-2 items-center">
        <span>
          <img src={TaskManager} width={120} alt="TaskManager" />
        </span>
      </div> */}

      <div className="py-10 mt-2 w-full h-full flex justify-center items-center">
        <div className="w-full sm:w-[68%] md:w-[60%] lg:w-[50%] xl:w-[45%] 2xl:w-[27%]">
          <div className="w-full flex flex-col justify-center gap-y-2">
            {/* <img src={Change} alt="" className="h-14 w-14 mb-3 m-auto" /> */}
            <h2 className="w-full text-center text-3xl sm:text-4xl font-semibold text-dark mb-0.5">
              Change Password
            </h2>
            <p className="text-primary w-full text-center tracking-wide font-medium">
              Try changing your password regularly to make your account safer.
            </p>
          </div>

          <form className="w-full mt-8" onSubmit={handleChangeAdminPassword}>
            <div className="relative w-full mt-4">
              <InputComponent
                inputType={showPassword1 ? "text" : "password"}
                maxLength={18}
                name="password"
                id="password"
                labelName="Current Password"
                labelColor="primary"
                placeholderName="Current Password"
                placeholderColor="secondary"
                textColor="text-dark"
                onChange={(e) => setCurrentPassword(e.target.value)}
                borderRadius="xl"
                activeBorderColor="blue"
              />

              <div
                className="absolute inset-y-0 right-0 pr-3 mt-8  flex items-center text-sm leading-5 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword1(!showPassword1)}
              >
                {showPassword1 ? <BsEye size={24} /> : <BsEyeSlash size={24} />}
              </div>
            </div>

            <div className="relative w-full mt-4">
              <InputComponent
                inputType={showPassword1 ? "text" : "password"}
                maxLength={18}
                name="password"
                id="password"
                labelName="New Password"
                labelColor="primary"
                placeholderName="New Password"
                placeholderColor="secondary"
                textColor="text-dark"
                onChange={(e) => setNewPassword(e.target.value)}
                borderRadius="xl"
                activeBorderColor="blue"
              />

              <div
                className="absolute inset-y-0 right-0 pr-3 mt-8  flex items-center text-sm leading-5 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword1(!showPassword1)}
              >
                {showPassword1 ? <BsEye size={24} /> : <BsEyeSlash size={24} />}
              </div>
            </div>

            <div className="relative w-full mt-4">
              <InputComponent
                inputType={showPassword2 ? "text" : "password"}
                maxLength={18}
                name="password"
                id="password"
                labelName=" Confirm Password"
                labelColor="primary"
                placeholderName=" Confirm Password"
                placeholderColor="secondary"
                textColor="text-dark"
                onChange={(e) => setConfirmPassword(e.target.value)}
                borderRadius="xl"
                activeBorderColor="blue"
              />

              <div
                className="absolute inset-y-0 right-0 pr-3 mt-8  flex items-center text-sm leading-5 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword2(!showPassword2)}
              >
                {showPassword2 ? <BsEye size={24} /> : <BsEyeSlash size={24} />}
              </div>
            </div>

            <hr className="h-0.5 px-0 bg-darkgray my-5" />
            <div className="w-full mt-6 flex justify-end gap-3">
              <Link
                to="/profile"
                className={`w-auto text-center text-black text-md py-2 px-4  bg-white rounded-xl border border-primary hover:bg-gray-50 transition duration-300 ease-in-out`}
              >
                Cancel
              </Link>
              <button
                type="submit"
                className={`w-auto text-center text-white text-md py-2 px-4 rounded-xl  bg-primary hover:bg-primarydark transition duration-300 ease-in-out`}
                id="button-2"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminChangePassword;
