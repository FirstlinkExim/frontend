import Input from "@/components/inputs/Input";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { EditProfileSchema } from "@/schemas";
import { FiMail, FiUser, FiPhone } from "react-icons/fi";
import TextArea from "@/components/inputs/TextArea";
import Image from "next/image";
import useProfile from "@/hooks/queries/useProfile";
import { FaRegEdit } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import Button from "@/components/buttons/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

type Schema = z.infer<typeof EditProfileSchema>;
const MyProfile = () => {
  const { customer } = useProfile();
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<Schema>({
    resolver: zodResolver(EditProfileSchema),
  });
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  
  const { mutateAsync: updateProfileMutation, isPending } = useMutation({
    mutationFn: async (data: Schema) => {
      const response = await axiosPrivate.patch("/customers/profile", data);
      return response.data;
    },

    onSuccess: (data) => {
      toast.success("Profile updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
    onError: (err: any) => toast.error(err?.response?.data.message),
  });

  const { mutateAsync: updateProfilePictureMutation } = useMutation({
    mutationFn: async (data: File) => {
      const formData = new FormData();
      formData.append("profileImg", data);
      const response = await axiosPrivate.patch(
        "/customers/profile/picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },

    onSuccess: () => {
      toast.success("Profile picture updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
    onError: (err: any) => toast.error(err?.response?.data.message),
  });

  useEffect(() => {
    if (customer) {
      setValue("name", customer.name);
      setValue("email", customer.email);
      setValue("phone", customer.phone);
      setValue("username", customer.username);
      setValue("bio", customer.bio);
    }
  }, [customer, setValue]);

  const onSubmit = async (data: Schema) => {
    await updateProfileMutation(data);
  };

  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const editProfileImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files![0];
    await updateProfilePictureMutation(file);
  };

  return (
    <>
      <div className="w-[200px] h-[200px] relative">
        <Image
          src={
            customer?.profileImg ? customer?.profileImg.url : "/images/user.png"
          }
          alt="profile"
          width={300}
          height={300}
          className="rounded-full object-cover w-full h-full"
        />
        <label
          htmlFor="profileImg"
          className="absolute bottom-8 right-2 flex items-center justify-center"
        >
          <input
            id="profileImg"
            type="file"
            ref={hiddenFileInput}
            onChange={editProfileImage}
            accept="image/*"
            hidden
          />
          <button onClick={handleClick} className="text-2xl text-gray-600 ">
            <FaRegEdit />
          </button>
        </label>
      </div>

      <form className="w-full p-4 flex flex-col gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <Input
            id="name"
            register={register}
            placeholder="John Doe"
            icon={FiUser}
            label="Name"
          />

          <Input
            id="email"
            register={register}
            placeholder="john.doe@email.com"
            icon={FiMail}
            label="Email"
            readOnly
          />
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <Input
            id="phone"
            register={register}
            placeholder="+1 123-123-123"
            icon={FiPhone}
            label="Phone"
          />

          <Input
            id="username"
            register={register}
            placeholder="@john"
            icon={MdAlternateEmail}
            label="Username"
          />
        </div>
        <TextArea register={register} id="bio" label="Bio" />

        <div className="w-[120px]">
          <Button
            disabled={isPending}
            loading={isPending}
            label="Save"
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </form>
    </>
  );
};

export default MyProfile;
