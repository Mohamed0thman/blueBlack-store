import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { Product } from "../../models";
import {
  getProducts,
  createProduct,
  deleteProduct,
} from "../actions/product.action";

export interface IProductState {
  products: Product[];
  error?: SerializedError;
  isLoading?: boolean;
}
const initialState: IProductState = {
  products: [],
  error: undefined,
  isLoading: true,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.isLoading = false;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });

    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.products = state.products.concat(action.payload.products);
      state.isLoading = false;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (item) => item.productId !== action.payload.id
      );
      state.isLoading = false;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});
export default productsSlice;
