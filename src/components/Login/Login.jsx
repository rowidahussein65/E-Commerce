import React, { useContext, useState } from "react";
import Style from "./Login.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as yup from "yup"; 
import { authContext } from "../../Context/AuthContextProvider";


export default function Login() {
  let { setToken } = useContext(authContext);
  let navigate = useNavigate();
  const [ErrMessage, setErrMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(values) {
    setIsLoading(true); // بدأ التحميل
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (error) {
      setErrMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false); // انتهى التحميل
    }
  }

  let validationSchema = yup.object().shape({
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup
      .string()
      .matches(/^\w{6,15}$/, "Password is invalid")
      .required("Password is required"),
  });

  let LoginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      {ErrMessage && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          <span className="font-medium">Error! </span> {ErrMessage}
        </div>
      )}

      <form onSubmit={LoginForm.handleSubmit} className="w-6/7 px-15 mx-auto">
        <h2 className="my-5 mt-25 text-[25px]">Login</h2>

        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 mt-7"
        >
          Email:
        </label>
        <input
          name="email"
          value={LoginForm.values.email}
          onChange={LoginForm.handleChange}
          onBlur={LoginForm.handleBlur}
          type="email"
          id="email"
          placeholder="Enter Your Email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
        {LoginForm.errors.email && LoginForm.touched.email && (
          <div className="text-sm text-red-800 mt-2">
            {LoginForm.errors.email}
          </div>
        )}

        <label
          htmlFor="password"
          className="block mb-2 mt-7 text-sm font-medium text-gray-900"
        >
          Password:
        </label>
        <input
          name="password"
          value={LoginForm.values.password}
          onChange={LoginForm.handleChange}
          onBlur={LoginForm.handleBlur}
          type="password"
          id="password"
          placeholder="Enter Your Password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
        {LoginForm.errors.password && LoginForm.touched.password && (
          <div className="text-sm text-red-800 mt-2">
            {LoginForm.errors.password}
          </div>
        )}

        <button
          disabled={isLoading}
          type="submit"
          className="focus:outline-none mt-7 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          {isLoading ? <i className="fas fa-spin fa-spinner"></i> : "Login"}
        </button>
      </form>
    </>
  );
}
