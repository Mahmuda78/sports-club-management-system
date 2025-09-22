import React, { useState, use } from "react";
import { NavLink, Link } from "react-router";

import logo from "../../assets/logo.png";
import { AuthContext } from "../../Provider/AuthContext/AuthContext";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const [open, setOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => console.log("User logged out"))
      .catch((err) => console.error(err));
  };

  // Navbar Links
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "font-bold border-b-2 border-purple-800"
              : "hover:border-b-2 border-purple-800 hover:font-bold"
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
              ? "border-b-2 border-purple-800 font-bold"
              : "hover:border-b-2 border-purple-800 hover:font-bold"
          }
        >
          Courts
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-gradient-to-r from-black via-gray-900 to-black text-white shadow-sm px-4">
      {/* Navbar Start (Dropdown for small screen) */}
      <div className="navbar-start">
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
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 text-black rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost normal-case text-xl flex items-center gap-2"
        >
          <img src={logo} alt="logo" className="mb-4 h-8" />
          <p className="hidden font-bold lg:block">
            <span className="">Sports</span>
            <span className="">Club</span>
          </p>
        </Link>
      </div>

      {/* Navbar Middle (for large screen) */}
      <div className="hidden lg:flex navbar-center">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {!user ? (
          <div className="flex gap-2">
            <NavLink to="/login" className="btn border-2 border-purple-800">
              Login
            </NavLink>
            
          </div>
        ) : (
          <div className="relative">
            
            {/* Profile image */}
            <img
              src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-purple-800"
              onClick={() => setOpen(!open)}
            />

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-3 bg-[#8f33ff] rounded-lg shadow-lg border-2 border-purple-400 z-50">
                <div className="px-4 py-2 font-medium">
                  <p>{user.displayName}</p>
                  <p>{user.email}</p>
                </div>
                <Link
                  to="/dashboard"
                  className="block pl-4 py-2 hover:bg-gray-800 font-semibold"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogOut();
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-800 font-semibold"
                >
                  Logout
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
