import { Formik } from "formik";
import {
  Button,
  TextField,
  Typography,
  OutlinedInput,
  InputAdornment,
  IconButton,
  useTheme,
  Divider,
  Box,
} from "@mui/material";
import {
  registerInitialValue,
  registerValidationSchema,
  register,
} from "../auth/login";
import { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import LoginIcon from "@mui/icons-material/Login";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../features/auth/authSlice";

export default function RegisterForm() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.user);
  console.log(setLogin);
  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    setError(null);
    const { data, status } = await register(values);
    console.log(data, status);
    if (status == 201) {
      dispatch(
        setLogin({
          token: data.token,
          user: data.user,
        })
      );
      navigate("/");
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setError(data.message);

    //set user and route to main page after sucess
  };
  if (user) return <Navigate to="/" />;
  return (
    <Formik
      initialValues={registerInitialValue}
      validationSchema={registerValidationSchema}
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
            Signup
          </Typography>
          <Typography>You need to Signup before using the app</Typography>
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
            <Box sx={{ display: "flex", gap: 2 }}>
              <>
                <TextField
                  size="small"
                  name="firstName"
                  value={values.firstName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  fullWidth
                  label="First Name"
                />
              </>
              <>
                <TextField
                  size="small"
                  name="lastName"
                  fullWidth
                  label="Last Name"
                  value={values.lastName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </>
            </Box>

            <TextField
              name="email"
              type="email"
              label="Email"
              fullWidth
              size="small"
              value={values.email}
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <OutlinedInput
              placeholder="Password"
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
            <Typography sx={{ color: theme.palette.error.main }}>
              {error}
            </Typography>
            <LoadingButton
              fullWidth
              variant="contained"
              type="submit"
              loading={isLoading}
            >
              Signup
            </LoadingButton>
            <div style={{ width: "100%" }}>
              <Divider> or </Divider>
            </div>
            <Button startIcon={<GoogleIcon />} fullWidth variant="outlined">
              Signup With Google
            </Button>

            <Typography>
              Already have an account?{" "}
              <span
                style={{
                  textDecoration: "underline",
                  color: theme.palette.secondary,
                  cursor: "pointer",
                }}
              >
                Login Here.
              </span>
            </Typography>
          </form>
        </>
      )}
    </Formik>
  );
}
