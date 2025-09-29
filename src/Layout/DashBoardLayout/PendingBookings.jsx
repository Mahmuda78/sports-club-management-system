import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";


const PendingBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch pending bookings for the logged-in user
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["pendingBookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings?userEmail=${user.email}&status=pending`
      );
      return res.data;
    },
    enabled: !!user?.email, // fetch only if user exists
  });

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await axiosSecure.delete(`/bookings/${bookingId}`);
      toast.success("Booking cancelled!");
      queryClient.invalidateQueries(["pendingBookings", user.email]); // refresh bookings
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel booking");
    }
  };

  if (isLoading) {
    return <p className="text-center py-10">Loading pending bookings...</p>;
  }

  if (bookings.length === 0) {
    return (
      <p className="text-center py-10 text-gray-600 text-lg">
        🎉 No pending bookings.
      </p>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent text-center">
        Pending Bookings
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="p-6 rounded-2xl shadow-lg border border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 hover:shadow-xl transition-all duration-300"
          >
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold text-purple-700">Court:</span>{" "}
                {booking.courtType}
              </p>
              <p>
                <span className="font-semibold text-purple-700">Date:</span>{" "}
                {booking.date}
              </p>
              <p>
                <span className="font-semibold text-purple-700">Slots:</span>{" "}
                {booking.slots.join(", ")}
              </p>
              <p>
                <span className="font-semibold text-purple-700">Total:</span> $
                {booking.totalPrice}
              </p>
              <p>
                <span className="font-semibold text-purple-700">Status:</span>{" "}
                <span className="px-2 py-1 rounded-lg bg-yellow-100 text-yellow-800 text-sm font-medium">
                  {booking.status}
                </span>
              </p>
            </div>

            <div className="mt-6 flex justify-end">
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

export default PendingBookings;
