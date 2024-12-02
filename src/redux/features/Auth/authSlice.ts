import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import Cookies from 'js-cookie';

export type TUserLogin = {
  id: string;
  name:string;
  email: string;
  role: string;
  status: string;
  trainerId: string;
  iat: number;
  exp: number;
};
type TAuthState = {
  user: null | TUserLogin;
  token: null | string;
};
const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});


export const { setLoginUser, logOut } = authSlice.actions;
export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
