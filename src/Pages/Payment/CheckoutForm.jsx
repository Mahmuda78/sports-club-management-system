import React, { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const CheckoutForm = ({ bookingId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const [booking, setBooking] = useState(null);
  const [coupon, setCoupon] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // 1️⃣ Fetch booking
  useEffect(() => {
    axiosSecure.get(`/bookings/${bookingId}`)
      .then(res => {
        setBooking(res.data);
        setFinalPrice(res.data.totalPrice);
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to fetch booking info");
      });
  }, [bookingId]);

  // 2️⃣ Create PaymentIntent whenever finalPrice or coupon changes
  useEffect(() => {
    if (!booking) return;

    const createPaymentIntent = async () => {
      try {
        const res = await axiosSecure.post("/create-payment-intent", {
          bookingId: booking._id,
          couponCode: coupon || null
        });
        setClientSecret(res.data.clientSecret);
        setFinalPrice(res.data.finalPrice);
      } catch (err) {
        console.error(err);
        toast.error("Failed to initialize payment");
      }
    };

    createPaymentIntent();
  }, [booking, coupon]);

  // 3️⃣ Handle coupon apply
  const handleApplyCoupon = () => {
    if (!coupon) {
      toast.error("Enter a coupon code");
      return;
    }
    toast.success(`Coupon ${coupon} applied! Payment updated.`);
    // PaymentIntent will auto-update in useEffect
  };

  // 4️⃣ Handle payment submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setIsProcessing(true);

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card, billing_details: { email: booking.userEmail } },
    });

    if (error) {
      console.error(error);
      toast.error(error.message);
      setIsProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      // save payment info
      await axiosSecure.post("/payments", {
        bookingId: booking._id,
        email: booking.userEmail,
        amount: finalPrice,
        transactionId: paymentIntent.id,
        date: new Date(),
        coupon: coupon || null,
      });

      Swal.fire({
        icon: "success",
        title: "Payment Successful!",
        text: `Your booking for ${booking.courtTitle} is confirmed.`,
        confirmButtonColor: "#22c55e",
        timer: 2000,
      });
    }

    setIsProcessing(false);
  };

  if (!booking) return <p className="text-center py-10">Loading booking info...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Pay for {booking.courtTitle}</h2>

      {/* Coupon */}
      <div className="flex mb-4 gap-2">
        <input
          type="text"
          placeholder="Coupon code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="flex-1 input input-bordered"
        />
        <button type="button" onClick={handleApplyCoupon} className="btn btn-primary">
          Apply
        </button>
      </div>

      {/* Booking info */}
      <div className="space-y-2 mb-4">
        <input type="email" value={booking.userEmail} readOnly className="input input-bordered w-full bg-gray-100" />
        <input type="text" value={booking.courtTitle} readOnly className="input input-bordered w-full bg-gray-100" />
        <input type="text" value={booking.slots.join(", ")} readOnly className="input input-bordered w-full bg-gray-100" />
        <input type="text" value={booking.date} readOnly className="input input-bordered w-full bg-gray-100" />
        <input type="text" value={`৳ ${finalPrice}`} readOnly className="input input-bordered w-full font-bold text-black bg-yellow-200" />
      </div>

      {/* Card Info */}
      <div className="mb-4 p-3 border rounded">
        <CardElement options={{ hidePostalCode: true }} />
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        disabled={isProcessing || !clientSecret}
        className="btn btn-success w-full"
      >
        {isProcessing ? "Processing..." : `Pay ৳ ${finalPrice}`}
      </button>
    </div>
  );
};

export default CheckoutForm;
