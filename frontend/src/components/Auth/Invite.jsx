import { Box } from "@mui/system";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {
  Avatar,
  AvatarGroup,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { useTheme } from "@emotion/react";
export default function Invite() {
  const theme = useTheme();
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
      <PeopleAltIcon />
      <h1>Invite Friends</h1>
      <Typography>Invite you team members or you want to work solo.</Typography>
      <Box
        sx={{ width: "40%", display: "flex", gap: 2, flexDirection: "column" }}
      >
        <Box
          sx={{
            display: "flex",
            border: "1px solid red",
            px: 2,
            py: 1,
            borderRadius: 2,
            gap: 2,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Avatar />
          <Box sx={{ width: "100%" }}>
            <Typography>Im Working Solo</Typography>
            <Typography sx={{ fontSize: 11 }}>
              I need to manage basic task
            </Typography>
          </Box>
          <CircleOutlinedIcon fontSize="small" />
        </Box>
        <Box
          sx={{
            display: "flex",
            border: "1px solid red",
            px: 2,
            py: 1,
            alignItems: "center",
            justifyContent: "space-betweeen",
            borderRadius: 2,
            gap: 2,
          }}
        >
          <AvatarGroup spacing={"small"}>
            <Avatar />
            <Avatar />
          </AvatarGroup>
          <Box sx={{ width: "100%" }}>
            <Typography>Im part of my best team</Typography>
            <Typography sx={{ fontSize: 11 }}>
              I want to work with team
            </Typography>
          </Box>
          <CheckCircleOutlinedIcon fontSize="small" />
        </Box>
        <Button variant="contained">Continue</Button>
      </Box>
    </Box>
  );
}
