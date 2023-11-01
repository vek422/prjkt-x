import { Box, Divider, TextField, Avatar, Typography } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import CircleOutlined from "@mui/icons-material/CircleOutlined";

export default function InviteTeam() {
  return (
    <Box
      sx={{
        width: "50%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <h1>Enter email address to add team members</h1>
      <TextField size="small" label="Email" fullWidth />

      <Box>
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
          <Avatar />
          <Box width="100%">
            <Typography>User Name</Typography>
            <Typography fontSize={12}>User Email</Typography>
          </Box>
          <CircleOutlined fontSize="small" />
        </Box>
      </Box>

      <Divider>Your Team</Divider>
      <Box sx={{ width: "100%" }}>
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
          <Avatar />
          <Box width="100%">
            <Typography>User Name</Typography>
            <Typography fontSize={12}>User Email</Typography>
          </Box>
          <DeleteForeverOutlinedIcon />
        </Box>
      </Box>
    </Box>
  );
}
