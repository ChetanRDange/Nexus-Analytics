import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import InputComponent from "../Components/InputComponent";
import useMutation from "../hooks/useMutation";
import { validatePassword } from "../utils/Validators";
const ChangePassword = ({ email, setnotVerified }) => {
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const { callApi } = useMutation();

  const handleSubmit = async (e) => {
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
    const res = await callApi("/public/resetpassword", "POST", {
      email: email,
      password: newPassword,
    });
    if (res) {
      setnotVerified(false);
      navigate("/");
    }
  };

  return (
    <div className="py-2 -mt-5 w-full h-full flex justify-center items-center">
      <div className="w-full sm:w-[68%] md:w-[60%] lg:w-[50%] xl:w-[45%] 2xl:w-[27%]">
        <div className="w-full flex flex-col justify-center gap-y-2">
          <h2 className="w-full text-center text-3xl sm:text-4xl font-semibold text-dark mb-0.5">
            Change Password.
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
              {showPassword1 ? <Eye size={18} /> : <EyeOff size={18} />}
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
              type="submit"
              className={`w-auto text-center text-white text-md py-2 px-4 rounded-xl  bg-primary hover:bg-primarydark transition duration-300 ease-in-out`}
              id="button-165"
            >
              Reset Password
            </button>
          </div>
        </form>

        <div className="mt-4 w-full flex justify-center">
          <span className="w-full text-center">
            <Link
              id="back-to-login"
              to="/"
              className="pl-1 text-darkblue cursor-pointer"
            >
              Back to Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
