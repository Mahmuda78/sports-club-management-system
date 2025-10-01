// menus.js
import { ImProfile } from "react-icons/im";
import { TbBrandBooking } from "react-icons/tb";
import { MdAnnouncement, MdPayment } from "react-icons/md";
// import { FaUsers, FaUserShield, FaGift } from "react-icons/fa";
// import { GiTennisCourt } from "react-icons/gi";
// import { AiOutlineCheckCircle } from "react-icons/ai";
// import { FaClipboardCheck } from "react-icons/fa";

export const userMenu = [
  { to: "myProfile", label: "My Profile", icon: <ImProfile size={20} /> },
  { to: "pendingBookings", label: "Pending Bookings", icon: <TbBrandBooking size={22} /> },
  { to: "announcements", label: "Announcements", icon: <MdAnnouncement size={20} /> },
];

// export const memberMenu = [
//   { to: "myProfile", label: "My Profile", icon: <ImProfile size={20} /> },
//   { to: "pendingBookings", label: "Pending Bookings", icon: <TbBrandBooking size={22} /> },
//   { to: "approvedBookings", label: "Approved Bookings", icon: <AiOutlineCheckCircle size={20} /> },
//   { to: "confirmedBookings", label: "Confirmed Bookings", icon: <FaClipboardCheck size={20} /> },
//   { to: "paymentHistory", label: "Payment History", icon: <MdPayment size={22} /> },
//   { to: "announcements", label: "Announcements", icon: <MdAnnouncement size={20} /> },
// ];

// export const adminMenu = [
//   { to: "adminProfile", label: "Admin Profile", icon: <ImProfile size={20} /> },
//   { to: "manageBookingsApproval", label: "Manage Bookings Approval", icon: <TbBrandBooking size={22} /> },
//   { to: "manageMembers", label: "Manage Members", icon: <FaUsers size={20} /> },
//   { to: "allUsers", label: "All Users", icon: <FaUserShield size={20} /> },
//   { to: "manageCourts", label: "Manage Courts", icon: <GiTennisCourt size={22} /> },
//   { to: "manageBookings", label: "Manage Bookings", icon: <TbBrandBooking size={22} /> },
//   { to: "manageCoupons", label: "Manage Coupons", icon: <FaGift size={20} /> },
//   { to: "makeAnnouncement", label: "Make Announcement", icon: <MdAnnouncement size={20} /> },

