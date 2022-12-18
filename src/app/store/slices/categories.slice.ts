import { createSlice } from "@reduxjs/toolkit";
import { SerializedError } from "@reduxjs/toolkit";
import { Category } from "../../models";
import {
  createCategory,
  createSubcategory,
  deleteCtegory,
  getCategories,
  updateCategory,
} from "../actions/categories.action";

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
    // get categories
    builder.addCase(getCategories.fulfilled, (state, action) => {
      console.log("action.payload.categories",action.payload.categories);
      
      state.categories = action.payload.categories;
      state.isLoading = false;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    // category
    // create category

    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.categories = state.categories?.concat(action.payload);
      state.isLoading = false;
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });

    // update category

    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.categories = state.categories.map((item) => {
        if (item.categoryId === action.payload.categoryId) {
          return {
            ...item,
            categoryName: action.payload.categoryName,
            categoryOrder: action.payload.categoryOrder,
          };
        }
        return item;
      });
      state.isLoading = false;
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });

    // delete category

    builder.addCase(deleteCtegory.fulfilled, (state, action) => {
      state.categories = state.categories?.filter(
        (item) => item.categoryId !== action.payload
      );
      state.isLoading = false;
    });
    builder.addCase(deleteCtegory.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });

    // subcategory
    // create subcategory
    builder.addCase(createSubcategory.fulfilled, (state, action) => {
      const { categoryId, subcategories } = action.payload;
      state.categories = state.categories.map((item) => {
        if (item.categoryId === categoryId) {
          return {
            ...item,
            subcategories: item.subcategories.concat(subcategories),
          };
        }
        return item;
      });
      state.isLoading = false;
    });
    builder.addCase(createSubcategory.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});
export default categoriesSlice;
