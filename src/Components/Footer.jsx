import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white px-6 py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Brand / Logo */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Sports Club</h2>
          <p className="text-sm">
            Manage courts, memberships, and bookings with ease.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-bold mb-2">Contact Us</h3>
          <p>Email: info@sportsclub.com</p>
          <p>Phone: +880 1234 567890</p>
          <p>Address: Dhaka, Bangladesh</p>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="font-bold mb-2">Follow Us</h3>
          <div className="flex gap-4 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook className="hover:text-blue-600 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter className="hover:text-sky-500 transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram className="hover:text-pink-600 transition" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedin className="hover:text-blue-700 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center border-t mt-6 pt-4 text-sm">
        © {new Date().getFullYear()} Sports Club. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
