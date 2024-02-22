import React from "react";

const OrderConfirm = () => {
  return (
    <div>
      <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold">
        Thank you <span className="capitalize">John Doe</span> for your <br />{" "}
        purchase!
      </h1>

      <div className="border rounded-md my-8">
        <div className="h-[250px]"></div>

        <div className="p-2 border-t">
          <p className="text-xl">Your order is confirmed</p>
          <p className="text-sm mt-2">
            You{"'"}ll receive an email when your order is ready.
          </p>
        </div>
      </div>

      <div className="border rounded-md p-4 my-4">
        <h4 className="text-xl">Order details</h4>

        <div className="flex items-center justify-between my-4">
          <div className="flex flex-col gap-1">
            <p className="mb-0">Contact Information</p>
            <p className="text-sm text-gray-600">john@test.com</p>
          </div>

          <div className="flex flex-col gap-1 mr-12">
            <p className="mb-0">Payment method</p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-600">Paypal</p>
              {"-"}
              <p className="text-sm text-gray-600">₹86.00</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between my-4">
          <div className="flex flex-col gap-1">
            <p className="mb-0">Shipping address</p>
            <div>
              <p className="text-sm text-gray-600">John Doe</p>
              <p className="text-sm text-gray-600">ABC Street, New York USA</p>
              <p className="text-sm text-gray-600">USA</p>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p className="mb-0">Billing address</p>
            <div>
              <p className="text-sm text-gray-600">John Doe</p>
              <p className="text-sm text-gray-600">ABC Street, New York USA</p>
              <p className="text-sm text-gray-600">USA</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="mb-0">Shipping method</p>
          <p className="text-sm text-gray-600">Standard</p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirm;
