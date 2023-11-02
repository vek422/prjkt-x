/* eslint-disable react/prop-types */
import { Box, useTheme } from "@mui/material";
export default function AuthLayout({ children }) {
  const theme = useTheme();
  return (
    <Box
      container
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
          width: "50%",
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
