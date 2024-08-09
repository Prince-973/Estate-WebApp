import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../component/ListingItem";
export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [sellListings, setSellListings] = useState([]);
  const [rentListings, setrentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setrentListings(data);
        fetchsellListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchsellListings = async () => {
      try {
        const res = await fetch("api/listing/get?type=sell&limit=4");
        const data = await res.json();
        setSellListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-23 px-3 max-w-6xl mx-auto mt-20">
        <h1 className="text-slate-700  font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span> <br />
          place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Prince Estate is best way to find the your next perfect place to live
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Let's get started...
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => {
            return (
              <SwiperSlide>
                <div
                  style={{
                    background: `url(${listing.imageUrls[0]}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                  className="h-[500px]"
                  key={listing._id}
                >
                  {" "}
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>

      {/* listing results and offers */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className="my-3 ">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent Offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show More Offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => {
                return <ListingItem listing={listing} key={listing._id} />;
              })}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div>
            <div className="my-3 ">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show More palces for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => {
                return <ListingItem listing={listing} key={listing._id} />;
              })}
            </div>
          </div>
        )}
        {sellListings && sellListings.length > 0 && (
          <div>
            <div className="my-3 ">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sell
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sell"}
              >
                Show More palces for sell
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {sellListings.map((listing) => {
                return <ListingItem listing={listing} key={listing._id} />;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
