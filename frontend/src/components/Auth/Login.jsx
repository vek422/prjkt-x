import {
  Button,
  TextField,
  Typography,
  useTheme,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Divider,
  Box,
} from "@mui/material";

import GoogleIcon from "@mui/icons-material/Google";
import LoginIcon from "@mui/icons-material/Login";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

export default function Login() {
  const theme = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: theme.palette.background.default,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <LoginIcon />
      <Typography sx={{ fontSize: "2rem", fontWeight: 700 }}>
        {isLogin ? "Login" : "Signup"}
      </Typography>
      <Typography>
        You need to {isLogin ? "login" : "signup"} before using the app
      </Typography>
      <form
        style={{
          width: "40%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {!isLogin && (
          <>
            <InputLabel sx={{ width: "100%", textAlign: "start" }}>
              Full Name
            </InputLabel>
            <TextField size="small" name="fullname" fullWidth />
          </>
        )}
        <InputLabel sx={{ width: "100%", textAlign: "start" }}>
          Email
        </InputLabel>
        <TextField name="email" type="email" fullWidth size="small" />
        <InputLabel
          htmlFor="outlined-adornment-password"
          sx={{ width: "100%", textAlign: "start" }}
        >
          Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
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
        <Button fullWidth variant="contained">
          {isLogin ? "Login" : "Signup"}
        </Button>
        <div style={{ width: "100%" }}>
          <Divider> or </Divider>
        </div>
        <Button startIcon={<GoogleIcon />} fullWidth variant="outlined">
          Login With Google
        </Button>
        {isLogin ? (
          <Typography>
            Dont have an account ?{" "}
            <span
              onClick={() => setIsLogin(false)}
              style={{
                textDecoration: "underline",
                color: theme.palette.secondary,
                cursor: "pointer",
              }}
            >
              Signup Here
            </span>
          </Typography>
        ) : (
          <Typography sx={{}}>
            Already have an account ?{" "}
            <span
              onClick={() => setIsLogin(true)}
              style={{
                textDecoration: "underline",
                color: theme.palette.secondary,
                cursor: "pointer",
              }}
            >
              Login Here
            </span>
          </Typography>
        )}
      </form>
    </Box>
  );
}
