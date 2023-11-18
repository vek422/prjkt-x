/* eslint-disable react/prop-types */
import { Box, Typography, useTheme, Avatar, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function TopBar() {
  const theme = useTheme();
  const user = useSelector((state) => state.auth.user);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 2,
        py: 1,
        position: "absolute",
        width: "100%",
        top: 0,
        borderBottom: `1px solid ${theme.palette.text.disabled}`,
      }}
    >
      <Typography
        sx={{
          color: theme.palette.Red,
          fontWeight: 700,
          fontSize: "1.2rem",
        }}
      >
        PRJKT X
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Avatar />
        <Box sx={{}}>
          <Typography sx={{ fontWeight: 700 }}>{user.firstName}</Typography>
          <Typography sx={{ color: theme.palette.text.secondary }}>
            {user.email}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default function NoProject({ setPageType }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <TopBar />
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: "2rem" }}>
          Start By Creating a Project
        </Typography>
        <Typography sx={{ color: theme.palette.text.secondary }}>
          To get started you must have to create a project
        </Typography>
      </Box>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => setPageType(1)}
      >
        Create Project
      </Button>
    </Box>
  );
}
