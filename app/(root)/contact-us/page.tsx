import React from "react";
import ContactForm from "./_components/ContactForm";
import { IoLocationOutline, IoMailOutline } from "react-icons/io5";
import { LuPhoneCall } from "react-icons/lu";
import Map from "@/components/Map";

const ContactUsPage = () => {
  return (
    <div className="container py-4 my-8">
      <div className="flex md:flex-row flex-col gap-8">
        <div className="md:w-1/2 w-full">
          <h1 className="text-2xl font-semibold">
            We would love to hear from you !
          </h1>
          <p className="my-2 text-gray-700">
            Complete the folowwing form and we will be in touch with you within
            4-5 business days.
          </p>

          <div className="my-8 flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 group">
                <IoLocationOutline
                  size={24}
                  className="group-hover:text-primary transition"
                />
              </div>
              <p className="text-gray-500">
                1 Beverly Hills, House 36, Los Angeles, California, United
                States.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 group">
                <LuPhoneCall
                  size={24}
                  className="group-hover:text-primary transition"
                />
              </div>
              <p className="text-gray-500">+91 79840 35721</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 group">
                <IoLocationOutline
                  size={24}
                  className="group-hover:text-primary transition"
                />
              </div>
              <p className="text-gray-500">contact@test.com</p>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 w-full">
          <ContactForm />
        </div>
      </div>

      <div className="w-full my-8 h-[400px] border rounded">
        <Map />
      </div>
    </div>
  );
};

export default ContactUsPage;
