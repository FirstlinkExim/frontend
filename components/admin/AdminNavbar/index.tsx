"use client";

import Button from "@/components/buttons/Button";
import useOpenSidebar from "@/hooks/useOpenSidebar";
import React from "react";
import { LuMenu } from "react-icons/lu";
const AdminNavbar = () => {


  const openSidebar = useOpenSidebar();
  return (
    <header
      className={`${
        openSidebar.isOpen && "md:w-[calc(100%_-_288px)]"
      } w-full fixed h-16 border border-l-0 top-0 right-0  bg-white z-50`}
    >
     
      <div className="w-full flex items-center h-full justify-between md:px-6 px-4">
        <button onClick={openSidebar.onOpen} className="cursor-pointer">
          <LuMenu size={24} />
        </button>
        <div className="w-10 h-10 rounded-full border"></div>
      </div>

     
    </header>
  );
};

export default AdminNavbar;
