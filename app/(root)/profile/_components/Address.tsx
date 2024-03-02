import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AddressSchema } from "@/schemas";
import Input from "@/components/inputs/Input";
import { Address } from "@/types";
import Button from "@/components/buttons/Button";
import useGeoLocation from "@/hooks/useGeoLocation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import useAddresses from "@/hooks/queries/useAddresses";
import { FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi2";

type Schema = z.infer<typeof AddressSchema>;

const Address = () => {
  const coordinates = useGeoLocation();
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const { addresses, isLoading } = useAddresses();
  const [editAddressId, setEditAddressId] = useState<string | null>(null);
  const { mutateAsync: createAddressMutation, isPending } = useMutation({
    mutationFn: async (data: Schema) => {
      const response = await axiosPrivate.post(
        "/customers/profile/address",
        data
      );
      return response.data;
    },

    onSuccess: (data) => {
      toast.success("Address created successfully");

      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
    onError: (err: any) => toast.error(err?.response?.data.message),
  });

  const { mutateAsync: updateAddressMutation } = useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosPrivate.patch(
        `/customers/profile/address/${data.addressId}`,
        { ...data }
      );
      return response.data;
    },

    onSuccess: (data) => {
      toast.success("Address updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
    onError: (err: any) => toast.error(err?.response?.data.message),
  });

  const { mutateAsync: deleteAddressMutation } = useMutation({
    mutationFn: async (addressId: string) => {
      const response = await axiosPrivate.delete(
        `/customers/profile/address/${addressId}`
      );
      return response.data;
    },

    onSuccess: (data) => {
      toast.success("Address deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
    onError: (err: any) => toast.error(err?.response?.data.message),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<Schema>({
    resolver: zodResolver(AddressSchema),
  });

  const onSubmit = async (data: Schema) => {
    const responseData = {
      ...data,
      lat: coordinates.latitude,
      lng: coordinates.longitude,
    };

    if (editAddressId) {
      await updateAddressMutation({
        ...responseData,
        addressId: editAddressId,
      });
    } else {
      await createAddressMutation(responseData);
    }
    setValue("address", "");
    setValue("city", "");
    setValue("state", "");
    setValue("country", "");
    setValue("zipcode", "");
  };

  const handleDeleteAddress = async (addressId: string) => {
    await deleteAddressMutation(addressId);
  };

  const handleEditAddress = (address: Address) => {
    setEditAddressId(address._id);
    setValue("address", address.address);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("country", address.country);
    setValue("zipcode", address.zipcode);
  };

  return (
    <>
      <form className="p-4">
        <Input
          id="address"
          register={register}
          label="Your Address"
          error={errors.address?.message}
        />

        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 my-4">
          <Input
            id="country"
            register={register}
            label="Country"
            error={errors.country?.message}
          />

          <Input
            id="state"
            register={register}
            label="State"
            error={errors.state?.message}
          />
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 my-4">
          <Input
            id="city"
            register={register}
            label="City"
            error={errors.city?.message}
          />

          <Input
            id="zipcode"
            register={register}
            label="Zip Code"
            error={errors.zipcode?.message}
          />
        </div>
        <div className="w-[120px]">
          <Button label="Save" onClick={handleSubmit(onSubmit)} />
        </div>
      </form>

      <div className="grid xl:grid-cols-3 sm:grid-cols-2 gap-4 p-4">
        {isLoading
          ? "Loading..."
          : addresses &&
            addresses.length > 0 &&
            addresses.map((obj: Address, index: number) => {
              return (
                <AddressCard
                  key={index}
                  address={obj}
                  handleEditAddress={handleEditAddress}
                  handleDeleteAddress={handleDeleteAddress}
                />
              );
            })}
      </div>
    </>
  );
};

export default Address;

const Location = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string | number;
}) => {
  return (
    <div className="flex gap-2 pr-4">
      <span className="text-sm text-gray-600">{title}: </span>
      <span className="text-sm text-gray-500">{subTitle}</span>
    </div>
  );
};

const AddressCard = ({
  address,
  handleEditAddress,
  handleDeleteAddress,
}: {
  address: Address;
  handleEditAddress: (id: Address) => void;
  handleDeleteAddress: (id: string) => void;
}) => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { mutateAsync: toggleActiveMutation } = useMutation({
    mutationFn: async (addressId: string) => {
      const response = await axiosPrivate.patch(
        `/customers/profile/address/${addressId}/active`
      );
      return response.data;
    },

    onSuccess: (data) => {
      toast.success("Address activated");

      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
    onError: (err: any) => toast.error(err?.response?.data.message),
  });

  const handleToggleActive = useCallback(async () => {
    await toggleActiveMutation(address._id);
  }, [toggleActiveMutation, address._id]);

  return (
    <div
      className={`border border-gray-300 rounded-md p-2 flex flex-col gap-2 cursor-pointer relative`}
    >
      <div className="absolute right-4 top-2">
        <div
          className={`${
            address.isActive &&
            "w-5 h-5 rounded-full border border-primary p-[2px] flex items-center justify-center"
          }`}
        >
          <div
            onClick={handleToggleActive}
            className={` rounded-full ${
              address.isActive
                ? "bg-primary w-3 h-3"
                : "bg-gray-300 w-4 h-4 border"
            }`}
          ></div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        <button onClick={() => handleEditAddress(address)} type="button">
          <FaRegEdit size={18} className="text-blue-600 cursor-pointer" />
        </button>
        <button type="button" onClick={() => handleDeleteAddress(address._id)}>
          <HiOutlineTrash size={18} className="text-primary cursor-pointer" />
        </button>
      </div>

      <Location title="Address" subTitle={address.address} />
      <Location title="City" subTitle={address.city} />
      <Location title="State" subTitle={address.state} />
      <Location title="Country" subTitle={address.country} />
      <Location title="Zip Code" subTitle={address.zipcode} />
      <Location title="Lat" subTitle={address.lat} />
      <Location title="Lng" subTitle={address.lng} />
    </div>
  );
};
