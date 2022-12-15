import { configureStore } from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import authSlice from "./slices/auth.slice";
import categoriesSlice from "./slices/categories.slice";
import optionsSlice from "./slices/options.slice";
import productsSlice from "./slices/products.slice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    options: optionsSlice.reducer,
    products: productsSlice.reducer,
    categories: categoriesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
