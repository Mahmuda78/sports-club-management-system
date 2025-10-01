import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import useAxiosSecure from "../hooks/useAxiosSecure";


const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch all users
  useEffect(() => {
    axiosSecure
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, [axiosSecure]);

  // Filter by name/email
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        All Users
      </h2>

      {/* Search Box */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-xl shadow focus:ring-2 focus:ring-indigo-400 outline-none"
        />
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white shadow-xl rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <img
              src={user.image || "https://via.placeholder.com/100"}
              alt={user.name}
              className="w-20 h-20 rounded-full border-4 border-indigo-200 object-cover"
            />
            <h3 className="mt-4 text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FaUserAlt className="text-indigo-500" /> {user.name}
            </h3>
            <p className="text-gray-500 text-sm">{user.email}</p>
            <span
              className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                user.role === "admin"
                  ? "bg-red-100 text-red-600"
                  : user.role === "member"
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {user.role || "user"}
            </span>
          </motion.div>
        ))}
      </div>

      {/* No Users */}
      {filteredUsers.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No users found 😔</p>
      )}
    </div>
  );
};

export default AllUsers;
