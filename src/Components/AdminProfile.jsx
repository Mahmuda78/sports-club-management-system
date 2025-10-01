import React, { useEffect, useState } from "react";

import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/admin-stats?email=${user.email}`)
        .then((res) => {
          setStats(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user, axiosSecure]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-6">
      {/* Profile Section */}
      <div className="flex flex-col items-center">
        <img
          src={user?.photoURL}
          alt="Admin"
          className="w-24 h-24 rounded-full object-cover shadow-md"
        />
        <h2 className="mt-4 text-2xl font-bold">{user?.displayName}</h2>
        <p className="text-gray-600">{user?.email}</p>
      </div>

      {/* Stats Section */}
      <div className="mt-6 grid grid-cols-1 gap-4">
        <div className="bg-blue-100 p-4 rounded-xl text-center">
          <h3 className="text-xl font-semibold">Total Courts</h3>
          <p className="text-2xl font-bold text-blue-600">{stats?.totalCourts}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-xl text-center">
          <h3 className="text-xl font-semibold">Total Users</h3>
          <p className="text-2xl font-bold text-green-600">{stats?.totalUsers}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-xl text-center">
          <h3 className="text-xl font-semibold">Total Members</h3>
          <p className="text-2xl font-bold text-purple-600">{stats?.totalMembers}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
