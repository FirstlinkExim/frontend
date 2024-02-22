"use client"

import React from "react";
import ProductDetails from "../_comonents/ProductDetails";

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
const id = params.id;

  return (
    <div className="container py-4">
        <ProductDetails id={id} />
     
    </div>
  );
};

export default ProductDetailPage;
