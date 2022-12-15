import { createSlice } from "@reduxjs/toolkit";
import { SerializedError } from "@reduxjs/toolkit";
import { Color, Size } from "../../models";

export interface OptionsState {
  colors?: Color[] | null;
  sizes?: Size[] | null;
  error?: SerializedError;
  isLoading?: boolean;
}

const initialState: OptionsState = {
  colors: null,
  sizes: null,
  error: undefined,
  isLoading: true,
};

const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
export default optionsSlice;
