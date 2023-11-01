/* eslint-disable react/prop-types */
import { Avatar, AvatarGroup, Typography, Box, useTheme } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const SelectionCard = ({ heading, subHeading, avatar, handleClick }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        border: `1px solid ${theme.palette.text.disabled}`,
        transition: `all 0.2s ease`,
        px: 2,
        py: 1,
        cursor: "pointer",
        borderRadius: 2,
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
        "&:hover": {
          backgroundColor: theme.palette.background.alt,
          border: `1px solid ${theme.palette.text.primary}`,
        },
      }}
      onClick={handleClick}
    >
      {avatar}
      <Box sx={{ width: "100%" }}>
        <Typography>{heading}</Typography>
        <Typography sx={{ fontSize: 11 }}>{subHeading}</Typography>
      </Box>
    </Box>
  );
};
export default function TeamPreference({ setPreferTeam }) {
  return (
    <>
      <PeopleAltIcon />
      <h1>Invite Friends</h1>
      <Typography>Invite you team members or you want to work solo.</Typography>
      <Box
        sx={{ width: "50%", display: "flex", gap: 2, flexDirection: "column" }}
      >
        <SelectionCard
          avatar={<Avatar />}
          heading={"Im Working Solo"}
          subHeading={"I need to manage basic task"}
          handleClick={() => {
            setPreferTeam(false);
            //navigate to create project page
          }}
        />
        <SelectionCard
          avatar={
            <AvatarGroup spacing={"small"}>
              <Avatar />
              <Avatar />
            </AvatarGroup>
          }
          heading={"Im part of my best team"}
          subHeading={"I want to work with team"}
          handleClick={() => {
            setPreferTeam(true);
          }}
        />
      </Box>
    </>
  );
}
