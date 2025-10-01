import React, { useEffect, useState } from "react";

import useAuth from "../hooks/useAuth"; 
import { motion } from "framer-motion";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ConfirmedBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); 

  useEffect(() => {
    if (!user?.email) return; 
    const fetchBookings = async () => {
      try {
        const res = await axiosSecure.get(
          `/api/bookings/confirmed?email=${user.email}`
        );
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [axiosSecure, user?.email]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">My Confirmed Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No confirmed bookings found.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-indigo-100 text-indigo-700">
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Court</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Slots</th>
                  <th className="px-4 py-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, i) => (
                  <tr key={b._id} className="border-b">
                    <td className="px-4 py-2">{i + 1}</td>
                    <td className="px-4 py-2 font-medium">{b.courtTitle}</td>
                    <td className="px-4 py-2">{new Date(b.date).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{b.slots.join(", ")}</td>
                    <td className="px-4 py-2">${b.totalPrice}</td>
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
                transition={{ duration: 0.3 }}
                className="bg-white shadow rounded-lg p-4"
              >
                <h3 className="font-semibold">{b.courtTitle}</h3>
                <p>Date: {new Date(b.date).toLocaleDateString()}</p>
                <p>Slots: {b.slots.join(", ")}</p>
                <p>Total Price: ${b.totalPrice}</p>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ConfirmedBookings;
