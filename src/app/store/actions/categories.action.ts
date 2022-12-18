import { createAsyncThunk } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import {
  addDoc,
  collection,
  db,
  doc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from "../../fireBase";
import { Category, Subcategory } from "../../models";
import { CategoriesState } from "../slices/categories.slice";

/// get all category action
export const getCategories = createAsyncThunk<CategoriesState>(
  "getCategories",
  async (_, thunkAPI) => {
    try {
      const categoriesSnapShot = await getDocs(collection(db, "categories"));

      const categorys = categoriesSnapShot.docs.map((docSnapshot) => {
        const { categoryName, categoryOrder, subcategories } =
          docSnapshot.data();

        return {
          categoryId: docSnapshot.id,
          categoryName,
          categoryOrder,
          subcategories,
        };
      });

      console.log("action ", categorys);

      return { categories: categorys };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

///  create new category action
export const createCategory = createAsyncThunk<Category[], FieldValues>(
  "postCategory",
  async (req, thunkAPI) => {
    try {
      const CategoriresDoc = await addDoc(collection(db, "categories"), {
        categoryName: req.name,
        categoryOrder: req.order,
        subcategories: [],
      });

      const category: Category = {
        categoryId: CategoriresDoc.id,
        categoryName: req.name,
        categoryOrder: req.order,
        subcategories: [],
      };

      return [category];
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

///  update category action
export const updateCategory = createAsyncThunk<Category, FieldValues>(
  "updateCategory",
  async (req, thunkAPI) => {
    try {
      console.log("req", req);

      const docRef = doc(db, "categories", req.id);

      // Update the timestamp field with the value from the server
      const updateCategoryDoc = await updateDoc(docRef, {
        categoryName: req.name,
        categoryOrder: req.order,
      });

      console.log(updateCategoryDoc);

      const category = {
        categoryId: req.id,
        categoryName: req.name,
        categoryOrder: req.order,
      } as Category;

      return category;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

/// delete category action
export const deleteCtegory = createAsyncThunk<string, string>(
  "deleteCategory",
  async (req, thunkAPI) => {
    try {
      console.log(req);

      await deleteDoc(doc(db, "categories", req));

      return req;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

///subcategory

type Payload = {
  subcategories: Subcategory[];
  categoryId: string;
};
// create subcategory
export const createSubcategory = createAsyncThunk<Payload, FieldValues>(
  "postSubcategory",
  async (req, thunkAPI) => {
    try {
      const subcategory: Subcategory = {
        subcategoryName: req.name,
        subcategoryOrder: req.order,
      };
      const categoryDoc = doc(db, "categories", req.categoryId);

      await updateDoc(categoryDoc, {
        subcategories: arrayUnion(subcategory),
      });

      return {
        subcategories: [{ ...subcategory }],
        categoryId: req.categoryId,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
/// update subcategory
export const updateSubcategory = createAsyncThunk<Payload, FieldValues>(
  "updateSubcategory",
  async (req, thunkAPI) => {
    try {
      const subcategory: Subcategory = {
        subcategoryName: req.name,
        subcategoryOrder: req.order,
      };

      const docRef = doc(db, "categories", req.id);

      // Update the timestamp field with the value from the server

      await updateDoc(docRef, {
        subcategories: arrayUnion(subcategory),
      });

      await updateDoc(docRef, {
        subcategories: arrayRemove(subcategory),
      });

      return {
        subcategories: [{ ...subcategory }],
        categoryId: req.categoryId,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

/// delete subcategory
export const deleteSubcategory = createAsyncThunk(
  "deleteSubcategory",
  async (req, thunkAPI) => {
    try {
      const docRef = doc(db, "categories");

      return {};
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
