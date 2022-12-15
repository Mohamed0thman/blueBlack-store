import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../configureStore";
import { AuthState } from "../types/auth.type";

export const authSelector: (state: RootState) => AuthState = (
  state: RootState
) => state.auth;

export const displayNameSelector = createSelector(authSelector, (auth) => {
  return auth.user?.displayName;
});

export const emailSelector = createSelector(authSelector, (auth) => {
  return auth.user?.email;
});

export const isUserAuthenticatedSelector = createSelector(
  authSelector,
  (auth) => {
    return auth.authenticated;
  }
);

export const errorSelector = createSelector(authSelector, (auth) => {
  return auth.error;
});
