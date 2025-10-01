// import { useEffect, useState } from "react";

// import axios from "axios";
// import { useNavigate } from "react-router";

// const ApprovedBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBookings = async () => {
//       const token = localStorage.getItem("accessToken");
//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       try {
//         const res = await axios.get("https://sports-club-manegement-server.vercel.app/bookings?status=approved", {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setBookings(res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, [navigate]);

//   const handlePayment = (bookingId) => {
//     navigate(`/payment/${bookingId}`);
//     console.log(bookingId);
    
//   };

//   const handleCancel = async (bookingId) => {
//     if (!window.confirm("Are you sure you want to cancel this booking?")) return;

//     const token = localStorage.getItem("accessToken");
//     try {
//       const res = await axios.delete(`https://sports-club-manegement-server.vercel.app/bookings/${bookingId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (res.data.deletedCount > 0) {
//         setBookings(prev => prev.filter(b => b._id !== bookingId));
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading) return <p>Loading approved bookings...</p>;
//   if (!bookings.length) return <p>No approved bookings available.</p>;

//   return (
//     <div className="approved-bookings">
//       <h2>Approved Bookings</h2>
//       <table className="bookings-table">
//         <thead>
//           <tr>
//             <th>User</th>
//             <th>Court</th>
//             <th>Slots</th>
//             <th>Price (৳)</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bookings.map(booking => (
//             <tr key={booking._id}>
//               <td>{booking.userName || booking.userEmail}</td>
//               <td>{booking.courtTitle}</td>
//               <td>{Array.isArray(booking.slots) ? booking.slots.join(", ") : booking.slots}</td>
//               <td>{booking.price}</td>
//               <td>
//                 <button className="pay-btn" onClick={() => handlePayment(booking._id)}>Pay</button>
//                 <button className="cancel-btn" onClick={() => handleCancel(booking._id)}>Cancel</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ApprovedBookings;