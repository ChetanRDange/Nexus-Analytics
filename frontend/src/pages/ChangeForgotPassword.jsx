import React, { useState } from "react";
import TaskManager from "../assets/images/app-logo.png";
import { Link, useNavigate } from "react-router-dom";
import Change from "../assets/images/changepass.png";
import ShowPass from "../assets/svgs/settings/passshow.svg";
import HidePass from "../assets/svgs/settings/hidepass.svg";
import InputComponent from "../Components/InputComponent";
import useMutation from "../hooks/useMutation";
import useStore from "../state/store";
import toast from "react-hot-toast";
import { useAuth } from "../AuthContext";
import { useLocation } from "react-router-dom";
import { validatePassword } from "../utils/Validators";
import { useBrand } from "../BrandContext";
import { Eye, EyeOff } from "lucide-react";
const ChangeForgotPassword = () => {
  const { login } = useAuth();
  const { brand } = useBrand();
  const theme = document.body.getAttribute("theme") || "light";
  const location = useLocation();
  const email = location.state?.body;
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [showPassword2, setShowPassword2] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  //   const { adminEmail, adminPassword, setPassword } = useStore();
  const navigate = useNavigate();
  const { callApi } = useMutation();
  //   const validatePassword = (pwd) => {
  //     const minLength = pwd.length >= 8;
  //     const hasUppercase = /[A-Z]/.test(pwd);
  //     const hasLowercase = /[a-z]/.test(pwd);
  //     const hasNumber = /[0-9]/.test(pwd);
  //     const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

  //     return (
  //       minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar
  //     );
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidPassword = validatePassword(newPassword);
    const isValidConfirmPassword = validatePassword(confirmPassword);
    if (!newPassword.trim() || !confirmPassword.trim()) {
      toast.error("Password is required");
      return;
    }
    if (!isValidPassword || !isValidConfirmPassword) {
      toast.error(
        "Please type the password with 8 Characters, 1 Uppercase, 1 Lowercase, 1 Special Symbol & 1 number"
      );
      toast.error(
        "Please type the password with 8 Characters, 1 Uppercase, 1 Lowercase, 1 Special Symbol & 1 number"
      );
      return;
    } else if (newPassword !== confirmPassword) {
      toast.error("Password doesn't match");
      return;
    }
    const res = await callApi("/public/resetpassword", "POST", {
      email: email,
      password: newPassword,
    });
    if (res) login(res?.token);
  };

  return (
    <div className="w-full h-full py-8 px-3 sm:p-5">
      <div className="py-10 mt-8 w-full h-full flex flex-col justify-center items-center">
        <span>
          {brand && (
            <img
              src={
                theme === "light"
                  ? brand.lightLogo || brand.darkLogo || Leadsmagix
                  : brand.darkLogo || brand.lightLogo || Leadsmagix
              }
              alt="Leadsmagix"
              className="size-52"
            />
          )}
        </span>
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

          <form onSubmit={handleSubmit} className="w-full mt-8">
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
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                borderRadius="xl"
                activeBorderColor="blue"
              />

              <div
                className="absolute inset-y-0 right-0 pr-3 mt-8  flex items-center text-sm leading-5 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword1(!showPassword1)}
              >
                {showPassword2 ? <Eye size={18} /> : <EyeOff size={18} />}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                borderRadius="xl"
                activeBorderColor="blue"
              />

              <div
                className="absolute inset-y-0 right-0 pr-3 mt-8  flex items-center text-sm leading-5 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword2(!showPassword2)}
              >
                {showPassword2 ? <Eye size={18} /> : <EyeOff size={18} />}
              </div>
            </div>

            <hr className="h-0.5 px-0 bg-darkgray my-5" />

            <div className="w-full mt-6 flex justify-end gap-3">
              <Link
                id="cancel"
                to="/"
                className={`w-auto text-center text-black text-md py-2 px-4  bg-white rounded-xl border border-primary hover:bg-gray-50 transition duration-300 ease-in-out`}
              >
                Cancel
              </Link>
              <button
                id="submit"
                type="submit"
                className={`w-auto text-center text-white text-md py-2 px-4 rounded-xl  bg-primary hover:bg-primarydark transition duration-300 ease-in-out`}
              >
                Reset Password
              </button>
            </div>
            <div className="mt-4 w-full flex justify-center">
              <span className="w-full text-center">
                {/* Remember the Password?{" "} */}
                <Link
                  id="back-to-login"
                  to="/"
                  className="pl-1 text-darkblue cursor-pointer"
                >
                  Back to Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangeForgotPassword;
