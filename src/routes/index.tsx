import { createBrowserRouter } from "react-router";
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
import HomeLayout from "../modules/main/layouts/HomeLayout";
import Main from "../modules/main/pages/Main";
import Shop from "../modules/main/modules/shop/pages/Shop";
import ProductDetail from "../modules/main/modules/shop/pages/ProductDetail";
import ShopLayout from "../modules/main/modules/shop/layouts/ShopLayout";

export const browserRouters = createBrowserRouter([
  {
    path: "/",
    element: <AppContainer />,
    children: [
      {
        path: "",
        element: <HomeLayout />,
        children: [
          {
            path: "",
            element: <Main />,
          },
          {
            path: "shop",
            element: <ShopLayout />, // Wrapping Shop and children
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
