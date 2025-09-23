import React from "react";
import Swal from "sweetalert2";
import axios from "axios";

const AddCourt = () => {

  const slotTimes = [
        "8:00 AM- 10:00 AM",
        "4:00 PM- 6:00 PM",
        "7:00 PM- 9:00 PM"
        ];
  const handleAddCourt = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newCourt = Object.fromEntries(formData.entries());

    try {
      const res = await axios.post("http://localhost:5000/courts", newCourt);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Court created successfully!",
          icon: "success",
          draggable: true,
        });
       
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Could not add court.",
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-5xl pb-20 p-10 mx-auto bg-gradient-to-r from-black via-gray-900 to-gray-800">
      <div className="p-6 text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white">Add Court</h1>
      </div>

      <form onSubmit={handleAddCourt} className="grid grid-cols-1  md:grid-cols-2 gap-6">
        {/* Court Image */}
        <fieldset className="fieldset  border-2 border-purple-400 rounded-box  p-4 col-span-2">
          <label className="label text-white font-semibold">Court Image URL</label>
          <input type="text" name="imageUrl" className="input w-full" placeholder="Enter court image URL" required />
        </fieldset>

        {/* Court Type */}
        <fieldset className="fieldset border-2 border-purple-400  rounded-box  p-4 col-span-2">
          <label className="label text-white font-semibold">Court Type</label>
          <input type="text" name="courtType" className="input w-full" placeholder="e.g. Tennis, Badminton, Squash" required />
        </fieldset>

        {/* Slot Time */}
        <fieldset className="fieldset border-2 border-purple-400  rounded-box p-4">
          <label className="label text-white font-semibold">Slot Time</label>
         <select name="Time" className="select w-full" required>
                        <option value="">Select a category</option>
                        {slotTimes.map((cat, idx) => (
                            <option key={idx} value={cat}>{cat}</option>
                        ))}
                    </select>
        </fieldset>

        {/* Price */}
        <fieldset className="fieldset  border-2 border-purple-400 rounded-box p-4">
          <label className="label text-white font-semibold">Price per Session</label>
          <input type="number" name="price" className="input w-full" placeholder="Enter price" required />
          
        </fieldset>

        {/* Submit */}
        <div className="col-span-2">
          <input type="submit" className="btn btn-outline text-white bg-gradient-to-r from-purple-600 to-indigo-600 w-full" value="Add Court" />
        </div>
      </form>
    </div>
  );
};

export default AddCourt;
