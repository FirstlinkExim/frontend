"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaRegClock, FaExclamationCircle } from "react-icons/fa";
import Button from "@/components/buttons/Button";
import { axiosInstance } from "@/config/api";
import { AxiosError } from "axios";
import { handleApiError } from "@/utils/handleApiError";
import useSendVerification from "@/hooks/useSendVerification";
const VerificationPage = () => {
  const router = useRouter();
  const serachParams = useSearchParams();
  const email = serachParams.get("email");
  const token = serachParams.get("token");
  const [expired, setExpired] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { sendVerification } = useSendVerification();

  useEffect(() => {
    const verifyToken = async () => {
      setError("");
      try {
        await axiosInstance.post("/customers/verify", { token, email });
        setError("");
        setSuccess(true);
      } catch (error) {
        let message;

        if (error instanceof AxiosError) {
          message = handleApiError(error);
        } else {
          message = "An unexpected error occurred.";
        }
        setError(message);
      }
    };
    verifyToken();
  }, [token, email]);
  
  const handleResendVerification = async () => {
    await sendVerification(email as string);
  };

  return (
    <div className="container py-4 my-8">
      {error && (
        <div className="max-w-lg w-full mx-auto">
          {error === "Verification token has expired" ? (
            <>
              <h2 className="text-center mb-8 text-xl font-semibold">
                Token Expired
              </h2>
              <div className="flex flex-col items-center justify-center">
                <FaRegClock className="sm:text-[200px] text-[150px] text-red-600" />
                <p className="text-center text-sm text-gray-600 my-3">
                  {error}
                </p>

                <div className="mt-3">
                  <Button
                    label="Resend Verification Email"
                    onClick={handleResendVerification}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-center mb-8 text-xl font-semibold">Error</h2>
              <div className="flex flex-col items-center justify-center">
                <FaExclamationCircle className="sm:text-[200px] text-[150px] text-red-600" />
                <p className="text-center text-lg text-gray-600 my-3">
                  {error}
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {success && (
        <div className="max-w-lg w-full mx-auto">
          <h2 className="text-center mb-8 text-xl font-semibold">
            Account Activated
          </h2>
          <div className="flex flex-col items-center justify-center">
            <FaCheckCircle className="sm:text-[200px] text-[150px] text-green-600" />
            <p className="text-center text-sm text-gray-600 my-3">
              Thank you, your email has been successfully verified. Your account
              is now active. Please use the below to login to your account.
            </p>

            <div className="mt-3">
              <Button
                label="Login To Your Account"
                onClick={() => router.push("/auth/login")}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationPage;
