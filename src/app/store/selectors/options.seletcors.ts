import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../configureStore";

const optionsSelector = (state: RootState) => state.option;

export const selectOptions = createSelector(
  [optionsSelector],
  (option) => option.options
);
