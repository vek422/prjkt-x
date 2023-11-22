import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../config/serviceApiConfig";
import { Chip, CircularProgress, Menu, MenuItem } from "@mui/material";
import { KeyboardArrowDownRounded } from "@mui/icons-material";
import { useState } from "react";
import { setCurrentProject } from "../features/project/projectSlice";
export default function SwitchProject() {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const currentProject = useSelector((state) => state.project.currentProject);
  const [userProjects, setUserProjects] = useState([]);
  const [anchorEl, setAnchorEl] = useState();
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const fetchProjects = async () => {
    const req = await fetch(
      `${API_BASE_URL}/user/getProjects?userId=${user._id}`,
      { method: "GET", headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await req.json();
    if (req.status === 200) {
      console.log("data from server  : ", data.projects);
      setUserProjects(data.projects);
    }
  };
  const handleChangeProject = async (project) => {
    const req = await fetch(
      `${API_BASE_URL}/project/get?projectId=${project._id}`,
      { method: "GET", headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await req.json();
    dispatch(setCurrentProject({ project: data.project }));
    handleClose();
  };
  useEffect(() => {
    if (userProjects.length === 0) {
      fetchProjects();
    }
  }, []);
  console.log(userProjects);
  if (!currentProject) return <CircularProgress />;
  return (
    <>
      <Chip
        label={currentProject.projectName}
        icon={<KeyboardArrowDownRounded />}
        variant="outlined"
        size="small"
        sx={{ cursor: "pointer" }}
        onClick={handleClick}
      />
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        {userProjects.map((e) => (
          <MenuItem key={e._id} onClick={() => handleChangeProject(e)}>
            {e.projectName}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
