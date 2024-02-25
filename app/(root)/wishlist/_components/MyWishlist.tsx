"use client";

import Product from "@/components/products/Product";
import { useAppSelector } from "@/redux/hooks";
import { ProductState } from "@/redux/slices/productSlice";
import { IProduct } from "@/types";
import React from "react";

const MyWishlist = () => {
  const { wishlists } = useAppSelector(ProductState);
  const isLoading = false;

  return (
    <>
      <div className="my-10">
        {isLoading ? (
          "Loading...."
        ) : wishlists && wishlists.length > 0 ? (
          <div className="grid  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {wishlists.map((product: IProduct) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="max-w-xl w-full mx-auto my-10 ">
            <p className="mb-2 text-sm">My Wishlist</p>
            <div className="py-8 border-t border-b">
              <p className="text-sm text-center">
                No products added to the wishlist
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyWishlist;
