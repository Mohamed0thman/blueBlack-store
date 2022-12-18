import { createSelector } from "@reduxjs/toolkit";
import { converToMap } from "../../helpers/helpers";
import { Category } from "../../models";
import { RootState } from "../configureStore";

const categorySelector = (state: RootState) => state.category;

export const selectCategories = createSelector(
  [categorySelector],
  (category) => category.categories
);

export const selectformatCategories = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((a, v) => ({ ...a, [v.categoryName]: v }), {})
);

export const selectedCategory = (categoryUrlParam: string) =>
  createSelector([selectformatCategories], (collections) => {
    type OnlyKeys = keyof typeof collections;
    return collections
      ? collections[categoryUrlParam as OnlyKeys]
      : ({} as Category);
  });
