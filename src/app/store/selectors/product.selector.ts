import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../configureStore";

const productsSelector = (state: RootState) => state.product;

export const selectProducts = createSelector(
  [productsSelector],
  (product) => product.products
);

export const selectedProduct = (productUrlParam: string) =>
  createSelector([selectProducts], (products) => {
    const selectedProduct = products.find(
      (product) => product.productName === productUrlParam
    );

    return selectedProduct;
  });
