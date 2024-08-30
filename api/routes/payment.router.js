const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const router = express.Router();

// Initialize Razorpay with your credentials
const razorpay = new Razorpay({
  key_id: "rzp_test_mkPOqzRkk3GQHh", // Replace with your Razorpay Key ID
  key_secret: "3uuK1mYdSlwKxvwuYd7Xv5qG", // Replace with your Razorpay Key Secret
});

// Create Razorpay Order
router.post("/orders", async (req, res) => {
  const { amount } = req.body;
  const options = {
    amount: amount * 100, // Amount in paise
    currency: "INR",
    receipt: crypto.randomBytes(10).toString("hex"),
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
});

// Verify Payment
router.post("/verify", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const key_secret = "3uuK1mYdSlwKxvwuYd7Xv5qG"; // Replace with your Razorpay Key Secret

  // SHA256 Algorithm
  const shasum = crypto.createHmac("sha256", key_secret);
  shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = shasum.digest("hex");

  if (digest === razorpay_signature) {
    res
      .status(200)
      .json({ success: true, message: "Payment verified successfully!" });
  } else {
    res
      .status(400)
      .json({ success: false, message: "Payment verification failed!" });
  }
});

module.exports = router;
