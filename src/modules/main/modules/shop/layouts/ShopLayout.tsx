import React from "react";
import Breadcrumb from "../../../../../components/Breadcumb";
import { Outlet } from "react-router";

const ShopLayout = () => {
  return (
    <>
      <Breadcrumb />
      <Outlet />
    </>
  );
};

export default ShopLayout;
