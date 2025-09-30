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
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch single booking
  useEffect(() => {
    if (!bookingId) return;
    axiosSecure.get(`/bookings/${bookingId}`)
      .then(res => {
        setBooking(res.data);
        setDiscountedPrice(res.data.price);
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to fetch booking');
      });
  }, [bookingId, axiosSecure]);

  const handleCouponApply = async () => {
    if (!coupon || !booking) return;

    try {
      const res = await axiosSecure.post('/validate-coupon', { code: coupon });
      if (res.data.valid) {
        const percentage = res.data.discountAmount;
        const discountTk = (booking.price * percentage) / 100;

        setDiscountAmount(percentage);
        setDiscountedPrice(booking.price - discountTk);
        setCouponApplied(true);
        toast.success(`Coupon applied! ${percentage}% off`);
      } else {
        toast.error('Invalid coupon code');
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
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      toast.error(error.message);
      setIsProcessing(false);
      return;
    }

    try {
      const finalPrice = discountedPrice ?? booking.price;

      const res = await axiosSecure.post('/create-payment-intent', { price: finalPrice });
      const confirm = await stripe.confirmCardPayment(res.data.clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirm.paymentIntent.status === 'succeeded') {
        const paymentInfo = {
          bookingId: booking._id,
          email: booking.userEmail,
          price: finalPrice,
          transactionId: confirm.paymentIntent.id,
          date: new Date(),
        };

        await axiosSecure.post('/payments', paymentInfo);

        await Swal.fire({
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
      {couponApplied && <p className="text-green-400 mb-2">Coupon applied! You saved {discountAmount}%</p>}

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
          <label className="label">Total Price</label>
          <input value={`৳${discountedPrice ?? booking.price}`} readOnly className="input input-bordered w-full bg-primary text-black font-bold" />
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
