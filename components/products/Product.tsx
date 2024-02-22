"use client";

import { IProduct } from "@/types";
import { Rating } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { LuHeart } from "react-icons/lu";
import { IoMdHeart } from "react-icons/io";
import { BsCart2 } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import IconButton from "../buttons/IconButton";
import { useRouter } from "next/navigation";
import useLike from "@/hooks/useLike";
import Link from "next/link";

interface ProductProps {
  product: IProduct;
}
const Product = ({ product }: ProductProps) => {
  const router = useRouter();
  const { title, price, image, id } = product;
  const { handleLike, isLike } = useLike({ productId: "1" });

  const handleAddToCart = () => {};

  return (
    <div className="border border-gray-300 rounded relative">
      <Link href={`/product/${id}`}>
        <Image
          src={image}
          alt={`product-image-${id}`}
          width={300}
          height={300}
          className="w-full h-[200px] object-contain p-2"
        />
      </Link>

      <div className="py-2 px-4">
        <p className="text-sm opacity-8 line-clamp-2 mb-2">{title}</p>
        <Rating
          name="half-rating-read"
          defaultValue={2.5}
          precision={0.5}
          readOnly
          size="small"
        />
        <p className="font-medium">₹{price}</p>
      </div>

      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <IconButton
          icon={isLike ? IoMdHeart : LuHeart}
          onClick={handleLike}
          active={isLike}
        />
        <IconButton icon={BsCart2} onClick={handleAddToCart} />
        <IconButton
          icon={FiExternalLink}
          onClick={() => router.push(`/product/${id}`)}
        />
      </div>
    </div>
  );
};

export default Product;
