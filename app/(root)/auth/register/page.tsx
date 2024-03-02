import RegisterForm from "@/components/auth/RegisterForm";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="container py-4 my-8">
      <div className="max-w-lg w-full mx-auto">
        <h2 className="sm:text-2xl text-xl font-bold text-center mb-8">
          Start Shopping Smarter - Sign Up for Free!
        </h2>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
