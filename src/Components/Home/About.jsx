import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

const About = () => {
  return (
    <div className="w-full flex items-center h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">About Our Car Rental Management System</h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Welcome to our modern and efficient car rental management system. We strive to provide the best experience for both car rental businesses and their customers.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Our platform offers a seamless and user-friendly interface for managing your fleet, reservations, and customer interactions. Whether you're a small car rental startup or a large enterprise, our system scales to meet your needs.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          With advanced features such as real-time availability, automated billing, and customizable reporting, you can streamline your operations and focus on growing your business.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Have questions or need assistance? Our dedicated support team is here to help you every step of the way.
        </p>
        <div className="">
          <Link to="/contact" className="bg-gradient-to-r from-sky-500 to-violet-500 hover:from-violet-500 hover:to-sky-500 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 hover:bg-gradient-to-r hover:from-violet-500 hover:to-sky-500 transition duration-300 ease-in-out">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
