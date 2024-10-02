import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  MdOutlineStar,
  MdOutlineStarBorder,
  MdOutlineStarHalf,
} from "react-icons/md";

function CarDetail() {
  const [car, setCar] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { car_id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/viewcars?car_id=${car_id}`)
      .then((res) => {
        const selectedCar = res.data.find((car) => car.car_id == car_id);
        setCar(selectedCar);
        axios
          .get(`http://localhost:3000/reviews/${car_id}`)
          .then((res) => {
            const reviewsObject = res.data;
            const allReviews = reviewsObject.map((review) =>
              review.car_id == car_id ? review : ""
            );
            if (allReviews.length <= 1) {
              setReviews(allReviews[0]);
              
            }
            else {
              setReviews(allReviews[1])
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [car_id]);

  const overall = reviews.overall_stars?reviews.overall_stars:0
  const renderStars = (rating) => {
    const filledStars = [];
    const emptyStars = [];

    for (let i = 0; i < Math.floor(rating); i++) {
      filledStars.push(<MdOutlineStar fill={"#ffe234"} key={`full_${i}` } />);
    }
    // This condition checks if there is a fractional part remaining after removing the integer part from rating. If the fractional part is greater than or equal to 0.5, it means we need to add a half star.
    if (rating - Math.floor(rating) >= 0.5) {
      filledStars.push(<MdOutlineStarHalf fill={"#ffe234"} key="half"/>);
    }

    for (let i = Math.ceil(rating); i < 5; i++) {
      emptyStars.push(<MdOutlineStarBorder fill={"#ffe234"} key={`empty${i}` }/>);
    }

    return (
      <div className="flex items-center">
        {filledStars}
        {emptyStars}
      </div>
    );
  };

  

  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-5 font-['Neue_Montreal']">
      <div className="image w-1/2 bg-white-400">
        <img
          className="w-full h-full rounded-md mix-blend-multiply"
          src={`http://localhost:3000/images/${car.car_image}`}
          alt=""
        />
      </div>
      <div className="bottom -mt-8 w-4/5 px-12 py-2 flex flex-col z-[100] justify-around bg-zinc-100 rounded-md">
        <div>
          <h1 className="text-2xl tracking-wider font-bold">{car.model}</h1>
          <div className="text-slate-500 text-sm">
            <ul className="flex gap-5">
              <li>{car.c_type}</li>
              <li>Price: {car.rate}/hr</li>
              <li>{car.capacity} Seats</li>
              <li>{car.color}</li>
            </ul>
          </div>
        </div>
        <div className="ratings bg-zinc-100 flex flex-col my-2">
          <h1 className="text-lg font-semibold">Ratings</h1>
          <div className="flex items-center gap-2 my-2">
            <h2 className="text-sm">4.2/4.5</h2>
            {renderStars(overall)}
          </div>
          <hr className="border-[0.5px] border-zinc-200" />
          <div className="rating flex text-sm my-2">
            <div className="p-2 rating-headings">
              {Object.keys(reviews).map((reviewKey, index) => (
                <div key={index}>
                  {/* Exclude review_id and car_id fields */}
                  {!(reviewKey === "review_id" || reviewKey === "car_id" ||reviewKey === "user_id"|| reviewKey==="overall_stars") && (
                    <div className="flex items-center w-full justify-center gap-5">
                      <div className=" w-full  px-2">
                        <p className="text-[16px]">{reviewKey}</p>
                      </div>
                      <div className="flex text-lg items-center">
                        {renderStars(reviews[reviewKey])}
                      </div>
                      <div className="flex "> <p>{reviews[reviewKey]}</p></div>

                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="p-2 rating-stars"></div>
          </div>
        </div>
        <h1 className="text-lg my-2 font-semibold">About the car</h1>
        <hr className="border-[0.5px] border-zinc-200 my-2" />
        <div className="w-1/2 flex gap-7 flex-wrap">
          {[
            "Cruise Control",
            "Full boot space",
            "Anti-lock Braking System (ABS)",
            "Carrier on top",
            "Voice control",
            "Panoramic Sunroof",
          ].map((about) => {
            return (
              <div key={about} className="text-sm flex">
                {about}
              </div>
            );
          })}
        </div>
        <div className="flex gap-20 my-5 text-white">
          <Link to={`/carlist/${car.car_id}/proceed`}>
            <button className="border-[1px] border-zinc-800 bg-red-500 p-2 rounded-md">
              Proceed to rent
            </button>
          </Link>
          <button className="border-[1px] border-zinc-800 bg-blue-500 p-2 rounded-md">
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default CarDetail;
