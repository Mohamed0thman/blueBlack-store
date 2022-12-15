import { createSlice } from "@reduxjs/toolkit";
import { SerializedError } from "@reduxjs/toolkit";
import { Category } from "../../models";
import { createNewCategory, getCategories } from "../actions/categories.action";

export interface CategoriesState {
  categories: Category[];
  error?: SerializedError;
  isLoading?: boolean;
}

const initialState: CategoriesState = {
  categories: [],
  error: undefined,
  isLoading: true,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNewCategory.fulfilled, (state, action) => {
      state.categories = [...state.categories, action.payload];
      state.isLoading = false;
    });
    builder.addCase(createNewCategory.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });

    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload.categories;
      state.isLoading = false;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});
export default categoriesSlice;
// builder.addCase(getCategories.fulfilled, (state, action) => {});
// builder.addCase(getCategories.rejected, (state, action) => {
//   state.error = action.error;
//   state.isLoading = false;
// });
