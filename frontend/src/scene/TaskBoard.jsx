import { AddRounded } from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import TaskCard from "../components/TaskCard";
import CreateTaskCard from "../components/CreateTaskCard";
import { useEffect, useState } from "react";

function Topbar() {
  const currentProject = useSelector((state) => state.project.currentProject);
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        height: "10vh",
        display: "flex",
        justifyContent: "space-between",
        p: 2,
        borderBottom: `1px solid ${theme.palette.text.disabled}`,
      }}
    >
      <Typography
        sx={{
          textTransform: "capitalize",
          fontSize: "1.6rem",
          fontWeight: 700,
        }}
      >
        {currentProject.projectName}
      </Typography>
      <TeamMates />
    </Box>
  );
}
function TeamMates() {
  const currentProject = useSelector((state) => state.project.currentProject);
  const teamMembers = [
    currentProject.projectTeam.admin,
    ...currentProject.projectTeam.teamMembers,
  ];
  return (
    <AvatarGroup>
      {teamMembers.map((user) => (
        <Avatar
          key={user._id}
        >{`${user?.firstName[0]}${user?.lastName[0]}`}</Avatar>
      ))}
    </AvatarGroup>
  );
}
function Board() {
  return (
    <Grid container="true" sx={{ p: 2, height: "90vh", pb: 0 }} spacing={2}>
      <TaskList type="todo" />
      <TaskList type="inProgress" />
      <TaskList type="done" />
    </Grid>
  );
}

function TaskList({ type }) {
  const currentProject = useSelector((state) => state.project.currentProject);
  const [isCreateTaskOpen, setCreateTaskOpen] = useState(false);
  const theme = useTheme();
  return (
    <Grid
      item="true"
      xs={4}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "centers",
        px: 2,
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Typography sx={{ textTransform: "uppercase" }}>{type}</Typography>
          <Typography
            sx={{
              outline: `1px solid ${theme.palette.Blue}`,
              px: "4px",
              borderRadius: 1,
              fontWeight: 500,
            }}
          >
            {currentProject["projectTasks"][type].length}
          </Typography>
        </Box>
        <IconButton onClick={() => setCreateTaskOpen((state) => !state)}>
          <AddRounded />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
        {currentProject["projectTasks"][type].map((e) => (
          <TaskCard task={e} key={e._id} type={type} />
        ))}
        {isCreateTaskOpen && (
          <CreateTaskCard setCreateTaskOpen={setCreateTaskOpen} type={type} />
        )}
      </Box>
    </Grid>
  );
}

export default function TaskBoardScene() {
  return (
    <Box sx={{ width: "100%" }}>
      <Topbar />
      <Board />
    </Box>
  );
}
