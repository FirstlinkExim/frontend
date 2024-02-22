"use client";

import Stepper from "@/components/Stepper/Stepper";
import Button from "@/components/buttons/Button";
import React, { useState } from "react";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";
import { ShippingInformationSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

export const steps = ["Shipping", "Delivery", "Payment"];

type Schema = z.infer<typeof ShippingInformationSchema>;
const CheckoutInformation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const router = useRouter()

  const handleStep = () => {
    currentStep === steps.length
      ? setComplete(true)
      : setCurrentStep((prev) => prev + 1);
  };

  const { register, handleSubmit, control } = useForm<Schema>({
    resolver: zodResolver(ShippingInformationSchema),
  });

  const onSubmit = (data: Schema) => {
    console.log(data);
    router.push("/order/confirmation")
    // handleStep()
  };

  const STEPS: any = {
    1: <StepOne control={control} />,
    2: <StepTwo />,
    3: <StepThree />,
  };

  const Step = STEPS[currentStep];

  return (
    <div className="w-full">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        complete={complete}
        setComplete={setComplete}
      />

      <div className="my-6">{Step}</div>

      <div className="mt-8 max-w-48 mx-auto w-full">
        <Button
          label={currentStep === steps.length ? "Submit" : "Continue"}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  );
};

export default CheckoutInformation;
