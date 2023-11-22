import { AddRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CreateProjectButton() {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        navigate("/createProject");
      }}
      variant="outlined"
      startIcon={<AddRounded />}
    >
      Create Project
    </Button>
  );
}
