import React, { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router";
import Modal from "react-modal";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

Modal.setAppElement("#root");

const CourtsPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [previewSlots, setPreviewSlots] = useState({});
  const [blockedSlots, setBlockedSlots] = useState({}); // already booked slots

  // Fetch courts
  const { data: courts = [], isLoading: courtsLoading } = useQuery({
    queryKey: ["courts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/courts");
      return res.data;
    },
  });

  // Fetch all bookings to block already booked slots
  useQuery({
    queryKey: ["allBookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings");
      return res.data;
    },
    enabled: !!user?.accessToken, // only if user is logged in
    onSuccess: (data) => {
      const blocked = {};
      data.forEach((b) => {
        if (!blocked[b.courtId]) blocked[b.courtId] = {};
        if (!blocked[b.courtId][b.date]) blocked[b.courtId][b.date] = [];
        blocked[b.courtId][b.date].push(...b.slots);
      });
      setBlockedSlots(blocked);
    },
  });

  // Handle slot selection on cards
  const handleSlotChangeCard = (courtId, selected) => {
    setPreviewSlots((prev) => ({
      ...prev,
      [courtId]: selected.map((s) => s.value),
    }));
  };

  // "Book Now" button
  const handleBookNow = (court) => {
    if (!user) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }
    setSelectedCourt(court);
    setSelectedSlots(previewSlots[court._id] || []);
    setSelectedDate("");
  };

  // Slot selection inside modal
  const handleSlotChangeModal = (selected) => {
    setSelectedSlots(selected.map((s) => s.value));
  };

  // Confirm booking
  const handleBooking = async () => {
    if (!selectedCourt) return toast.error("Select a court");
    if (!selectedDate) return toast.error("Select a date");
    if (!selectedSlots.length) return toast.error("Select slot(s)");
    if (!user?.uid || !user?.email) return toast.error("Login first!");

    const payload = {
  userId: user.uid,
  userEmail: user.email,
  courtId: selectedCourt._id,
  courtTitle: selectedCourt.title || selectedCourt.type, // depending on your court object
  courtType: selectedCourt.type,
  date: selectedDate,
  slots: selectedSlots,
  price: selectedCourt.price, // price per session
  totalPrice: selectedSlots.length * selectedCourt.price,
  status: "pending",
};


    // console.log("Booking payload:", payload);

    try {
      await axiosSecure.post("/bookings", payload);
      toast.success("Booking request sent! Pending approval.");
      setSelectedCourt(null);
      setSelectedSlots([]);
      setSelectedDate("");
    } catch (error) {
      console.error(error.response?.data || error);
      toast.error("Booking failed. Check console for details.");
    }
  };

  if (courtsLoading) {
    return <p className="text-center py-10">Loading courts...</p>;
  }

  return (
    <div className="bg-gradient-to-r from-black via-gray-800 to-gray-600 text-white grid md:grid-cols-3 gap-6 p-6">
      {courts.map((court) => (
        <div
          key={court._id}
          className="border-2 bg-gradient-to-r from-black to-purple-800 border-purple-400 rounded-2xl shadow-md overflow-hidden p-4"
        >
          <img
            src={court.image}
            alt={court.type}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <h2 className="text-xl font-semibold">{court.type}</h2>
          <p>Price per session: ${court.price}</p>

          <label className="block mb-2 mt-2">Select Slots</label>
          <Select
            isMulti
            options={court.slots.map((slot) => ({
              value: slot,
              label: slot,
              isDisabled:
                blockedSlots[court._id]?.[selectedDate]?.includes(slot),
            }))}
            onChange={(selected) => handleSlotChangeCard(court._id, selected)}
            value={(previewSlots[court._id] || []).map((slot) => ({
              value: slot,
              label: slot,
            }))}
            placeholder="Select slots..."
            menuPortalTarget={document.body}
            menuPlacement="auto"
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              container: (base) => ({ ...base, width: "100%" }),
            }}
          />

          <button
            onClick={() => handleBookNow(court)}
            className="mt-4 w-full btn border border-purple-300 btn-outline bg-gradient-to-r from-purple-800 to-indigo-500 text-white py-2.5 rounded-xl shadow-md hover:scale-[1.02] transition-all duration-300 font-medium"
          >
            Book Now
          </button>
        </div>
      ))}

      {/* Booking Modal */}
      <Modal
        isOpen={!!selectedCourt}
        onRequestClose={() => {
          setSelectedCourt(null);
          setSelectedSlots([]);
          setSelectedDate("");
        }}
        className="bg-white max-w-lg mx-auto mt-20 rounded-xl p-6 shadow-lg"
        overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-start"
      >
        {selectedCourt && (
          <>
            <h2 className="text-2xl font-bold mb-4">
              Book {selectedCourt.type}
            </h2>

            <p className="text-gray-700 mb-2">Court: {selectedCourt.type}</p>
            <p className="text-gray-700 mb-2">
              Price per session: ${selectedCourt.price}
            </p>

            <label className="block mb-2 text-gray-600">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border w-full p-2 rounded-lg mb-4"
            />

            <label className="block mb-2 text-gray-600">Select Slots</label>
            <Select
              isMulti
              options={selectedCourt.slots.map((slot) => ({
                value: slot,
                label: slot,
                isDisabled:
                  blockedSlots[selectedCourt._id]?.[selectedDate]?.includes(
                    slot
                  ),
              }))}
              onChange={handleSlotChangeModal}
              value={selectedSlots.map((slot) => ({ value: slot, label: slot }))}
              placeholder="Select slots..."
            />

            <p className="mt-4 text-lg font-semibold">
              Total: ${selectedSlots.length * selectedCourt.price}
            </p>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  setSelectedCourt(null);
                  setSelectedSlots([]);
                  setSelectedDate("");
                }}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-md hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300"
              >
                Confirm Booking
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default CourtsPage;
