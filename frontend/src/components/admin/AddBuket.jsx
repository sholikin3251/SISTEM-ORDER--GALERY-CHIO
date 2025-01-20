import React, { useState, useEffect } from "react";

const AddBuketModal = ({ isOpen, onClose, onAddBuket, buketToEdit }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(true);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (buketToEdit) {
      setName(buketToEdit.name);
      setCategory(buketToEdit.category);
      setPrice(buketToEdit.price);
      setDescription(buketToEdit.description);
      setStock(buketToEdit.stock);
    } else {
      resetForm();
    }
  }, [buketToEdit, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const buketData = { name, category, price, description, stock };
    onAddBuket(buketData, image || buketToEdit?.image);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setName("");
    setCategory("");
    setPrice("");
    setDescription("");
    setStock(true);
    setImage(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-purple-600 mb-4">
          {buketToEdit ? "Edit Buket" : "Add Buket"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            >
              <option value="bunga">Buket Bunga</option>
              <option value="snack">Buket Snack</option>
              <option value="boneka">Buket Boneka</option>
              <option value="uang">Buket Uang</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Stock</label>
            <input
              type="checkbox"
              checked={stock}
              onChange={() => setStock(!stock)}
              className="mr-2"
            />
            In Stock
          </div>
          <div>
            <label className="block text-gray-700">Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              {buketToEdit ? "Update" : "Add"} Buket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBuketModal;
