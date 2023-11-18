/* eslint-disable react/prop-types */
import {
  Typography,
  Box,
  useTheme,
  Divider,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Button,
} from "@mui/material";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ListRoundedIcon from "@mui/icons-material/ListRounded";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { useDispatch } from "react-redux";
import { setLogout } from "../features/auth/authSlice";
export default function SideBar() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setLogout());
  };

  const listItems = [
    {
      isSelected: true,
      icon: <DashboardRoundedIcon />,
      title: "Dashboard",
      onclick: "",
    },
    {
      icon: <ListRoundedIcon />,
      title: "Tasks",
      onclick: "",
      isSelected: false,
    },
    {
      icon: <MessageRoundedIcon />,
      title: "Message",
      onclick: "",
      isSelected: false,
    },
    {
      icon: <PermIdentityRoundedIcon />,
      title: "Users",
      onclick: "",
      isSelected: false,
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        width: "100%",
        pb: 5,
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ p: 2, py: 4, width: "100%" }}>
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              color: theme.palette.Red || theme.palette.secondary.main,
              fontWeight: 700,
            }}
          >
            PRJKT X
          </Typography>
        </Box>
        <Divider sx={{ width: "80%" }} />
        <Box sx={{ width: "100%" }}>
          <List>
            {listItems.map((item) => {
              return (
                <ListItemButton
                  key={item.title}
                  onClick={item.onclick}
                  selected={item.isSelected}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>{item.title}</ListItemText>
                </ListItemButton>
              );
            })}
          </List>
        </Box>
      </Box>
      <Box sx={{}}>
        <Button
          startIcon={<LogoutRoundedIcon />}
          fullWidth
          onClick={handleLogout}
          sx={{ p: 1 }}
        >
          Log out
        </Button>
      </Box>
    </Box>
  );
}
