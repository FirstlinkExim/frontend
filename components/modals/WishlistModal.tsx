import useWishlistModal from "@/hooks/modals/useWishlistModal";
import React from "react";
import Modal from "./Modal";
import { IProduct } from "@/types";
import Image from "next/image";
import formatPrice from "@/utils/formatPrice";
import Link from "next/link";

const WishlistModal = ({
  product,
  active,
}: {
  product: IProduct;
  active: boolean;
}) => {
  const wishlistModal = useWishlistModal();

  const body = (
    <>
      <h2 className="text-center text-lg mb-6 font-bold">
        The product successfully {active ? "added to" : "removed from"} wishlist
      </h2>
      <div className="flex gap-4">
        <Image
          src={product.images[0].url}
          alt={product.title}
          width={150}
          height={150}
          className="rounded object-contain"
        />
        <div>
          <p className="font-medium">{product.title}</p>
          <p className="text-xs text-gray-600 line-clamp-6 my-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-4">
            <p className="text-primary font-medium">
              {formatPrice(product.price, product.currency)}
            </p>
            <Link href="/wishlist" className="underline">
              View your wishlist
            </Link>
          </div>
        </div>
      </div>
    </>
  );
  return (
    <Modal
      isOpen={wishlistModal.isOpen}
      onClose={wishlistModal.onClose}
      body={body}
      width="xl"
    />
  );
};

export default WishlistModal;
