"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { OtpSchema } from "@/schemas";
import Button from "../buttons/Button";
import Link from "next/link";
import FormError from "./FormError";
import { FaLongArrowAltLeft } from "react-icons/fa";
import OtpInput from "react-otp-input";
import { axiosInstance } from "@/config/api";
import { useRouter } from "next/navigation";
import { handleApiError } from "@/utils/handleApiError";
import { AxiosError } from "axios";
import useSendVerification from "@/hooks/useSendVerification";
import useBrowserInfo from "@/hooks/useBrowserInfo";
import { toast } from "react-toastify";

type Schema = z.infer<typeof OtpSchema>;

const EmailVerifiedOtp = ({ email }: { email: string }) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { sendVerification } = useSendVerification();
  const browserName = useBrowserInfo();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(OtpSchema),
  });

  const onSubmit = async (values: Schema) => {
    setIsLoading(true);
    setError("");
    console.log(browserName);
    toast.loading("Loading...");

    try {
      const { data } = await axiosInstance.post("/customers/verify", {
        email: email,
        otp: +values.otp,
      });
      router.push(`/`);
      toast.success(data.message)
    } catch (error) {
      let message;

      if (error instanceof AxiosError) {
        message = handleApiError(error);
      } else {
        message = "An unexpected error occurred.";
      }
      setError(message);
    } finally {
      setIsLoading(false);
      toast.dismiss();
    }
  };

  const handleResendOtp = async () => {
    await sendVerification(email);
  };

  return (
    <form className="bg-white border border-gray-300 rounded p-4 flex flex-col gap-4">
      <FormError message={error} />

      <Controller
        control={control}
        name="otp"
        render={({ field }) => (
          <OtpInput
            value={field.value}
            onChange={(text) => {
              field.onChange(text);
            }}
            numInputs={6}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              width: "100%",
              height: "48px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              padding: "0 10px",
              outline: "none",
              marginInline: 10,
              marginBlock: 10,
            }}
          />
        )}
      />

      <Button
        disabled={isLoading}
        loading={isLoading}
        label="Continue"
        onClick={handleSubmit(onSubmit)}
      />

      <p className="text-sm text-gray-600 text-center">
        Didn&#39;t receive email?{" "}
        <span
          onClick={handleResendOtp}
          className="text-primary underline cursor-pointer"
        >
          Click to resend
        </span>
      </p>

      <Link
        href={"/login"}
        className="flex text-center justify-center items-center opacity-70 text-sm hover:text-primary transition"
      >
        <FaLongArrowAltLeft />
        <span className="ml-1">Back to login</span>
      </Link>
    </form>
  );
};

export default EmailVerifiedOtp;
