import React, { useState, useContext } from "react";
import { NavLink, Link } from "react-router";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../Provider/AuthContext/AuthContext";
import { RxDashboard } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => console.log("User logged out"))
      .catch((err) => console.error(err));
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "font-bold border-b-2 border-purple-800"
              : "hover:border-b-2 border-purple-800 hover:font-bold transition-all duration-300"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/courts"
          className={({ isActive }) =>
            isActive
              ? "font-bold border-b-2 border-purple-800"
              : "hover:border-b-2 border-purple-800 hover:font-bold transition-all duration-300"
          }
        >
          Courts
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-gradient-to-r max-w-7xl mx-auto from-black via-gray-900 to-black text-white shadow-sm px-4 py-2 fixed w-full z-50">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow-lg bg-base-100 text-black rounded-lg w-52"
          >
            {navLinks}
          </ul>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="btn btn-ghost normal-case text-xl flex items-center gap-2"
        >
          <img src={logo} alt="logo" className="h-8 mb-4" />
          <p className="hidden lg:block font-bold">
            Sports <span className="text-purple-800">Club</span>
          </p>
        </Link>
      </div>

      {/* Navbar Center (desktop links) */}
      <div className="hidden lg:flex navbar-center">
        <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end relative">
        {!user ? (
          <NavLink
            to="/login"
            className="btn border-2 border-purple-800 bg-gradient-to-r from-purple-500 to-purple-800 text-white font-semibold hover:scale-105 transform transition-all duration-300"
          >
            Login
          </NavLink>
        ) : (
          <div className="relative">
            {/* Profile */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <p className="hidden md:block font-medium">{user.displayName}</p>
              <img
                src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-purple-800 hover:scale-105 transform transition-all duration-300"
              />
            </div>

            {/* Profile Dropdown */}
            {open && (
              <div className="absolute right-0 mt-3 w-56 bg-gradient-to-b from-purple-500 to-purple-800 text-white rounded-xl shadow-2xl border-2 border-purple-400 z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-purple-400">
                  <p className="font-semibold">{user.displayName}</p>
                  <p className="text-sm opacity-80">{user.email}</p>
                </div>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-purple-700 font-medium transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <RxDashboard size={22} /> Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogOut();
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 hover:bg-purple-700 font-medium transition-colors"
                >
                  <IoIosLogOut size={22} /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
