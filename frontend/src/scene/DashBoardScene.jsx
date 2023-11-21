/* eslint-disable react/prop-types */
import {
  Avatar,
  AvatarGroup,
  Box,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
  useTheme,
} from "@mui/material";
import {
  LightModeRounded,
  DarkModeRounded,
  SearchRounded,
} from "@mui/icons-material";
import DashBoardLayout from "../layout/DashboardLayout";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "../features/theme/themeSlice";
import { useEffect } from "react";
import { API_BASE_URL } from "../config/serviceApiConfig";
import { setCurrentProject } from "../features/project/projectSlice";

const SearchBox = () => {
  return (
    <OutlinedInput
      size="small"
      placeholder="Search"
      startAdornment={
        <InputAdornment position="start">
          <SearchRounded />
        </InputAdornment>
      }
    />
  );
};

const UserAvatar = ({ user }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Avatar />
      <Box sx={{}}>
        <Typography sx={{ fontWeight: 700 }}>{user.firstName}</Typography>
        <Typography sx={{ color: theme.palette.text.secondary }}>
          {user.email}
        </Typography>
      </Box>
    </Box>
  );
};

function TopBar() {
  const theme = useTheme();
  const user = useSelector((state) => state.auth.user);
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          borderBottom: `1px solid ${theme.palette.text.disabled}`,
          height: "5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
        }}
      >
        <SearchBox />
        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
          <IconButton>
            <NotificationsNoneRoundedIcon />
          </IconButton>
          <IconButton onClick={() => dispatch(toggleMode())}>
            {mode === "dark" ? <LightModeRounded /> : <DarkModeRounded />}
          </IconButton>
          <UserAvatar user={user} />
        </Box>
      </Box>
    </Box>
  );
}
const fetchProject = async (projectId, token) => {
  console.log("token from fetchProject", token);
  const req = await fetch(
    `${API_BASE_URL}/project/get?projectId=${projectId}`,
    { method: "GET", headers: { Authorization: `Bearer ${token}` } }
  );
  const data = await req.json();
  return {
    status: req.status,
    data,
  };
};
const ProjectInfo = () => {
  const currentProject = useSelector((state) => state.project.currentProject);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const theme = useTheme();
  console.log("token", token);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const { data, status } = await fetchProject(user.projects[0], token);
      if (status === 200) {
        dispatch(setCurrentProject({ project: data.project }));
        console.log("Setting new Project", data);
      }
    })();
  }, []);
  console.log(currentProject);
  return (
    currentProject && (
      <Box
        sx={{
          gridColumn: "1/4",
          gridRow: "1/2",
          border: `1px solid ${theme.palette.text.disabled}`,
          borderRadius: 2,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{}}>
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: 600,
              textTransform: "capitalize",
            }}
          >
            {currentProject.projectName}
          </Typography>
          <Typography
            sx={{
              fontStyle: "italic",
              fontSize: "0.9rem",
              color: theme.palette.text.secondary,
            }}
          >
            {`admin - ${currentProject.projectTeam.admin.firstName} ${currentProject.projectTeam.admin.lastName} `}
          </Typography>
        </Box>
        <Box>
          <AvatarGroup>
            <Avatar />
            <Avatar />
            <Avatar />
            <Avatar />
          </AvatarGroup>
        </Box>
      </Box>
    )
  );
};
function ProjectProgress() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        gridColumn: "1/4",
        gridRow: "2/5",
        border: `1px solid ${theme.palette.text.disabled}`,
        borderRadius: 2,
        p: 2,
      }}
    >
      <h1>Hello</h1>
    </Box>
  );
}
function RecentActivity() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        gridColumn: "4/6",
        gridRow: "1/3",
        border: `1px solid ${theme.palette.text.disabled}`,
        borderRadius: 2,
        p: 2,
      }}
    >
      <h1>Recent Activity</h1>
    </Box>
  );
}
export default function DashBoardScene() {
  return (
    <DashBoardLayout topbar={<TopBar />}>
      <ProjectInfo />
      <RecentActivity />
      <ProjectProgress />
    </DashBoardLayout>
  );
}
