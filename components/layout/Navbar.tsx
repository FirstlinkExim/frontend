"use client";

import React, { Fragment, useCallback, useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { FiMenu, FiShoppingCart } from "react-icons/fi";
import { IoHeartOutline, IoClose } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaRegCircleUser, FaRegHeart } from "react-icons/fa6";
import Serachbar from "./Serachbar";
import { usePathname, useRouter } from "next/navigation";
import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";
import Button from "../buttons/Button";
import useProfile from "@/hooks/queries/useProfile";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  ICartItem,
  ProductState,
  removeFromCart,
} from "@/redux/slices/productSlice";
import formatPrice from "@/utils/formatPrice";
import { calculateCartTotals } from "@/utils/calculateTotal";

const links = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/about",
    name: "About",
  },
  {
    path: "/products",
    name: "Products",
  },
  {
    path: "/new-arrivals",
    name: "New Arrivals",
  },
  {
    path: "/contact-us",
    name: "Contact",
  },
];

const NavItems = () => {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        return (
          <Link
            href={link.path}
            key={link.path}
            className={`text-sm relative font-medium cursor-pointer ${pathname !== link.path && "hover:text-orange-600"} transition duration-300 ${
              pathname === link.path
                ? "text-orange-600 border-b-2 border-b-primary before:hover:scale-x-0"
                : "text-gray-900"
            }  before:content-[''] before:absolute before:block before:w-full before:h-[2px] before:bottom-0 before:left-0 before:bg-primary before:rounded-full before:scale-x-0 before:transition before:duration-300ß transition before:hover:scale-x-100 duration-300`}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
};

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(true);
  const [search, setSearch] = useState("");
  const { customer } = useProfile();
  const { wishlists } = useAppSelector(ProductState);
  const handleSerachChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSearch = () => {};
  const handleOpen = useCallback(() => setOpen((prev) => !prev), []);
  return (
    <>
      <header className="w-full h-16 shadow sticky left-o top-0 bg-white z-50">
        <div className="container flex items-center justify-between gap-4 h-full relative">
          <div className="flex items-center gap-2">
            <button
              onClick={handleOpen}
              className="lg:hidden block cursor-pointer"
            >
              <FiMenu size={24} />
            </button>
            <Logo />
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <NavItems />
          </div>

          <div className="flex items-center gap-4">
            <div
              className={`
         
          group flex  items-center rounded-md relative gap-2  text-base font-medium  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
            >
              <FaRegHeart
                onClick={() => router.push("/wishlist")}
                size={26}
                className="text-primary cursor-pointer"
              />
              <div className="flex flex-col items-start">
                <h5 className="text-sm font-semibold hover:text-primary transition whitespace-nowrap">
                  My Wishlist
                </h5>
                <p className="text-xs text-gray-600">
                  {wishlists.length} item(s)
                </p>
              </div>
              {/* <span className="w-4 h-4 rounded-full bg-primary text-white text-[10px] flex items-center justify-center absolute -top-1 -right-2">
              4
            </span> */}
            </div>

            <Cart />

            {customer ? (
              <div
                onClick={() => router.push("/profile")}
                className="hidden md:flex items-center gap-2"
              >
                <div className="w-10 h-10">
                  <Image
                    src={
                      customer?.profileImg
                        ? customer?.profileImg.url
                        : "/images/user.png"
                    }
                    alt={customer?.name}
                    width={100}
                    height={100}
                    className="rounded-full object-cover w-full h-full cursor-pointer"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <FaRegCircleUser size={28} className="text-primary" />
                <div className="flex flex-col items-start">
                  <Link
                    href="/auth/login"
                    className="text-sm font-semibold hover:text-primary transition"
                  >
                    Login
                  </Link>
                  <p className="text-x flex items-center text-xs gap-1 text-gray-600">
                    Or{" "}
                    <Link
                      href="/auth/register"
                      className="hover:text-primary transition"
                    >
                      Register
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 bg-black/10 z-[150] md:hidden block">
          <div className="fixed left-0 top-0 bottom-0 h-screen bg-white w-[22rem] py-6 px-4 flex flex-col justify-between">
            <button
              onClick={() => setOpen(false)}
              type="button"
              className="absolute top-4 -right-6 border border-gray bg-white text-black w-8 h-8 rounded-full flex items-center justify-center"
            >
              <IoClose />
            </button>
            <div>
              <div className="w-full relative border h-10 border-gray-300 rounded border-r-0">
                <input
                  type="text"
                  placeholder="Serach products...."
                  className="w-full rounded text-sm text-gray-900 h-full px-2 pr-4 outline-0 border-0"
                />
                <button className="flex items-center justify-center absolute right-0 top-0 w-10 border-0 outline-none bottom-0 bg-primary text-white">
                  <LuSearch />
                </button>
              </div>

              <div className="flex flex-col gap-4 items-center my-8">
                {links.map((link, index) => (
                  <Link
                    onClick={() => setTimeout(() => setOpen(false), 200)}
                    key={index}
                    href={link.path}
                    className={`text-lg ${
                      pathname === link.path && "text-primary"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="py-6 border-t border-b">
              <div className="flex items-center gap-2">
                <FaRegCircleUser size={28} className="text-primary" />
                <div className="flex flex-col items-start">
                  <Link
                    onClick={() => setTimeout(() => setOpen(false), 200)}
                    href="/auth/login"
                    className="text-sm font-semibold hover:text-primary transition"
                  >
                    Login
                  </Link>
                  <p className="text-x flex items-center text-xs gap-1 text-gray-600">
                    Or{" "}
                    <Link
                      onClick={() => setTimeout(() => setOpen(false), 200)}
                      href="/auth/register"
                      className="hover:text-primary transition"
                    >
                      Register
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

const Cart = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector(ProductState);

  

  const { total, subtotal } = calculateCartTotals(cart);
  return (
    <Popover className="relative w-full">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
         
          group flex  items-center rounded-md relative gap-2  text-base font-medium  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
          >
            <FiShoppingCart size={28} className="text-primary" />
            <div className="flex flex-col items-start">
              <h5 className="text-sm font-semibold hover:text-primary transition">
                My Cart
              </h5>
              <p className="text-xs text-gray-600">
                {cart.length} item(s) - {total}
              </p>
            </div>
            {/* <span className="w-4 h-4 rounded-full bg-primary text-white text-[10px] flex items-center justify-center absolute -top-1 -right-2">
              4
            </span> */}
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-10 mt-3 rounded-lg  w-[450px] transform px-4 sm:px-0  bg-white">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                {cart && cart.length > 0 ? (
                  <>
                    <div className="p-4 max-h-[300px] h-full overflow-y-auto flex flex-col gap-4                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ">
                      {cart.map((item: ICartItem) => (
                        <div
                          key={item.product._id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <Link href={`/product/${item.product._id}`}>
                              <Image
                                src={item.product.image?.url || ""}
                                alt={item.product.title}
                                width={70}
                                height={70}
                                className="border  rounded-md"
                              />
                            </Link>

                            <h4 className="text-sm w-40 line-clamp-4">
                              {item.product.title}
                            </h4>
                          </div>

                          <div className="flex items-center gap-2 ">
                            <p>x{item.quantity}</p>
                            <h5 className="text-primary font-medium">
                              {formatPrice(
                                item.product.price,
                                item.product.currency
                              )}
                            </h5>
                            <IoMdCloseCircleOutline
                              onClick={() =>
                                dispatch(removeFromCart(item.product))
                              }
                              className="text-primary cursor-pointer"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 border-t border-gray-300">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Sub Total</span>
                        <h5 className="text-primary font-medium">{subtotal}</h5>
                      </div>
                      <div className="flex items-center justify-between my-2">
                        <span className="font-medium">Total</span>
                        <h5 className="text-primary font-medium">{total}</h5>
                      </div>

                      <div className="flex mt-4 items-center gap-4">
                        <Button
                          label="View Cart"
                          onClick={() => router.push("/cart")}
                        />
                        <Button
                          label="Checkout"
                          onClick={() => router.push("/checkout")}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-4 my-6 flex items-center justify-center flex-col">
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                      <FiShoppingCart size={36} className="text-gray-500" />
                    </div>

                    <p className="text-sm mt-2 opacity-80">
                      Your shopping cart is empty!
                    </p>
                  </div>
                )}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
