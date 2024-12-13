import { createBrowserRouter, Outlet } from "react-router";
import AppContainer from "../layouts/AppContainer";
import AuthContainer from "../layouts/AuthContainer";
import Login from "../modules/auth/pages/Login";
import NotFound from "../modules/not-found/NotFound";
import Register from "../modules/auth/pages/Register";
import AdminLayout from "../modules/admin/layouts/AdminLayout";
import User from "../modules/admin/pages/User";
import Role from "../modules/admin/pages/Role";
import Product from "../modules/admin/pages/Product";
import Category from "../modules/admin/pages/Category";
import Tags from "../modules/admin/pages/Tags";
import Main from "../modules/main/pages/Main";
import Shop from "../modules/main/modules/shop/pages/Shop";
import ProductDetail from "../modules/main/modules/shop/pages/ProductDetail";
import Cart from "../modules/main/modules/cart/pages/Cart";
import About from "../modules/main/modules/about/pages/About";
import Contact from "../modules/main/modules/contact/pages/Contact";
import Checkout from "../modules/main/modules/checkout/pages/Checkout";
import MainLayout from "../modules/main/layouts/MainLayout";
import Search from "../modules/main/modules/search/pages/Search";
import Order from "../modules/main/modules/order/pages/Order";
import OrderDetail from "../modules/main/modules/order/pages/OrderDetail";
import AdminOrderPage from "../modules/admin/pages/AdminOrderPage";

export const browserRouters = createBrowserRouter([
  {
    path: "/",
    element: <AppContainer />,
    children: [
      {
        path: "",
        element: <MainLayout />,
        children: [
          {
            path: "",
            element: <Main />,
          },
          {
            path: "shop",
            element: <Outlet />, // Wrapping Shop and children
            children: [
              {
                path: "",
                element: <Shop />,
              },
              {
                path: ":id",
                element: <ProductDetail />,
              },
            ],
          },
          {
            path: "cart",
            element: <Outlet />,
            children: [
              {
                path: "",
                element: <Cart />,
              },
            ],
          },
          {
            path: "about",
            element: <Outlet />,
            children: [
              {
                path: "",
                element: <About />,
              },
            ],
          },
          {
            path: "contact",
            element: <Outlet />,
            children: [
              {
                path: "",
                element: <Contact />,
              },
            ],
          },
          {
            path: "search",
            element: <Outlet />,
            children: [
              {
                path: "",
                element: <Search />,
              },
            ],
          },
          {
            path: "checkout",
            element: <Outlet />,
            children: [
              {
                path: "",
                element: <Checkout />,
              },
            ],
          },
          {
            path: "order",
            element: <Outlet />,
            children: [
              {
                path: "",
                element: <Order />,
              },
              {
                path: ":id",
                element: <OrderDetail />,
              },
            ],
          },
        ],
      },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          {
            path: "",
            element: <>Welcome to admin dashboard</>,
          },
          {
            path: "user",
            element: <User />,
          },
          {
            path: "role",
            element: <Role />,
          },
          {
            path: "product",
            element: <Product />,
          },
          {
            path: "category",
            element: <Category />,
          },
          {
            path: "tags",
            element: <Tags />,
          },
          {
            path: "order",
            element: <AdminOrderPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <AuthContainer />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
