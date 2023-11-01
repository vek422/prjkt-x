import * as yup from "yup";

import { API_BASE_URL } from "../config/serviceApiConfig";
const registerInitialValue = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const registerValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(3, "Too Short")
    .max(50, "Too Long")
    .required("required"),
  lastName: yup
    .string()
    .min(3, "Too Short")
    .max(50, "Too Long")
    .required("required"),
  email: yup
    .string()
    .email("Must be valid email")
    .max(255)
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password Must be atleast 8 character long")
    .required("required"),
});

const loginInitialValue = {
  email: "",
  password: "",
};

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be valid email")
    .max(255, "is this even possible")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password Must be atleast 8 character long")
    .required("required"),
});

const login = async (values) => {
  console.log(API_BASE_URL);
  try {
    const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const status = loginResponse.status;
    const data = await loginResponse.json();
    return {
      status,
      data,
    };
  } catch (err) {
    console.log("has an error");
  }
};

const register = async (values) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  const data = await response.json();
  const status = response.status;
  return {
    data,
    status,
  };
};

export {
  loginInitialValue,
  loginValidationSchema,
  registerInitialValue,
  registerValidationSchema,
  login,
  register,
};
