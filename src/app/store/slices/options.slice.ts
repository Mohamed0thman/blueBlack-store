import { createSlice } from "@reduxjs/toolkit";
import { SerializedError } from "@reduxjs/toolkit";
import { Color, Option, Size } from "../../models";
import {
  createOption,
  deleteOption,
  getOptions,
  updateOption,
} from "../actions/options.action";

export interface OptionsState {
  options: Option[];
  error?: SerializedError;
  isLoading?: boolean;
}

const initialState: OptionsState = {
  options: [],
  error: undefined,
  isLoading: true,
};

const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get categories
    builder.addCase(getOptions.fulfilled, (state, action) => {
      state.options = action.payload.options;
      state.isLoading = false;
    });
    builder.addCase(getOptions.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });

    builder.addCase(createOption.fulfilled, (state, action) => {
      state.options = state.options.concat(action.payload.options);
      state.isLoading = false;
    });
    builder.addCase(createOption.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });

    builder.addCase(updateOption.fulfilled, (state, action) => {
      state.options = state.options.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...action.payload,
          };
        }
        return item;
      });
      state.isLoading = false;
    });
    builder.addCase(updateOption.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });

    builder.addCase(deleteOption.fulfilled, (state, action) => {
      state.options = state.options.filter(
        (item) => item.id !== action.payload.id
      );
      state.isLoading = false;
    });
    builder.addCase(deleteOption.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});
export default optionsSlice;
