/* eslint-disable react/prop-types */
import { CalendarMonthRounded, MoreVertRounded } from "@mui/icons-material";
import {
  Icon,
  IconButton,
  Paper,
  Typography,
  useTheme,
  Menu,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { API_BASE_URL } from "../config/serviceApiConfig";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { setCurrentProject } from "../features/project/projectSlice";
export default function TaskCard({ task, type }) {
  const states = ["todo", "inProgress", "done"].filter((e) => e !== type);
  const currentProject = useSelector((state) => state.project.currentProject);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const editPermission =
    currentProject.projectTeam.admin._id === user._id ||
    task.assignedTo.includes(user._id);
  console.log("Admin Edit ", currentProject.projectTeam.admin);
  console.log(editPermission);
  const handleClose = () => setAnchorEl(null);
  const handleCardChange = async (nextState) => {
    const req = await fetch(`${API_BASE_URL}/task/changeTask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        taskId: task._id,
        projectId: currentProject._id,
        currentState: type,
        nextState: nextState,
      }),
    });
    const data = await req.json();
    if (req.status === 200) {
      dispatch(setCurrentProject({ project: data.project }));
    }
  };
  return (
    <Paper
      elevation={5}
      sx={{ backgroundColor: "transparent", width: "100%", p: 2 }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" component="div" fontWeight={600}>
          {task.taskName}
        </Typography>
        {editPermission && (
          <IconButton onClick={handleClick}>
            <MoreVertRounded />
          </IconButton>
        )}
        <Menu
          open={open}
          onClose={handleClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          sx={{
            ".MuiMenu-paper": {
              backgroundColor: theme.palette.Base,
            },
          }}
        >
          {states.map((e) => (
            <MenuItem key={e} onClick={() => handleCardChange(e)}>
              <Typography
                sx={{ textTransform: "capitalize" }}
              >{`Move to ${e}`}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <Typography component="div" variant="subtitle1" color="text.secondary">
        {task.taskDesc}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "end",
          gap: 1,
        }}
      >
        <Icon color="text.secondary">
          <CalendarMonthRounded />
        </Icon>
        <Typography variant="caption">
          {new Date(task.createdAt).toLocaleDateString()}
        </Typography>
      </Box>
    </Paper>
  );
}
