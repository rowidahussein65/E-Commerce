import React, { useContext, useState } from "react";
import Style from "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { authContext } from "../../Context/AuthContextProvider";

export default function Register() {
  let { setToken } = useContext(authContext);
  let navigate = useNavigate();
  const [ErrMessage, setErrMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister(values) {
    setIsLoading(true);
    setErrMessage(null);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      navigate("/Login");
    } catch (error) {
      setErrMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  let validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "Name min is 3 chars")
      .max(20, "Name max is 20 chars")
      .required("Name is required"),
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup
      .string()
      .matches(/^\w{6,15}$/, "Password is invalid")
      .required("Password is required"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password and Re-password must match")
      .required("Re-password is required"),
    phone: yup
      .string()
      .matches(/^01[0125][0-9]{8}$/, "Phone number is invalid")
      .required("Phone number is required"),
  });

  let registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <>
      {ErrMessage && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          <span className="font-medium">Error: </span> {ErrMessage}
        </div>
      )}

      <form
        onSubmit={registerForm.handleSubmit}
        className="w-6/7 px-15 mx-auto"
      >
        <h2 className="my-5 mt-25 text-[25px]">Register Now</h2>

        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Name:
        </label>
        <input
          name="name"
          value={registerForm.values.name}
          onChange={registerForm.handleChange}
          onBlur={registerForm.handleBlur}
          type="text"
          id="name"
          placeholder="Enter Your Name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
        {registerForm.touched.name && registerForm.errors.name && (
          <div className="text-sm text-red-800 mt-2">
            {registerForm.errors.name}
          </div>
        )}

        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 mt-7"
        >
          Email:
        </label>
        <input
          name="email"
          value={registerForm.values.email}
          onChange={registerForm.handleChange}
          onBlur={registerForm.handleBlur}
          type="email"
          id="email"
          placeholder="Enter Your Email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
        {registerForm.touched.email && registerForm.errors.email && (
          <div className="text-sm text-red-800 mt-2">
            {registerForm.errors.email}
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
          value={registerForm.values.password}
          onChange={registerForm.handleChange}
          onBlur={registerForm.handleBlur}
          type="password"
          id="password"
          placeholder="Enter Your Password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
        {registerForm.touched.password && registerForm.errors.password && (
          <div className="text-sm text-red-800 mt-2">
            {registerForm.errors.password}
          </div>
        )}

        <label
          htmlFor="rePassword"
          className="block mt-7 mb-2 text-sm font-medium text-gray-900"
        >
          Re-Password:
        </label>
        <input
          name="rePassword"
          value={registerForm.values.rePassword}
          onChange={registerForm.handleChange}
          onBlur={registerForm.handleBlur}
          type="password"
          id="rePassword"
          placeholder="Re-enter Your Password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
        {registerForm.touched.rePassword && registerForm.errors.rePassword && (
          <div className="text-sm text-red-800 mt-2">
            {registerForm.errors.rePassword}
          </div>
        )}

        <label
          htmlFor="phone"
          className="block mt-7 mb-2 text-sm font-medium text-gray-900"
        >
          Phone:
        </label>
        <input
          name="phone"
          value={registerForm.values.phone}
          onChange={registerForm.handleChange}
          onBlur={registerForm.handleBlur}
          type="tel"
          id="phone"
          placeholder="Enter Your Phone Number"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
        {registerForm.touched.phone && registerForm.errors.phone && (
          <div className="text-sm text-red-800 mt-2">
            {registerForm.errors.phone}
          </div>
        )}

        <button
          disabled={isLoading}
          type="submit"
          className="focus:outline-none mt-7 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          {isLoading ? <i className="fas fa-spin fa-spinner"></i> : "Register"}
        </button>
      </form>
    </>
  );
}
