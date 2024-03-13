import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

function SUVcars() {
  const [carData, setCarData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/view_suv',carData)
    .then(res => setCarData(res.data))      //data is from backend
    .catch(err=> console.log(err))
    
  },[])

  return (
    <div>
       <div className='w-full p-20'>
      <h1 className='text-xl font-semibold mb-10'>List of SUV cars</h1>
      <div className='bg-zinc-100 w-full grid grid-cols-3 gap-10'>
          
          {Object.keys(carData).map((d, i) => (     //Object.keys(carData) is used to get an array of keys from the carData object.
            <div key={i} className="bg-zinc-200 rounded-lg p-5">
              <div className="image w-full h-4/6 bg-zinc-300">
                <img className='rounded-lg w-full h-full mb-5' src={`http://localhost:3000/images/` + carData[i].car_image} alt="" />
                </div>
            <div className='font-bold'>{carData[i].model }</div> 
            <div className='font-medium'>{carData[i].color }</div>
            <div className="bg-zinc-200">{carData[i].c_type }</div>
              <div className="bg-zinc-200">{carData[i].capacity}</div>
              <Link to={`/carlist/${carData[i].model}`}><button className='border-[1px]ww border-zinc-900 bg-[blueviolet] px-2 py-1 rounded-md text-white'>Book</button></Link> 
            </div>
            ))}
      </div>
    </div>    
    </div>
  )
}

export default SUVcars