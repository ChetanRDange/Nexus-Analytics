import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";
import Leadsmagix from "../assets/images/leadmagixlogo.png";
import CheckImg from "../assets/svgs/checkboxtick.svg";
import { useBrand } from "../BrandContext";
import { useAuth } from "../AuthContext";
import InputComponent from "../Components/InputComponent";
import useStore from "../state/store";
import { validateEmail } from "../utils/Validators";
import { Eye, EyeOff } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Login = () => {
  const { brand } = useBrand();
  const { login } = useAuth();
  const theme = document.body.getAttribute("theme") || "light";
  const { setEmail } = useStore();
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const isValid = (data) => {
    const { email, password } = data;

    if (!email?.trim()) {
      toast.error("Email ID is required.");
      return false;
    }

    if (!password?.trim()) {
      toast.error("Password is required.");
      return false;
    }

    if (!validateEmail(email)) {
      toast.error("Enter a valid Email ID.");
      return false;
    }

    // if (!validatePassword(password)) {
    //   toast.error(
    //     "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
    //   );

    //   return false;
    // }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid(credentials)) {
      setIsLoading(true);
      try {
        const response = await axios.post(`${API_URL}/api/auth/login`, {
          email: credentials.email,
          password: credentials.password
        });

        if (response.data.success) {
          toast.success('Login successful!');

          // Store user data in localStorage for AuthContext fallback
          localStorage.setItem('user', JSON.stringify(response.data.data.user));

          // Use the AuthContext login method which handles token storage and navigation
          const token = response.data.data.token;
          login(token, rememberMe);
        }
      } catch (error) {
        console.error('Login error:', error);
        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error('Login failed. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  function handleInputChange(e) {
    const { name, value } = e.target;
    setCredentials((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  }
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
            <h2 className="w-full text-center text-3xl sm:text-4xl font-semibold text-dark mb-0.5">
              Login
            </h2>
            <p className="text-primary w-full text-center tracking-wide font-medium">
              Please enter your credentials to log in to your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full mt-8">
            <div className="w-full mt-5">
              <InputComponent
                onChange={handleInputChange}
                inputType="email"
                name="email"
                id="email"
                labelName="Email ID"
                labelColor="primary"
                placeholderName="Email ID"
                placeholderColor="secondary"
                textColor="text-secondary"
                borderRadius="xl"
                activeBorderColor="blue"
                required
                error={errors.email}
                setErrors={setErrors}
              />
            </div>

            <div className="w-full mt-4">
              <div className="w-full">
                <div className="relative w-full">
                  <InputComponent
                    onChange={handleInputChange}
                    inputType={showPassword ? "text" : "password"}
                    maxLength={18}
                    labelName="Password"
                    name="password"
                    id="password"
                    placeholderName="Password"
                    placeholderColor="secondary"
                    textColor="text-dark"
                    borderRadius="xl"
                    activeBorderColor="blue"
                    error={errors.password}
                    required
                  />
                  <div
                    className="absolute cursor-pointer top-[70%] right-4 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </div>
                </div>
                <div className="w-full mt-2.5 flex justify-between items-center px-1">
                  <div className="inline-flex gap-2 items-center">
                    <label
                      className="relative flex items-center rounded-full cursor-pointer"
                      htmlFor="ripple-on"
                      data-ripple-dark="true"
                    >
                      <input
                        id="ripple-on"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-100 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-100 checked:bg-gray-100 checked:before:bg-gray-100 hover:before:opacity-10"
                      />
                      <span className="absolute text-darkblue transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <img src={CheckImg} alt="" className="h-3.5 w-3.5" />
                      </span>
                    </label>
                    <label className="text-dark">Remember Me</label>
                  </div>
                  <Link
                    id="forgot-password"
                    to="/forgot-password"
                    className="text-darkblue font-semibold"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </div>

            <div className="w-full mt-6 flex justify-center">
              <button
                id="submit"
                // to="/register"
                type="submit"
                disabled={isLoading}
                className={`w-full text-center text-white text-lg py-2 rounded-xl bg-custom-gradient hover:bg-custom-gradient-hover transition duration-300 ease-in-out`}
              >
                {isLoading ? "Processing..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
