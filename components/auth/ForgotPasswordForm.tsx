"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ForgotPasswordSchema } from "@/schemas";
import Input from "../inputs/Input";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import Button from "../buttons/Button";
import Link from "next/link";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";

type Schema = z.infer<typeof ForgotPasswordSchema>;

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = (data: Schema) => {
    console.log(data);
  };

  const error = "Invalid mail";
  return (
    <form className="bg-white border border-gray-300 rounded p-4 flex flex-col gap-4">
      <FormError message={error} />
      <FormSuccess message="Email sent" />

      <Input
        type="email"
        id="email"
        register={register}
        label="Email Address"
        error={errors.email?.message}
        icon={IoMailOutline}
        placeholder="john.doe@email.com"
      />

      <Button label="Reset password" onClick={handleSubmit(onSubmit)} />

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

export default ForgotPasswordForm;
