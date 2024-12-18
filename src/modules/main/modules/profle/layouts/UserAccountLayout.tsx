import React from "react";
import ProfileSiderbar from "../components/ProfileSiderbar";
import { Outlet } from "react-router";

function UserAccountLayout() {
  return (
    <div className="container flex min-h-screen bg-gray-100 gap-7">
      <ProfileSiderbar />
      <Outlet />
    </div>
  );
}

export default UserAccountLayout;
