import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { Product } from "../../models";

export interface ProdictState {
  products: Product[];
  error?: SerializedError;
  isLoading?: boolean;
}
const initialState: ProdictState = {
  products: [],
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
