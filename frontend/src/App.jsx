import "./App.css";
import { useMemo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { themeSettings } from "./theme.js";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Invite from "./pages/Invite";
import Register from "./pages/Register";
export default function App() {
  const mode = useSelector((state) => state.theme.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="app">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />

          <Routes>
            <Route path="/" element={<Invite />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          {!user && <Navigate to="/login" replace={true} />}
        </ThemeProvider>
      </Router>
    </div>
  );
}
