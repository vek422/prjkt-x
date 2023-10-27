import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/theme/themeSlice.js";
export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});
