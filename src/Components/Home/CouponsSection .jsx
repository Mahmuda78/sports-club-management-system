import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import axios from "axios";
import toast from "react-hot-toast";
import { FaFire } from "react-icons/fa";

const CouponsMarquee = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await axios.get("https://sports-club-manegement-server.vercel.app/coupons"); // backend থেকে fetch
        setCoupons(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load coupons");
      }
    };
    fetchCoupons();
  }, []);

  return (
    <div className="bg-gradient-to-r from-black via-gray-800 to-gray-600 py-6">
      <h1 className="mb-4 flex text-4xl text-center text-purple-300 font-bold"> <FaFire className="text-"></FaFire> All Coupons </h1>
      <Marquee gradient={false} speed={50} pauseOnHover={true}>
        {coupons.map((coupon, index) => (
          <div
            key={index}
            className="bg-white text-gray-800 p-4 mx-4 rounded-xl shadow-lg inline-block"
          >
            <p className="text-xl font-bold text-purple-600">{coupon.discountAmount}% OFF</p>
            <p className="mt-1 text-lg font-semibold">{coupon.code}</p>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default CouponsMarquee;
