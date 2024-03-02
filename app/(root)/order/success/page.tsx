"use client";

import React from "react";
import OrderConfirm from "./_components/OrderConfirm";
import OrderDetail from "./_components/OrderDetail";
import useSingleOrder from "@/hooks/queries/useSingleOrder";
import { useSearchParams } from "next/navigation";

const OrderConfirmationPage = (props: any) => {
  const params = useSearchParams();
  const orderId = params.get("orderId");
  const { order } = useSingleOrder(orderId as string);

  if (!order) return null;
  return (
    <div className="container py-4 my-8 flex lg:flex-row flex-col gap-8">
      <div className="flex-1">
        <OrderConfirm order={order} />
      </div>
      <div className="lg:w-[500px] w-full">
        <OrderDetail order={order} />
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
