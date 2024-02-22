import React, { useCallback, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Control, Controller } from "react-hook-form";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

const StepOne = ({ control }: { control: Control<FormData> }) => {
  const [phone, setPhone] = useState("");
  const handlePhoneChange = useCallback(
    (val: string) => {
      console.log(typeof val);
      setPhone(val); // Update the phone state
    },
    [setPhone]
  );
  return (
    <form className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        <Controller
          control={control}
          name="firstName"
          render={({ field, formState: { errors } }) => (
            <input
              type="text"
              {...field}
              placeholder="First name*"
              className={`w-full py-3 px-2 border rounded-md text-sm outline-none ${
                errors.firstName?.message ? "border-red-600" : "border-gray-300"
              }`}
            />
          )}
        />
        <Controller
          control={control}
          name="lastName"
          render={({ field, formState: { errors } }) => (
            <input
              type="text"
              {...field}
              placeholder="Last name*"
              className={`w-full py-3 px-2 border rounded-md text-sm outline-none ${
                errors.lastName?.message ? "border-red-600" : "border-gray-300"
              }`}
            />
          )}
        />
      </div>
      <Controller
        control={control}
        name="email"
        render={({ field, formState: { errors } }) => (
          <input
            type="email"
            {...field}
            placeholder="Email*"
            className={`w-full py-3 px-2 border rounded-md text-sm outline-none ${
              errors.email?.message ? "border-red-600" : "border-gray-300"
            }`}
          />
        )}
      />
      <Controller
        control={control}
        name="address"
        render={({ field, formState: { errors } }) => (
          <input
            type="text"
            {...field}
            placeholder="Street Address*"
            className={`w-full py-3 px-2 border rounded-md text-sm outline-none ${
              errors.address?.message ? "border-red-600" : "border-gray-300"
            }`}
          />
        )}
      />
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        <Controller
          control={control}
          name="city"
          render={({ field, formState: { errors } }) => (
            <input
              type="text"
              {...field}
              placeholder="City*"
              className={`w-full py-3 px-2 border rounded-md text-sm outline-none ${
                errors.city?.message ? "border-red-600" : "border-gray-300"
              }`}
            />
          )}
        />
        <Controller
          control={control}
          name="state"
          render={({ field, formState: { errors } }) => (
            <input
              type="text"
              {...field}
              placeholder="State*"
              className={`w-full py-3 px-2 border rounded-md text-sm outline-none ${
                errors.state?.message ? "border-red-600" : "border-gray-300"
              }`}
            />
          )}
        />
        <Controller
          control={control}
          name="zipCode"
          render={({ field, formState: { errors } }) => (
            <input
              type="text"
              {...field}
              placeholder="Zip Code*"
              className={`w-full py-3 px-2 border rounded-md text-sm outline-none ${
                errors.zipCode?.message ? "border-red-600" : "border-gray-300"
              }`}
            />
          )}
        />
        <Controller
          control={control}
          name="country"
          render={({ field, formState: { errors } }) => (
            <input
              type="text"
              {...field}
              placeholder="Country*"
              className={`w-full py-3 px-2 border rounded-md text-sm outline-none ${
                errors.country?.message ? "border-red-600" : "border-gray-300"
              }`}
            />
          )}
        />
      </div>

      <Controller
        control={control}
        name="phone"
        render={({ field, formState: { errors } }) => (
          <PhoneInput
            defaultCountry="IN"
            placeholder="Phone*"
            {...field}
            className={`w-full py-3 px-2 border rounded-md text-sm outline-none ${
              errors.phone?.message ? "border-red-600" : "border-gray-300"
            }`}
          />
        )}
      />
    </form>
  );
};

export default StepOne;
