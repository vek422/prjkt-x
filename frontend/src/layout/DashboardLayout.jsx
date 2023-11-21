import { Box } from "@mui/system";

export default function DashBoardLayout({ children, topbar }) {
  return (
    <Box sx={{ width: "100%" }}>
      {topbar}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5,1fr)",
          gridTemplateRows: "repeat(6,1fr)",
          width: "100%",
          p: 2,
          gap: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
