import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AddressSchema } from "@/schemas";
import Input from "@/components/inputs/Input";
import { Address } from "@/types";
import Button from "@/components/buttons/Button";

type Schema = z.infer<typeof AddressSchema>;

const address: Address[] = [
  {
    address: "Kulas Light",
    city: "Washington",
    state: "DC",
    country: "United States",
    zipCode: "20500",
    lat: -37.3159,
    lng: 81.1496,
    isActive: true,
  },
  {
    address: "Victor Plains",
    city: "Wisokyburgh",
    state: "DC",
    country: "United States",
    zipCode: "0566-7771",
    lat: -43.9509,
    lng: -34.4618,
    isActive: false,
  },
  {
    address: "Victor Plains",
    city: "Wisokyburgh",
    state: "DC",
    country: "United States",
    zipCode: "0566-7771",
    lat: -43.9509,
    lng: -34.4618,
    isActive: false,
  },
  {
    address: "Victor Plains",
    city: "Wisokyburgh",
    state: "DC",
    country: "United States",
    zipCode: "0566-7771",
    lat: -43.9509,
    lng: -34.4618,
    isActive: false,
  },
  {
    address: "Victor Plains",
    city: "Wisokyburgh",
    state: "DC",
    country: "United States",
    zipCode: "0566-7771",
    lat: -43.9509,
    lng: -34.4618,
    isActive: false,
  },
];

const Address = () => {
  const [isActive, setIsActive] = useState(0);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<Schema>({
    resolver: zodResolver(AddressSchema),
  });

  const handleActiveAddress = useCallback((id: number) => setIsActive(id), []);

  const onSubmit = (data: Schema) => {
    console.log(data);
    setValue("address", "")
    setValue("city", "")
    setValue("state", "")
    setValue("country", "")
    setValue("zipCode", "")
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
            id="zipCode"
            register={register}
            label="Zip Code"
            error={errors.zipCode?.message}
          />
        </div>
        <div className="w-[120px]">
          <Button label="Save" onClick={handleSubmit(onSubmit)} />
        </div>
      </form>

      <div className="grid xl:grid-cols-3 sm:grid-cols-2 gap-4 p-4">
        {address &&
          address.length > 0 &&
          address.map((obj: Address, index: number) => {
            const active = isActive === index;
            return (
              <div
                key={index}
                onClick={() => handleActiveAddress(index)}
                className={`border border-gray-300 rounded-md p-2 flex flex-col gap-2 cursor-pointer relative`}
              >
                <div className="absolute right-4 top-2">
                  <div
                    className={`${
                      active &&
                      "w-5 h-5 rounded-full border border-primary p-[2px] flex items-center justify-center"
                    }`}
                  >
                    <div
                      className={` rounded-full ${
                        active
                          ? "bg-primary w-3 h-3"
                          : "bg-gray-100 w-4 h-4 border"
                      }`}
                    ></div>
                  </div>
                </div>
                <Location title="Address" subTitle={obj.address} />
                <Location title="City" subTitle={obj.city} />
                <Location title="State" subTitle={obj.state} />
                <Location title="Country" subTitle={obj.country} />
                <Location title="Zip Code" subTitle={obj.zipCode} />
                <div className="grid grid-cols-2 gap-2">
                  <Location title="Lat" subTitle={obj.lat} />
                  <Location title="Lng" subTitle={obj.lng} />
                </div>
              </div>
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
