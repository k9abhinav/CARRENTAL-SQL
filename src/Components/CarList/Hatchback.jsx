import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

function Hatchback() {
  const [carData, setCarData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/view_hatchback',carData)
    .then(res => setCarData(res.data))      //data is from backend
    .catch(err=> console.log(err))
    
  },[])

  return (
    <div className='container mx-auto p-10 bg-[#F0F3F5]'>
       <div className="filters w-full flex pb-5 gap-4">
        <div className="p-2 bg-white rounded-md">Fast</div>
        <div className="p-2 bg-white rounded-md">Speed</div>
        <div className="p-2 bg-white rounded-md">Mangalore</div>
        <div className="p-2 bg-white rounded-md">Driver friendly</div>
        <div className="p-2 bg-white rounded-md">Round trip</div>
      </div>
      <div className='bg-zinc-100 w-full grid grid-cols-3 gap-10'>
          
          {Object.keys(carData).map((car, i) => (     //Object.keys(carData) is used to get an array of keys from the carData object.
           <div key={i} className="border border-gray-200 rounded-lg bg-white shadow-md">
           <img
             className="w-full h-56 object-cover rounded-t-md"
             src={`http://localhost:3000/images/${carData[i].car_image}`}
             alt={car.model}
              />
              <div className="p-4">
              <div className="para flex gap-2">
              <p className="text-gray-600">{carData[i].c_type}</p>
              <p className="text-gray-600">{carData[i].color}</p>
                  <p className="text-gray-600">{carData[i].capacity} seaters</p></div>
                  <h2 className="font-semibold text-lg mb-5">{carData[i].model}</h2>
              {carData[i].stock > 0 ? (
              <div className="flex gap-5 items-center">
                <h2>Available {carData[i].stock} stocks</h2>
                <Link to={`/carlist/${carData[i].car_id}`}>
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
  )
}

export default Hatchback