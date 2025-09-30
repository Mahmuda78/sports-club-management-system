import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AdminManageBookings = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const approveBooking = useMutation({
    mutationFn: async (bookingId) => {
      return axiosSecure.patch(`/bookings/${bookingId}`, { status: "approved" });
    },
    onSuccess: () => {
      toast.success("Booking approved!");
      queryClient.invalidateQueries({ queryKey: ["pendingBookings"] });
    },
    onError: () => {
      toast.error("Failed to approve booking");
    },
  });

  const rejectBooking = useMutation({
    mutationFn: async (bookingId) => {
      return axiosSecure.patch(`/bookings/${bookingId}`, { status: "rejected" });
    },
    onSuccess: () => {
      toast.success("Booking rejected!");
      queryClient.invalidateQueries({ queryKey: ["pendingBookings"] });
    },
    onError: () => {
      toast.error("Failed to reject booking");
    },
  });

  return (
    <div>
      {/* Example buttons */}
      <button onClick={() => approveBooking.mutate("BOOKING_ID")}>Approve</button>
      <button onClick={() => rejectBooking.mutate("BOOKING_ID")}>Reject</button>
    </div>
  );
};

export default AdminManageBookings;
