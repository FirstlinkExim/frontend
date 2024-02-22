"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import Input from "../inputs/Input";
import { LuUser2, LuKeyRound } from "react-icons/lu";
import { IoMailOutline } from "react-icons/io5";
import Button from "../buttons/Button";
import Link from "next/link";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/config/api";
import { AxiosError } from "axios";
import { handleApiError } from "@/utils/handleApiError";
import { AiOutlineWarning } from "react-icons/ai";
import useSendVerification from "@/hooks/useSendVerification";
import { toast } from "react-toastify";
import useBrowserInfo from "@/hooks/useBrowserInfo";


type Schema = z.infer<typeof RegisterSchema>;

const RegisterForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { sendVerification } = useSendVerification()
  const browserName = useBrowserInfo();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<Schema>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (values: Schema) => {
    setIsLoading(true);
    setError("");
    toast.loading("Loading...")
    try {
      const {data} = await axiosInstance.post("/customers/register", {
        ...values,
        device: browserName,
      });
      
      router.push(`/verification?email=${values.email}`);
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
      toast.dismiss()
    }
  };

  const sendVerificationEmail = async () => {
    const email = getValues("email")
     const data =  await sendVerification(email)
     if(data) {
      router.push(`/verification?email=${email}`);
      console.log(data);
      
     }
     
  }

  return (
    <form className="bg-white border border-gray-300 rounded p-4 flex flex-col gap-4">
      {error === "Email is already registered but not verified" ? (
        <div className="p-3 bg-red-100 rounded text-sm text-red-600 flex gap-2">
          <AiOutlineWarning size={20} />
          <div className="flex flex-col items-start">
            <span>Email is already registered but not verified</span>
            <span onClick={sendVerificationEmail} className="underline cursor-pointer">send verification mail</span>
          </div>
        </div>
      ) : (
        <FormError message={error} />
      )}
      <FormSuccess message={success} />
      <Input
        id="name"
        register={register}
        label="Full Name"
        error={errors.name?.message}
        icon={LuUser2}
        placeholder="John Doe"
      />
      <Input
        type="email"
        id="email"
        register={register}
        label="Email Address"
        error={errors.email?.message}
        icon={IoMailOutline}
        placeholder="john.doe@email.com"
      />
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

      <div className="flex items-center gap-2">
        <input
          id="acceptTerms"
          type="checkbox"
          {...register("acceptTerms")}
          className="w-4 h-4"
        />
        <label htmlFor="acceptTerm" className="text-sm">
          Accept Term & Condition
        </label>
      </div>

      <Button
        loading={isLoading}
        disabled={isLoading}
        label="Sign Up"
        onClick={handleSubmit(onSubmit)}
      />

      <div className="flex items-center gap-4 my-4">
        <div className="w-full h-[1px] bg-gray-200 rounded"></div>
        <span className="opacity-70 text-sm">or</span>
        <div className="w-full h-[1px] bg-gray-200 rounded"></div>
      </div>

      <p className="text-center text-sm text-gray-600">
        Already a member?{" "}
        <Link
          href={"/login"}
          className="text-primary font-medium hover:underline"
        >
          Log in here.
        </Link>{" "}
      </p>
    </form>
  );
};

export default RegisterForm;
