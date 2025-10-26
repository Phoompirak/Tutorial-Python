"use client";

import React from "react";
import { FaHome, FaUser, FaCog, FaTimes } from "react-icons/fa";
import { FaHamburger } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const items = [
  { label: "Home", icon: <FaHome />, href: "/" },
  { label: "Profile", icon: <FaUser />, href: "/profile" },
  { label: "Settings", icon: <FaCog />, href: "/settings" },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white p-4 transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"} w-64 flex flex-col`}
      >
        {/* Close Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={onClose}
            className="text-xl text-gray-300 hover:text-white focus:outline-none"
          >
            <FaHamburger />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-4">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-colors"
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
