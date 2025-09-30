import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageAnnouncements = () => {
  const axiosSecure = useAxiosSecure();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Fetch announcements
  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/announcements");
      setAnnouncements(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch announcements.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Add announcement
  const handleAdd = async () => {
    if (!newAnnouncement.trim()) return toast.error("Enter announcement text.");
    try {
      const data = { text: newAnnouncement, postAt: new Date().toISOString() };
      await axiosSecure.post("/announcements", data);
      toast.success("Announcement added!");
      setNewAnnouncement("");
      fetchAnnouncements();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add announcement.");
    }
  };

  // Delete announcement
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) return;
    try {
      await axiosSecure.delete(`/announcements/${id}`);
      toast.success("Announcement deleted!");
      fetchAnnouncements();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete announcement.");
    }
  };

  // Start editing
  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  // Save edited announcement
  const handleEdit = async () => {
    if (!editText.trim()) return toast.error("Enter announcement text.");
    try {
      await axiosSecure.patch(`/announcements/${editingId}`, { text: editText });
      toast.success("Announcement updated!");
      setEditingId(null);
      setEditText("");
      fetchAnnouncements();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update announcement.");
    }
  };

  if (loading) return <p className="text-center py-10 text-lg">Loading announcements...</p>;
  if (!announcements.length)
    return <p className="text-center py-10 text-gray-500">No announcements found.</p>;

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-lg space-y-6">
      {/* Add Announcement */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New announcement..."
          className="border rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={newAnnouncement}
          onChange={(e) => setNewAnnouncement(e.target.value)}
        />
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      {/* Announcements Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse text-sm shadow-sm">
          <thead>
            <tr className="bg-indigo-600 text-white uppercase text-xs tracking-wider">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Announcement</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((a, index) => (
              <tr
                key={a._id}
                className="bg-white hover:bg-indigo-50 transition-all duration-200"
              >
                <td className="px-4 py-2">{index + 1}</td>

                <td className="px-4 py-2">
                  {editingId === a._id ? (
                    <input
                      type="text"
                      className="border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                  ) : (
                    a.text
                  )}
                </td>

                <td className="px-4 py-2 text-gray-500">
                  <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                    {new Date(a.postAt).toLocaleString()}
                  </span>
                </td>

                <td className="px-4 py-2 flex gap-2">
                  {editingId === a._id ? (
                    <>
                      <button
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                        onClick={handleEdit}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                        onClick={() => startEditing(a._id, a.text)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                        onClick={() => handleDelete(a._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAnnouncements;
