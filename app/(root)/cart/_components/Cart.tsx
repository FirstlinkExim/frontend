"use client";

import AddToCart from "@/components/buttons/AddToCart";
import Button from "@/components/buttons/Button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  ICartItem,
  ProductState,
  decrementQuantity,
  incrementQuantity,
  removeAllFromCart,
  removeFromCart,
} from "@/redux/slices/productSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsTrash } from "react-icons/bs";
import { MdOutlineChevronLeft } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/navigation";
import formatPrice from "@/utils/formatPrice";
import { calculateCartTotals } from "@/utils/calculateTotal";
import useGetCart from "@/hooks/queries/useGetCart";
import useCart from "@/hooks/mutations/useCart";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { cart } = useAppSelector(ProductState);
  const { carts, isLoading } = useGetCart();
  const {
    increaseCartQuantityMutation,
    decreaseCartQuantityMutation,
    removeAllItemsFromCartMutation,
    removeFromCartMutation,
  } = useCart();
  const { subtotal, totalShipping, total } = calculateCartTotals(carts);

  const handleIncrement = async (productId: string) => {
    dispatch(incrementQuantity({ id: productId }));
    await increaseCartQuantityMutation({ productId });
  };

  const handleDecrement = async (productId: string) => {
    dispatch(decrementQuantity({ id: productId }));
    await decreaseCartQuantityMutation({ productId });
  };

  const handleRemoveFromCart = async (productId: string) => {
    dispatch(removeFromCart({ id: productId }));
    await removeFromCartMutation({ productId });
  };

  const handleRemoveAllItemsFromCart = async () => {
    dispatch(removeAllFromCart());
    await removeAllItemsFromCartMutation();
  };

  const handleCheckout = () => {
    if (cart?.length > 0) {
      router.push("/checkout");
    }else {
      toast.error("Please select a cart to checkout");
    }
  };

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : carts && carts.length > 0 ? (
        <div className="flex lg:flex-row flex-col gap-8">
          <div className="flex-1">
            <div className="w-full border border-gray-300 rounded-md">
              <div className="border-b border-b-gray-300 h-10 flex items-center justify-between px-4">
                <p>Shoping Cart</p>
                <span
                  onClick={handleRemoveAllItemsFromCart}
                  className="text-sm text-primary cursor-pointer"
                >
                  Remove All
                </span>
              </div>

              <div className="flex-1 p-4 flex flex-col gap-6">
                {carts.map((item: ICartItem) => {
                  return (
                    <div
                      key={item._id}
                      className="flex justify-between gap-4 w-full"
                    >
                      <Image
                        src={item?.product?.image?.url || ""}
                        alt={item?.product?.title}
                        width={100}
                        height={100}
                        className="border h-[100px] rounded-md object-cover"
                      />
                      <div className="flex md:items-center flex-1 gap-4 justify-between md:flex-row flex-col ">
                        <div className="flex-1">
                          <h4 className="font-semibold">
                            {item?.product?.title}
                          </h4>
                          <h5 className="text-primary font-medium">
                            {formatPrice(
                              item?.product?.price,
                              item?.product?.currency
                            )}
                          </h5>
                          <div className="flex items-center gap-2 my-1">
                            <span className="text-sm font-medium">Size:</span>
                            <span className="text-sm font-normal opacity-70">
                              {item?.product?.size}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Color:</span>
                            <span className="text-sm capitalize font-normal opacity-70">
                              {item?.product?.color}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-2 flex-1">
                          <AddToCart
                            total={item?.quantity}
                            increment={() =>
                              handleIncrement(item?.product?._id)
                            }
                            decrement={() =>
                              handleDecrement(item?.product?._id)
                            }
                          />

                          <h5 className="text-primary text-lg font-medium">
                            {formatPrice(
                              item?.product?.price * item?.quantity,
                              item?.product?.currency
                            )}
                          </h5>

                          <button
                            onClick={() =>
                              handleRemoveFromCart(item?.product?._id)
                            }
                            className="text-black"
                          >
                            <BsTrash size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Link
              href={"/products"}
              className="flex items-center mt-2 hover:underline"
            >
              <MdOutlineChevronLeft size={20} />
              <span className="text-sm">Continue Shopping</span>
            </Link>
          </div>

          <div className="lg:w-[450px] h-[220px] border border-gray-300 rounded-md">
            <div className="p-4 border-b border-gray-300 flex flex-col gap-2">
              <CartCheckoutDetail
                title={`${cart.length} items`}
                subTitle={`${subtotal}`}
              />
              <CartCheckoutDetail
                title={`Shipping`}
                subTitle={`${totalShipping}`}
              />
            </div>

            <div className="p-4 flex flex-col gap-2">
              <CartCheckoutDetail title={`Total`} subTitle={`${total}`} />
              {/* <CartCheckoutDetail
                title={`Total(tax incl.)`}
                subTitle={`${total}`}
              />
              <CartCheckoutDetail title={`Taxes`} subTitle={`₹00.00`} /> */}

              <div className=" mt-4">
                <Button label="PROCEED TO CHECKOUT" onClick={handleCheckout} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 my-6 flex items-center justify-center flex-col max-w-md mx-auto">
          <div className="sm:w-48 sm:h-48 w-44 h-44 rounded-full bg-gray-100 flex items-center justify-center">
            <FiShoppingCart className="text-gray-500 sm:text-[100px] text-[80px]" />
          </div>

          <p className="sm:text-lg  mt-2 opacity-80">
            Your shopping cart is empty!
          </p>

          <p className="text-center text-sm opacity-80 my-2">
            You have have not added any products to your <br />
            <span className="capitalize">shopping cart</span>
          </p>
          <div className="mt-4">
            <Button
              label="Continue Shopping"
              onClick={() => router.push("/products")}
            />
          </div>
        </div>
      )}
    </>
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
