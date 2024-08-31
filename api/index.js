const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");
const listingRouter = require("./routes/listing.router");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51PtqvgSCd0d7DdNqpHLAIqmE4lFJrI8Igp4UYwfpRkRwHQa9fuJa9l4O7pbQS5dTymHHKooMrk0ngKIAlgSyyFn900UAMIgZvP"
);
const { v4: uuidv4 } = require("uuid");
// const errorHandeler = require("./utiles/error");

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// Serve static files
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});
app.post("/api/payment", async (req, res) => {
  const { token, listing } = req.body;
  const idempotencyKey = uuidv4();

  try {
    // Create a PaymentIntent with updated automatic payment method settings
    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount:
          (listing.offer ? listing.discountPrice : listing.regularPrice) * 100,
        currency: "inr",
        payment_method_data: {
          type: "card",
          card: {
            token: token.id, // Use the token received from the client
          },
        },
        receipt_email: token.email,
        description: `Payment for ${listing.name}`,
        confirm: true, // Automatically confirm the PaymentIntent
        setup_future_usage: "off_session", // Save the card for future use if required
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: "never",
        },
      },
      { idempotencyKey }
    );

    res.status(200).json({
      success: true,
      paymentIntent,
    });
  } catch (err) {
    console.error("Error creating PaymentIntent:", err.message);
    res.status(400).json({
      success: false,
      message: `Error in Payment: ${err.message}`,
    });
  }
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
