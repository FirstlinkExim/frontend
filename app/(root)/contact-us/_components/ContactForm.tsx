"use client";

import Input from "@/components/inputs/Input";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ContactFormSchema } from "@/schemas";
import { FiUser } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineAlternateEmail } from "react-icons/md";
import Button from "@/components/buttons/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/config/api";
import FormError from "@/components/auth/FormError";
import FormSuccess from "@/components/auth/FormSuccess";

type Schema = z.infer<typeof ContactFormSchema>;

const ContactForm = () => {
  const queryClient = useQueryClient();
  const [success, setSuccess] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  setValue
  } = useForm<Schema>({
    resolver: zodResolver(ContactFormSchema),
  });

  const {
    mutateAsync: createContactMutation,
    isError,
    isSuccess,
    error,
    isPending,
  } = useMutation({
    mutationFn: async (data: Schema) => {
      const response = await axiosInstance.post("/contacts", data);
      return response.data;
    },

    onSuccess: (data) => {
      setSuccess(data?.message);

      queryClient.invalidateQueries({
        queryKey: ["contacts"],
      });
    },
  });

  const onSubmit = async (data: Schema) => {
    await createContactMutation(data);
    setValue("name", "")
    setValue("email", "")
    setValue("phone", "")
    setValue("message", "")
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    }
  }, [success]);

  return (
    <>
      {isError && <FormError message={error?.message} />}
      {isSuccess && <FormSuccess message={success} />}
      <form
        className={`flex flex-col gap-4 ${(isError || isSuccess) && "mt-4"}`}
      >
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <Input
            id="name"
            register={register}
            error={errors.name?.message}
            placeholder="John Doe"
            icon={FiUser}
            label="Name"
          />

          <Input
            id="email"
            register={register}
            error={errors.email?.message}
            placeholder="joh@doe.email.com"
            icon={MdOutlineAlternateEmail}
            label="Email"
          />
        </div>
        <Input
          id="phone"
          register={register}
          placeholder="+1 888234765"
          icon={BsTelephone}
          label="Phone"
          error={errors.phone?.message}
        />

        <div>
          <label
            htmlFor="description"
            className="text-xs font-medium text-gray-900"
          >
            Description
          </label>
          <textarea
            rows={8}
            {...register("message")}
            className="w-full border border-gray-300 rounded p-2 outline-none text-sm text-gray-800"
          ></textarea>
          {errors.message?.message && (
            <p className="text-xs text-red-500 ">{errors.message.message}</p>
          )}
        </div>

        <div className="w-[100px]">
          <Button
            disabled={isPending}
            loading={isPending}
            label="Submit"
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </form>
    </>
  );
};

export default ContactForm;
