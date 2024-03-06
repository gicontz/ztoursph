import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  children: any;
  onClose?: boolean;
  onOpen?: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, onClose, onOpen }) => {
  const [modalRoot, setModalRoot] = useState<Element | DocumentFragment>();

  useEffect(() => {
    if (typeof document !== "undefined") {
      let existingModalRoot = document.getElementById("modal-root") as
        | Element
        | DocumentFragment;

      if (!existingModalRoot) {
        existingModalRoot = document.createElement("div");
        existingModalRoot.id = "modal-root";
        document.body.appendChild(existingModalRoot);
      }

      setModalRoot(existingModalRoot as Element | DocumentFragment);
    }
  }, []);

  return (
    modalRoot &&
    ReactDOM.createPortal(
      <div>
        <div className="absolute inset-0 border-red-500 bg-gray-500 opacity-25"></div>
        <div className="fixed inset-40 rounded p-10 bg-white">{children}</div>
      </div>,
      modalRoot
    )
  );
};

export default Modal;
