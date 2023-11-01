import { Grid } from "@mui/material";
import { useState } from "react";
import SceneHandler from "./SceneHandler.jsx";
import Sidebar from "./Sidebar";

export default function Auth() {
  const [scene, setScene] = useState(0);
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
        <SceneHandler scene={scene} setScene={setScene} />
      </Grid>
    </Grid>
  );
}
