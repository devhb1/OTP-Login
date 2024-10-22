import React, { useState, useRef } from 'react'; 

const OTPInput = ({ onVerifyOTP }) => {
  const [otp, setOtp] = useState(new Array(4).fill('')); // store the OTP values as array of 4 element with empty strings
  
   const inputRefs = useRef([]); // useRef to keep track of each input field's reference, allowing programmatic control over the focus

  const handleChange = (value, index) => { // Function to handle changes in the OTP input fields
   
    const newOtp = [...otp];  // Create a new array by copying the current OTP state
      newOtp[index] = value; // Update the specific index with the new value entered by the user
     setOtp(newOtp);// Update the state with the new OTP array

   
    if (value && index < 3) {// If a value is entered and it's not the last input field, focus on the next input field
      inputRefs.current[index + 1].focus(); // Move focus to the next input field
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); 
    // Call the onVerifyOTP function with the joined OTP values as a string
    onVerifyOTP(otp.join(''));
  }; 
           
 return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
     <div className="flex space-x-2 mb-4">
        {/* Map through the OTP array to create individual input fields */}
        {otp.map((_, index) => (
          <input
            key={index} // Unique key for each input element
            type="text" 
            maxLength="1" // Restrict input to a single character
            value={otp[index]} // Controlled input value linked to the state
            onChange={(e) => handleChange(e.target.value, index)} // Handle change event for input field
            ref={(el) => (inputRefs.current[index] = el)} // Assign ref for each input field to inputRefs
            className="w-12 h-12 text-center border border-gray-300 rounded" 
          />
        ))}
      </div>

      <button
        type="submit" 
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600" 
      >
        Login
      </button>
    </form>
  );
};

export default OTPInput; 
