"use client";

import { ICart, IProduct } from "@/types";
import { Rating } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { LuHeart } from "react-icons/lu";
import { IoMdHeart } from "react-icons/io";
import { BsCart2 } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import IconButton from "../buttons/IconButton";
import { useRouter } from "next/navigation";
import useLike from "@/hooks/mutations/useLike";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addToCart,
  addToWishlist,
  setColor,
} from "@/redux/slices/productSlice";
import formatPrice from "@/utils/formatPrice";
import useCart from "@/hooks/mutations/useCart";
import useWishlistModal from "@/hooks/modals/useWishlistModal";
import WishlistModal from "../modals/WishlistModal";
import useCartModal from "@/hooks/modals/useCartModal";
import CartModal from "../modals/CartModal";
import { customerState } from "@/redux/slices/customerSlice";
import useNotLoggedInModal from "@/hooks/modals/useNotLoggedInModal";
import NotLoggedInModal from "../modals/NotLoggedInModal";
interface ProductProps {
  product: IProduct;
}
const Product = ({ product }: ProductProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(customerState);
  const { addToCartMutation } = useCart();
  const wishlistModal = useWishlistModal();
  const cartModal = useCartModal();
  const notLoggedInModal = useNotLoggedInModal();
  const { title, price, images, _id, currency, discountPrice, colors } =
    product;
  const { handleProductWishlist, isLike } = useLike({
    product,
    like: product.like,
  });
  const [selectWishlistProduct, setSelectWishlistProduct] =
    useState<IProduct>();
  const [selectCartProduct, setSelectCartProduct] = useState<ICart>();

  const handleAddToCart = async () => {
    if (token) {
      const { colors, sizes, images, ...updatedProductCart } = {
        ...product,
        color: product.colors[0],
        size: product.sizes[0],
        image: product.images[0],
      }
      setSelectCartProduct(updatedProductCart);
      // dispatch(addToCart(updatedProductCart));
      await addToCartMutation({ product: updatedProductCart, quantity: 1 });
      cartModal.onOpen();
    } else {
      notLoggedInModal.setTitle("You must be logged in to manage you cart");
      notLoggedInModal.onOpen();
    }
  };

  const handleWishlist = (product: IProduct) => {
    if (token) {
      setSelectWishlistProduct(product);
      handleProductWishlist();
      wishlistModal.onOpen();
    } else {
      notLoggedInModal.setTitle("You must be logged in to manage you wishlist");
      notLoggedInModal.onOpen();
    }
  };

  const handleColorChoose = (value: string, id: string) => {
    dispatch(setColor(value));
    router.push(`/product/${id}`);
  };

  return (
    <>
      <div className="border overflow-hidden group border-gray-300 rounded relative">
        <Link href={`/product/${_id}`}>
          <Image
            src={images[0].url}
            alt={`product-image-${images[0]._id}`}
            width={300}
            height={300}
            className="w-full h-[200px] object-contain p-2"
          />
        </Link>
        {discountPrice > 0 && (
          <div className="absolute top-4 left-4 px-2 p-2 rounded-md text-[10px] bg-green-600 text-white">
            {discountPrice}% off
          </div>
        )}

        {colors && colors.length > 0 && (
          <div className="flex items-center gap-2 px-4 -translate-x-20 group-hover:translate-x-0 duration-700 transition-all group-hover:opacity-100 opacity-0">
            {colors.map((val, idx) => (
              <div
                onClick={() => handleColorChoose(val, _id)}
                key={idx}
                className="w-5 h-5 rounded-full hover:border hover:border-gray-600 flex items-center justify-center"
              >
                <div
                  style={{ backgroundColor: val }}
                  className="w-4 h-4 rounded-full border"
                ></div>
              </div>
            ))}
          </div>
        )}
        <div className="py-2 px-4 relative">
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

        <div className="absolute top-4 group-hover:translate-y-0 group-hover:opacity-100 opacity-0 transition duration-700 -translate-y-40 right-4 flex flex-col gap-2">
          <IconButton
            icon={LuHeart}
            onClick={() => handleWishlist(product)}
            active={isLike}
          />
          <IconButton icon={BsCart2} onClick={handleAddToCart} />
          <IconButton
            icon={FiExternalLink}
            onClick={() => router.push(`/product/${_id}`)}
          />
        </div>
      </div>
      {wishlistModal.isOpen && selectWishlistProduct && (
        <WishlistModal product={selectWishlistProduct} active={isLike} />
      )}
      {cartModal.isOpen && selectCartProduct && (
        <CartModal product={selectCartProduct} />
      )}
      {notLoggedInModal.isOpen && (
        <NotLoggedInModal title={notLoggedInModal.title} />
      )}
    </>
  );
};

export default Product;
