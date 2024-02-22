import React from "react";
import CheckoutInformation from "./_components/CheckoutInformation";
import OrderSummary from "./_components/OrderSummary";

const CheckoutPage = () => {
  return (
    <div className="container py-4 my-8 flex lg:flex-row flex-col gap-8">
      <div className="flex-1">
        <CheckoutInformation />
      </div>
      <div className="lg:w-[500px] w-full">
        <OrderSummary />
      </div>
    </div>
  );
};

export default CheckoutPage;
