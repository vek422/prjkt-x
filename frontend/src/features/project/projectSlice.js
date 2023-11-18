import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentProject: undefined,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setCurrentProject: (state, payload) => {
      console.log(payload);
      state.currentProject = payload.project;
    },
  },
});

export const { setCurrentProject } = projectSlice.actions;
export default projectSlice.reducer;
