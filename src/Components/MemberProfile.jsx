import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";



const MemberProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure(); 
  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const res = await axiosSecure.get(`/api/users/${user?.email}`);
        setMemberData(res.data);
      } catch (err) {
        console.error("Failed to fetch member data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchMemberData();
    }
  }, [user?.email, axiosSecure]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!memberData) return <p className="text-center py-10">No user data found.</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">My Profile</h2>
      
      <div className="space-y-3">
        <p><strong>Name:</strong> {memberData.name}</p>
        <p><strong>Email:</strong> {memberData.email}</p>
        <p>
          <strong>Member Since:</strong>{" "}
          {memberData.memberSince
            ? new Date(memberData.memberSince).toLocaleString()
            : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default MemberProfile;
