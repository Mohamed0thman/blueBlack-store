import { createAsyncThunk } from "@reduxjs/toolkit";
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
import { Color, Size } from "../../models";

export const createNewColor = createAsyncThunk<Color, FieldValues>(
  "options",
  async (req, thunkAPI) => {
    try {
      console.log("color", req);

      const docColorRef = await addDoc(collection(db, "colors"), {
        name: req.colorName,
        value: req.colorValue,
      });

      const color: Color = {
        colorId: docColorRef?.id,
        colorName: req.colorName,
        colorValue: req.colorValue,
      };

      return color;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const createNewSize = createAsyncThunk<Size, FieldValues>(
  "options",
  async (req, thunkAPI) => {
    try {
      console.log("color", req);

      const docSizeRef = await addDoc(collection(db, "sizes"), {
        name: req.sizeName,
        value: req.sizeValue,
      });

      const size: Size = {
        sizeId: docSizeRef?.id,
        sizeName: req.sizeName,
        sizeValue: req.sizeValue,
      };

      console.log("size", size);

      return size;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const readOptions = createAsyncThunk<FieldValues>(
  "options",
  async (req, thunkAPI) => {
    try {
      console.log("color", req);

      const sizesDocs = await getDocs(collection(db, "sizes"));
      const colorsDocs = await getDocs(collection(db, "colors"));

      console.log(sizesDocs);
      console.log(colorsDocs);

      return {};
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
