/* eslint-disable react/prop-types */
import Sidebar from "../components/Auth/Sidebar";
import { Grid, useTheme } from "@mui/material";
export default function AuthLayout({ children }) {
  const theme = useTheme();
  return (
    <Grid container style={{ width: "100%", height: "100vh" }}>
      <Grid
        item
        xs={3}
        sx={{
          backgroundColor: theme.palette.background.alt,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Sidebar />
      </Grid>
      <Grid
        item
        xs={9}
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
        {children}
      </Grid>
    </Grid>
  );
}
