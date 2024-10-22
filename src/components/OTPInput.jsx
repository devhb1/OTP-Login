// create OTPInput component which takes a prop called onVerifyOTP, which is a callback function to handle OTP verification
// create a state var otp which is an array of 4 elements with empty strings
// create a useRef to keep track of each input field's reference, allowing programmatic control over the focus
// create a handleChange function to handle changes in the OTP input fields
// create a handleSubmit function to handle form submission
// return a form element with input fields for OTP and a submit button
 

import React, { useState, useRef } from 'react'; 

const  OTPInput = ({onVerifyOTP}) => {

//If you want to keep using map, you should define otp as an array, like this
   const [otp, setOtp] = useState(new Array(4).fill('')); // store the OTP values as array of 4 element with empty strings
  // const [otp, setOtp] = useState({
  //   0: '',
  //   1: '',  // store the OTP values as array of 4 element with empty strings
  //   2: '',// this is defining it as an object
  //   3: '',
  // });
  
 const inputRefs = useRef([]); // useRef to keep track of each input field's reference, allowing programmatic control over the focus

 const handleChange = (value, index) => { 
  // Function to handle changes in the OTP input fields

  const newOtp = [...otp]; 
  // Create a new array by copying the current OTP state.
  // `...otp` is called the spread operator; it copies the current `otp` array to `newOtp`.
  // This is done because we want to modify a copy of the state without changing the original state directly.

  newOtp[index] = value; 
  // Update the specific index with the new value entered by the user.
  // For example, if the user types a number in the second input field (index 1), 
  // the value at `newOtp[1]` is updated with the new character.

  setOtp(newOtp);
  // Update the state with the new OTP array.
  // This line makes React re-render the component to reflect the latest changes in the input fields.

  if (value && index < 3) { 
    // If a value is entered and it's not the last input field (index less than 3 for a 4-digit OTP),
    // this condition checks if there is a value in the current input field and if the current field
    // is not the last one. The focus will then automatically shift to the next input field.

    inputRefs.current[index + 1].focus(); 
    // Move focus to the next input field.
    // `inputRefs.current` is an array of references to the input fields, allowing us to manipulate them directly.
    // Here, we set the focus to the next input field (index + 1).
  } else if (value.length === 0 && index > 0) {
    // If the input field is empty (user deleted the character), move focus to the previous input field.
    inputRefs.current[index - 1].focus();
  }
};


 const handleSubmit = (e) => {
  e.preventDefault(); // Call the onVerifyOTP function with the joined OTP values as a string
  onVerifyOTP(otp.join(''));
}; 
     

  return (
    <div>
       <form onSubmit={handleSubmit} className="flex flex-col items-center">
     <div className="flex space-x-2 mb-4">
        {/* Map through the OTP array to create individual input fields */}
        {otp.map((_, index) => ( // takes callback function as argument, two parameters: the current item ( _ rep the curr  ele in otp arr)) and the index of that item in the array.
     //  The underscore (_) is used as a convention to indicate that the variable is not needed because we only care about the index. In our example, since we're not using the actual value of the OTP digits from the array, _ serves as a placeholder.
  <input
    key={index} 
    // The `key` prop is a unique identifier for each element in the list.
    // It helps React keep track of which items have changed, added, or removed.

    type="text"
    maxLength="1"  // Restrict input to a single character.
    value={otp[index]} 
    // The value of the input is controlled by the current state.
    // This links the input's value to the corresponding character in the OTP array.

    onChange={(e) => handleChange(e.target.value, index)} 
    
    // This assigns a reference to each input element, stored in `inputRefs`.
    // `inputRefs` is an array that keeps references to all the input fields.
    // This allows direct manipulation of the input elements, like focusing them.
    ref={(el) => (inputRefs.current[index] = el)}
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
    </div>
  )
}

export default OTPInput
