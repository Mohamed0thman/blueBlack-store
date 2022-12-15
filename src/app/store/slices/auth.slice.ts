import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "../actions/auth.action";
import { SerializedError } from "@reduxjs/toolkit";
import { User } from "../../models";

export interface AuthState {
  user?: User | null;
  authenticated?: boolean;
  error?: SerializedError;
  isLoading?: boolean;
}

const initialState: AuthState = {
  user: null,
  authenticated: undefined,
  error: undefined,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.authenticated = true;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.authenticated = true;
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.authenticated = false;
      state.isLoading = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});
export default authSlice;
export const { setUser } = authSlice.actions;
