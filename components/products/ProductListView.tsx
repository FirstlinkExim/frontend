"use client";

import { ICart, IProduct } from "@/types";
import formatPrice from "@/utils/formatPrice";
import { Rating } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { IoHeartOutline } from "react-icons/io5";
import Button from "../buttons/Button";
import { calculateDiscountedPrice } from "@/utils/calculateTotal";
import Link from "next/link";
import useWishlistModal from "@/hooks/modals/useWishlistModal";
import useCart from "@/hooks/mutations/useCart";
import useNotLoggedInModal from "@/hooks/modals/useNotLoggedInModal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { customerState } from "@/redux/slices/customerSlice";
import { addToCart } from "@/redux/slices/productSlice";
import useLike from "@/hooks/mutations/useLike";
import useCartModal from "@/hooks/modals/useCartModal";
import WishlistModal from "../modals/WishlistModal";
import CartModal from "../modals/CartModal";
import NotLoggedInModal from "../modals/NotLoggedInModal";

interface ProductProps {
  product: IProduct;
}
const ProductListView = ({ product }: ProductProps) => {
  const actualPrice = product.price;
  const discountPrice = product.discountPrice;
  const currency = product.currency;
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(customerState);
  const price = calculateDiscountedPrice(actualPrice, discountPrice);
  const wishlistModal = useWishlistModal();
  const cartModal = useCartModal();
  const { addToCartMutation } = useCart();
  const notLoggedInModal = useNotLoggedInModal();
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
      };
      setSelectCartProduct(updatedProductCart);
      // dispatch(addToCart(updatedProductCart));
      await addToCartMutation({ product: updatedProductCart, quantity: 1 });
      cartModal.onOpen();
    } else {
      notLoggedInModal.setTitle("You must be logged in to manage you cart");
      notLoggedInModal.onOpen();
    }
  };

  const handleWishlist = () => {
    if (token) {
      setSelectWishlistProduct(product);
      handleProductWishlist();
      wishlistModal.onOpen();
    } else {
      notLoggedInModal.setTitle("You must be logged in to manage you wishlist");
      notLoggedInModal.onOpen();
    }
  };

  return (
    <>
      <div className="w-full flex  sm:flex-row flex-col  gap-4 border border-gray-300 rounded-md">
        <div className="sm:w-[200px] sm:h-auto h-[200px] relative">
          <Link href={`/product/${product._id}`}>
            <Image
              src={product.images[0].url}
              alt={`product-${product._id}`}
              width={200}
              height={200}
              className="w-full h-full object-contain rounded-l-md"
            />
          </Link>
          {product.discountPrice > 0 && (
            <div className="absolute top-2 left-2 px-2 p-1 rounded-md text-[10px] bg-green-600 text-white">
              {product.discountPrice}% off
            </div>
          )}
        </div>
        <div className="py-4 pr-4 flex-1 flex flex-col gap-2 sm:px-0 px-4">
          <h2 className=" font-bold">{product.title}</h2>
          <div className="flex items-center gap-2">
            <Rating
              name="half-rating-read"
              defaultValue={product.rating.rate}
              precision={0.5}
              readOnly
              size="small"
            />
            <span className="text-xs opacity-70">
              ({product.rating.count}) Reviews
            </span>
          </div>
          <div className="flex items-center gap-2">
            {discountPrice > 0 && (
              <del className="opacity-50">
                {formatPrice(actualPrice, currency)}
              </del>
            )}
            <p className="font-medium text-primary">
              {formatPrice(price, product.currency)}
            </p>
          </div>
          <p className="text-gray-500 text-sm line-clamp-3">
            {product.description}
          </p>

          <div className="flex items-center gap-2">
            {product.stock > 0 ? (
              <span className="text-xs bg-green-100 border text-green-600 border-green-300 rounded p-1">
                In Stock
              </span>
            ) : (
              <span className="text-xs bg-red-100 border text-red-600 border-red-300 rounded p-1">
                Out of Stock
              </span>
            )}
            <button
              onClick={handleWishlist}
              className="flex items-center text-gray-600 hover:text-primary transition duration-300"
            >
              <IoHeartOutline size={22} className="" />
              <span className="text-sm">Add To Wishlist</span>
            </button>
          </div>

          <div className="w-[120px] mt-2">
            <Button label="Shop Now" onClick={handleAddToCart} />
          </div>
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

export default ProductListView;
