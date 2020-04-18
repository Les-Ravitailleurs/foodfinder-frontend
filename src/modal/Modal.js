import React from "react";

import "./Modal.css";

const Modal = ({ children }) => {
  return (
    <div className="Modal__wrapper">
      <div className="Modal">
        <div className="Modal__leftHand"></div>
        <div className="Modal__content">{children}</div>
        <div className="Modal__rightHand"></div>
      </div>
    </div>
  );
};

export default Modal;
