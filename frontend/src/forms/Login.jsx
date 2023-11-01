//this thing contains only login and doesnt care about its outer layout it will be managed in layout section
import { Formik } from "formik";
import {
  Button,
  TextField,
  Typography,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  useTheme,
  Divider,
} from "@mui/material";
import { loginInitialValue, loginValidationSchema, login } from "../auth/login";
import { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import LoginIcon from "@mui/icons-material/Login";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function LoginForm() {
  const theme = useTheme();
  const user = useSelector((state) => state.auth.user);
  const [showPassword, setShowPassword] = useState(false);
  const handleFormSubmit = async (values) => {
    await login(values);
    // onSubmitProps.resetForm();
  };

  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <Formik
      initialValues={loginInitialValue}
      validationSchema={loginValidationSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        // setFieldValue,
        // resetForm,
      }) => (
        <>
          <LoginIcon />
          <Typography sx={{ fontSize: "2rem", fontWeight: 700 }}>
            Login
          </Typography>
          <Typography>You need to Login before using the app</Typography>
          <form
            style={{
              width: "40%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "1rem",
            }}
            onSubmit={handleSubmit}
          >
            <InputLabel sx={{ width: "100%", textAlign: "start" }}>
              Email
            </InputLabel>
            <TextField
              name="email"
              type="email"
              fullWidth
              size="small"
              value={values.email}
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <InputLabel
              htmlFor="outlined-adornment-password"
              sx={{ width: "100%", textAlign: "start" }}
            >
              Password
            </InputLabel>
            <OutlinedInput
              name="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              size="small"
              fullWidth
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((state) => !state)}
                    onMouseDown={() => setShowPassword((state) => !state)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <Button fullWidth variant="contained" type="submit">
              Login
            </Button>
            <div style={{ width: "100%" }}>
              <Divider> or </Divider>
            </div>
            <Button startIcon={<GoogleIcon />} fullWidth variant="outlined">
              Login With Google
            </Button>

            <Typography>
              Dont have an account ?
              <span
                style={{
                  textDecoration: "underline",
                  color: theme.palette.secondary,
                  cursor: "pointer",
                }}
              >
                Signup Here
              </span>
            </Typography>
          </form>
        </>
      )}
    </Formik>
  );
}

{
  /*  */
}
