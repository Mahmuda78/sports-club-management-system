import React from 'react';

const UserDashBoard = () => {
    const menuItems = [
        { to: "myProfile", label: "My Profile", icon: <ImProfile size={20} /> },
        { to: "bookings", label: "Pending Bookings", icon: <TbBrandBooking size={22} /> },
        { to: "announcements", label: "Announcements", icon: <MdAnnouncement size={20} /> },]
    return (
        <div>
            USER DashBoadr
        </div>
    );
};

export default UserDashBoard;