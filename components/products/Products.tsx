"use client";

import useProducts from "@/hooks/queries/useProducts";
import { IProduct } from "@/types";
import React from "react";
import Product from "./Product";

const Products = () => {
  const { products, isLoading } = useProducts();
  return (
    <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 min-[476px]:grid-cols-2 grid-cols-1 gap-4">
      {isLoading
        ? "Loading...."
        : products && products.length > 0
        ? products.map((product: IProduct) => (
            <Product key={product._id} product={product} />
          ))
        : "No Data Available"}
    </div>
  );
};

export default Products;
