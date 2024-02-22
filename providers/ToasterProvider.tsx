"use client";

import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToasterProvider = () => {
  return (
    <ToastContainer autoClose={5000} position="bottom-left" closeOnClick />
  );
};

export default ToasterProvider;
