/* eslint-disable react/prop-types */
import { useTheme } from "@emotion/react";
import { Grid } from "@mui/material";
export default function HomeLayout({ children, sidebar }) {
  const theme = useTheme();
  return (
    <Grid
      container="true"
      sx={{
        width: "100%",
        height: "100vh",
      }}
    >
      <Grid item xs={2} sx={{ backgroundColor: theme.palette.background.alt }}>
        {sidebar}
      </Grid>
      <Grid item xs={10}>
        {children}
      </Grid>
    </Grid>
  );
}
