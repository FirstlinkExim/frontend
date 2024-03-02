"use client";

import FilterNavbar from "@/components/products/FilterNavbar";
import FilterSidebar from "@/components/products/FilterSidebar";
import Product from "@/components/products/Product";
import ProductListView from "@/components/products/ProductListView";
import useProducts from "@/hooks/data-queries/useProducts";
import { useAppSelector } from "@/redux/hooks";
import { FilterState } from "@/redux/slices/filterSlice";
import { IProduct } from "@/types";
import React, { useState } from "react";

const ProductsPageComponent = () => {
  const [limit, setLimit] = useState(9)
  const [page, setPage] = useState(1)
  const { view , color, size, sort, type, category, price } = useAppSelector(FilterState);
  const params = {
    page,
    limit,
    category,
    color,
    price: Number(price),
    size,
    sort,
    type,
  }
  const { products, isLoading } = useProducts();
  return (
    <div className="flex gap-4">
      <div className="w-[250px] lg:h-[1100px] border rounded-md lg:block hidden">
        <FilterSidebar />
      </div>

      <div className="flex-1">
        <FilterNavbar />
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-12 h-12 rounded-full bg-gray-200 animate-spin"></div>
          </div>
        ) : products && products.length > 0 ? (
          view === "grid" ? (
            <div className="grid  md:grid-cols-3 min-[476px]:grid-cols-2 grid-cols-1 gap-4">
              {products.map((product: IProduct) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
          
              {products.map((product: IProduct) => (
                <ProductListView key={product._id} product={product} />
              ))}
        
            </div>
          )
        ) : (
          "No Data Found"
        )}
      </div>
    </div>
  );
};

export default ProductsPageComponent;
