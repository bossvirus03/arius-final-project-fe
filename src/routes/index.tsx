import React from "react";
import { createBrowserRouter, Outlet } from "react-router";
import UserAccountLayout from "../modules/main/modules/profle/layouts/UserAccountLayout";
import Address from "../modules/main/modules/profle/pages/Address";
import Bank from "../modules/main/modules/profle/pages/Bank";
import ChangePassword from "../modules/main/modules/profle/pages/ChangePassword";
const Profile = React.lazy(
  () => import("../modules/main/modules/profle/pages/Profile")
);
const AppContainer = React.lazy(() => import("../layouts/AppContainer"));
const AuthContainer = React.lazy(() => import("../layouts/AuthContainer"));
const Login = React.lazy(() => import("../modules/auth/pages/Login"));
const NotFound = React.lazy(() => import("../modules/not-found/NotFound"));
const Register = React.lazy(() => import("../modules/auth/pages/Register"));
const AdminLayout = React.lazy(
  () => import("../modules/admin/layouts/AdminLayout")
);
const User = React.lazy(() => import("../modules/admin/pages/User"));
const Role = React.lazy(() => import("../modules/admin/pages/Role"));
const Product = React.lazy(() => import("../modules/admin/pages/Product"));
const Category = React.lazy(() => import("../modules/admin/pages/Category"));
const Tags = React.lazy(() => import("../modules/admin/pages/Tags"));
const Main = React.lazy(() => import("../modules/main/pages/Main"));
const Shop = React.lazy(
  () => import("../modules/main/modules/shop/pages/Shop")
);
const ProductDetail = React.lazy(
  () => import("../modules/main/modules/shop/pages/ProductDetail")
);
const Cart = React.lazy(
  () => import("../modules/main/modules/cart/pages/Cart")
);
const About = React.lazy(
  () => import("../modules/main/modules/about/pages/About")
);
const Contact = React.lazy(
  () => import("../modules/main/modules/contact/pages/Contact")
);
const Checkout = React.lazy(
  () => import("../modules/main/modules/checkout/pages/Checkout")
);
const MainLayout = React.lazy(
  () => import("../modules/main/layouts/MainLayout")
);
const Search = React.lazy(
  () => import("../modules/main/modules/search/pages/Search")
);
const Order = React.lazy(
  () => import("../modules/main/modules/order/pages/Order")
);
const OrderDetail = React.lazy(
  () => import("../modules/main/modules/order/pages/OrderDetail")
);
const AdminOrderPage = React.lazy(
  () => import("../modules/admin/pages/AdminOrderPage")
);

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
            path: "/user/account/profile",
            element: <UserAccountLayout />,
            children: [
              {
                path: "",
                element: <Profile />,
              },
              {
                path: "address",
                element: <Address />,
              },
              {
                path: "bank",
                element: <Bank />,
              },
              {
                path: "change-password",
                element: <ChangePassword />,
              },
            ],
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
