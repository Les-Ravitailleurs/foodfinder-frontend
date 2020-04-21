import React from "react";

import "./Input.css";

const Input = ({
  placeholder,
  error,
  label,
  name,
  value,
  onChange,
  onBlur,
  hide,
}) => {
  return (
    <div className="Input__wrapper" style={{ display: hide ? "none" : "auto" }}>
      {label && <label className="Input__label">{label}</label>}
      <input
        className={`Input ${error ? "Input--error" : ""}`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      ></input>
      {error && <div className="Input__error">{error}</div>}
    </div>
  );
};

export default Input;
