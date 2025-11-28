import React, { useState } from "react";
import TaskManager from "../assets/images/app-logo.png";
import Google from "../assets/images/google.png";
import Github from "../assets/images/github.png";
import Facebook from "../assets/images/facebook.png";
import { Link } from "react-router-dom";
import { valid_email_address_error } from "../Components/AllError";
import { email_already_registred_error } from "../Components/AllError";
import ErrorIcon from "../assets/svgs/alertcircle.svg";

const Register1 = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(value)) {
      setError(valid_email_address_error);
    } else {
      setError("");
    }
  };

  return (
    <div className="w-full h-full py-8 px-3 sm:p-5">
      <div className="w-full flex gap-2 items-center">
        <span>
          <img src={TaskManager} alt="TaskManager" />
        </span>
      </div>

      <div className="py-10 mt-8 w-full h-full flex justify-center items-center">
        <div className="w-full sm:w-[68%] md:w-[60%] lg:w-[50%] xl:w-[45%] 2xl:w-[27%]">
          <div className="w-full flex flex-col justify-center gap-y-2">
            <h2 className="w-full text-center text-3xl sm:text-4xl font-semibold text-dark mb-0.5">
              Create your account
            </h2>
            <p className="text-primary w-full text-center tracking-wide font-medium">
              By continuing with Google, Facebook, GitHub or email, you agree to
              our{" "}
              <span className="font-semibold text-darkblue cursor-pointer">
                Terms & Conditions
              </span>
              .
            </p>
          </div>

          <div className="w-full mt-8 my-4 flex flex-col gap-y-5">
            <div className="w-full flex justify-center items-center gap-3 border border-primary rounded-xl py-2 cursor-pointer shadow-sm">
              <span>
                <img src={Google} alt="Google" />
              </span>
              <span className="twxt-lg font-semibold">
                Continue with Google
              </span>
            </div>
            <div className="w-full flex justify-center items-center gap-3 border border-primary rounded-xl py-2 cursor-pointer shadow-sm">
              <span>
                <img src={Facebook} alt="Facebook" />
              </span>
              <span className="twxt-lg font-semibold">
                Continue with Facebook
              </span>
            </div>
            <div className="w-full flex justify-center items-center gap-3 border border-primary rounded-xl py-2 cursor-pointer shadow-sm">
              <span>
                <img src={Github} alt="Github" />
              </span>
              <span className="twxt-lg font-semibold">
                Continue with Github
              </span>
            </div>
          </div>

          <div className="w-full h-[2px] bg-darkgray mt-10 relative">
            <div className="w-full absolute left-[45%] -bottom-3">
              <span className="px-2 bg-white text-lg text-gray-800">OR</span>
            </div>
          </div>

          <form className="w-full mt-8">
            <div className="w-full mt-5">
              <label className="text-primary">Email ID</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleInputChange}
                  placeholder="Email ID"
                  className={`w-full mt-1 rounded-xl border py-2.5 placeholder:text-gray-400 text-primary placeholder:tracking-wide px-3 focus:ring-0 focus:outline-0
              ${
                error
                  ? "border-fadered focus:border-fadered"
                  : " focus:border-fadedblue"
              }`}
                />
                {error && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <img src={ErrorIcon} alt="" />
                  </div>
                )}
              </div>

              {error && (
                <p className="text-red-500 text-sm mt-1">
                  {error}
                  {/* 
                  email_already_registred_error
                  valid_email_address_error
                
                */}
                </p>
              )}
            </div>
            <div className="w-full mt-6 flex justify-center">
              <Link
                id="register"
                to="/register"
                disabled={!email.trim()}
                className={`w-full text-center text-white text-lg py-2 rounded-xl 
          ${
            email.trim()
              ? " bg-custom-gradient hover:bg-custom-gradient-hover"
              : "bg-[#b6c8fa] text-white"
          } 
          transition duration-300 ease-in-out`}
              >
                Continue with email
              </Link>
            </div>
          </form>
          <div className="mt-4 w-full flex justify-center">
            <span className="w-full text-center">
              Already have an account?{" "}
              <Link
                id="login"
                to="/"
                className="pl-1 text-darkblue cursor-pointer"
              >
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register1;
