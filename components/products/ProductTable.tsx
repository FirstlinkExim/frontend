"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FiEdit, FiEye } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { useRouter } from "next/navigation";
import NoData from "@/components/NoData";
import SelectList from "@/components/inputs/Select";
import { Pagination, Rating } from "@mui/material";
import { IProduct } from "@/types";
import useProducts from "@/hooks/useProducts";
import Search from "../Search";
import Loading from "../Loading";

const ProductTable = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { products, isLoading } = useProducts();
  const [selected, setSelected] = useState<number>(10);
  if (!products) return;

  return (
    <div>
      <Search placeholder="Serach..." search="" setSearch={setSearch} />
      <div className="relative overflow-x-auto rounded-lg mt-4">
        {isLoading ? (
          <div className="h-[300px] flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          products?.length && (
            <>
              <table className="lg:w-full w-[900px] text-sm bg-white  shadow rounded-lg">
                <thead className="text-xs text-gray-700 uppercase whitespace-nowrap h-14 bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-3 ">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left">
                      PROUCT
                    </th>
                    <th scope="col" className="px-6 py-3 text-left">
                      CATEGORY
                    </th>
                    <th scope="col" className="px-6 py-3">
                      STOCK
                    </th>
                    <th scope="col" className="px-6 py-3">
                      RATING
                    </th>
                    <th scope="col" className="px-6 py-3">
                      LAST UPDATE
                    </th>

                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((row: IProduct, index: number) => (
                    <tr
                      key={index}
                      className="border border-r-0 border-t-0 border-l-0 border-b border-b-gray-200 hover:bg-gray-50 transition duration-300 cursor-pointer "
                    >
                      <td className="px-6 py-3">{row.id}</td>
                      <td className="px-6 py-3 text-center" key={index}>
                        <div className="flex items-center  gap-2">
                          <Image
                            width={36}
                            height={36}
                            src={row.image}
                            alt={row.title}
                            className="w-9 h-9 rounded-full border object-cover"
                          />
                          <span className="font-medium line-clamp-1">
                            {row.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3">{row.category}</td>
                      <td className="px-6 py-3">25</td>
                      <td className="px-6 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <Rating
                            name="half-rating"
                            defaultValue={2.5}
                            precision={0.5}
                          />

                          <span className="text-slate-500 text-sm text-center">
                            2.5
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-3">
                        <div className="flex items-center justify-center gap-3">
                          <FiEye
                            size={18}
                            className="text-blue-600 cursor-pointer"
                          />
                          <FiEdit
                            size={18}
                            className="text-gray-600 cursor-pointer"
                          />
                          <AiFillDelete
                            size={18}
                            className="text-red-600 cursor-pointer"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )
        )}

        {!products.length && <NoData />}
      </div>

      {products?.length && (
        <div className="mb-6 mt-6 flex lg:items-center lg:justify-between lg:flex-row flex-col  gap-6">
          <div className="flex flex-row items-center gap-3">
            <p className="text-gray-400">Showing 1-10 out of 50</p>
            <SelectList
              options={[10, 15, 20, 25, 30]}
              selected={selected}
              onChange={setSelected}
              width="80px"
            />
          </div>

          <Pagination
            showFirstButton
            showLastButton
            count={10}
            variant="outlined"
            shape="rounded"
            color="primary"
          />
        </div>
      )}
    </div>
  );
};

export default ProductTable;
