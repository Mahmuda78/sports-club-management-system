import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";


const ManageCourts = () => {
  const axiosSecure = useAxiosSecure();
  const [courts, setCourts] = useState([]);
  const [newCourt, setNewCourt] = useState({ title: "", price: "", image: "", slots: [] });
  const [slotInput, setSlotInput] = useState("");
  const [editCourt, setEditCourt] = useState(null); // edit state
  const [editSlotInput, setEditSlotInput] = useState("");

  // Fetch courts
  useEffect(() => {
    axiosSecure.get("/courts")
      .then(res => setCourts(res.data))
      .catch(err => console.error(err));
  }, []);

  // Convert file to base64
  const handleImageUpload = (e, setCourt) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setCourt(prev => ({ ...prev, image: reader.result }));
    };
  };

  // Add new court
  const handleAddCourt = async () => {
    try {
      const res = await axiosSecure.post("/courts", newCourt);
      setCourts([...courts, res.data]);
      setNewCourt({ title: "", price: "", image: "", slots: [] });
      setSlotInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // Delete court
  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/courts/${id}`);
      setCourts(courts.filter(c => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Update court
  const handleUpdateCourt = async () => {
    try {
      const res = await axiosSecure.patch(`/courts/${editCourt._id}`, editCourt);
      setCourts(courts.map(c => (c._id === editCourt._id ? res.data : c)));
      setEditCourt(null);
      setEditSlotInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // Add slot
  const handleAddSlot = (setCourt, court, input, setInput) => {
    if (input.trim() === "") return;
    setCourt({ ...court, slots: [...court.slots, input] });
    setInput("");
  };

  // Remove slot
  const handleRemoveSlot = (court, slot, setCourt) => {
    setCourt({ ...court, slots: court.slots.filter(s => s !== slot) });
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold text-center text-indigo-600">
        🏟️ Manage Courts
      </h2>

      {/* Add New Court */}
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg mx-auto">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">➕ Add New Court</h3>
        <input
          type="text"
          placeholder="Court Title"
          value={newCourt.title}
          onChange={(e) => setNewCourt({ ...newCourt, title: e.target.value })}
          className="w-full border rounded-lg p-2 mb-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={newCourt.price}
          onChange={(e) => setNewCourt({ ...newCourt, price: e.target.value })}
          className="w-full border rounded-lg p-2 mb-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, setNewCourt)}
          className="w-full border rounded-lg p-2 mb-2"
        />
        {newCourt.image && <img src={newCourt.image} alt="Preview" className="w-32 h-24 object-cover rounded-lg mb-2" />}
        <div className="flex space-x-2 mb-2">
          <input
            type="text"
            placeholder="Add Slot"
            value={slotInput}
            onChange={(e) => setSlotInput(e.target.value)}
            className="flex-1 border rounded-lg p-2"
          />
          <button onClick={() => handleAddSlot(setNewCourt, newCourt, slotInput, setSlotInput)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {newCourt.slots.map((slot, idx) => (
            <span key={idx} className="bg-gray-200 px-2 py-1 rounded-full flex items-center space-x-2">
              <span>{slot}</span>
              <button onClick={() => handleRemoveSlot(newCourt, slot, setNewCourt)}
                      className="text-red-500 font-bold">x</button>
            </span>
          ))}
        </div>
        <button onClick={handleAddCourt}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">Save Court
        </button>
      </div>

      {/* Courts List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courts.map((court) => (
          <div key={court._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition">
            {court.image && <img src={court.image} alt={court.title} className="w-full h-40 object-cover" />}
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">{court.title}</h3>
              <p className="text-gray-600">💰 ${court.price}</p>
              <p className="text-gray-600">🕒 Slots: {court.slots?.join(", ")}</p>
              <div className="flex justify-between mt-3">
                <button onClick={() => handleDelete(court._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">Delete
                </button>
                <button onClick={() => setEditCourt(court)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600">Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editCourt && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 space-y-3">
            <h3 className="text-xl font-semibold">Edit Court</h3>
            <input type="text" value={editCourt.title}
                   onChange={(e) => setEditCourt({ ...editCourt, title: e.target.value })}
                   className="w-full border rounded-lg p-2" />
            <input type="number" value={editCourt.price}
                   onChange={(e) => setEditCourt({ ...editCourt, price: e.target.value })}
                   className="w-full border rounded-lg p-2" />
            <input type="file" accept="image/*"
                   onChange={(e) => handleImageUpload(e, setEditCourt)}
                   className="w-full border rounded-lg p-2" />
            {editCourt.image && <img src={editCourt.image} alt="Preview" className="w-32 h-24 object-cover rounded-lg" />}

            <div className="flex space-x-2">
              <input type="text" placeholder="Add Slot" value={editSlotInput} onChange={e => setEditSlotInput(e.target.value)}
                     className="flex-1 border rounded-lg p-2" />
              <button onClick={() => handleAddSlot(setEditCourt, editCourt, editSlotInput, setEditSlotInput)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {editCourt.slots.map((slot, idx) => (
                <span key={idx} className="bg-gray-200 px-2 py-1 rounded-full flex items-center space-x-2">
                  <span>{slot}</span>
                  <button onClick={() => handleRemoveSlot(editCourt, slot, setEditCourt)} className="text-red-500 font-bold">x</button>
                </span>
              ))}
            </div>

            <div className="flex justify-between mt-3">
              <button onClick={handleUpdateCourt} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Save</button>
              <button onClick={() => setEditCourt(null)} className="bg-gray-300 px-4 py-2 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourts;
