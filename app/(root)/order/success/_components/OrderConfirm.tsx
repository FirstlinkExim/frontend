import Button from "@/components/buttons/Button";
import { IOrder } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";

const OrderConfirm = ({ order }: { order: IOrder }) => {
  const router = useRouter();
  return (
    <div>
      <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold">
        Thank you <span className="capitalize">{order?.customer?.name}</span>{" "}
        for your <br /> purchase!
      </h1>

      <div className="p-2 border rounded-md mt-4">
        <p className="text-xl">Your order is confirmed</p>
        <p className="text-sm mt-2">
          You{"'"}ll be notify when it has been sent
        </p>
      </div>

      <div className="border rounded-md p-4 my-4">
        <h4 className="text-xl">Order details</h4>

        <div className="flex items-center justify-between my-4">
          <div className="flex flex-col gap-1">
            <p className="mb-0">Contact Information</p>
            <p className="text-sm text-gray-600">{order?.customer?.email}</p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="mb-0">Payment method</p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-600">
                {order?.paymentInfo?.type}
              </p>
              {"-"}
              <p className="text-sm text-gray-600">{order?.totalPrice}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between my-4">
          <div className="flex flex-col gap-1">
            <p className="mb-0">Shipping address</p>
            <div>
              <p className="text-sm text-gray-600">{order?.customer?.name}</p>
              <p className="text-sm text-gray-600">
                {order?.shippingAddress?.address}
              </p>
              <p className="text-sm text-gray-600">
                {order?.shippingAddress?.country}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p className="mb-0">Billing address</p>
            <div>
              <p className="text-sm text-gray-600">{order?.customer?.name}</p>
              <p className="text-sm text-gray-600">
                {order?.shippingAddress?.address}
              </p>
              <p className="text-sm text-gray-600">
                {order?.shippingAddress?.country}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[200px] mx-auto mt-6">
        <Button
          label="Continue Shopping"
          onClick={() => router.push("/products")}
        />
      </div>
    </div>
  );
};

export default OrderConfirm;
