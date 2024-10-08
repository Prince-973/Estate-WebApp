import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import Contact from "../component/Contact";
import StripeCheckout from "react-stripe-checkout";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";

function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currUser } = useSelector((state) => state.user);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingid}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingid]);

<<<<<<< HEAD
  const makePayment = (token) => {
    const body = {
      token,
      listing,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    return fetch("http://localhost:3000/payment", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then(async (res) => {
        // Check if response is OK
        if (!res.ok) {
          // If not, try to read error message as text
          const errorText = await res.text();
          throw new Error(`Error in payment: ${errorText}`);
        }

        const result = await res.json();
        console.log("Payment Result:", result);
      })
      .catch((error) => {
        console.error("Payment Error:", error);
      });
=======
  const handlePayment = async () => {
    try {
      const orderUrl = "/api/payment/orders"; // Replace with your backend URL
      const response = await fetch(orderUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: listing.offer ? listing.discountPrice : listing.regularPrice,
        }),
      });
      const data = await response.json();
      initPayment(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_mkPOqzRkk3GQHh", // Replace with your Razorpay test/live key
      amount: data.amount,
      currency: data.currency,
      name: listing.name,
      description: "Test Transaction",
      image: listing.imageUrls && listing.imageUrls[0], // Use the first image URL if available
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "/api/payment/verify"; // Replace with your backend URL
          const res = await fetch(verifyUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(response),
          });
          const result = await res.json();
          console.log(result);
        } catch (error) {
          console.error(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
>>>>>>> d0e93f0dcfb6374be53cef5dd6a62aa86e79f9f1
  };

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something Went Wrong!</p>
      )}
      {listing && !loading && !error && (
        <>
          <Swiper navigation>
            {listing.imageUrls && listing.imageUrls.length > 0 ? (
              listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className="h-[350px]"
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              ))
            ) : (
              <p>No images available</p>
            )}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
<<<<<<< HEAD
              {listing.name} - ₹
=======
              {listing.name} - $
>>>>>>> d0e93f0dcfb6374be53cef5dd6a62aa86e79f9f1
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </p>
            <p className="flex items-center gap-2 text-slate-600 text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[150px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[150px] text-white text-center p-1 rounded-md">
                  ₹{+listing.regularPrice - +listing.discountPrice}
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>
<<<<<<< HEAD
            <ul className="text-green-900 font-semibold text-sm flex items-center gap-4 sm:gap-6 flex-wrap">
=======
            <ul className="text-green-900 font-semibold text-sm flex item-center gap-4 sm:gap-6 flex-wrap">
>>>>>>> d0e93f0dcfb6374be53cef5dd6a62aa86e79f9f1
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} bedrooms`
                  : `${listing.bedrooms} bed`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} bathrooms`
                  : `${listing.bathrooms} bath`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking Spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {currUser && listing.userRef !== currUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
              >
                Contact Landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}
<<<<<<< HEAD
            {currUser && listing.userRef !== currUser._id && (
              <StripeCheckout
                stripeKey="pk_test_51PtqvgSCd0d7DdNqOxteTcD9CXRpRCLUH7cdUxvq5OKouNdV0g6USSeF6gcyMkDDk8Q6QXcFVi69SdABn7Xbviej00nuF48vLx"
                token={makePayment}
                name="Buy Property"
                amount={
                  listing.offer
                    ? listing.discountPrice * 100
                    : listing.regularPrice * 100
                }
                currency="INR"
              >
                <button className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3 w-full">
                  Pay Now
                </button>
              </StripeCheckout>
            )}
=======
            {/* Razorpay Payment Button */}
            <button
              onClick={handlePayment}
              className="bg-green-700 text-white rounded-lg uppercase hover:opacity-95 p-3 mt-4"
            >
              Pay with Razorpay
            </button>
>>>>>>> d0e93f0dcfb6374be53cef5dd6a62aa86e79f9f1
          </div>
        </>
      )}
    </main>
  );
}

export default Listing;
