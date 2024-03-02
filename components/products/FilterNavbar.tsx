"use client";

import React, { useCallback, useState } from "react";
import { BsGrid } from "react-icons/bs";
import { MdFormatListBulleted } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import Select from "../inputs/Select";
import FilterSidebar from "./FilterSidebar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { FilterState, setSort, setView } from "@/redux/slices/filterSlice";
import useProducts from "@/hooks/queries/useProducts";

const FilterNavbar = () => {
  const dispatch = useAppDispatch();
  const [openFilter, setOpenFilter] = useState(false);
  const { view, sort } = useAppSelector(FilterState);
  const { products } = useProducts();
  const toggleFilter = useCallback(() => setOpenFilter((prev) => !prev), []);
  return (
    <div className="w-full py-4  flex md:items-center justify-between md:flex-row flex-col gap-6 relative">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button onClick={() => dispatch(setView("grid"))}>
            <BsGrid
              size={22}
              className={`${view === "grid" ? "text-primary" : "text-black"}`}
            />
          </button>
          <button onClick={() => dispatch(setView("list"))}>
            <MdFormatListBulleted
              size={24}
              className={`${view === "list" ? "text-primary" : "text-black"}`}
            />
          </button>
        </div>
        <p>There are {products?.length} products</p>
      </div>

      <div className="flex items-center gap-4">
        <p className="md:block hidden">Sort By: </p>
        <Select
          onChange={(option: string) => dispatch(setSort(option))}
          selected={sort}
          options={[
            "Name, A to Z",
            "Name, Z to A",
            "Price, low to high",
            "Price, high to low",
            "Date added, oldest to newest",
            "Date added, newest to oldest",
          ]}
          width="300px"
        />
        <button
          onClick={toggleFilter}
          className="lg:hidden  border w-10 flex items-center justify-center h-10 rounded-md border-gray-300 cursor-pointer"
        >
          <FaFilter size={18} />
        </button>
      </div>

      {openFilter && (
        <div className="absolute left- right-0 w-full bg-white shadow-xl border rounded-md z-10 top-28">
          <FilterSidebar />
        </div>
      )}
    </div>
  );
};

export default FilterNavbar;
