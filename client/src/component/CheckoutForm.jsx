// src/components/CheckoutForm.jsx
import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

function CheckoutForm({ amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);
    try {
      const response = await fetch("/api/payment/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const { clientSecret } = await response.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        setError(error.message);
        setProcessing(false);
      } else if (paymentIntent.status === "succeeded") {
        alert("Payment Successful!");
        setProcessing(false);
      }
    } catch (error) {
      setError(error.message);
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || processing}>
        {processing ? "Processing…" : "Pay Now"}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default CheckoutForm;
