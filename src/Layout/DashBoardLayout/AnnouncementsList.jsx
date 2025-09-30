import React, { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AnnouncementsList = () => {
  const axiosSecure = useAxiosSecure();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch announcements
  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/announcements");
      setAnnouncements(res.data.sort((a, b) => new Date(b.postAt) - new Date(a.postAt)));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  if (loading)
    return (
      <p className="text-center py-10 text-lg text-gray-500 animate-pulse">
        Loading announcements...
      </p>
    );

  if (announcements.length === 0)
    return (
      <p className="text-center py-10 text-gray-400 italic">
        No announcements available.
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <AnimatePresence>
        {announcements.map((a) => (
          <motion.div
            key={a._id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition cursor-pointer"
          >
            <p className="text-gray-800 font-medium text-lg">{a.text}</p>
            <p className="text-gray-400 text-sm mt-1">
              {new Date(a.postAt).toLocaleString()}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AnnouncementsList;
