import React from "react";
import OrderConfirm from "./_components/OrderConfirm";
import OrderDetail from "./_components/OrderDetail";

const OrderConfirmationPage = () => {
  return (
    <div className="container py-4 my-8 flex lg:flex-row flex-col gap-8">
      <div className="flex-1">
        <OrderConfirm />
      </div>
      <div className="lg:w-[500px] w-full">
        <OrderDetail />
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
