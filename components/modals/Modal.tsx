"use client";

import React, { useCallback, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  body: React.ReactNode;
  width?: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, body, width="md" }) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);

    onClose();
  }, [onClose]);


  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if the click target is the overlay or the dialog panel
    const isOverlay = e.target === e.currentTarget;
    const isDialogPanel = (e.target as HTMLElement).classList.contains("DialogPanel");

    // Close the modal only if the click is on the overlay and not on the dialog panel
    if (isOverlay && !isDialogPanel) {
      handleClose();
    }
  };
  return (
    <>
      <Transition appear show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-[1000]" onClick={e => e.stopPropagation()}  onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            
          >
            <div className="fixed inset-0 bg-black/5" />
          </Transition.Child>

          <div onClick={handleOverlayClick} className="fixed inset-0 overflow-y-auto ">
            <div onClick={e => e.stopPropagation()} className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
          
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className={`w-full max-w-${width} transform overflow-hidden rounded-md bg-white p-4 text-left align-middle shadow-xl transition-all`}>
                  {body}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
