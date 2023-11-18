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
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { setLogin } from "../features/auth/authSlice";
import { setCurrentProject } from "../features/project/projectSlice";
import { LoadingButton } from "@mui/lab";
export default function LoginForm() {
  const theme = useTheme();
  const user = useSelector((state) => state.auth.user);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleFormSubmit = async (values) => {
    setError(null);
    setLoading(true);
    const { data, status } = await login(values);
    if (status == 201) {
      console.log(data);
      dispatch(
        setLogin({
          user: data.user,
          token: data.token,
        })
      );
      navigate("/");
      //check if user has project
      // if (data?.projects.length === 0) {
      //   navigate("/create-project");
      // } else {
      //   if (data.projects)
      //     dispatch(setCurrentProject({ project: data.projects[0] }));
      //   navigate("/");
      // }
      setLoading(false);
      return;
    }
    setLoading(false);
    setError(data.message);
  };

  if (user) return <Navigate to="/" />;

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
            <Typography sx={{ color: theme.palette.error.main }}>
              {error}
            </Typography>
            <LoadingButton
              fullWidth
              variant="contained"
              type="submit"
              loading={isLoading}
            >
              Login
            </LoadingButton>
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
                onClick={() => navigate("/register")}
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
