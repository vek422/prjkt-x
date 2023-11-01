import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      console.log(action.payload);
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
});

export const { setLogin } = authSlice.actions;
export default authSlice.reducer;
