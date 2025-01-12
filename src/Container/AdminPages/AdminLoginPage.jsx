"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, KeyRound, Mail } from "lucide-react";
import { useDispatch } from "react-redux";
import { loginFormService } from "../../Redux/reduxSlice/adminServices/loginSlice";
import toast from "react-hot-toast";
import { LoginFormValidation } from "../../../utils/validation";
import { setItemLocalStorage } from "../../Utils/browserServices";
import LoginImg from "../../assets/login-img.gif";
import Image from "next/image";
const initialState = {
  email: "",
  password: "",
};

const AdminLoginPage = () => {
  const [loginForm, setLoginForm] = useState(initialState);
  const [errorMessages, setErrorMessages] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const route = useRouter();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { [name]: value };
    setLoginForm({ ...loginForm, [name]: value });
    const { errors } = LoginFormValidation(newData);
    setErrorMessages({
      ...errorMessages,
      ...errors,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { errors, valid } = LoginFormValidation(loginForm);
    setErrorMessages(errors);
    if (!valid) return;
    try {
      setIsLoading(true);
      const response = await dispatch(loginFormService(loginForm));
      if (response?.payload?.status === 200) {
        setItemLocalStorage("admin_token", response?.payload?.data?.token);
        await route.push("/admin/dashboard");
        toast.success(response?.payload?.data?.message);
        setLoginForm(initialState);
        setIsLoading(false);
        setTimeout(() => {}, 20 * 1000);
      } else {
        setIsLoading(false);
        toast.error(response?.payload?.data?.message);
      }
    } catch (error) {
      console.error("error", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full md:h-screen bg-gradient-to-r from-primary to-secondary flex items-center ">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="md:max-w-6xl md:mx-auto bg-white shadow-xl rounded-lg md:p-8 grid grid-cols-12 gap-6"
      >
        <div className="p-6 md:h-[500px] border rounded-lg col-span-12 md:col-span-4">
          <>
            <div className="mx-auto max-w-xl flex flex-col items-center justify-center text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                Welcome
              </h1>
              <p className="mt-3 text-lg text-gray-600">
                We are glad to see you back with us
              </p>
            </div>
            <form
              className="mx-auto mt-8 max-w-xl sm:mt-8"
              onSubmit={handleFormSubmit}
            >
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-2 space-y-4">
                  <div className="w-full">
                    <div className=" border-2 border-secondary px-4 py-2 rounded-md focus:outline-none focus:border-primary text-sm font-normal text-textColor">
                      <label className="input input-bordered flex items-center gap-2  bg-Neutral-Color-Light-Gray">
                        <Mail size={18} />
                        <input
                          type="text"
                          className="w-full appearance-none outline-none focus:outline-none"
                          name="email"
                          value={loginForm?.email}
                          onChange={handleChange}
                          placeholder="Email"
                        />
                      </label>
                    </div>
                    {errorMessages?.email && (
                      <span className="label-text-alt text-red-500 text-xs">
                        {errorMessages?.email}
                      </span>
                    )}
                  </div>

                  <div className="w-full">
                    <div className=" border-2 border-secondary px-4 py-2 rounded-md focus:outline-none focus:border-primary text-sm font-normal text-textColor">
                      <label className="input input-bordered flex items-center gap-2 bg-Neutral-Color-Light-Gray">
                        <KeyRound size={18} />
                        <input
                          value={loginForm?.password}
                          onChange={handleChange}
                          type={showPassword ? "text" : "password"}
                          className="w-full appearance-none outline-none focus:outline-none"
                          name="password"
                          placeholder="Password"
                        />
                        {loginForm.password && (
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="flex items-center justify-center"
                          >
                            {showPassword ? (
                              <Eye size={20} className="text-gray-400" />
                            ) : (
                              <EyeOff size={20} className="text-gray-400" />
                            )}
                          </button>
                        )}
                      </label>
                    </div>
                    {errorMessages?.password && (
                      <span className="label-text-alt text-red-500 text-xs">
                        {errorMessages?.password}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <a
                  className="font-medium text-sm text-textColor hover:underline cursor-pointer hover:text-primary duration-300 transition-all"
                  onClick={() => route.push("/admin/forgot-password")}
                >
                  Forgot Password
                </a>
              </div>
              <div className="mt-[3rem]">
                <button
                  type="submit"
                  className="w-full bg-primary text-white px-4 py-3 rounded-xl shadow-md hover:bg-secondary duration-300 transition-all flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      ></path>
                    </svg>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
          </>
        </div>
        <div className="p-6 md:h-[500px] flex items-center justify-center bg-secondary border rounded-lg col-span-12 md:col-span-8 relative">
          <Image
            src={LoginImg}
            className="md:h-[450px] rounded-lg"
            alt="Side Image"
            layout="contant" // Ensures the image takes up the entire container
            objectFit="contant" // Adjusts the image to cover the container, preserving aspect ratio
            priority // Optimizes loading for important images
          />
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
