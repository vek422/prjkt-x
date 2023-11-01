import authSlice from "./auth/authSlice";
import themeSlice from "./theme/themeSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({ auth: authSlice, theme: themeSlice });

export default rootReducer;
