import React from "react";
import { useParams } from "react-router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
  // Read bookingId from URL param
  const { bookingId } = useParams();
  // console.log("Booking ID from URL:", bookingId);

  if (!bookingId)
    return <p className="text-center py-10 text-red-500">No booking selected</p>;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm bookingId={bookingId} />
    </Elements>
  );
};

export default Payment;
