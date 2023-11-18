/* eslint-disable react/prop-types */
import { Box, useTheme } from "@mui/material";
export default function AuthLayout({ children }) {
  const theme = useTheme();
  console.log("Why im running from authlayout");
  return (
    <Box
      container="true"
      sx={{
        width: "100%",
        height: "100vh",
        backgroundColor: theme.palette.background.default,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "50rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
