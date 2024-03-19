import React from 'react';

const TermsAndConditionsPage = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">1. Introduction</h2>
          <p className="mb-4">
            These <span className="text-gradient">Terms and Conditions</span> govern your use of the Car Rental Management System website and its services.
          </p>
          <h2 className="text-xl font-bold mb-4">2. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing or using the website, you agree to be bound by these <span className="text-gradient">Terms and Conditions</span>.
          </p>
          <h2 className="text-xl font-bold mb-4">3. Use of the Service</h2>
          <p className="mb-4">
            You agree not to misuse or abuse the service provided by Car Rental Management System.
          </p>
          <div className="">
            <button className="bg-gradient-to-r from-sky-500 to-violet-500 hover:from-violet-500 hover:to-sky-500 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 hover:bg-gradient-to-r hover:from-violet-500 hover:to-sky-500 transition duration-300 ease-in-out">Accept Terms</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
