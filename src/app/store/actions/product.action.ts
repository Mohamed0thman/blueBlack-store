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
  getStorage,
  ref,
  setDoc,
  uploadBytes,
  getDownloadURL,
} from "../../fireBase";
import { IProductState } from "../slices/products.slice";

//product action
// get all products

export const getProducts = createAsyncThunk<IProductState>(
  "postProduct",
  async (_, thunkAPI) => {
    try {
      const productsSnapShot = await getDocs(collection(db, "products"));

      const products: Product[] = productsSnapShot.docs.map((docSnapshot) => {
        const {
          categoryName,
          productName,
          subcategoryName,
          ProductPrice,
          discount,
          productImage,
          productColors,
          productSizes,
          productVariant,
          totalQuantity,
          published,
        } = docSnapshot.data();
        return {
          productId: docSnapshot.id,
          productName,
          categoryName,
          subcategoryName,
          ProductPrice,
          discount,
          productImage,
          productColors,
          productSizes,
          productVariant,
          totalQuantity,
          published,
        };
      });

      return { products };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Create Product
export const createProduct = createAsyncThunk<IProductState, FieldValues>(
  "postProduct",
  async (req, thunkAPI) => {
    try {
      console.log("req", req);

      // Create a root reference
      const storage = getStorage();

      // Create a reference to 'images'
      const storageRef = ref(
        storage,
        "images/" + req.productImage[0].name + Date.now()
      );

      // 'file' comes from the Blob or File API
      await uploadBytes(storageRef, req.productImage[0]);

      const url = await getDownloadURL(storageRef).then((url) => {
        return url;
      });
      console.log(url);

      const docProductRef = await addDoc(collection(db, "products"), {
        productName: req.productName,
        categoryName: req.categoryName,
        subcategoryName: req.subcategoryName,
        ProductPrice: req.price,
        productImage: url,
        productColors: req.colors,
        productSizes: req.sizes,
        productVariant: req.productVariant,
        totalQuantity: 0,
        discount: req.discount,
        published: false,
      });

      const product: Product = {
        productId: docProductRef.id,
        categoryName: req.categoryName,
        subcategoryName: req.subcategoryName,
        productName: req.productName,
        ProductPrice: req.price,
        discount: req.discount,
        productImage: url,
        productColors: req.colors,
        productSizes: req.sizes,
        productVariant: req.productVariant,
        totalQuantity: 0,
        published: false,
      };

      return { products: [product] };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
