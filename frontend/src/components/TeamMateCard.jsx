/* eslint-disable react/prop-types */
import { DeleteOutlineRounded } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";

export default function TeamMateCard({ user, handleRemoveTeamMate }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        gap: 2,
        border: `1px solid ${theme.palette.text.disabled}`,
        p: 1,
        borderRadius: 2,
        alignItems: "center",
      }}
    >
      <Avatar />
      <Box sx={{ width: "100%" }}>
        <Typography
          sx={{ fontWeight: 600 }}
        >{`${user.firstName} ${user.lastName}`}</Typography>
        <Typography sx={{ color: theme.palette.text.secondary }}>
          {user.email}
        </Typography>
      </Box>
      <IconButton onClick={() => handleRemoveTeamMate(user.email)}>
        <DeleteOutlineRounded />
      </IconButton>
    </Box>
  );
}
