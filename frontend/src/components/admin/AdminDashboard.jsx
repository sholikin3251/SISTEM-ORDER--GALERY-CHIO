import React, { useState } from "react";
import BuketPage from "./BuketPage";
import {
  Bars3Icon,
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("BuketPage");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // Fungsi untuk mengubah komponen aktif
  const handleSetActiveComponent = (component) => {
    setActiveComponent(component);
  };

  // Fungsi untuk toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Konten utama */}
      <div className="flex-1 p-8 overflow-y-auto bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {activeComponent === "BuketPage"
            ? "Manage Buket Products"
            : "Admin Settings"}
        </h1>
        <div className="p-4 bg-white rounded-lg shadow-md">
          {/* Konten dinamis berdasarkan komponen aktif */}
          {activeComponent === "BuketPage" && <BuketPage />}
          {/* Tambahkan komponen lain seperti AdminSettings jika diperlukan */}
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white text-white border transition-all duration-300 flex flex-col ml-auto relative`}
      >
        {/* Sidebar Toggle */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 p-2 bg-gray-700 rounded-full text-white"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>

        {/* Sidebar Header */}
        <div
          className={`text-purple-500 text-2xl font-bold mb-6 ${
            isSidebarOpen ? "text-start px-4" : "text-center"
          }`}
        >
          {isSidebarOpen ? "Admin Dashboard" : "AD"}
        </div>

        {/* Sidebar Menu */}
        <div className="flex flex-col space-y-4 px-2">
          <button
            onClick={() => handleSetActiveComponent("BuketPage")}
            className={`flex items-center space-x-2 text-lg text-purple-500 py-2 px-4 rounded-md font-bold ${
              activeComponent === "BuketPage"
                ? "bg-purple-200"
                : "hover:bg-purple-100"
            }`}
          >
            <Squares2X2Icon className="h-6 w-6" />
            {isSidebarOpen && <span>Produk List</span>}
          </button>

          <button
            onClick={() => handleSetActiveComponent("adminSettings")}
            className={`flex items-center space-x-2 text-lg text-purple-500 py-2 px-4 rounded-md font-bold ${
              activeComponent === "adminSettings"
                ? "bg-purple-200"
                : "hover:bg-purple-100"
            }`}
          >
            <Cog6ToothIcon className="h-6 w-6" />
            {isSidebarOpen && <span>Admin Settings</span>}
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              window.location.href = "/";
            }}
            className="flex items-center space-x-2 text-lg py-2 px-4 bg-red-600 rounded-md hover:bg-red-700"
          >
            <ArrowLeftOnRectangleIcon className="h-6 w-6" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
