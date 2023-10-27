import { Box } from "@mui/system";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { Typography, useTheme } from "@mui/material";
export default function Progress() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        width: "100%",
        gap: 4,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "", gap: 2 }}>
        <CircleOutlinedIcon fontSize="small" />
        <Box>
          <Typography sx={{}}>Signup / Login</Typography>
          <Typography sx={{ fontSize: 12, color: theme.palette.text.disabled }}>
            Be connected with us for better experience
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "", gap: 2 }}>
        <CircleOutlinedIcon fontSize="small" />
        <Box>
          <Typography sx={{}}>Invite Your Team Members</Typography>
          <Typography sx={{ fontSize: 12, color: theme.palette.text.disabled }}>
            Invite your team members for collaboration
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "", gap: 2 }}>
        <CircleOutlinedIcon fontSize="small" />
        <Box>
          <Typography sx={{}}>Create Project</Typography>
          <Typography sx={{ fontSize: 12, color: theme.palette.text.disabled }}>
            Start Managing your projects
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
