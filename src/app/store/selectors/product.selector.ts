import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../configureStore";

const productsSelector = (state: RootState) => state.product;

export const selectOptions = createSelector(
  [productsSelector],
  (product) => product.products
);



