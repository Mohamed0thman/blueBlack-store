import { createAsyncThunk } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import { Product } from "../../models";
import {
  addDoc,
  collection,
  db,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "../../fireBase";
export const createProduct = createAsyncThunk<string, FieldValues>(
  "postProduct",
  async (req, thunkAPI) => {
    try {
      console.log("req", req);

      // const docColorRef = await addDoc(collection(db, "products"), {
      //   productName: req.name,
      //   ProductPrice: req.price,
      //   productImage: req.image,
      //   productColors: [],
      //   productSizes: [],
      //   productVariant: [],
      // });

      // const propduct: Product = {
      //   productId: docColorRef.id,
      //   productName: req.name,
      //   ProductPrice: req.price,
      //   productImage: req.image,
      //   productColors: [],
      //   productSizes: [],
      //   productVariant: [],
      // };

      return "";
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
