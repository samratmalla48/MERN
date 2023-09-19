import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouteProvider,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ShippingPage from "./pages/ShippingPage";
import PrivateRoute from "./components/PrivateRoute";
import ProfilePage from "./pages/ProfilePage";
import AdminRoute from "./components/AdminRoute";
import OrderListPage from "./pages/admin/OrderListPage";
import PaymentPage from "./pages/PaymentPage";
import ProductListPage from "./pages/admin/ProductListPage";
import ProductUpdatePage from "./pages/admin/ProductUpdatePage";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import UpdateProfilePage from "./pages/ProfilePage";
import UserEditPage from "./pages/admin/UserEditPage";
import AboutUsPage from "./pages/AboutUsPage";
import UserListPage from "./pages/admin/UserListPage";
import OrderPage from "./pages/OrderPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomePage />} />
      <Route path='/product/:id' element={<ProductPage />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/aboutUs' element={<AboutUsPage />} />

      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingPage />} />
        <Route path='payment' element={<PaymentPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/placeOrder' element={<PlaceOrderPage />} />
        <Route path='/order/:id' element={<OrderPage />} />
      </Route>

      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/orderlist/' element={<OrderListPage />} />
        <Route path='/admin/productList/' element={<ProductListPage />} />
        <Route path='/admin/product/:id/edit' element={<ProductUpdatePage />} />
        <Route path='/admin/user/:id/edit' element={<UserEditPage />} />
        <Route path='/admin/userlist/' element={<UserListPage />} />
      </Route>
    </Route>
  )
);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
