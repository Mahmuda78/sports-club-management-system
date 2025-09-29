import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white px-6 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand / Logo */}
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold mb-2 text-purple-500">Sports Club</h2>
          <p className="text-gray-300 text-sm">
            Manage courts, memberships, and bookings with ease.
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-1">
          <h3 className="font-bold mb-2 text-purple-400">Contact Us</h3>
          <p className="text-gray-300 hover:text-purple-500 transition">Email: info@sportsclub.com</p>
          <p className="text-gray-300 hover:text-purple-500 transition">Phone: +880 1234 567890</p>
          <p className="text-gray-300 hover:text-purple-500 transition">Address: Dhaka, Bangladesh</p>
        </div>

        {/* Social Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold mb-2 text-purple-400">Follow Us</h3>
          <div className="flex gap-4 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="transform hover:scale-125 transition duration-300 text-blue-600">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="transform hover:scale-125 transition duration-300 text-sky-500">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="transform hover:scale-125 transition duration-300 text-pink-500">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="transform hover:scale-125 transition duration-300 text-blue-700">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center border-t border-gray-700 mt-8 pt-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Sports Club. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
