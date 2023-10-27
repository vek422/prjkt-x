import "./App.css";
import { useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth/";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { themeSettings } from "./theme.js";
import { useSelector } from "react-redux";
export default function App() {
  const mode = useSelector((state) => state.theme.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <Routes>
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}
