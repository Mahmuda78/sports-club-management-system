import React from "react";
import { Fade, Slide } from "react-awesome-reveal";
import aboutImg from "../../assets/Slider/sports club.jpg";

const AboutSection = () => {
  return (
    <section className="bg-gradient-to-r from-black via-gray-800 to-gray-600 text-white py-20 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Image with slide-in animation */}
        <Slide direction="left" triggerOnce>
          <div className="overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition duration-500">
            <img
              src={aboutImg}
              alt="About Club"
              className="w-full h-full object-cover"
            />
          </div>
        </Slide>

        {/* Text Content */}
        <Fade direction="right" triggerOnce cascade damping={0.3}>
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-lg leading-tight">
              About <span className="text-purple-400">Our Sports Club</span>
            </h2>

            <p className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed tracking-wide">
              Established in 2010, our Sports Club has been a hub for sports enthusiasts
              and fitness lovers. With world-class courts, professional trainers, and a
              welcoming community, we ensure everyone can achieve their goals.
            </p>

            {/* Cards for History, Mission, Vision */}
            <div className="space-y-4">
              {[
                {
                  title: "Our History",
                  content:
                    "From a small local club to a thriving community with multiple sports courts and events, our journey has been full of dedication and passion.",
                },
                {
                  title: "Our Mission",
                  content:
                    "To promote fitness, teamwork, and sportsmanship for all ages by providing excellent facilities and organized activities.",
                },
                {
                  title: "Our Vision",
                  content:
                    "To be the leading sports hub in the city where everyone feels inspired to stay active and healthy.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/10 p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-500 hover:scale-105"
                >
                  <h3 className="font-bold text-xl mb-2 tracking-wide text-purple-300">
                    {item.title}
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <a href="#courts">
              <button className="mt-6 px-8 py-3 bg-[#8f33ff] text-white font-semibold rounded-full shadow-lg hover:bg-purple-800 transition duration-300 flex items-center gap-2">
                Explore Courts
              </button>
            </a>
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default AboutSection;
