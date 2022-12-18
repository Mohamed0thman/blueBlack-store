import { createAsyncThunk } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import {
  addDoc,
  collection,
  db,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "../../fireBase";
import { Option } from "../../models";
import { OptionsState } from "../slices/options.slice";

/// options actions
/// get all category action
export const getOptions = createAsyncThunk<OptionsState>(
  "getCategories",
  async (_, thunkAPI) => {
    try {
      const optionssSnapShot = await getDocs(collection(db, "options"));

      const options = optionssSnapShot.docs.map((docSnapshot) => {
        const { name, type, value } = docSnapshot.data();
        return {
          id: docSnapshot.id,
          name,
          value,
          type,
        };
      });

      return { options };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

///  create Option

export const createOption = createAsyncThunk<OptionsState, FieldValues>(
  "postOption",
  async (req, thunkAPI) => {
    try {
      const docOptionRef = await addDoc(collection(db, "options"), {
        name: req.name,
        value: req.value,
        type: req.type,
      });

      const option = {
        id: docOptionRef.id,
        name: req.name,
        value: req.value,
        type: req.type,
      } as Option;
      console.log("create req", option);

      return { options: [option] };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updateOption = createAsyncThunk<Option, FieldValues>(
  "updateOption",
  async (req, thunkAPI) => {
    try {
      const docRef = doc(db, "options", req.id);

      // Update the timestamp field with the value from the server
      await updateDoc(docRef, {
        name: req.name,
        value: req.value,
        type: req.type,
      });

      return req as Option;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteOption = createAsyncThunk<{ id: string }, { id: string }>(
  "deleteOption",
  async (req, thunkAPI) => {
    try {
      console.log("deleye", req.id);

      await deleteDoc(doc(db, "options", req.id));
      return { id: req.id };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
