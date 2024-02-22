"use client";
import { Tab } from "@headlessui/react";
import React, { Fragment } from "react";
import ProductReview from "./ProductReview";

const ProductDetailTab = () => {
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
                Reviews(0)
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <div className="border border-gray-300 rounded p-6 mt-4">
            <Tab.Panel>
              <div className="text-sm leading-normal opacity-90 tracking-wide">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos
                dolore provident dolores et deleniti voluptatem atque cum vel
                fugiat? Quam est enim distinctio itaque atque veniam repellat
                asperiores natus dolorum iste sunt laborum sapiente, fugiat
                reprehenderit quibusdam eaque? Voluptatem quis voluptas
                repudiandae velit fugiat tempore vel in maiores assumenda
                officiis atque modi dolorem veritatis itaque commodi quaerat
                deleniti impedit accusantium et quia, quod voluptatibus
                excepturi a ipsam! Nobis vel, voluptatibus esse a cum eligendi
                labore libero vero nisi excepturi debitis reiciendis! Quae eius
                ducimus eveniet iure, culpa quibusdam, aliquid doloribus tempora
                earum incidunt corrupti mollitia debitis laborum velit delectus
                sapiente, fugiat ipsum voluptate. Quibusdam asperiores quaerat
                ab enim, harum iste adipisci? Dignissimos beatae sit quod ipsum,
                eligendi neque ducimus a ea pariatur veniam exercitationem
                corporis quidem, doloremque nam. Voluptas optio itaque deleniti,
                eveniet minima impedit, deserunt repellat asperiores aperiam
                perferendis aliquam voluptatibus corrupti iusto similique dolore
                consequatur doloribus alias! Corrupti repellendus id non
                repellat eveniet aut maxime laboriosam libero, accusantium ut,
                sapiente aliquam assumenda temporibus quidem debitis porro ad
                accusamus architecto aperiam ex nam possimus fugit hic. At in,
                quae ut expedita quod deserunt unde porro hic ea architecto
                omnis mollitia vitae dolorem animi! Quia voluptate assumenda
                odio consectetur quis.
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <ProductReview />
            </Tab.Panel>
          </div>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ProductDetailTab;
