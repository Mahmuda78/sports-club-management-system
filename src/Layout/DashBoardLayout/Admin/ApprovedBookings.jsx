import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const ApprovedBookings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch approved bookings
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["approvedBookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?status=approved&userEmail=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Cancel booking
  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await axiosSecure.delete(`/bookings/${bookingId}`);
      toast.success("Booking cancelled!");
      queryClient.invalidateQueries(["approvedBookings", user.email]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel booking.");
    }
  };

  // Payment redirect
  const handlePayment = (bookingId) => {
    navigate(`/payment/${bookingId}`);
  };

  if (isLoading)
    return <p className="text-center py-10">Loading approved bookings...</p>;

  if (bookings.length === 0)
    return <p className="text-center py-10 text-gray-600">No approved bookings.</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Approved Bookings
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="p-6 rounded-2xl shadow-lg border border-indigo-200 bg-indigo-50 hover:shadow-xl transition-all duration-300"
          >
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold text-indigo-700">Court:</span>{" "}
                {booking.courtType}
              </p>
              <p>
                <span className="font-semibold text-indigo-700">Date:</span>{" "}
                {booking.date}
              </p>
              <p>
                <span className="font-semibold text-indigo-700">Slots:</span>{" "}
                {booking.slots.join(", ")}
              </p>
              <p>
                <span className="font-semibold text-indigo-700">Price per session:</span> $
                {booking.price}
              </p>
              <p>
                <span className="font-semibold text-indigo-700">Total:</span> $
                {booking.totalPrice}
              </p>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => handlePayment(booking._id)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-medium shadow-md hover:from-green-600 hover:to-green-700 transform hover:scale-[1.02] transition-all duration-300"
              >
                Pay
              </button>
              <button
                onClick={() => handleCancel(booking._id)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium shadow-md hover:from-red-600 hover:to-pink-700 transform hover:scale-[1.02] transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovedBookings;
