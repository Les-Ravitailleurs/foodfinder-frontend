import React from "react";

import "./Button.css";

const Button = ({ type = "submit", children, disabled, onClick }) => {
  return (
    <button
      className={`Button ${disabled ? "Button--disabled" : ""}`}
      type={type}
      onClick={disabled ? null : onClick}
    >
      {children}
    </button>
  );
};

export default Button;
