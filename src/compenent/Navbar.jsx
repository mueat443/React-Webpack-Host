import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/ais.png";
import { goToPage } from "../utils/FlutterRoute"; 
import { useNavigation } from "../context/NavigationProvider ";


const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); 
  const { isNavigatedFromOtherPage, setIsNavigatedFromOtherPage, previousPages, setPreviousPages } =
  useNavigation();
  const toggleMenu = () => {
    setIsOpen(!isOpen); 
  };

  return (
    <nav className="font-kanit relative">
      <div className="container mx-auto flex justify-between items-center p-4">
        <img src={logo} alt="MyApp Logo" className="h-10" />

        <button onClick={toggleMenu} className="text-white focus:outline-none">
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

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 bg-green-500 shadow-lg z-10 rounded-md mr-10">
          <button
            onClick={() => {
              navigate("/coreLan");
              setIsOpen(false); 
            }}
            className="block w-full text-left text-white px-4 py-2"
          >
            Core
          </button>
          <button
            onClick={() => {
              navigate("/product");
              setIsOpen(false);
            }}
            className="block w-full text-left text-white px-4 py-2"
          >
            Product
          </button>
          <button
            onClick={() => {
              navigate("/profile");
              setIsOpen(false);
            }}
            className="block w-full text-left text-white px-4 py-2"
          >
            Profile
          </button>
          <button
            onClick={() => {
              navigate("/language");
              setIsOpen(false); 
            }}
            className="block w-full text-left text-white px-4 py-2"
          >
            Language
          </button>
          <button
            onClick={() => {
              goToPage("/bloc-multi",setPreviousPages,navigate);
              setIsOpen(false); 
            }}
            className="block w-full text-left text-white px-4 py-2"
          >
            Bloc
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
