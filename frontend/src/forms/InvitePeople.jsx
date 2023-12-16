/* eslint-disable react/prop-types */
import { SearchRounded } from "@mui/icons-material";
import { Box, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { API_BASE_URL } from "../config/serviceApiConfig";
import { useSelector } from "react-redux";
import TeamMateCard from "../components/TeamMateCard";
export default function InvitePeople({ TeamMembers, setTeamMembers }) {
  const token = useSelector((state) => state.auth.token);
  const [inviteEmail, setInviteEmail] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleAddTeamMate = (user) => {
    if (TeamMembers.length >= 4) return;
    if (TeamMembers.filter((e) => e.email === inviteEmail).length != 0) return;
    setTeamMembers((state) => [...state, user]);
  };
  const fetchUser = async () => {
    try {
      if (inviteEmail === "") return;
      setError(null);
      setIsLoading(true);
      const res = await fetch(
        `${API_BASE_URL}/user/find?email=${inviteEmail}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const fetchedUser = await res.json();
      setIsLoading(false);
      if (res.status === 404) return setError(fetchedUser.message);
      handleAddTeamMate(fetchedUser.user);
    } catch (err) {
      console.log("Error at Server : ", err);
      setError("ERR CONNECTING SERVER");
      setIsLoading(false);
    }
  };
  const handleRemoveTeamMate = (email) => {
    setTeamMembers((state) => state.filter((e) => e.email !== email));
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
        <TextField
          fullWidth
          size="small"
          label="Invite Team Members"
          value={inviteEmail}
          onChange={(e) => {
            if (e.key === "Enter") return e.preventDefault();
            setInviteEmail(e.target.value);
          }}
        />
        <LoadingButton
          variant="outlined"
          onClick={() => fetchUser()}
          loading={isLoading}
        >
          <SearchRounded />
        </LoadingButton>
      </Box>
      <Box sx={{ height: "1rem" }}>Hello</Box>
      <Box
        sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1 }}
      >
        {TeamMembers.map((user) => (
          <TeamMateCard
            user={user}
            key={user.email}
            handleRemoveTeamMate={handleRemoveTeamMate}
          />
        ))}
      </Box>
    </Box>
  );
}
