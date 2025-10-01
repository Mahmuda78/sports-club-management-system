import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getAuth } from 'firebase/auth';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      setError('');

      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          setError('User not logged in.');
          setLoading(false);
          return;
        }

        // Get Firebase ID token
        const idToken = await user.getIdToken();

        const res = await axios.get(`https://sports-club-manegement-server.vercel.app/payments?email=${user.email}`, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        setPayments(res.data);
      } catch (err) {
        console.error('Payment fetch error:', err);
        if (err.response?.status === 401) {
          setError('Unauthorized access! Please log in again.');
        } else {
          setError('Failed to fetch payment history.');
        }
        toast.error(error || 'Payment fetch failed.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) return <p className="text-center py-10">Loading payment history...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!payments.length) return <p className="text-center py-10">No payments found.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="table w-full border">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th>#</th>
            <th>Booking ID</th>
            <th>Email</th>
            <th>Price (৳)</th>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p, index) => (
            <tr key={p._id} className="hover">
              <td>{index + 1}</td>
              <td>{p.bookingId}</td>
              <td>{p.email}</td>
              <td>{p.amount || p.price} </td>

              <td>{p.transactionId}</td>
              <td>{new Date(p.date).toLocaleString()}</td>
              <td
                className={`font-semibold ${
                  p.status === 'paid'
                    ? 'text-green-500'
                    : p.status === 'pending'
                    ? 'text-yellow-500'
                    : 'text-red-500'
                }`}
              >
                {p.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
