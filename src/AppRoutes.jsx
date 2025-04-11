import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// components
import App from "./App.jsx";
import Cart from "./Cart.jsx";

const AppRoutes = () => {
  return (
    <Router>
      <div className="h-25 border border-gray-300 mx-2 rounded-md">
        <nav className="flex gap-8 justify-end pr-8 pt-8 text-xl">
          <div className=" w-16 text-center bg-yellow-400 cursor-pointer">
            <Link className="text-white-200" to="/">
              Home
            </Link>
          </div>
          <div className=" w-16 text-center bg-yellow-400 cursor-pointer">
            <Link className="" to="/cart">
              Cart
            </Link>
          </div>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cart" element={<Cart />} />

        {/* fallback route - 404 */}
        <Route path="*" element={<span>Not found</span>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
