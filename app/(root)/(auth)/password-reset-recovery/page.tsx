import ResetPasswordOtp from "@/components/auth/ResetPasswordOtp";
import React from "react";
import { IoMailOpenOutline } from "react-icons/io5";

const PasswordResetRecoveryPage = () => {
  return (
    <div className="container py-4 my-8">
      <div className="max-w-lg w-full mx-auto">
        <div className="border px-2 py-1 rounded flex items-center justify-center mb-6 w-12 mx-auto">
          <IoMailOpenOutline size={24} className="opacity-70" />
        </div>
        <div className="mb-8">
          <h2 className="sm:text-2xl text-xl font-bold text-center">
            Verify OTP
          </h2>
          <p className="text-center text-sm opacity-70 mt-2">
            We send a code to{" "}
            <span className="font-semibold">john.doe@email.com</span>
          </p>
        </div>
        <ResetPasswordOtp />
      </div>
    </div>
  );
};

export default PasswordResetRecoveryPage;
