import React, { useEffect } from "react";

import "./Modal.css";

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);
  return (
    <div className="Modal__wrapper">
      <div className="Modal">
        <div className="Modal__closeButton" onClick={onClose}>
          &#215;
        </div>
        <div className="Modal__leftHand"></div>
        <div className="Modal__content">{children}</div>
        <div className="Modal__rightHand"></div>
      </div>
    </div>
  );
};

export default Modal;
