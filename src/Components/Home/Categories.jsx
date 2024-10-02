import React from "react";
import { Link } from "react-router-dom";

function Categories() {

  // Categories representing different types of cars available for rental
const categories = [
  { name: 'SUV', description: 'Spacious and versatile Sport Utility Vehicles, perfect for family trips and off-road adventures.' , route: '/suv' },
  { name: 'Convertible', description: 'Open-top Convertibles, providing a thrilling driving experience with the wind in your hair.', route: '/convertible' },
  { name: 'Hatchback', description: 'Compact and fuel-efficient Hatchbacks, ideal for urban commuting and small groups.', route: '/hatchback' },
  { name: 'Off-Road', description: 'Robust Off-Road vehicles, designed to conquer challenging terrains and adventurous journeys.', route: '/offroad' },
  { name: 'Sedan', description: 'Elegant and comfortable Sedans, suitable for business travel and long-distance cruising.', route: '/sedan' }
];

  // const color=[]
  return (
    <div id="main" className="categories w-full min-h-screen bg-zinc-900 text-white">
      {categories.map((category,index) => (
      <div  key={index}  className="flex justify-between items-center w-full px-10 py-8 border-violet-800 border-b-[1px] bg-gradient-to-r from-sky-500 to-violet-500">
        <div className="category-name">
            <h1 className="font-semibold text-7xl">{category.name}</h1>
        </div>
          <div className="flex flex-col w-[60vh] items-start gap-5 px-5 py-2 text-xl">
            <p className="w-full">{category.description}</p>
        <Link className="rounded-full px-6 py-2 bg-zinc-50 text-black font-semibold" to={category.route} >Get now</Link>
        </div>

      </div>
        ))}
      
    </div>
  );
}

export default Categories;
