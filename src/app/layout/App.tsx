import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "../../features/account/Login";
import Register from "../../features/account/Register";
import Dashboard from "../../features/admin/Dashboard";
import ProductForm from "../../features/admin/ProductForm";
import HomePage from "../../features/home/HomePage";
import { auth, db, doc, getDoc } from "../fireBase";
import { User } from "../models";
import { logout } from "../store/actions/auth.action";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { setUser } from "../store/slices/auth.slice";

import Header from "./Header";
import PrivateRoute from "./PrivateRoute";

import "react-toastify/dist/ReactToastify.css";

import Categories from "../../features/admin/categories/Categories";
import Subcategories from "../../features/admin/categories/Subcategories";
import OptionsPage from "../../features/admin/options/OptionsPage";

function App() {
  const { isLoading } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "users", user?.uid);
        const userDoc = await getDoc(docRef);

        const userDto: User = {
          displayName: user.displayName as string,
          email: user.email as string,
          roles: userDoc?.data()?.roles,
          basket: userDoc?.data()?.basket,
          photoURL: userDoc?.data()?.photoURL,
        };

        dispatch(setUser(userDto));
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, []);

  return !isLoading ? (
    <div className="App">
      <Header />
      <ToastContainer position="bottom-right" hideProgressBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute roles={["admin"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/categories"
          element={
            <PrivateRoute roles={["admin"]}>
              <Categories />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/categories/:categoryName"
          element={
            <PrivateRoute roles={["admin"]}>
              <Subcategories />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/options"
          element={
            <PrivateRoute roles={["admin"]}>
              <OptionsPage />
            </PrivateRoute>
          }
        />

        <Route path="/add-product" element={<ProductForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  ) : null;
}

export default App;
