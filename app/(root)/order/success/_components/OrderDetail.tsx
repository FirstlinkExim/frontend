"use client";

import { IOrder } from "@/types";
import Image from "next/image";
import React from "react";
import { format } from "date-fns";
import { calculateCartTotals } from "@/utils/calculateTotal";
import { ICartItem } from "@/redux/slices/productSlice";
import formatPrice from "@/utils/formatPrice";

const OrderDetail = ({ order }: { order: IOrder }) => {
  const { total, subtotal, totalShipping } = calculateCartTotals(order?.cart);

  return (
    <div>
      <div className="w-full h-6 bg-gray-200 rounded-full"></div>
      <div className="bg-gray-100 -mt-2 p-4 w-[96%] mx-auto rounded relative order-confirm">
        <h1 className="text-xl font-semibold">Order Summary</h1>

        <div className="flex items-center justify-between my-8 border-t border-b border-gray-300 border-dashed py-4">
          <div className="flex flex-col items-center">
            <p className="text-gray-500 text-xs">Date</p>
            <p className="font-semibold text-xs">
              {format(order?.createdAt, "dd MMM, yyyy")}
            </p>
          </div>

          <div className="flex flex-col items-center border-l border-r border-gray-300 px-4">
            <p className="text-gray-500 text-xs">Order Number</p>
            <p className="font-semibold text-xs">{order?.orderId}</p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-gray-500 text-xs">Payment Method</p>
            <p className="font-semibold text-xs">{order?.paymentInfo?.type}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {order?.cart?.map((item: ICartItem) => (
            <div key={item?._id} className="flex gap-2 w-full">
              <Image
                src={item?.product?.image?.url}
                alt={item?.product?.title}
                width={80}
                height={80}
                className="object-cover rounded-md"
              />

              <div className="flex flex-col gap-1">
                <h3 className="font-medium text-sm">{item?.product?.title}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm">
                    Quanitity: <span>{item?.quantity}</span>
                  </p>
                  <p className="text-gray-700">
                    {formatPrice(item?.product?.price, item?.product?.currency)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 py-4 border-t border-b border-gray-300 my-8">
          <div className="flex items-center justify-between">
            <p className="text-sm opacity-70">Sub Total</p>
            <p className="text-sm opacity-70">{subtotal}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm opacity-70">Shipping</p>
            <p className="text-sm opacity-70">{totalShipping}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pb-4">
          <p className="font-semibold">Order Total</p>
          <p className="opacity-70">{total}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
