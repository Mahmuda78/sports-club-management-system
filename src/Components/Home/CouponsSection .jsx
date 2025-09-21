import React from "react";
import { Fade } from "react-awesome-reveal";

const coupons = [
  { code: "PUJA", discount: "5%" },
  { code: "SAVE10", discount: "10%" },
  { code: "WELCOME20", discount: "20%" },
  { code: "FESTIVE50", discount: "50%" },
];

const CouponsSection = () => {
  return (
    <section className="bg-gradient-to-r from-gray-800 via-gray-900 to-black py-16 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto text-center text-white">
        <Fade direction="down" triggerOnce>
          <h2 className="text-4xl font-extrabold mb-8 drop-shadow-lg">
             Exclusive Discounts Just for You!
          </h2>
        </Fade>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {coupons.map((coupon, index) => (
            <Fade key={index} direction="up" triggerOnce>
              <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer">
                <p className="text-2xl font-bold text-purple-600">
                  {coupon.discount} OFF
                </p>
                <p className="mt-2 text-lg">Use Code:</p>
                <p className="mt-1 text-xl font-extrabold tracking-wider bg-purple-100 text-purple-700 px-3 py-1 rounded-md inline-block">
                  {coupon.code}
                </p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CouponsSection;
