"use client";

import useOpenSidebar from "@/hooks/useOpenSidebar";
import Link from "next/link";
import React from "react";
import { LuLayoutDashboard, LuShoppingCart, LuUsers } from "react-icons/lu";
import { BsCartPlus, BsCartCheck } from "react-icons/bs";
import { IconType } from "react-icons";
import { usePathname } from "next/navigation";

type TLink = {
  path: string;
  name: string;
  icon: IconType;
};

const links: TLink[] = [
  {
    path: "/admin",
    name: "Dashboard",
    icon: LuLayoutDashboard,
  },
  {
    path: "/admin/users",
    name: "Users",
    icon: LuUsers,
  },
  {
    path: "/admin/products",
    name: "Products",
    icon: LuShoppingCart,
  },
  {
    path: "/admin/add-product",
    name: "Add Product",
    icon: BsCartPlus,
  },
  {
    path: "/admin/orders",
    name: "Orders",
    icon: BsCartCheck,
  },
];

const AdminSidebar = () => {
  const pathname = usePathname()
  const openSidebar = useOpenSidebar();

  return (
    <div
      className={`fixed left-0 md:top-0 top-[64px] ${
        openSidebar.isOpen
          ? "translate-x-0 opacity-100"
          : "-translate-x-[300px] opacity-0"
      } bg-white z-50 bottom-0 h-screen md:border-r w-72 md:shadow-none shadow-lg`}
    >
      <div className="h-full w-full">
        <div className="h-16 hidden md:flex items-center justify-center border-b">
          <Link href="/admin" className="text-2xl font-bold">
            Clothes&Hair.
          </Link>
        </div>

        <div className="px-4 my-8">
          {links.map((link: TLink, index: number) => (
            <Link href={link.path} key={index}>
              <div className={`flex h-10 my-2 pl-2 items-center hover:bg-primary hover:text-white transition duration-300 ${pathname === link.path && "bg-primary text-white"} rounded`}>
                <link.icon />
                <span className="ml-3">{link.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
