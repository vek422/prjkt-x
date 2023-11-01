import { Typography, Box } from "@mui/material";
import Progress from "./Progress";
export default function Sidebar() {
  return (
    <>
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
    </>
  );
}
