import { CalendarMonthRounded } from "@mui/icons-material";
import { Icon, Paper, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
export default function TaskCard() {
  const theme = useTheme();
  return (
    <Paper
      elevation={5}
      sx={{ backgroundColor: "transparent", width: "100%", p: 2 }}
    >
      <Typography variant="h5" component="div" fontWeight={600}>
        Task Title
      </Typography>
      <Typography component="div" variant="subtitle1" color="text.secondary">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At quae alias
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Icon color="text.secondary">
          <CalendarMonthRounded />
        </Icon>
        <Typography component="div" variant="caption">
          12/2/2002
        </Typography>
      </Box>
    </Paper>
  );
}
