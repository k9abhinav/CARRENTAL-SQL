import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  MdOutlineStar,
  MdOutlineStarBorder,
  MdOutlineStarHalf,
} from "react-icons/md";

function Convertible() {
  const [carData, setCarData] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/view_convertible")
      .then((res) => {
        setCarData(res.data);
        axios
          .get("http://localhost:3000/reviews")
          .then((res) => {
            setReviews(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  const calculateAverageRating = (carId) => {
    let overallStars;
    const carReviews = reviews.filter((review) => review.car_id === carId);
    if (carReviews.length === 0) return 0;
    console.log(carReviews)
    const carReviewOfOne = carReviews[1];
    console.log(carReviewOfOne);
    if (carReviewOfOne) {
      overallStars = carReviewOfOne.overall_stars;
    };
    return overallStars;
  }

  const renderStars = (rating) => {
    const filledStars = [];
    const emptyStars = [];

    for (let i = 0; i < Math.floor(rating); i++) {
      filledStars.push(
        <MdOutlineStar fill={"#ffe234"} className="text-xl" key={`filled_${i}`} />
      );
    }

    if (rating - Math.floor(rating) >= 0.5) {
      filledStars.push(
        <MdOutlineStarHalf fill={"#ffe234"} className="text-xl" key="half" />
      );
    }

    for (let i = filledStars.length; i < 5; i++) {
      emptyStars.push(
        <MdOutlineStarBorder fill={"#ffe234"} className="text-xl" key={`empty_${i}`} />
      );
    }

    return (
      <div className="flex">
        {filledStars}
        {emptyStars}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-10 bg-[#F0F3F5]">
      <div className="filters w-full flex pb-5 gap-4">
        <div className="p-2 bg-white rounded-md">Fast</div>
        <div className="p-2 bg-white rounded-md">Speed</div>
        <div className="p-2 bg-white rounded-md">Mangalore</div>
        <div className="p-2 bg-white rounded-md">Driver friendly</div>
        <div className="p-2 bg-white rounded-md">Round trip</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {carData.map((car) => (
          <div key={carData[i].car_id} className="border border-gray-200 rounded-lg bg-white shadow-md">
            <img
              className="w-full h-56 object-cover rounded-t-md"
              src={`http://localhost:3000/images/${carData[i].car_image}`}
              alt={carData[i].model}
            />
            <div className="p-4">
              <div className="para flex gap-2">
                <p className="text-gray-600">{carData[i].c_type}</p>
                <p className="text-gray-600">{carData[i].color}</p>
                <p className="text-gray-600">{carData[i].capacity} seaters</p>
              </div>
              <h2 className="font-semibold text-lg mb-5">{car.model}</h2>
              <div className="flex items-center gap-2 mb-2">
                {renderStars(calculateAverageRating(carData[i].car_id))}
              </div>
              {car.stock > 0 ? (
                <div className="flex gap-5 items-center">
                  <h2>Available {car.stock} stocks</h2>
                  <Link to={`/carlist/${car.car_id}`}>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                      Book
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="flex gap-5 items-center">
                  <button className="cursor-not-allowed opacity-50 bg-gray-400 hover:bg-gray-400 text-white px-4 py-2 rounded-md">
                    Book
                  </button>
                  <h2>Out of stock</h2>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Convertible;
