"use client";
import { Tab } from "@headlessui/react";
import React, { Fragment } from "react";
import ProductReview from "./ProductReview";
import { IProduct } from "@/types";

const ProductDetailTab = ({ product }: { product: IProduct }) => {
  return (
    <div className="my-8">
      <Tab.Group>
        <Tab.List>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`outline-none border-none mr-4 text-xl ${
                  selected ? "text-primary" : "text-black"
                }`}
              >
                Description
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`outline-none border-none mr-4 text-xl ${
                  selected ? "text-primary" : "text-black"
                }`}
              >
                Reviews({product.rating.count})
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <div className="border border-gray-300 rounded p-6 mt-4">
            <Tab.Panel>
              <div className="text-sm leading-normal opacity-90 tracking-wide">
               {product.description}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <ProductReview product={product} />
            </Tab.Panel>
          </div>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ProductDetailTab;
