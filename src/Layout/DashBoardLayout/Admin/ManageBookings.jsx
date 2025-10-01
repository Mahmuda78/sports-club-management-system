import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["pendingBookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings?status=pending");
      return res.data;
    },
  });

  const handleApprove = async (booking) => {
    try {
      await axiosSecure.patch(`/bookings/${booking._id}`, {
        status: "approved",
        email: booking.userEmail,
      });
      toast.success("Booking approved!");
      queryClient.invalidateQueries(["pendingBookings"]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to approve booking");
    }
  };

  const handleReject = async (bookingId) => {
    try {
      await axiosSecure.delete(`/bookings/${bookingId}`);
      toast.success("Booking rejected!");
      queryClient.invalidateQueries(["pendingBookings"]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to reject booking");
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading bookings...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Bookings</h2>

      {bookings.length === 0 && <p>No pending bookings.</p>}

      <div className="grid md:grid-cols-2 gap-6">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="p-4 rounded-xl shadow-lg border bg-white"
          >
            <p>
              <span className="font-semibold">User:</span> {b.userEmail}
            </p>
            <p>
              <span className="font-semibold">Court:</span> {b.courtTitle} ({b.courtType})
            </p>
            <p>
              <span className="font-semibold">Date:</span> {b.date}
            </p>
            <p>
              <span className="font-semibold">Slots:</span> {b.slots.join(", ")}
            </p>
            <p>
              <span className="font-semibold">Price:</span> ${b.totalPrice}
            </p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => handleApprove(b)}
                className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(b._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBookings;
