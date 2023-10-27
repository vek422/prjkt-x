import { Grid, Typography, useTheme, Box } from "@mui/material";
import Progress from "./Progress";
export default function Sidebar() {
  const theme = useTheme();
  return (
    <Grid
      item
      xs={3}
      sx={{
        backgroundColor: theme.palette.background.alt,
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "3rem",
        }}
      >
        <Typography
          sx={{ fontSize: "1rem", fontWieght: "bold", textAlign: "center" }}
        >
          PRJKT X
        </Typography>
        <Progress />
      </Box>
      {/* footer box */}
      <Box>some text</Box>
    </Grid>
  );
}
