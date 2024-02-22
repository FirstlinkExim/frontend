"use client";

import Image from "next/image";
import React from "react";

const OrderDetail = () => {
  return (
    <div>
      <div className="w-full h-6 bg-gray-200 rounded-full"></div>
      <div className="bg-gray-100 -mt-2 p-4 w-[96%] mx-auto rounded relative order-confirm">
        <h1 className="text-xl font-semibold">Order Summary</h1>

        <div className="flex items-center justify-between my-8 border-t border-b border-gray-300 border-dashed py-4">
          <div className="flex flex-col items-center">
            <p className="text-gray-500 text-xs">Date</p>
            <p className="font-semibold text-xs">20 Feb, 2024</p>
          </div>

          <div className="flex flex-col items-center border-l border-r border-gray-300 px-4">
            <p className="text-gray-500 text-xs">Order Number</p>
            <p className="font-semibold text-xs">765-23456733</p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-gray-500 text-xs">Payment Method</p>
            <p className="font-semibold text-xs">Mastered</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-2 w-full">
            <Image
              src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/71-home_default/mug-today-is-a-good-day.jpg"
              alt="product"
              width={80}
              height={80}
              className="object-cover rounded-md"
            />

            <div className="flex flex-col gap-1">
              <h3 className="font-medium text-sm">
                Mens Cotton Casual Short Sleeve T-Shirts
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-sm">
                  Quanitity: <span>7</span>
                </p>
                <p className="text-gray-700">₹486.00</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 w-full">
            <Image
              src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/71-home_default/mug-today-is-a-good-day.jpg"
              alt="product"
              width={80}
              height={80}
              className="object-cover rounded-md"
            />

            <div className="flex flex-col gap-1">
              <h3 className="font-medium text-sm">
                Mens Cotton Casual Short Sleeve T-Shirts
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-sm">
                  Quanitity: <span>7</span>
                </p>
                <p className="text-gray-700">₹486.00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 py-4 border-t border-b border-gray-300 my-8">
          <div className="flex items-center justify-between">
            <p className="text-sm opacity-70">Sub Total</p>
            <p className="text-sm opacity-70">₹486.00</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm opacity-70">Shipping</p>
            <p className="text-sm opacity-70">₹3.00</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm opacity-70">Tax</p>
            <p className="text-sm opacity-70">₹6.00</p>
          </div>
        </div>

        <div className="flex items-center justify-between pb-4">
          <p className="font-semibold">Order Total</p>
          <p className="opacity-70">₹486.00</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
