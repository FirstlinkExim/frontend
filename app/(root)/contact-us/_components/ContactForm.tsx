"use client";

import Input from "@/components/inputs/Input";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ContactFormSchema } from "@/schemas";
import { FiUser } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineAlternateEmail } from "react-icons/md";
import Button from "@/components/buttons/Button";

type Schema = z.infer<typeof ContactFormSchema>;

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(ContactFormSchema),
  });

  const onSubmit = (data: Schema) => {
    console.log(data);
  };

  return (
    <>
      <form className="flex flex-col gap-4">
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
          label="Phone(optional)"
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
          {errors.message?.message && <p className="text-xs text-red-500 ">{errors.message.message}</p>}
        </div>

        <div className="w-[100px]">
          <Button label="Submit" onClick={handleSubmit(onSubmit)} />
        </div>
      </form>
    </>
  );
};

export default ContactForm;
