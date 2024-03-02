"use client";

import useGetCart from "@/hooks/queries/useGetCart";
import { useAppSelector } from "@/redux/hooks";
import { ICartItem, ProductState } from "@/redux/slices/productSlice";
import { ICart } from "@/types";
import { calculateCartTotals } from "@/utils/calculateTotal";
import formatPrice from "@/utils/formatPrice";
import Image from "next/image";
import React from "react";

const OrderSummary = () => {
  const { isLoading } = useGetCart();
  const {cart} = useAppSelector(ProductState)
  const { subtotal, total } = calculateCartTotals(cart);


  return (
    <div className="w-full bg-gray-50 p-2 py-4">
      <div className="w-full flex flex-col gap-4">
        {cart &&
          cart.length > 0 &&
          cart.map((cart: ICartItem) => (
            <div key={cart?._id} className="flex gap-2 w-full">
              <div className="w-[100px] h-[100px]">
              <Image
                src={cart?.product?.image?.url}
                alt={cart?.product?.title}
                width={100}
                height={100}
                className="object-contain w-full h-full rounded-md"
              />
              </div>

              <div className="flex flex-col gap-1 flex-1">
                <h3 className="font-medium text-sm">
                 {cart?.product?.title}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm">
                    Quanitity: <span>{cart?.quantity}</span>
                  </p>
                  <p className="text-gray-700">{formatPrice(
                              cart?.product?.price,
                              cart?.product?.currency
                            )}</p>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="w-full h-[1px] bg-gray-200 my-8"></div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="opacity-70 text-sm">Subtotal:</span>
          <span className="opacity-70 text-sm">{subtotal}</span>
        </div>

        <div className="flex items-center justify-between">
          <span>Total:</span>
          <span>{total}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
