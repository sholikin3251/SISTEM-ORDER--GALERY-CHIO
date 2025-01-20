import React, { useState, useEffect } from "react";
import AddBuketModal from "./AddBuket";
import BuketList from "./BuketList";
import {
  getAllBukets,
  addBuket,
  deleteBuket,
  updateBuket,
} from "../../api/buketApi";

const BuketCrud = () => {
  const [bukets, setBukets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBuket, setEditingBuket] = useState(null);

  useEffect(() => {
    fetchBukets();
  }, []);

  const fetchBukets = async () => {
    try {
      const data = await getAllBukets();
      setBukets(data);
    } catch (err) {
      console.error("Failed to fetch bukets.", err);
    }
  };

  const handleAddBuket = async (buketData, image) => {
    try {
      const newBuket = await addBuket(buketData, image);
      setBukets([...bukets, newBuket]);
    } catch (err) {
      console.error("Failed to add buket.", err);
    }
  };

  const handleEditBuket = (buket) => {
    setEditingBuket(buket); // Set editingBuket to the buket you're editing
    setIsModalOpen(true); // Open the modal for editing
  };

  const handleUpdateBuket = async (buketData, image) => {
    try {
      const updatedBuket = await updateBuket(
        editingBuket._id,
        buketData,
        image || editingBuket.image
      );

      setBukets(
        bukets.map((buket) =>
          buket._id === updatedBuket._id ? updatedBuket : buket
        )
      );

      setIsModalOpen(false); // Close the modal after update
      setEditingBuket(null); // Clear the editing state
    } catch (err) {
      console.error("Failed to update buket.", err);
    }
  };

  const handleDeleteBuket = async (id) => {
    try {
      await deleteBuket(id);
      setBukets(bukets.filter((buket) => buket._id !== id));
    } catch (err) {
      console.error("Failed to delete buket.", err);
    }
  };

  return (
    <div className="w-full mx-auto mb-6">
      {/* Button to add a new buket */}
      <div className="mb-6">
        <button
          onClick={() => {
            setEditingBuket(null); // Ensure editingBuket is set to null before opening the modal
            setIsModalOpen(true); // Open the modal for adding a new buket
          }}
          className="py-2 px-4 bg-purple-600 text-white font-bold rounded hover:bg-purple-700"
        >
          Add Buket
        </button>
      </div>

      {/* List of bukets */}
      <BuketList
        bukets={bukets}
        onEdit={handleEditBuket} // Pass the edit handler
        onDelete={handleDeleteBuket} // Pass the delete handler
      />

      {/* Modal to add or edit buket */}
      <AddBuketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close the modal
        onAddBuket={editingBuket ? handleUpdateBuket : handleAddBuket} // Use the correct function depending on whether it's add or edit
        buketToEdit={editingBuket} // Pass the buket to edit, if editing
      />
    </div>
  );
};

export default BuketCrud;
