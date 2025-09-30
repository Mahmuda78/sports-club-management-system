import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageBookingsAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await axiosSecure.get("/bookings");
        // Only confirmed bookings
        const confirmed = res.data.filter(
          (b) => b.status?.toLowerCase() === "confirmed"
        );
        setBookings(confirmed);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch bookings.");
        toast.error("Booking fetch failed.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Filter by court title
  const filteredBookings = bookings.filter((b) =>
    b.courtTitle?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return <p className="text-center py-10 text-lg">Loading bookings...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!filteredBookings.length)
    return <p className="text-center py-10 text-gray-500">No bookings found.</p>;

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-lg">
      {/* Search */}
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          placeholder="Search by court title..."
          className="border rounded-lg px-3 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse text-sm">
          <thead>
            <tr className="bg-indigo-600 text-white uppercase text-xs tracking-wider">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Booking ID</th>
              <th className="px-4 py-2">Court Title</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Price (৳)</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((b, index) => (
              <tr
                key={b._id}
                className="bg-white hover:bg-indigo-50 transition-all duration-200"
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 font-mono text-gray-700">{b._id}</td>
                <td className="px-4 py-2 font-semibold text-gray-900">
                  {b.courtTitle}
                </td>
                <td className="px-4 py-2 text-gray-700">{b.userEmail}</td>
                <td className="px-4 py-2 text-indigo-600 font-medium">{b.price}</td>
                <td className="px-4 py-2 text-gray-500">
                  {new Date(b.date).toLocaleString()}
                </td>
                <td className="px-4 py-2">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold text-xs">
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookingsAdmin;
