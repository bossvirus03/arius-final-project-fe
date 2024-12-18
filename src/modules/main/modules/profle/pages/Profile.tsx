import React, { useEffect } from "react";
import { useAppStore } from "../../../../../store/app.store";

function Profile() {
  const { userData } = useAppStore();
  useEffect(() => {}, [userData]);
  return (
    <main className="flex-1 p-8 bg-white rounded-lg shadow-md">
      <h1 className="mb-6 text-2xl font-bold">My Profile</h1>
      <p className="mb-4 text-gray-500">
        Manage your account security and profile information
      </p>

      <div className="grid grid-cols-2 gap-8">
        {/* Profile Form */}
        <div>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-600">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
                value={userData.username}
                disabled
              />
            </div>
            <div>
              <label className="block text-gray-600">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
                defaultValue={userData.firstName + " " + userData.lastName}
              />
            </div>
            <div>
              <label className="block text-gray-600">Email</label>
              <div className="flex items-center">
                <input
                  type="email"
                  className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
                  defaultValue={userData.email}
                  disabled
                />
                <button className="ml-3 text-blue-500">Change</button>
              </div>
            </div>
            <div>
              <label className="block text-gray-600">Phone Number</label>
              <div className="flex items-center">
                <input
                  type="text"
                  className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
                  defaultValue={userData.phone}
                  disabled
                />
                <button className="ml-3 text-blue-500">Change</button>
              </div>
            </div>
            <div>
              <label className="block text-gray-600">Date of Birth</label>
              <div className="flex mt-1 space-x-4">
                <select className="w-1/3 p-2 border border-gray-300 rounded-lg">
                  <option>Day</option>
                  <option>1</option>
                  <option>2</option>
                </select>
                <select className="w-1/3 p-2 border border-gray-300 rounded-lg">
                  <option>Month</option>
                  <option>January</option>
                  <option>February</option>
                </select>
                <select className="w-1/3 p-2 border border-gray-300 rounded-lg">
                  <option>Year</option>
                  <option>1990</option>
                  <option>1991</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-24 p-2 text-white rounded-lg bg-gold-500 hover:bg-gold-600"
            >
              Save
            </button>
          </form>
        </div>

        {/* Profile Picture */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-32 h-32 mb-4 bg-gray-200 rounded-full">
            <span className="text-gray-400">No Image</span>
          </div>
          <button className="p-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100">
            Choose Image
          </button>
          <p className="mt-2 text-xs text-gray-500">
            Max size 1MB, JPEG or PNG only.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Profile;
