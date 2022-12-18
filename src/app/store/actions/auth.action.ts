import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FieldValues } from "react-hook-form";
import {
  auth,
  db,
  doc,
  getDoc,
  setDoc,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "../../fireBase";
import { Basket } from "../../models/basket";
import { User } from "../../models";
import { AuthState } from "../slices/auth.slice";

export const register = createAsyncThunk<AuthState, FieldValues>(
  "login",
  async (req, thunkAPI) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        req.email,
        req.password
      ).then((user) => {
        updateProfile(user.user, {
          displayName: req.name,
        }).then(() => {
          const docRef = doc(db, "users", user.user.uid);
          setDoc(docRef, {
            displayName: req.name,
            email: req.email,
            photoUrl: "",
            basket: {} as Basket,
            roles: ["customer"],
          });
        });

        return user;
      });

      const displayName = req.name as string;
      const email = response.user?.email as string;

      const user: User = {
        displayName,
        email,
        basket: {} as Basket,
        photoURL: "",
        roles: ["customer"],
      };

      return { user };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const login = createAsyncThunk<AuthState, FieldValues>(
  "login",
  async (req, thunkAPI) => {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        req.email as string,
        req.password as string
      );

      const docRef = doc(db, "users", response.user.uid);
      const userDoc = await getDoc(docRef);

      const displayName = response.user?.displayName as string;
      const email = response.user?.email as string;

      const user: User = {
        displayName,
        email,
        roles: userDoc.data()?.roles,
        basket: userDoc.data()?.basket,
        photoURL: userDoc.data()?.photoURL,
      };

      return { user };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const logout = createAsyncThunk("logout", async (_, thunkAPI) => {
  try {
    signOut(auth);
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});
