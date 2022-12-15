import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { Product } from "../../models";

export interface ProdictState {
  products?: Product[] | null;
  selectedProduct?: Product | null;
  error?: SerializedError;
  isLoading?: boolean;
}
const initialState: ProdictState = {
  products: null,
  selectedProduct: null,
  error: undefined,
  isLoading: true,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
export default productsSlice;
