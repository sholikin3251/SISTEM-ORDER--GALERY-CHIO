import React from "react";

const BuketList = ({ bukets, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-gray-700 mb-6">List of Bukets</h3>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left text-gray-700">Name</th>
            <th className="px-4 py-2 text-left text-gray-700">Category</th>
            <th className="px-4 py-2 text-left text-gray-700">Price</th>
            <th className="px-4 py-2 text-left text-gray-700">Description</th>
            <th className="px-4 py-2 text-left text-gray-700">Image</th>
            <th className="px-4 py-2 text-left text-gray-700">Stock</th>
            <th className="px-4 py-2 text-center text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bukets.map((buket) => (
            <tr key={buket._id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2 text-gray-700">{buket.name}</td>
              <td className="px-4 py-2 text-gray-500">{buket.category}</td>
              <td className="px-4 py-2 text-gray-500">{buket.price}</td>
              <td className="px-4 py-2 text-gray-500">{buket.description}</td>
              <td className="px-4 py-2">
                <img
                  src={`http://localhost:5000${buket.image}`}
                  alt={buket.name}
                  className="w-28 h-28 object-cover rounded-md"
                />
              </td>
              <td className="px-4 py-2  text-gray-500">
                {buket.stock ? "Tersedia" : "Tidak Tersedia"}
              </td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => onEdit(buket)} // Kirim buket yang sedang diklik
                  className="py-1 px-3 bg-purple-500 text-white rounded hover:bg-purple-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(buket._id)}
                  className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BuketList;
