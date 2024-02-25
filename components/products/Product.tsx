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
import { useAppDispatch } from "@/redux/hooks";
import { addToCart, addToWishlist } from "@/redux/slices/productSlice";
import formatPrice from "@/utils/formatPrice"
interface ProductProps {
  product: IProduct;
}
const Product = ({ product }: ProductProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch()
  
  const { title, price, images, _id, currency } = product;
  const { handleProductWishlist, isLike } = useLike({ product, like: product.like });

  const handleAddToCart = () => {
    dispatch(addToCart(product))
  };

  return (
    <div className="border border-gray-300 rounded relative">
      <Link href={`/product/${_id}`}>
        <Image
          src={images[1].url}
          alt={`product-image-${images[0]._id}`}
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
        <p className="font-medium">{formatPrice(price, currency)}</p>
      </div>

      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <IconButton
          icon={isLike ? IoMdHeart : LuHeart}
          onClick={handleProductWishlist}
          active={isLike}
        />
        <IconButton icon={BsCart2} onClick={handleAddToCart} />
        <IconButton
          icon={FiExternalLink}
          onClick={() => router.push(`/product/${_id}`)}
        />
      </div>
    </div>
  );
};

export default Product;
