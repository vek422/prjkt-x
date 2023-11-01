
import { Formik } from "formik";
import {
  loginInitialValue,
  loginValidationSchema,
  registerInitialValue,
  registerValidationSchema,
  login,
  register,
} from "./login.js";
import GoogleIcon from "@mui/icons-material/Google";
import LoginIcon from "@mui/icons-material/Login";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

export default function Login() {
  const theme = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const handleFormSubmit = async (values, onSubmitProps) => {
    isLogin ? await login(values) : await register(values);
    // onSubmitProps.resetForm();
  };
  return (
   
  );
}
