"use client";

import React, { useState } from "react";
import MyProfile from "./MyProfile";
import MyOrders from "./MyOrders";
import Address from "./Address";
import ChangePassword from "./ChangePassword";
import { FaRegUserCircle } from "react-icons/fa";
import { MdLock, MdLogout } from "react-icons/md";
import { IoEarth } from "react-icons/io5";
import { BsCart4 } from "react-icons/bs";
import useLogout from "@/hooks/useLogout";
import { useRouter } from "next/navigation";

const tabs = [
  {
    name: "Profile",
    icon: FaRegUserCircle,
  },
  {
    name: "Orders",
    icon: BsCart4,
  },
  {
    name: "Address",
    icon: IoEarth,
  },
  {
    name: "Security",
    icon: MdLock,
  },
];

const Profile = () => {
  const [selected, setSelected] = useState("Profile");
  const logout = useLogout()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push("/auth/login")
  }
  
  return (
    <div className="container py-4 my-8 flex md:flex-row flex-col gap-8">
      <div className="w-[250px] shadow rounded max-h-[400px] h-full  flex flex-col gap-2 p-2">
        <>
          {tabs.map((tab, index) => {
            return (
              <div
                onClick={() => setSelected(tab.name)}
                key={index}
                className={`h-10 flex items-center gap-2 cursor-pointer text-sm rounded px-2 ${
                  selected === tab.name
                    ? "bg-primary text-white"
                    : "bg-white text-black"
                } ${selected !== tab.name && "hover:bg-gray-100"}`}
              >
                <tab.icon className={`${selected === tab.name ? "text-white": "text-gray-600"}`}/>
                <span>{tab.name}</span>
              </div>
            );
          })}
          <button
            onClick={handleLogout}
            className={`h-10 w-full flex items-center gap-2 cursor-pointer text-sm rounded px-2  hover:bg-gray-100`}
          >
            <MdLogout />
            Log out
          </button>
        </>
      </div>

      <div className="flex-1 shadow rounded p-2">
        {selected === "Profile" && <MyProfile />}
        {selected === "Orders" && <MyOrders />}
        {selected === "Address" && <Address />}
        {selected === "Security" && <ChangePassword />}
      </div>
    </div>
  );
};

export default Profile;
