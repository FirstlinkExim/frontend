"use client";

import Button from "@/components/buttons/Button";
import useLike from "@/hooks/mutations/useLike";
import { Rating } from "@mui/material";
import React, { useCallback, useState } from "react";
import { IoHeartOutline } from "react-icons/io5";
import { MdOutlineLock } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { FaHandHoldingUsd } from "react-icons/fa";
import { IImage, IProduct } from "@/types";
import formatPrice from "@/utils/formatPrice";
import { useAppSelector } from "@/redux/hooks";
import { ICartItem, ProductState } from "@/redux/slices/productSlice";
import useCart from "@/hooks/mutations/useCart";
import useCartModal from "@/hooks/modals/useCartModal";
import CartModal from "@/components/modals/CartModal";

const ProductView = ({ product, selectedImage }: { product: IProduct; selectedImage: IImage }) => {
  const { addToCartMutation } = useCart();
  const cartModal = useCartModal();
  const { handleProductWishlist, isLike } = useLike({
    product,
    like: product.like,
  });
  const { cart, color } = useAppSelector(ProductState);
  const productCart =
    cart && cart.find((item: ICartItem) => item.product._id === product._id);

  const [count, setCount] = useState(productCart?.quantity || 1);
  const [selectCartProduct, setSelectCartProduct] = useState<IProduct>();
  const [selectSize, setSelectSize] = useState(product?.sizes[0]);
  const [selectColor, setSelectColor] = useState(product?.colors[0]);

  const handleIncrementQuantity = useCallback(() => {
    if (count && count < product.stock) {
      setCount(count + 1);
    }
  }, [product.stock, count]);

  const handleDecrementQuantity = useCallback(() => {
    if (count && count > 1) {
      setCount(count - 1);
    }
  }, [count]);

  const handleAddToCart = async () => {
    const { colors, sizes,images, ...updatedProductCart } = {
      ...product,
      color: selectColor,
      size: selectSize,
      image: selectedImage
    };
    
    
    await addToCartMutation({
      product: updatedProductCart,
      quantity: count as number,
    });
    setSelectCartProduct(product);
    cartModal.onOpen();
  };

  const handleWishlist = () => {
    handleProductWishlist();
  };

  const stock = product.stock;
  const purchased = product.purchased;
  const remainingStock = stock - purchased;
  const stockPercentage = (remainingStock / stock) * 100;

  const toggleSelectSize = useCallback(
    (size: string) => setSelectSize(size),
    []
  );

  const toggleSelectColor = useCallback(
    (color: string) => setSelectColor(color),
    []
  );

  return (
    <>
      <div className="md:w-1/2 w-full flex flex-col gap-2 px-4 mt-2">
        <div className="flex items-center gap-2">
          <Rating
            name="half-rating"
            size="small"
            defaultValue={product.rating.rate}
            precision={0.5}
            readOnly
          />
          <span className="text-xs text-gray-500">
            ({product.rating.count}) views
          </span>
        </div>
        <h1 className="font-semibold text-2xl">{product.title}</h1>
        {/* <p className="text-gray-400 text-sm">
        {product.description}
      </p> */}

        <div className="w-full h-[1px] bg-gray-300 my-4"></div>

        <div className="flex flex-col gap-2 md:w-1/2 w-full">
          <div className="flex items-center gap-2">
            <h5 className="font-semibold text-sm">Quality:</h5>
            <span className="text-gray-500 text-sm font-normal">
              {product.quality}
            </span>
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
                Hurry up! only <span className="text-primary">{stock}</span>{" "}
                items left in stock!
              </p>
              <div className="w-full mt-1 bg-gray-200 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full bg-gradient-to-r from-green-600 to-green-600 "
                  style={{ width: `${stockPercentage}%` }}
                ></div>
              </div>
            </div>
          )}

          <h4 className="text-2xl text-primary font-semibold mt-2">
            {formatPrice(product.price, product.currency)}
          </h4>

          {product?.sizes && product?.sizes?.length > 0 && (
            <div>
              <p className="text-sm font-semibold mb-2 mt-3">
                Size: {selectSize}
              </p>

              <div className="flex items-center gap-2">
                {product?.sizes.map((val: string, index: number) => (
                  <button
                    onClick={() => toggleSelectSize(val)}
                    key={index}
                    type="button"
                    className={`p-2 rounded text-sm ${
                      selectSize === val
                        ? "bg-primary text-white"
                        : "border border-gray-300 text-black"
                    } hover:bg-primary hover:text-white transition duration-300`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product?.colors && product?.colors?.length > 0 && (
            <div>
              <p className="text-sm font-semibold mb-2 mt-3 capitalize">
                Color: {selectColor}
              </p>

              <div className="flex items-center gap-2">
                {product?.colors.map((color: string, index: number) => (
                  <div key={index} className={`${selectColor === color && "w-6 h-6 border border-gray-600"} rounded-full flex items-center justify-center`}>
                    <div
                      onClick={() => toggleSelectColor(color)}
                      style={{ backgroundColor: color.toLowerCase() }}
                      className="w-5 h-5 rounded-full border cursor-pointer"
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 my-2">
            <div className="flex h-[44px] border border-gray-300">
              <button
                onClick={handleDecrementQuantity}
                type="button"
                className="border-r border-gray-300 w-10"
              >
                {"-"}
              </button>
              <div className="h-full w-10 flex items-center justify-center text-sm">
                {count}
              </div>

              <button
                onClick={handleIncrementQuantity}
                type="button"
                className="border-l border-gray-300 w-10"
              >
                {"+"}
              </button>
            </div>

            <div className="w-[150px]">
              <Button label="ADD TO CART" onClick={handleAddToCart} />
            </div>
          </div>

          <button
            onClick={handleWishlist}
            className={`flex gap-2 text-sm items-center mt-4 ${
              isLike && "text-primary"
            }`}
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

      {cartModal.isOpen && selectCartProduct && (
        <CartModal product={selectCartProduct} />
      )}
    </>
  );
};

export default ProductView;
