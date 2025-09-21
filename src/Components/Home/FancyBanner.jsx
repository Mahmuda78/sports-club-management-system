import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";
import { FaArrowLeft, FaArrowRight, FaArrowRightLong } from "react-icons/fa6";
import { Fade } from "react-awesome-reveal";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

import slide1 from "../../assets/Slider/sports club.jpg";
import slide2 from "../../assets/Slider/coutss.jpg";
import slide3 from "../../assets/Slider/activities.jpg";

const slides = [
  {
    img: slide1,
    title: "Welcome to Our Sports Club",
    subtitle:
      "Experience the perfect blend of fitness, fun, and community — all under one roof. Our club is designed to inspire and energize every individual.",
    buttonText: "Explore Club",
    link: '#about',
  },
  {
    img: slide2,
    title: "World-Class Sports Courts",
    subtitle:
      "Whether it’s Tennis, Badminton, or Basketball — our professional-grade courts provide the best environment for both beginners and champions.",
    buttonText: "View Courts",
    link: '/courts',
  },
  {
    img: slide3,
    title: "Engaging Activities Everyday",
    subtitle:
      "Stay active, learn new skills, and enjoy fun tournaments, group classes, and more. Every day is a new adventure waiting for you.",
    buttonText: "Join Activities",
    link: '/courts',
  },
];

const FancyBanner = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full h-[450px] md:h-[550px] lg:h-[calc(100vh-83px)] overflow-hidden">
      {/* Custom Navigation Buttons (Only on large screens) */}
      <div
        className="hidden lg:flex absolute top-1/2 left-6 z-20 -translate-y-1/2 text-black bg-[#8f33ff] hover:bg-purple-800 transition p-3 rounded-full cursor-pointer shadow-lg"
        ref={prevRef}
      >
        <FaArrowLeft />
      </div>
      <div
        className="hidden lg:flex absolute top-1/2 right-6 z-20 -translate-y-1/2 text-black bg-[#8f33ff] hover:bg-purple-800 transition p-3 rounded-full cursor-pointer shadow-lg"
        ref={nextRef}
      >
        <FaArrowRight />
      </div>

      <Swiper
        modules={[Autoplay, Pagination, EffectFade, Navigation]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        loop
        className="h-full custom-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover animate-zoom"
              />
              <div className="absolute inset-0 bg-[#000000bb] bg-opacity-60 flex flex-col justify-center items-center text-center text-white px-4 sm:px-6">
                {/* Animate text + button only if active slide */}
                <Fade
                  key={activeIndex === index ? "active" : "inactive"}
                  triggerOnce
                  direction="down"
                  cascade
                  damping={0.3}
                  delay={300}
                  duration={2000}
                  when={activeIndex === index}
                >
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 text-purple-300 drop-shadow-md leading-snug">
                    {slide.title}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-4xl mb-6 leading-relaxed text-white/90">
                    {slide.subtitle}
                  </p>
                  <a href={`${slide.link}`}>
                    <button className="flex items-center gap-2 bg-purple-400 text-black px-6 py-3 text-sm md:text-base font-semibold rounded-full shadow-lg hover:bg-purple-800 hover:text-white transition duration-300">
                      {slide.buttonText}
                      <FaArrowRightLong />
                    </button>
                  </a>
                </Fade>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Style */}
      <style>{`
        .swiper-pagination-bullet {
          background: white;
          opacity: 0.6;
        }
        .swiper-pagination-bullet-active {
          background: #8f33ff;
          opacity: 1;
        }

        /* Zoom in/out animation */
        @keyframes zoomInOut {
          0%, 100% {
            transform: scale(1.1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        .animate-zoom {
          animation: zoomInOut 10s ease-in-out infinite;
          transform-origin: center;
        }
      `}</style>
    </div>
  );
};

export default FancyBanner;
