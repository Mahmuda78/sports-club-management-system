import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion, AnimatePresence } from "framer-motion";

const AnnouncementsAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [announcements, setAnnouncements] = useState([]);
  const [newText, setNewText] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch announcements
  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/announcements");
      setAnnouncements(res.data.sort((a, b) => new Date(b.postAt) - new Date(a.postAt)));
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch announcements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Add new announcement
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newText.trim()) return toast.error("Announcement cannot be empty");

    try {
      const postData = { text: newText, postAt: new Date().toISOString() };
      const res = await axiosSecure.post("/announcements", postData);
      toast.success("Announcement added!");
      setNewText("");
      setAnnouncements((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add announcement");
    }
  };

  // Delete announcement
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) return;
    try {
      await axiosSecure.delete(`/announcements/${id}`);
      setAnnouncements((prev) => prev.filter((a) => a._id !== id));
      toast.success("Announcement deleted!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete announcement");
    }
  };

  if (loading)
    return <p className="text-center py-10 text-lg text-gray-600 animate-pulse">Loading announcements...</p>;

  return (
    <div className="p-6 bg-gray-50 rounded-2xl shadow-xl max-w-4xl mx-auto">
      {/* Add Form */}
      <form onSubmit={handleAdd} className="mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Write a new announcement..."
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition shadow-lg"
        >
          Add
        </button>
      </form>

      {/* List of Announcements */}
      {announcements.length === 0 ? (
        <p className="text-center text-gray-400 italic">No announcements found.</p>
      ) : (
        <ul className="space-y-4">
          <AnimatePresence>
            {announcements.map((a) => (
              <motion.li
                key={a._id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <div>
                  <p className="text-gray-800 font-medium">{a.text}</p>
                  <p className="text-gray-400 text-xs mt-1">
                    {new Date(a.postAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(a._id)}
                  className="text-red-500 hover:text-red-600 font-semibold"
                >
                  Delete
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
};

export default AnnouncementsAdmin;
