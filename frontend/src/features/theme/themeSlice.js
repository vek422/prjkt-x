import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
  },
});

export const { toggleMode } = themeSlice.actions;
export default themeSlice.reducer;
