import "./App.css";
import { useMemo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  redirect,
} from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { themeSettings } from "./theme.js";
import { useSelector } from "react-redux";
import { DashBoard } from "./pages/DashBoard.jsx";
import CreateProject from "./scene/CreateProject.jsx";
import ConditionalRoute from "./router/ConditionalRoute.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import CreateProjectPage from "./pages/CreateProjectPage.jsx";
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
            <Route
              path="/"
              element={
                <ConditionalRoute condition={Boolean(user)} redirectTo="/login">
                  <ConditionalRoute
                    condition={Boolean(user.projects.length !== 0)}
                    redirectTo="/createProject"
                  >
                    <DashBoard />
                  </ConditionalRoute>
                </ConditionalRoute>
              }
            />
            <Route
              path="/createProject"
              element={
                <ConditionalRoute
                  condition={Boolean(user)}
                  redirectTo={"/login"}
                >
                  <CreateProjectPage />
                </ConditionalRoute>
              }
            />
            <Route
              path="/login"
              element={
                <ConditionalRoute condition={Boolean(!user)} redirectTo="/">
                  <Login />
                </ConditionalRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ConditionalRoute condition={Boolean(!user)} redirectTo="/">
                  <Register />
                </ConditionalRoute>
              }
            />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}
