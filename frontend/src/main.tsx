import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import GetProductDetailsSlug from "./product/slug/main.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StoreProvider } from "../utils/store.tsx";
import Cart from "./cart/cartPage.tsx";
import ProductPage from "./product/productPage.tsx";
import { HelmetProvider } from "react-helmet-async";
import Signin from "./user/signin/main.tsx";
import Signup from "./user/register/main.tsx";
import ShippingPage from "./cart/shipping/main.tsx";
import Payment from "./cart/payment/main.tsx";
import PlaceOrder from "./cart/placeOrder/main.tsx";
import GetOrderId from "./order/id/main.tsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import OrderHistory from "./order/history/main.tsx";
import Profile from "./user/profile/main.tsx";
import Seacrh from "./product/search.tsx";
import Orders from "./admin/order.tsx";
import Users from "./admin/user.tsx";
// import DashboardAdmin from "./admin/dashboard.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<ProductPage />} />
      <Route path="/product/slug/:slug" element={<GetProductDetailsSlug />} />
      <Route path="/search" element={<Seacrh />} />
      <Route path="/user/signin" element={<Signin />} />
      <Route path="/user/register" element={<Signup />} />
      <Route path="/user/profile" element={<Profile />} />
      <Route path="/cart/cartPage" element={<Cart />} />
      <Route path="/cart/shipping" element={<ShippingPage />} />
      <Route path="/cart/payment" element={<Payment />} />
      <Route path="/cart/placeOrder" element={<PlaceOrder />} />
      <Route path="/order/id/:id" element={<GetOrderId />} />
      <Route path="/order/history" element={<OrderHistory />} />
      <Route path="/admin/order" element={<Orders />} />
      <Route path="/admin/user" element={<Users />} />
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
    </Route>
  )
);

const queryCLient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PayPalScriptProvider options={{ "client-id": "sb" }} deferLoading={true}>
      <StoreProvider>
        <HelmetProvider>
          <QueryClientProvider client={queryCLient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </HelmetProvider>
      </StoreProvider>
    </PayPalScriptProvider>
  </React.StrictMode>
);
