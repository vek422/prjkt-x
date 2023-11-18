/* eslint-disable react/prop-types */
//form for creating a project
import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import TeamMateCard from "../components/TeamMateCard";
import { API_BASE_URL } from "../config/serviceApiConfig";
import {
  ArrowBackRounded,
  ArrowForwardRounded,
  SearchRounded,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import * as yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentProject } from "../features/project/projectSlice";
import refreshUser from "../auth/refreshUser";
import { TopBar } from "../scene/NoProject";
export default function CreateProjectForm({ setPageType }) {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const projectValidationSchema = yup.object().shape({
    projectName: yup
      .string()
      .required("How Does A Project Sounds Without A Name"),
    projectDisc: yup.string(),
  });
  const handleCreateProjectRequest = async (values, teamMates) => {
    const { projectName, projectDisc } = values;
    const req = await fetch(`${API_BASE_URL}/project/create`, {
      method: "POST",
      body: JSON.stringify({
        projectName,
        projectDisc,
        teamMates,
        userId: user._id,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (req.status === 200) {
      const savedProject = await req.json();
      return {
        status: req.status,
        data: savedProject,
      };
    }
    const { message } = await req.json();
    return {
      data: message,
      status: req.status,
    };
  };
  const navigate = useNavigate();
  const [inviteEmail, setInviteEmail] = useState("");
  const [TeamMembers, setTeamMembers] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleInviteEmailChange = (e) => {
    setInviteEmail(e.target.value);
    setErrorMsg(null);
  };
  const handleRemoveTeamMate = (email) => {
    setTeamMembers((state) => state.filter((e) => e.email !== email));
  };
  const handleAddTeamMate = (user) => {
    if (TeamMembers.length >= 4) return;
    if (TeamMembers.filter((e) => e.email === inviteEmail).length != 0) return;
    setTeamMembers((state) => [...state, user]);
  };
  const handleFormSubmit = async (values, teamMates) => {
    const { status, data } = await handleCreateProjectRequest(
      values,
      teamMates
    );
    if (status === 200) {
      console.log("Project Created SuccessFully");
      dispatch(setCurrentProject({ project: data }));
      await refreshUser(token, user, dispatch);
      navigate("/");
      return;
    }
    console.log(`Error : ${data}`);
  };
  const fetchUsers = async () => {
    if (inviteEmail === "") return;
    setErrorMsg(null);
    setIsLoading(true);
    const res = await fetch(`${API_BASE_URL}/user/find?email=${inviteEmail}`, {
      method: "GET",
    });
    const fetchedUser = await res.json();
    setIsLoading(false);
    if (res.status === 404) return setErrorMsg(fetchedUser.message);
    handleAddTeamMate(fetchedUser.user);
  };
  return (
    <Box
      sx={{
        display: "flex",
        pt: 10,
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <TopBar />
      <Button
        startIcon={<ArrowBackRounded />}
        variant="outlined"
        sx={{ position: "absolute", left: 10 }}
        onClick={() => setPageType(0)}
      >
        Back
      </Button>
      <Typography sx={{ fontSize: "2rem", fontWeight: 700 }} variant="h1">
        Create Project
      </Typography>

      <Formik
        initialValues={{
          projectName: "",
          projectDisc: "",
        }}
        validationSchema={projectValidationSchema}
        onSubmit={(values) => handleFormSubmit(values, TeamMembers)}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form
            style={{
              width: "40%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "2rem",
              gap: "2rem",
            }}
            onSubmit={handleSubmit}
          >
            <TextField
              fullWidth
              size="small"
              label="Project Title"
              name="projectName"
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                Boolean(touched.projectName) && Boolean(errors.projectName)
              }
              helperText={touched.projectName && errors.projectName}
              value={values.projectName}
            />
            <TextField
              fullWidth
              size="small"
              name="projectDisc"
              label="Description"
              multiline
              rows={4}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                Boolean(touched.projectDisc) && Boolean(errors.projectDisc)
              }
              helperText={touched.projectDisc && errors.projectDisc}
              value={values.projectDisc}
            />
            <LoadingButton
              sx={{ position: "fixed", bottom: 20, right: 20 }}
              variant="contained"
              endIcon={<ArrowForwardRounded />}
              color="secondary"
              type="submit"
            >
              Continue
            </LoadingButton>
          </form>
        )}
      </Formik>
      <Box sx={{ width: "40%", px: "2rem" }}>
        {/* <Divider width="100%" />   */}
        <Box style={{ width: "100%" }}>
          <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
            <TextField
              fullWidth
              size="small"
              label="Invite Team Members"
              value={inviteEmail}
              onChange={handleInviteEmailChange}
              error={Boolean(errorMsg)}
            />
            <LoadingButton
              variant="outlined"
              onClick={() => fetchUsers()}
              loading={isLoading}
            >
              <SearchRounded />
            </LoadingButton>
          </Box>
          <Typography color="error">{errorMsg}</Typography>
          <Divider width="100%">Team Members</Divider>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {TeamMembers.map((user) => {
            return (
              <TeamMateCard
                user={user}
                key={user.email}
                handleRemoveTeamMate={handleRemoveTeamMate}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
