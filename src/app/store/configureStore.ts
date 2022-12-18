import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import authSlice from "./slices/auth.slice";
import categoriesSlice from "./slices/categories.slice";
import optionsSlice from "./slices/options.slice";
import productsSlice from "./slices/products.slice";

const middleware: any[] = [];

if (import.meta.env.VITE_NODE_ENV === "development") {
  middleware.push(logger);
}

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    option: optionsSlice.reducer,
    products: productsSlice.reducer,
    category: categoriesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
