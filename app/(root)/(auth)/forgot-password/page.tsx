import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import React from "react";
import { PiDotsSixBold } from "react-icons/pi";

const ForgotPasswordPage = () => {
  return (
    <div className="container py-4 my-8">
      <div className="max-w-lg w-full mx-auto">
      <div className='border px-2 py-1 rounded flex items-center justify-center mb-6 w-12 mx-auto'>
        <PiDotsSixBold />

        </div>
        <div className="mb-8">
          <h2 className="sm:text-2xl text-xl font-bold text-center">
            Forgot Password?
          </h2>
          <p className="text-center text-sm opacity-70 mt-2">
            No worries, we&#39;ll send you reset instruction.
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
