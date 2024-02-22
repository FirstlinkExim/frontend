"use client";

import useProducts from "@/hooks/useProducts";
import { IProduct } from "@/types";
import React from "react";
import Product from "./Product";

const Products = () => {
  const { products, isLoading } = useProducts();
  return (
    <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
      {isLoading
        ? "Loading...."
        : products && products.length > 0
        ? products.map((product: IProduct) => (
            <Product key={product.id} product={product} />
          ))
        : "No Data Available"}
    </div>
  );
};

export default Products;
