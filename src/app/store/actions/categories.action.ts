import { createAsyncThunk } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";
import { FieldValues } from "react-hook-form";
import {
  addDoc,
  collection,
  db,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "../../fireBase";
import { Category, Color, Size } from "../../models";
import { CategoriesState } from "../slices/categories.slice";

export const createNewCategory = createAsyncThunk<Category, FieldValues>(
  "postCategory",
  async (req, thunkAPI) => {
    try {
      console.log("color", req);

      const category: Category = {
        categoryName: req.name,
        categoryOrder: req.order,
        subcategories: [],
      };

      const docColorRef = await addDoc(collection(db, "categories"), category);

      return { ...category, categoryId: docColorRef.id };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getCategories = createAsyncThunk<CategoriesState>(
  "getCategories",
  async (_, thunkAPI) => {
    try {
      const categories: Category[] = [];
      const categoriesDocs = await getDocs(collection(db, "categories"));

      categoriesDocs.forEach((doc) => {
        categories.push(doc.data() as Category);
      });

      return { categories };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
