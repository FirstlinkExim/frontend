"use client";

import Button from "@/components/buttons/Button";
import useLike from "@/hooks/useLike";
import { Rating } from "@mui/material";
import React from "react";
import { IoHeartOutline } from "react-icons/io5";
import { MdOutlineLock } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { FaHandHoldingUsd } from "react-icons/fa";

const ProductView = () => {
  const stock = 242;
  const purchased = 180;
  const remainingStock = stock - purchased;
  const stockPercentage = (remainingStock / stock) * 100;
  const { handleLike, isLike } = useLike({ productId: "1" });

  return (
    <div className="md:w-1/2 w-full flex flex-col gap-2 px-4 mt-2">
      <div className="flex items-center gap-2">
        <Rating
          name="half-rating"
          size="small"
          defaultValue={2.5}
          precision={0.5}
        />
        <span className="text-xs text-gray-500">(10) reviews</span>
      </div>
      <h1 className="font-semibold text-2xl">
        Mens Cotton Casual Short Sleeve T-Shirts
      </h1>
      <p className="text-gray-400 text-sm">
        At vero eos et accusamus et iusto odio dignissimos ducimus qui
        blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
        et quas molestias excepturi.
      </p>

      <div className="w-full h-[1px] bg-gray-300 my-4"></div>

      <div className="flex flex-col gap-2 md:w-1/2 w-full">
        <div className="flex items-center gap-2">
          <h5 className="font-semibold text-sm">Brand:</h5>
          <span className="hover:text-primary/70 text-gray-500 text-sm font-normal">
            Soylent Green
          </span>
        </div>
        <div className="flex items-center gap-2">
          <h5 className="font-semibold text-sm">Condition:</h5>
          <span className="text-gray-500 text-sm font-normal">Refurbished</span>
        </div>
        <div className="flex items-center gap-2">
          <h5 className="font-semibold text-sm">Available In Stock:</h5>
          <span
            className={`${
              stock > 0 ? "text-green-600" : "text-red-600"
            } text-sm font-medium`}
          >
            {stock} items
          </span>
        </div>

        {stock > 0 && (
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-sm">
              Hurry up! only <span className="text-primary">{stock}</span> items
              left in stock!
            </p>
            <div className="w-full mt-1 bg-gray-200 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full bg-gradient-to-r from-green-600 to-green-600 "
                style={{ width: `${stockPercentage}%` }}
              ></div>
            </div>
          </div>
        )}

        <h4 className="text-2xl text-primary font-semibold mt-2">₹86.00</h4>

        <div className="flex items-center gap-2 my-2">
          <div className="flex h-[44px] border border-gray-300">
            <button type="button" className="border-r border-gray-300 w-10">
              {"-"}
            </button>
            <div className="h-full w-10 flex items-center justify-center text-sm">
              156
            </div>

            <button type="button" className="border-l border-gray-300 w-10">
              {"+"}
            </button>
          </div>

          <Button label="ADD TO CART" onClick={() => {}} />
        </div>

        <button
          onClick={handleLike}
          className="flex gap-2 text-sm items-center"
        >
          <IoHeartOutline size={24} />
          <span>{isLike ? "Remove From Whishlist" : "Add To Wishlist"}</span>
        </button>

        <div className="my-2">
          {stock > 0 ? (
            <span className="border border-green-600 rounded text-green-600 bg-green-50 text-sm py-1 px-4">
              In Stock
            </span>
          ) : (
            <span className="border border-red-600 rounded text-red-600 bg-red-50 text-sm py-1 px-4">
              Stock Out
            </span>
          )}
        </div>
      </div>

      <div className="my-4 flex flex-col gap-3">
        <div className="flex py-[22px] rounded px-4 w-full bg-gray-100 gap-2">
          <MdOutlineLock size={32} className="text-red-300" />
          <div>
            <h5 className="text-sm font-semibold">Security policy</h5>
            <p className="text-sm text-gray-700 mt-1">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Quisquam, veniam.
            </p>
          </div>
        </div>

        <div className="flex py-[22px] rounded px-4 w-full bg-gray-100 gap-2">
          <TbTruckDelivery size={32} className="text-red-300" />
          <div>
            <h5 className="text-sm font-semibold">Delivery policy</h5>
            <p className="text-sm text-gray-700 mt-1">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Quisquam, veniam.
            </p>
          </div>
        </div>

        <div className="flex py-[22px] rounded px-4 w-full bg-gray-100 gap-2">
          <FaHandHoldingUsd size={32} className="text-red-300" />
          <div>
            <h5 className="text-sm font-semibold">Return policy</h5>
            <p className="text-sm text-gray-700 mt-1">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Quisquam, veniam.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
