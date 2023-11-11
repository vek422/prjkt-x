import {
  Drawer,
  Toolbar,
  Typography,
  Box,
  useTheme,
  Divider,
} from "@mui/material";

export default function SideBar() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box sx={{ p: 2, py: 4, width: "100%" }}>
        <Typography variant="h5" textAlign={"center"}>
          PRJKT X
        </Typography>
      </Box>
      <Divider sx={{ width: "80%" }} />
      <Box></Box>
    </Box>
  );
}
