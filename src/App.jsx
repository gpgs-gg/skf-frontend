import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./features/auth/SignupPage";
import Login from "./features/auth/Login";
// import ProductTab from "./features/products/ProductsTab";
import ShowroomCRM from "./features/order/ShowroomCRM";
import SkfAction from "./pages/SkfAction";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
// USERS PAGE
import UsersPage from "./features/users/UsersPage";
// PRODUCTS PAGE
import CategoryManager from "./features/product/CategoryManager";
const App = () => {
  return (
    <>
      <Header />

      <Routes>
        {/* HOME ROUTE */}
        <Route path="/" element={<Home />} />

        {/* <Route path="/products" element={<ProductTab />} /> */}
        {/* AUTH ROUTES */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="/register" element={<SignupPage />} />

        {/* CATEGORY ROUTE */}
        <Route path="/category/:slug" element={<CategoryPage />} />

        {/* ADMIN PROTECTED ROUTES */}
        <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route path="/skf-action" element={<SkfAction />} />
          {/* ORDERS */}
          <Route path="/skf-action/orders" element={<ShowroomCRM />} />
        </Route>
        {/* PRODUCTS */}
        <Route path="/skf-action/products" element={<CategoryManager />} />
      </Routes>
    </>
  );
};

export default App;
