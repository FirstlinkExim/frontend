"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import Input from "../inputs/Input";
import { LuKeyRound } from "react-icons/lu";
import { IoMailOutline } from "react-icons/io5";
import Button from "../buttons/Button";
import Link from "next/link";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { axiosInstance } from "@/config/api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { handleApiError } from "@/utils/handleApiError";
import useBrowserInfo from "@/hooks/useBrowserInfo";
import { useRouter } from "next/navigation";
import { storeInLocalStorage } from "@/config/localstorage";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/slices/customerSlice";
import useSendVerification from "@/hooks/useSendVerification";
import { AiOutlineWarning } from "react-icons/ai";

type Schema = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const browserName = useBrowserInfo();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { sendVerification } = useSendVerification();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Schema>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (values: Schema) => {
    setError("");
    try {
      const { data } = await axiosInstance.post("/customers/login", {
        ...values,
        device: browserName || "",
      });
      toast.success("User successfully logged in");
      storeInLocalStorage("firstlinks_access_token", data?.access_token);
      dispatch(setCredentials(data));
      if (data.customer?.roles.includes("admin")) {
        router.push("/admin");
      } else {
        router.push("/");
      }
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

  const sendVerificationEmail = async () => {
    const email = getValues("email");
    const data = await sendVerification(email);
    if (data) {
      setError("");
      setSuccess(data.message);
    }
  };

  return (
    <form className="bg-white border border-gray-300 rounded p-4 flex flex-col gap-4">
      {error === "User not verified" ? (
        <div className="p-3 bg-red-100 rounded text-sm text-red-600 flex gap-2">
          <AiOutlineWarning size={20} />
          <div className="flex flex-col items-start">
            <span>Email is already registered but not verified</span>
            <span
              onClick={sendVerificationEmail}
              className="underline cursor-pointer"
            >
              send verification mail
            </span>
          </div>
        </div>
      ) : (
        <FormError message={error} />
      )}
      <FormSuccess message={success} />

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

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            id="acceptTerm"
            type="checkbox"
            {...register("rememberMe")}
            className="w-4 h-4"
          />
          <label htmlFor="acceptTerm" className="text-sm underline">
            Remember me
          </label>
        </div>
        <Link
          href={"/forgot-password"}
          className="text-primary hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <Button label="Log In" onClick={handleSubmit(onSubmit)} />

      <div className="flex items-center gap-4 my-4">
        <div className="w-full h-[1px] bg-gray-200 rounded"></div>
        <span className="opacity-70 text-sm">or</span>
        <div className="w-full h-[1px] bg-gray-200 rounded"></div>
      </div>

      <p className="text-center text-sm text-gray-600">
        New to our site?
        <Link
          href={"/auth/register"}
          className="text-primary font-medium hover:underline ml-1"
        >
          Sign up now.
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
