import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";


const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // make admin
  const handleMakeAdmin = async (email) => {
    try {
      await axiosSecure.patch(`/users/${email}/make-admin`);
      toast.success(`${email} is now an Admin`);
      fetchUsers(); // refresh
    } catch (err) {
      console.error(err);
      toast.error("Failed to make admin");
    }
  };

  // remove admin
  const handleRemoveAdmin = async (email) => {
    try {
      await axiosSecure.patch(`/users/${email}/remove-admin`);
      toast.success(`${email} is no longer an Admin`);
      fetchUsers(); // refresh
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove admin");
    }
  };

  if (loading) return <p className="text-center py-10">Loading users...</p>;

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Manage Admins</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse text-sm">
          <thead>
            <tr className="bg-indigo-600 text-white uppercase text-xs tracking-wider">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr
                key={u._id}
                className="bg-white hover:bg-indigo-50 transition duration-200"
              >
                <td className="px-4 py-2">{i + 1}</td>
                <td className="px-4 py-2">{u.name || "N/A"}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2">{u.role || "user"}</td>
                <td className="px-4 py-2 space-x-2">
                  {u.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(u.email)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Remove Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(u.email)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Make Admin
                    </button>
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

export default MakeAdmin;
