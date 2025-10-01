import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

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

  const chartData = [
    { name: "Total Courts", value: stats?.totalCourts || 0 },
    { name: "Total Users", value: stats?.totalUsers || 0 },
    { name: "Total Members", value: stats?.totalMembers || 0 },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
      {/* Profile Section */}
      <div className="flex flex-col items-center">
        <img
          src={user?.photoURL}
          alt="Admin"
          className="w-24 h-24 rounded-full object-cover shadow-md border-4 border-blue-200"
        />
        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          {user?.displayName}
        </h2>
        <p className="text-gray-600">{user?.email}</p>
      </div>

      {/* Card Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-6 rounded-2xl shadow text-center">
          <h3 className="text-lg font-semibold text-blue-800">Total Courts</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {stats?.totalCourts}
          </p>
        </div>
        <div className="bg-green-100 p-6 rounded-2xl shadow text-center">
          <h3 className="text-lg font-semibold text-green-800">Total Users</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {stats?.totalUsers}
          </p>
        </div>
        <div className="bg-purple-100 p-6 rounded-2xl shadow text-center">
          <h3 className="text-lg font-semibold text-purple-800">Total Members</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {stats?.totalMembers}
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-center mb-6 text-gray-700">
          Admin Statistics (Pie Chart)
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminProfile;
