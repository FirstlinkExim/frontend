import { axiosInstance } from "@/config/api";
import { handleApiError } from "@/utils/handleApiError";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const useSendVerification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const sendVerification = async (email: string) => {
    setLoading(true);
    setError("");
    setSuccess(false);
    toast.loading("Loading....")
    try {
      const { data } = await axiosInstance.post(
        "/customers/resend-verification",
        { email }
      );
  
      
      return data
    } catch (error) {
      let message;

      if (error instanceof AxiosError) {
        message = handleApiError(error);
      } else {
        message = "An unexpected error occurred.";
      }
      setError(message);
      toast.error(message, { position: "top-center"})
    } finally {
      setLoading(false);
      toast.dismiss();
    }
  };

  return { sendVerification, loading, error, success};

};

export default useSendVerification;
