import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChangePasswordSchema } from "@/schemas";
import Input from "@/components/inputs/Input";
import Button from "@/components/buttons/Button";
import { LuKeyRound } from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type Schema = z.infer<typeof ChangePasswordSchema>;
const ChangePassword = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const {
    register,
    formState: { errors, dirtyFields, touchedFields },
    handleSubmit,
    watch,
    reset,
  } = useForm<Schema>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const { mutateAsync: updatePasswordMutation, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosPrivate.patch(
        "/customers/profile/update-password",
        data
      );
      return response.data;
    },

    onSuccess: () => {
      toast.success("Password updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
    onError: (err: any) => toast.error(err?.response?.data.message),
  });

  const onSubmit = async (data: Schema) => {
    await updatePasswordMutation({
      newPassword: data.password,
      ...data,
    });
    reset();
  };

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  // Validation functions
  const validations: Record<string, () => boolean> = {
    "Minimum 8 Characters": () => !!password && password.length >= 8,
    Number: () => !!password && /\d/.test(password),
    Letter: () => !!password && /\w/.test(password),
    "Special Character": () => !!password && /\W/.test(password),
    "Passwords Match": () => {
      return !!password && !!confirmPassword && dirtyFields.confirmPassword
        ? password === confirmPassword
        : false;
    },
  };

  return (
    <>
      <div className="p-4">
        <h4 className="font-semibold mb-4 text-sm">Change Password</h4>
        <form className="flex flex-col gap-4">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <Input
              type="password"
              id="password"
              register={register}
              label="New Password"
              error={errors.password?.message}
              icon={LuKeyRound}
              placeholder="***************"
            />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <Input
              type="password"
              id="confirmPassword"
              register={register}
              label="Confirm Password"
              error={errors.confirmPassword?.message}
              icon={LuKeyRound}
              placeholder="***************"
            />
          </div>

          <div>
            <p className="opacity-70">Password must contains</p>

            <div className="flex flex-col gap-2 my-2">
              {Object.entries(validations).map(([title, validationFn]) => (
                <PassowrdValidation
                  key={title}
                  title={title}
                  isValid={validationFn()}
                  isError={
                    title === "Passwords Match"
                      ? (!!password || !!confirmPassword) && !validationFn()
                      : !!touchedFields.password &&
                        !!touchedFields.confirmPassword &&
                        !validationFn()
                  }
                />
              ))}
            </div>
          </div>

          <div className="w-[150px]">
            <Button
              disabled={isPending}
              loading={isPending}
              label="Change Password"
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;

const PassowrdValidation = ({
  title,
  isValid,
  isError,
}: {
  title: string;
  isValid?: boolean;
  isError?: boolean;
}) => {
  return (
    <div className="flex items-center gap-2">
      {isError ? (
        <IoIosCloseCircle size={18} className="text-red-600" />
      ) : (
        <FaCheckCircle
          size={16}
          className={isValid ? "text-green-600" : "text-gray-400"}
        />
      )}

      <span className="text-sm font-medium text-gray-600">{title}</span>
    </div>
  );
};
