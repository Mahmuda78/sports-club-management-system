import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";
import Loading from "../../Pages/Loading";
import { FaClipboardList, FaGift, FaUsers } from "react-icons/fa";

// React Router
import { NavLink, Outlet, Link } from "react-router";

// Icons
import { ImProfile } from "react-icons/im";
import { TbBrandBooking } from "react-icons/tb";
import { MdAnnouncement, MdPayment } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";

// Animation
import { motion, AnimatePresence } from "framer-motion";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return <Loading />;
  }

  let menuItems = [];

  if (role === "user") {
    menuItems = [
      { to: "myProfile", label: "My Profile", icon: <ImProfile size={20} /> },
      { to: "bookings", label: "Pending Bookings", icon: <TbBrandBooking size={22} /> },
      { to: "announcements", label: "Announcements", icon: <MdAnnouncement size={20} /> },
    ];
  }

  if (role === "admin") {
    menuItems = [
      { to: "adminProfile", label: " Admin Profile", icon: <ImProfile size={20} /> },
      { to: "manageBookings", label: "Manage Bookings", icon: <ImProfile size={20} /> },
      { to: "manageMember", label: "Manage Member", icon: <ImProfile size={20} /> },
      { to: "allUsers", label: "All Users", icon: <FaUsers size={20} /> },
      { to: "courtManage", label: "Court Manage", icon: <MdAnnouncement size={20} /> },
      { to: "bookingCorfirm", label: "Manage Confirm", icon: <MdAnnouncement size={20} /> },
      { to: "manageCoupons", label: "Coupons", icon: <FaGift size={20} /> },
      { to: "manageAnnouncements", label: "Announcements", icon: <MdAnnouncement size={20} /> },
      { to: "makeAdmin", label: "Make Admin", icon: <MdAnnouncement size={20} /> },

    ];
  }

  if (role === "member") {
    menuItems = [
      { to: "memberProfile", label: "My Profile", icon: <ImProfile size={20} /> },
      { to: "paymentHistory", label: "Payment History", icon: <MdPayment size={20} /> },

      { to: "approved", label: "Approved Bookings", icon: <ImProfile size={20} /> },
      {
        to: "confirmedBookings",
        label: "Confirmed Bookings",
        icon: <FaClipboardList size={20} />,
        
      },
        { to: "announcements", label: "Announcements", icon: <MdAnnouncement size={20} /> },
    ];
  }

  return (
    <div className="flex min-h-screen relative">
      {/* Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-gradient-to-b from-gray-900 via-purple-900 to-gray-800 text-white p-6 shadow-xl">
        <Link to={"/"}>
          <h2 className="text-2xl font-bold mb-6 flex gap-x-2 items-center">
            <RxDashboard size={30} /> Dashboard
          </h2>
        </Link>
        <nav className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `transition-colors duration-200 flex gap-x-2 items-center px-2 py-2 rounded-lg ${isActive
                  ? "bg-purple-700 font-semibold"
                  : "hover:bg-gray-800 hover:text-purple-300"
                }`
              }
            >
              {item.icon} {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile Navbar */}
      <div className="lg:hidden w-full bg-gradient-to-r from-gray-900 via-purple-900 to-black text-white p-4 flex items-center justify-between shadow-md fixed top-0 left-0 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-800 transition"
        >
          {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
        <Link to={"/"} className="text-xl font-bold flex items-center gap-2">
          <RxDashboard size={25} /> Dashboard
        </Link>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed top-0 left-0 w-64 h-full bg-gradient-to-b from-gray-900 via-purple-900 to-gray-800 text-white shadow-2xl z-40 p-6"
          >
            <nav className="flex flex-col gap-4 mt-16">
              {menuItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive
                      ? "bg-purple-700 font-semibold"
                      : "hover:bg-gray-800 hover:text-purple-300"
                    }`
                  }
                >
                  {item.icon} {item.label}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 pt-20 lg:pt-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
