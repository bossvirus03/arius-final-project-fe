import React from "react";

function Address() {
  return (
    <div className="w-full max-w-4xl p-6 bg-white rounded-md shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">My Address</h1>
        <button className="px-4 py-2 text-white rounded-md bg-gold-500 hover:bg-gold-600">
          + Add New Address
        </button>
      </div>

      {/* Address Section */}
      <div className="pt-4 border-t">
        <h2 className="mb-2 text-lg font-medium">Address</h2>
        <div className="flex justify-between p-4 border rounded-md shadow-sm">
          <div>
            <p className="font-medium">
              loi ng <span className="text-gray-500">(+84) 389 469 601</span>
            </p>
            <p className="text-gray-600">
              521/111 Đường Cổ Nhuế
              <br />
              Phường Cổ Nhuế 2, Quận Bắc Từ Liêm, Hà Nội
            </p>
            <span className="inline-block px-2 py-1 mt-2 text-xs bg-red-100 rounded text-gold-600">
              Default
            </span>
          </div>

          <div className="flex flex-col items-end space-y-2">
            <a href="#" className="text-blue-500 hover:underline">
              Update
            </a>
            <a href="#" className="text-blue-500 hover:underline">
              Delete
            </a>
            <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100">
              Set Default
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Address;
