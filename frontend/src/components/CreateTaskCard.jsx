import { CalendarMonthRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Paper, TextField, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { setCurrentProject } from "../features/project/projectSlice";
import { useState } from "react";

const createTaskValidation = yup.object().shape({
  taskName: yup.string().required("This Field is required"),
  taskDesc: yup.string().required("This Field is required"),
});
const createTaskInitialValues = {
  taskName: "",
  taskDesc: "",
};

const createTask = async (values, token, userId, projectId, type) => {
  const req = await fetch(`http://localhost:3000/task/createTask`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...values, userId, projectId, type }),
  });
  const data = await req.json();
  return { data, status: req.status };
};
export default function CreateTaskCard({ setCreateTaskOpen, type }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const currentProject = useSelector((state) => state.project.currentProject);
  const token = useSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleFormSubmit = async (values) => {
    setError(null);
    setIsLoading(true);
    const { data, status } = await createTask(
      values,
      token,
      user._id,
      currentProject._id,
      type
    );
    if (status === 200) {
      dispatch(setCurrentProject({ project: data.project }));
      setCreateTaskOpen(false);
    } else {
      setError(data.message);
    }
    setIsLoading(false);
  };
  return (
    <Paper
      elevation={5}
      sx={{
        backgroundColor: "transparent",
        width: "100%",
        p: 2,
        display: "flex",
        gap: 2,
        flexDirection: "column",
      }}
      variant="outlined"
    >
      <Formik
        initialValues={createTaskInitialValues}
        validationSchema={createTaskValidation}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleSubmit,
          handleChange,
        }) => (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", gap: "1rem", flexDirection: "column" }}
          >
            <TextField
              label="Task Name"
              fullWidth
              size="small"
              name="taskName"
              value={values.taskName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.taskName) && Boolean(errors.taskName)}
              helperText={touched.taskName && errors.taskName}
            />
            <TextField
              label="Description"
              fullWidth
              name="taskDesc"
              size="small"
              multiline
              rows={2}
              value={values.taskDesc}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.taskDesc) && Boolean(errors.taskDesc)}
              helperText={touched.taskDesc && errors.taskDesc}
            />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LoadingButton
                variant="outlined"
                type="submit"
                loading={isLoading}
              >
                Create
              </LoadingButton>
            </Box>
          </form>
        )}
      </Formik>
    </Paper>
  );
}
