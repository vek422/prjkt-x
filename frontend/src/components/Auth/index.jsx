import { Grid } from "@mui/material";

import Login from "./Login";
import Sidebar from "./Sidebar";
import { useTheme } from "@emotion/react";
import Invite from "./Invite";
import InvitePeople from "./InvitePeople";
export default function Auth() {
  const theme = useTheme();
  return (
    <Grid container style={{ width: "100%", height: "100vh" }}>
      <Sidebar />
      <Grid
        item
        xs={9}
        sx={{
          width: "100%",
        }}
      >
        <Login />
        {/* <Invite /> */}
        {/* <InvitePeople /> */}
      </Grid>
    </Grid>
  );
}
