"use client";

import { Rating } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { MdStarOutline, MdOutlineDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
const labels: { [index: string]: string } = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const ProductReview = () => {
  const [message, setMessage] = useState("");
  const [value, setValue] = useState<number | null>(2);
  const [hover, setHover] = useState(-1);
  return (
    <div className="">
      <div className="flex lg:flex-row flex-col gap-8">
        <div className="flex gap-4 md:w-[500px] w-full">
          <div className="w-14 h-14 rounded-full ">
            <Image
              src="https://res.cloudinary.com/pavitarsharma/image/upload/v1683457291/dm5pkbvd9q10mwqxrbdp.png"
              alt="user"
              width={80}
              height={80}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex-1">
            <textarea
              name="message"
              id="message"
              rows={3}
              value={message}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setMessage(e.target.value)
              }
              className="flex-1 w-full border border-gray-300 rounded outline-0"
            ></textarea>

            <div className="flex gap-4 mt-1">
              <p className="text-sm">Review: </p>

              <Rating
                size="small"
                name="hover-feedback"
                value={value}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={
                  <MdStarOutline style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              {value !== null && (
                <p className="text-sm">
                  {labels[hover !== -1 ? hover : value]}
                </p>
              )}
            </div>

            <div className="w-1/2 mt-2">
              <button className="bg-primary text-white text-sm font-medium h-9 cursor-pointer px-8 rounded">
                Submit
              </button>
            </div>
          </div>
        </div>


        <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto">
          <Reviews />
          <Reviews />
          <Reviews />
          <Reviews />
          <Reviews />
          <Reviews />
          <Reviews />
          <Reviews />
          <Reviews />
          <Reviews />
          <Reviews />
          <Reviews />
          <Reviews />
          <Reviews />
          <Reviews />
          <Reviews />
          <Reviews />
        </div>
      </div>
    </div>
  );
};

export default ProductReview;

const Reviews = () => {
  return (
    <div className="flex gap-2 border p-4 rounded">
      <div className="w-12 h-12 rounded-full">
        <Image
          src="https://res.cloudinary.com/pavitarsharma/image/upload/v1683457291/dm5pkbvd9q10mwqxrbdp.png"
          alt="user"
          width={80}
          height={80}
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      <div className="flex-1">
        <div className="flex  justify-between">
          <div className="flex flex-col">
            <p className="font-medium text-sm">John Doe</p>
            <Rating
              size="small"
              name="half-rating-read"
              defaultValue={4.5}
              precision={0.5}
              readOnly
            />
          </div>

          <p className="text-sm text-gray-500">20 feb, 2024</p>
        </div>

        <div>
          <p className="text-xs mt-2 opacity-80">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias
            debitis enim aliquid reiciendis cum deleniti dolores corrupti natus
            necessitatibus quaerat.
          </p>

          <div className="flex items-center gap-2 mt-2">
            <button>
              <FiEdit className="text-blue-600" />
            </button>

            <button>
              <MdOutlineDeleteOutline size={20} className="text-primary" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
