import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { lookInInLocalStorage } from "@/config/localstorage";


interface AuthState {
  isAuth: boolean;
  token: string | null;

}

const initialState: AuthState = {
  isAuth: false,
  token: lookInInLocalStorage("firstlinks_access_token"),
};

const customerSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { access_token } = action.payload;
      state.token = access_token;
      state.isAuth = true;
    },

    logOut: () => initialState,
  },
});

export const customerState = (state: RootState) => state.customer;

export const { setCredentials, logOut } = customerSlice.actions;

export default customerSlice.reducer;