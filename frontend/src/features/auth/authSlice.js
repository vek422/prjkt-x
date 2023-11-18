import { createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../config/serviceApiConfig";
const initialState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    setLogout: (state) => {
      state.token = undefined;
      state.user = undefined;
    },
    updateUser: (state, action) => {
      state.user = action.payload.newUser;
    },
  },
});

export const { setLogin, setLogout, updateUser } = authSlice.actions;
export default authSlice.reducer;
