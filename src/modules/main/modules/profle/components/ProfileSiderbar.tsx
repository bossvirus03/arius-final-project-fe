import { Link, useLocation } from "react-router";

function ProfileSidebar() {
  const location = useLocation(); // Get the current route path

  // Helper function to check active path
  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-1/5 bg-white border-r">
      <div className="p-6 text-center">
        <h2 className="text-lg font-semibold">My Account</h2>
        <button className="mt-4 text-sm text-blue-500">Edit Profile</button>
      </div>
      <ul className="space-y-3 text-gray-700">
        <li
          className={`px-6 py-3 font-semibold ${
            isActive("/user/account/profile")
              ? "bg-gray-100"
              : "hover:bg-gray-100"
          }`}
        >
          <Link to="/user/account/profile">Profile</Link>
        </li>
        <li
          className={`px-6 py-3 ${
            isActive("/user/account/profile/bank")
              ? "bg-gray-100 font-semibold"
              : "hover:bg-gray-100"
          }`}
        >
          <Link to="/user/account/profile/bank">Bank</Link>
        </li>
        <li
          className={`px-6 py-3 ${
            isActive("/user/account/profile/address")
              ? "bg-gray-100 font-semibold"
              : "hover:bg-gray-100"
          }`}
        >
          <Link to="/user/account/profile/address">Address</Link>
        </li>
        <li
          className={`px-6 py-3 ${
            isActive("/user/account/profile/change-password")
              ? "bg-gray-100 font-semibold"
              : "hover:bg-gray-100"
          }`}
        >
          <Link to="/user/account/profile/change-password">
            Change Password
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default ProfileSidebar;
