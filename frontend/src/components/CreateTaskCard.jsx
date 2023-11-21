import { CalendarMonthRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Paper, TextField, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import * as yup from "yup";

const createTaskValidation = yup.object().shape({
  taskName: yup.string().required("This Field is required"),
  taskDesc: yup.string().required("This Field is required"),
});
const createTaskInitialValues = {
  taskName: "",
  taskDesc: "",
};

const createTask = async (values) => {};
export default function CreateTaskCard() {
  const theme = useTheme();
  const handleFormSubmit = async () => {};
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
              <LoadingButton variant="outlined" type="submit">
                Create
              </LoadingButton>
            </Box>
          </form>
        )}
      </Formik>
    </Paper>
  );
}
