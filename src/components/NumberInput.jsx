//takes in input number  and sets it to state var(number) and sends it to parent component on submit
// as this component takes onsendsotp as prop from parent component
// and onsubmit it calls the function with number as argument


import React, { useState } from 'react';

const NumberInput = ({ onSendOTP }) => {
  const [number, setNumber] = useState('');

  const handleSubmit = (e) => { 
    e.preventDefault();
    onSendOTP(number); // sends this number to parent component
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your mobile number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Send OTP
      </button>
    </form>
  );
};

export default NumberInput;
