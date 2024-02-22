"use client";

import AddToCart from "@/components/buttons/AddToCart";
import Button from "@/components/buttons/Button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { MdOutlineChevronLeft } from "react-icons/md";

const Cart = () => {
  const [count, setCount] = useState(1);
  const stock = 10;
  const shippingCharge = 7;
  return (
    <div className="flex lg:flex-row flex-col gap-8">
      <div className="flex-1">
        <div className="w-full border border-gray-300 rounded-md">
          <div className="border-b border-b-gray-300 h-10 flex items-center px-4">
            <p>Shoping Cart</p>
          </div>

          <div className="flex-1 p-4">
            <div className="flex justify-between gap-4 w-full">
              <Image
                src={
                  "https://demos.codezeel.com/prestashop/PRS21/PRS210502/70-home_default/mug-today-is-a-good-day.jpg"
                }
                alt="product-image"
                width={100}
                height={100}
                className="border w-[150px] rounded-md"
              />
              <div className="flex md:items-center flex-1 gap-4 justify-between md:flex-row flex-col ">
                <div className="flex-1">
                  <h4 className="font-semibold">
                    Multicolored Open-Knit Crewneck
                  </h4>
                  <h5 className="text-primary font-medium">₹48.00</h5>
                  <div className="flex items-center gap-2 my-1">
                    <span className="text-sm font-medium">Size:</span>
                    <span className="text-sm font-normal opacity-70">
                      Small
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Color:</span>
                    <span className="text-sm font-normal opacity-70">
                      Black
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 flex-1">
                  <AddToCart count={count} setCount={setCount} stock={stock} />

                  <h5 className="text-primary text-lg font-medium">
                    ₹{count * 48}.00
                  </h5>

                  <button className="text-black">
                    <BsTrash size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Link href={"/products"} className="flex items-center mt-2 hover:underline">
          <MdOutlineChevronLeft size={20} />
          <span className="text-sm">Continue Shopping</span>
        </Link>
      </div>

      <div className="lg:w-[450px] border border-gray-300 rounded-md">
        <div className="p-4 border-b border-gray-300 flex flex-col gap-2">
          <CartCheckoutDetail
            title={`${count} items`}
            subTitle={`₹${count * 48}.00`}
          />
          <CartCheckoutDetail title={`Shipping`} subTitle={`₹00.00`} />
        </div>

        <div className="p-4 flex flex-col gap-2">
          <CartCheckoutDetail
            title={`Total(tax excl.)`}
            subTitle={`₹${count * 48}.00`}
          />
          <CartCheckoutDetail
            title={`Total(tax incl.)`}
            subTitle={`₹${count * 48}.00`}
          />
          <CartCheckoutDetail title={`Taxes`} subTitle={`₹00.00`} />

          <div className=" mt-4">
            <Button label="PROCEED TO CHECKOUT" onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

const CartCheckoutDetail = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  return (
    <div className="w-full flex items-center justify-between">
      <span className="font-semibold text-sm">{title}</span>
      <span className="font-semibold text-sm text-primary">{subTitle}</span>
    </div>
  );
};
