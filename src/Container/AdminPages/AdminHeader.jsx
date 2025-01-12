"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { LucideSearch, LucideX, LucideUserPlus } from "lucide-react";

const AdminHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <motion.header
      className="bg-secondary text-textColor shadow-lg px-4 py-2 flex items-center justify-between"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full">
          <span className="font-bold text-lg">Logo</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative flex-1 mx-4 max-w-md">
        <LucideSearch
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          size={20}
        />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white text-black py-2 pl-10 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500"
          >
            <LucideX size={20} />
          </button>
        )}
      </div>

      {/* Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
      >
        <LucideUserPlus size={20} />
        <span>Customer</span>
      </motion.button>
    </motion.header>
  );
};

export default AdminHeader;
