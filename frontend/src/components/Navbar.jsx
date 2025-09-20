import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { cartCount } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  const handleChange = (e) => setSearchTerm(e.target.value);
  const clearSearch = () => setSearchTerm("");

  return (
    <nav className="bg-[#2F4F4F] text-white p-4 shadow-lg">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4">
        <Link to="/" className="flex items-center text-2xl font-bold">
          <img src="./src/assets/images/logo.png" alt="Logo" className="w-10 h-10 mr-2 rounded-full" />
          StepUp
        </Link>

        {/* Search */}
        <div className="relative w-full md:w-1/2 lg:w-1/4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search..."
            className="w-full bg-white text-black rounded-full py-2 pl-10 pr-10 focus:outline-none"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">🔍</span>
          {searchTerm && (
            <span onClick={clearSearch} className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">✖</span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>

          {user?.loggedIn ? (
            <button onClick={logout} className="hover:underline">Logout</button>
          ) : (
            <Link to="/login" className="hover:underline">Login</Link>
          )}

        <Link to="/cart" className="relative">
          🛒
          {cartCount > 0 && (
            <span
              className="absolute -top-3 -right-3 bg-red-500 text-white text-md font-bold rounded-full px-2 py-1 shadow-md"
            >
              {cartCount}
            </span>
          )}
        </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
