import React, { useEffect, useState } from "react";

import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ManageBookingsConfirmedPaid = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure.get(
          `/api/bookings/confirmed-paid?search=${search}`
        );
        setBookings(res.data);
      } catch (err) {
        console.error(err);
        Swal.fire(
          "Error",
          "Failed to fetch confirmed bookings with payment",
          "error"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [search, axiosSecure]);

  if (loading)
    return <p className="text-center py-10 text-gray-500">Loading...</p>;

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
        Confirmed Bookings (Paid)
      </h2>

      {/* Search */}
      <div className="mb-6 flex justify-center">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search bookings by court title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 pl-10 border rounded-xl shadow focus:ring-2 focus:ring-indigo-400 outline-none text-gray-700 text-sm md:text-base"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400 text-sm md:text-base" />
        </div>
      </div>

      {/* Table */}
      <div className="hidden md:block overflow-x-auto bg-white shadow-2xl rounded-2xl">
        <table className="min-w-full text-sm md:text-base text-left text-gray-600">
          <thead className="bg-indigo-100 text-indigo-700 uppercase text-xs md:text-sm font-semibold">
            <tr>
              <th className="px-4 md:px-6 py-2 md:py-3">#</th>
              <th className="px-4 md:px-6 py-2 md:py-3">Court Title</th>
              <th className="px-4 md:px-6 py-2 md:py-3">Date</th>
              <th className="px-4 md:px-6 py-2 md:py-3">Price</th>
              <th className="px-4 md:px-6 py-2 md:py-3">Amount Paid</th>
              <th className="px-4 md:px-6 py-2 md:py-3">Coupon</th>
              <th className="px-4 md:px-6 py-2 md:py-3">Transaction ID</th>
              <th className="px-4 md:px-6 py-2 md:py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr key={b._id} className="border-b hover:bg-indigo-50 transition">
                <td className="px-4 md:px-6 py-2 md:py-4">{i + 1}</td>
                <td className="px-4 md:px-6 py-2 md:py-4 font-medium text-gray-900">
                  {b.courtTitle}
                </td>
                <td className="px-4 md:px-6 py-2 md:py-4">
                  {new Date(b.date).toLocaleDateString()}
                </td>
                <td className="px-4 md:px-6 py-2 md:py-4">${b.totalPrice}</td>
                <td className="px-4 md:px-6 py-2 md:py-4">${b.price ?? 0}</td>
                <td className="px-4 md:px-6 py-2 md:py-4">{b.coupon ?? "N/A"}</td>
                <td className="px-4 md:px-6 py-2 md:py-4">{b.transactionId ?? "N/A"}</td>
                <td className="px-4 md:px-6 py-2 md:py-4">
                  <span className="px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-green-100 text-green-600">
                    Paid
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {bookings.map((b, i) => (
          <motion.div
            key={b._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="bg-white shadow-lg rounded-xl p-4 space-y-2"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">{b.courtTitle}</h3>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
                Paid
              </span>
            </div>

            <p className="text-sm text-gray-700">
              <strong>Date:</strong> {new Date(b.date).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Price:</strong> ${b.price ?? 0} | <strong>Amount Paid:</strong> ${b.price ?? 0}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Coupon:</strong> {b.coupon ?? "N/A"}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Transaction ID:</strong> {b.transactionId ?? "N/A"}
            </p>
          </motion.div>
        ))}
      </div>

      {bookings.length === 0 && (
        <p className="text-center text-gray-500 py-6">
          No confirmed bookings with payment found 😔
        </p>
      )}
    </div>
  );
};

export default ManageBookingsConfirmedPaid;
