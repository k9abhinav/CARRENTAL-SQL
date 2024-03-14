import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import { MdOutlineStar, MdOutlineStarBorder, MdOutlineStarHalf } from "react-icons/md";

function CarDetail() {
    const [car, setCar] = useState([]);
    const [reviews, setReviews] = useState([]);
  const { car_id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/viewcars?car_id=${car_id}`)
      .then((res) => {
        const selectedCar = res.data.find((car) => car.car_id == car_id)
          setCar(selectedCar);
          axios.get(`http://localhost:3000/reviews/${car_id}`)
    .then((res) => {
      const reviews = res.data;
      console.log(reviews); // Verify the structure of the response

      // Assuming you have a state variable to store reviews
        reviews.forEach((review) => {
         setReviews(review.car_id==car_id?car_id:"")
     })
    })
    .catch((err) => console.log(err));
      })
        
      .catch((err) => console.log(err));
  }, [car_id]);

  const stars = 0;
  const ratings = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? <MdOutlineStar /> : stars >= number ? <MdOutlineStarHalf /> : <MdOutlineStarBorder />}
      </span>
    )
  });

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
            {ratings}
            <h2 className="text-sm">4.2/4.5</h2>
          </div>
          <hr className="border-[0.5px] border-zinc-200" />
          <div className="rating flex text-sm my-2">
            <div className="p-2 rating-headings">
              {[
                "Value for money",
                "Pickup & Dropoff experience",
                "Cleanliness",
                "Drivability"
              ].map((data) => {
                return <div key={data}>{data}</div>;
              })}
            </div>
            <div className="p-2 rating-stars">
              {["4.2", "4.5", "3.9", "4.1", "4.0"].map((rate) => {
                return (
                  <div className="flex items-center gap-2" key={rate}>
                    <h1 className="w-[1.5vw]">{rate}</h1>
                    <h1 className="flex gap-0.4">{ratings}</h1>
                  </div>
                );
              })}
            </div>
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
            return <div key={about} className="text-sm flex">{about}</div>;
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
