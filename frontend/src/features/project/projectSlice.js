import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentProject: undefined,
  tasks: undefined,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setCurrentProject: (state, action) => {
      console.log("CHANGED PROJECT STATE to : ", action.payload.project);
      state.currentProject = action.payload.project;
    },
    setTasks: (state, action) => {
      console.log("CHANGED TASK STATE");
      state.tasks = action.payload.tasks;
    },
  },
});

export const { setCurrentProject, setTasks } = projectSlice.actions;
export default projectSlice.reducer;
