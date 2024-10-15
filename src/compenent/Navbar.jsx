import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/ais.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State to control menu open/close

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle menu state
  };

  return (
    <nav className="font-kanit relative">
      <div className="container mx-auto flex justify-between items-center p-4">
        <img src={logo} alt="MyApp Logo" className="h-10" />

        {/* Hamburger Icon (always visible) */}
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {/* Hamburger Icon */}
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </svg>
        </button>
      </div>

      {/* Dropdown menu (absolute, small box from right) */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 bg-green-500 shadow-lg z-10 rounded-md mr-10">
          <button
            onClick={() => {
              navigate("/coreLan");
              setIsOpen(false); // Close menu after navigating
            }}
            className="block w-full text-left text-white px-4 py-2"
          >
            Core
          </button>
          <button
            onClick={() => {
              navigate("/product");
              setIsOpen(false); // Close menu after navigating
            }}
            className="block w-full text-left text-white px-4 py-2"
          >
            Product
          </button>
          <button
            onClick={() => {
              navigate("/profile");
              setIsOpen(false); // Close menu after navigating
            }}
            className="block w-full text-left text-white px-4 py-2"
          >
            Profile
          </button>
          <button
            onClick={() => {
              navigate("/language");
              setIsOpen(false); // Close menu after navigating
            }}
            className="block w-full text-left text-white px-4 py-2"
          >
            Language
          </button>
          <button
            onClick={() => {
              navigate("/provider");
              setIsOpen(false); // Close menu after navigating
            }}
            className="block w-full text-left text-white px-4 py-2"
          >
            Provider
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
