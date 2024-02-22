"use client";

import React, { useCallback } from "react";

interface AddToCartProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  stock: number;
}
const AddToCart: React.FC<AddToCartProps> = ({ count, setCount, stock }) => {
  const handleIncrement = useCallback(() => {
    setCount((prev) => (stock === prev ? prev : prev + 1));
  }, [setCount, stock]);

  const handleDecrement = useCallback(() => {
    setCount((prev) => (prev === 1 ? prev : prev - 1));
  }, [setCount]);

  return (
    <div className="flex h-10 border border-gray-300">
      <button
        onClick={handleDecrement}
        type="button"
        className="border-r border-gray-300 w-10"
      >
        {"-"}
      </button>
      <div className="h-full w-10 flex items-center justify-center text-sm">
        {count}
      </div>

      <button
        onClick={handleIncrement}
        type="button"
        className="border-l border-gray-300 w-10"
      >
        {"+"}
      </button>
    </div>
  );
};

export default AddToCart;
