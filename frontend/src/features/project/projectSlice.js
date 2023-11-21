import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentProject: undefined,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload.project;
    },
  },
});

export const { setCurrentProject } = projectSlice.actions;
export default projectSlice.reducer;
