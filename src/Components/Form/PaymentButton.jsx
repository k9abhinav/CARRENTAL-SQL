import React from 'react';

const PaymentButton = ({ onClick, icon, children }) => {
  return (
    <button
      className="flex items-center space-x-2 bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300 transition-colors"
      onClick={onClick}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
};

export default PaymentButton;
