import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { useParams } from 'react-router';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
  const { bookingId } = useParams(); // Route param name must match

  if (!bookingId) return <p className="text-center py-10">Booking ID not found!</p>;

  return (
    <Elements stripe={stripePromise}>
      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Payment for Booking</h2>
        <CheckoutForm bookingId={bookingId} />
      </div>
    </Elements>
  );
};

export default Payment;
