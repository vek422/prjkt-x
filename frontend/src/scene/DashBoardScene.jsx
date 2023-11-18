/* eslint-disable react/prop-types */
import {
  Avatar,
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

import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "../features/theme/themeSlice";

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
export default function DashBoardScene() {
  const user = useSelector((state) => state.auth.user);
  return <TopBar />;
}
