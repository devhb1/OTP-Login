//create a stat var isOTPSent which is initialy set to false and phone number which is empty
// if isotpsent is false then it calls NumberInput component and





import React, { useState } from 'react';
import NumberInput from './NumberInput';
import OTPInput from './OTPInput';

const OTPLogin = () => {
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSendOTP = (number) => {
    setPhoneNumber(number);
    setIsOTPSent(true);
    // Here you would typically send the OTP to the server
  };

  const handleVerifyOTP = (otp) => {
    // Verify the OTP (this would involve backend verification)
    alert(`Verifying OTP: ${otp} for phone number: ${phoneNumber}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-80">
      <h2 className="text-center text-2xl font-semibold mb-4">Login via OTP</h2>
      {!isOTPSent ? (
        <NumberInput onSendOTP={handleSendOTP} />
      ) : (
        <OTPInput onVerifyOTP={handleVerifyOTP} />
      )}
    </div>
  );
};

export default OTPLogin;
