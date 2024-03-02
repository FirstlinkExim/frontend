import React from "react";
import Modal from "./Modal";
import { ICart } from "@/types";
import Image from "next/image";
import formatPrice from "@/utils/formatPrice";
import Link from "next/link";
import useCartModal from "@/hooks/modals/useCartModal";

const CartModal = ({ product }: { product: ICart }) => {
  const cartModal = useCartModal();

  const body = (
    <div className="flex flex-col  items-center">
      <h2 className="text-center text-lg  font-bold">
        The product successfully added to cart
      </h2>

      <Link href="/cart" className="underline text-center">
        View your cart
      </Link>
    </div>
  );
  return (
    <Modal
      isOpen={cartModal.isOpen}
      onClose={cartModal.onClose}
      body={body}
      width="xl"
    />
  );
};

export default CartModal;
