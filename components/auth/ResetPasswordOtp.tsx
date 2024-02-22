"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { OtpSchema } from "@/schemas";
import Button from "../buttons/Button";
import Link from "next/link";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { FaLongArrowAltLeft } from "react-icons/fa";
import OtpInput from "react-otp-input";

type Schema = z.infer<typeof OtpSchema>;

const ResetPasswordOtp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(OtpSchema),
  });

  const onSubmit = (data: Schema) => {
    console.log(data);
  };

  const error = "Wrong otp";
  return (
    <form className="bg-white border border-gray-300 rounded p-4 flex flex-col gap-4">
      <FormError message={error} />
      <FormSuccess message="OTP verified" />

      <Controller
          control={control}
          name="otp"
          render={({ field }) => (
            <OtpInput
              {...field}
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
                marginBlock: 10
              }}
            />
          )}
        />

      <Button label="Continue" onClick={handleSubmit(onSubmit)} />

      <p className="text-sm text-gray-600 text-center">
        Didn&#39;t receive email?{" "}
        <span className="text-primary underline ">Click to resend</span>
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

export default ResetPasswordOtp;
