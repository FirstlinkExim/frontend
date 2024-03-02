import { useAppSelector } from "@/redux/hooks";
import { ProductState } from "@/redux/slices/productSlice";
import { calculateCartTotals } from "@/utils/calculateTotal";
import React from "react";

const StepTwo = ({ getValues }: { getValues: any }) => {
  const name = getValues("name");
  const email = getValues("email");
  const address = getValues("address");
  const city = getValues("city");
  const state = getValues("state");
  const zipcode = getValues("zipcode");
  const country = getValues("country");
  const phone = getValues("phone");
  const {cart} = useAppSelector(ProductState)
  const { subtotal, total } = calculateCartTotals(cart);
  return (
    <div className="w-full bg-white shadow-sm rounded-md p-4 border relative flex gap-4">
      <div className="md:w-1/2 w-full flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span>Name: </span>
          <span className="text-gray-600">{name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Email: </span>
          <span className="text-gray-600">{email}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Phone: </span>
          <span className="text-gray-600">{phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Address: </span>
          <span className="text-gray-600">{address}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Country: </span>
          <span className="text-gray-600">{country}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>State: </span>
          <span className="text-gray-600">{state}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>City: </span>
          <span className="text-gray-600">{city}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Zip Code: </span>
          <span className="text-gray-600">{zipcode}</span>
        </div>
      </div>

      <div className="md:w-1/2 w-full flex flex-col gap-4">
      <div className="flex items-center gap-2">
          <span>Total Items: </span>
          <span className="text-gray-600">{cart?.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Subtotal: </span>
          <span className="text-gray-600">{subtotal}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span>Total: </span>
          <span className="text-gray-600">{total}</span>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
