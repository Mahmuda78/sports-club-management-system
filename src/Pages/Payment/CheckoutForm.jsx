import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const CheckoutForm = ({ bookingId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const [booking, setBooking] = useState(null);
  const [coupon, setCoupon] = useState('');
  const [finalPrice, setFinalPrice] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch single booking
  useEffect(() => {
    if (!bookingId) return;
    axiosSecure.get(`/bookings/${bookingId}`)
      .then(res => {
        setBooking(res.data);
        setFinalPrice(res.data.price); // initial
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to fetch booking');
      });
  }, [bookingId, axiosSecure]);

  const handleCouponApply = async () => {
    if (!coupon || !booking) return;

    try {
      const res = await axiosSecure.post('/create-payment-intent', {
        bookingId: booking._id,
        couponCode: coupon
      });

      if (res.data.finalPrice) {
        setFinalPrice(res.data.finalPrice);
        toast.success(`Coupon applied! New price: ৳${res.data.finalPrice}`);
      } else {
        toast.error('Invalid coupon');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to apply coupon');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !booking) return;

    setIsProcessing(true);

    const card = elements.getElement(CardElement);
    const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (pmError) {
      toast.error(pmError.message);
      setIsProcessing(false);
      return;
    }

    try {
      // Always fetch latest clientSecret from backend to prevent tampering
      const res = await axiosSecure.post('/create-payment-intent', {
        bookingId: booking._id,
        couponCode: coupon
      });

      const clientSecret = res.data.clientSecret;
      const confirm = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirm.error) {
        toast.error(confirm.error.message);
      } else if (confirm.paymentIntent.status === 'succeeded') {
        const paymentInfo = {
          bookingId: booking._id,
          email: booking.userEmail,
          price: res.data.finalPrice,
          transactionId: confirm.paymentIntent.id,
          date: new Date(),
        };

        await axiosSecure.post('/payments', paymentInfo);

        Swal.fire({
          icon: 'success',
          title: 'Payment Successful!',
          text: 'Your booking is confirmed.',
          confirmButtonColor: '#22c55e',
          timer: 1500,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!booking) return <p className="text-center py-10">Loading booking info...</p>;

  return (
    <div className="bg-black p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-primary">💳 Pay for Booking</h3>

      {/* Coupon */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter Coupon Code"
          value={coupon}
          onChange={e => setCoupon(e.target.value)}
          className="input input-bordered flex-1"
        />
        <button onClick={handleCouponApply} className="btn btn-primary">Apply</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Email</label>
          <input value={booking.userEmail} readOnly className="input input-bordered w-full bg-gray-800 text-white" />
        </div>

        <div>
          <label className="label">Court</label>
          <input value={booking.courtTitle} readOnly className="input input-bordered w-full bg-gray-800 text-white" />
        </div>

        <div>
          <label className="label">Slots</label>
          <input value={booking.slots.join(', ')} readOnly className="input input-bordered w-full bg-gray-800 text-white" />
        </div>

        <div>
          <label className="label">Date</label>
          <input value={booking.date} readOnly className="input input-bordered w-full bg-gray-800 text-white" />
        </div>

        <div>
          <label className="label">Total Price</label>
          <input value={`৳${finalPrice}`} readOnly className="input input-bordered w-full bg-primary text-black font-bold" />
        </div>

        <div>
          <label className="label">Card Info</label>
          <div className="border p-3 rounded-md bg-white">
            <CardElement options={{ hidePostalCode: true }} />
          </div>
        </div>

        <button type="submit" className="btn btn-success w-full" disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
