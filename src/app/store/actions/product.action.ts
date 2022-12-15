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
export const createNewProduct = createAsyncThunk<Product, FieldValues>(
  "options",
  async (req, thunkAPI) => {
    try {
      console.log("product", req);

      const docColorRef = await addDoc(collection(db, "product"), {
        productName: req.name,
        ProductPrice: req.price,
        productImage: req.image,
        productColors: [],
        productSizes: [],
        productVariant: [],
      });

      const propduct: Product = {
        productId: docColorRef.id,
        productName: req.name,
        ProductPrice: req.price,
        productImage: req.image,
        productColors: [],
        productSizes: [],
        productVariant: [],
      };

      return propduct;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
