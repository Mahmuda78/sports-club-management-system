import React from 'react';
import logo from '../assets/logo.png'
import { Link } from 'react-router';
const Logo = () => {
    return (
        <div>
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
    );
};

export default Logo;