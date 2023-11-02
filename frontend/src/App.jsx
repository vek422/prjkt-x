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

import Invite from "./pages/Invite";

import PrivateRoute from "./router/PrivateRoute";
import AuthRoute from "./router/AuthRoute";
export default function App() {
  const mode = useSelector((state) => state.theme.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="app">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          {/* Router Setup */}
          {user && (
            <PrivateRoute>
              <Routes>
                <Route path="/" element={<Invite />} />
              </Routes>
            </PrivateRoute>
          )}
          <AuthRoute />
        </ThemeProvider>
      </Router>
    </div>
  );
}
