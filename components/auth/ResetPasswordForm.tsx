"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ResetPasswordSchema } from "@/schemas";
import Input from "../inputs/Input";
import { LuKeyRound } from "react-icons/lu";
import Button from "../buttons/Button";
import Link from "next/link";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { FaLongArrowAltLeft } from "react-icons/fa";

type Schema = z.infer<typeof ResetPasswordSchema>;

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit = (data: Schema) => {
    console.log(data);
  };

  const error = "Something went wrong";
  return (
    <form className="bg-white border border-gray-300 rounded p-4 flex flex-col gap-4">
      <FormError message={error} />
      <FormSuccess message="Password Updated" />

      <Input
        type="password"
        id="password"
        register={register}
        label="Password"
        error={errors.password?.message}
        icon={LuKeyRound}
        placeholder="***************"
      />
      <Input
        type="password"
        id="confirmPassword"
        register={register}
        label="Confirm Password"
        error={errors.confirmPassword?.message}
        icon={LuKeyRound}
        placeholder="***************"
      />

      <Button label="Reset Password" onClick={handleSubmit(onSubmit)} />

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

export default ResetPasswordForm;
