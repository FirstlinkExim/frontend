import useNotLoggedInModal from "@/hooks/modals/useNotLoggedInModal";
import React from "react";
import Modal from "./Modal";
import Link from "next/link";

const NotLoggedInModal = ({ title }: { title: string }) => {
  const modal = useNotLoggedInModal();

  const body = (
    <>
      <div className="flex flex-col  items-center">
        <h2 className="text-center text-lg  font-bold">{title}</h2>

        <Link href="/auth/login" className="underline text-center">
          Login
        </Link>
      </div>
    </>
  );
  return <Modal isOpen={modal.isOpen} body={body} onClose={modal.onClose} />;
};

export default NotLoggedInModal;
