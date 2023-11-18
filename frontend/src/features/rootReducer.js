import authSlice from "./auth/authSlice";
import themeSlice from "./theme/themeSlice";
import projectSlice from "./project/projectSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  auth: authSlice,
  theme: themeSlice,
  project: projectSlice,
});

export default rootReducer;
