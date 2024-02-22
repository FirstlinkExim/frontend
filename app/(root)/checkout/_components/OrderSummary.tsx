"use client";

import Image from "next/image";
import React from "react";

const OrderSummary = () => {
  return (
    <div className="w-full bg-gray-50 p-2 py-4">
      <div className="w-full flex flex-col gap-4">
        <div className="flex gap-2 w-full">
          <Image
            src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/71-home_default/mug-today-is-a-good-day.jpg"
            alt="product"
            width={120}
            height={120}
            className="object-contain border rounded-md p-2"
          />

          <div className="flex flex-col gap-1">
            <h3 className="font-medium ">Mens Cotton Casual Short Sleeve T-Shirts</h3>
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
            width={120}
            height={120}
            className="object-contain border rounded-md p-2"
          />

          <div className="flex flex-col gap-1">
            <h3 className="font-medium ">Mens Cotton Casual Short Sleeve T-Shirts</h3>
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
            width={120}
            height={120}
            className="object-contain border rounded-md p-2"
          />

          <div className="flex flex-col gap-1">
            <h3 className="font-medium ">Mens Cotton Casual Short Sleeve T-Shirts</h3>
            <div className="flex items-center justify-between">
              <p className="text-sm">
                Quanitity: <span>7</span>
              </p>
              <p className="text-gray-700">₹486.00</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-200 my-8"></div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="opacity-70 text-sm">Subtotal:</span>
          <span className="opacity-70 text-sm">₹486.00</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="opacity-70 text-sm">Taxes:</span>
          <span className="opacity-70 text-sm">----</span>
        </div>



        <div className="flex items-center justify-between">
          <span>Total:</span>
          <span>₹486.00</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
