import {  useEffect, useState } from "react";

import { useLocation } from "react-router";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useAuth from "../../hooks/useAuth";

const stripePromise = loadStripe("pk_test_XXXXXXXXXXXXXXXX"); // your public key

const CheckoutForm = ({ booking }) => {
  const { user } = useAuth()
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create Payment Intent on backend
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify({ price: booking.price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [booking.price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card, billing_details: { email: user.email } },
    });

    if (error) {
      console.error(error);
      alert("Payment failed ❌");
    } else if (paymentIntent.status === "succeeded") {
      // save payment info to backend
      await fetch("http://localhost:5000/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        body: JSON.stringify({
          bookingId: booking._id,
          email: user.email,
          amount: booking.price,
          date: booking.date,
          slots: booking.slots,
          courtType: booking.courtType,
        }),
      });

      alert("Payment Successful ✅");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Pay for {booking.courtType}</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          value={user.email}
          readOnly
          className="w-full px-3 py-2 border rounded bg-gray-100 cursor-not-allowed"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Card Info</label>
        <div className="p-3 border rounded bg-gray-50">
          <CardElement />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        disabled={!stripe || !clientSecret}
      >
        Pay ${booking.price}
      </button>
    </form>
  );
};

const PaymentPage = () => {
  const location = useLocation();
  const booking = location.state;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm booking={booking} />
    </Elements>
  );
};

export default PaymentPage;
