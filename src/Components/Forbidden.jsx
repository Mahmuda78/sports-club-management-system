import React from "react";
import { Link } from "react-router";
import { FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-100 via-pink-200 to-red-300 text-center p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-2xl p-10 max-w-md"
      >
        <motion.div
          initial={{ rotate: -20 }}
          animate={{ rotate: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="flex justify-center"
        >
          <FaLock className="text-red-500 text-8xl mb-6" />
        </motion.div>

        <h1 className="text-5xl font-extrabold text-red-600 mb-4 drop-shadow-lg">
          403
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Access Forbidden
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Sorry, you don’t have permission to view this page.  
          Please contact the administrator if you think this is a mistake.
        </p>

        <Link
          to="/"
          className="inline-block bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          ⬅ Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default Forbidden;
