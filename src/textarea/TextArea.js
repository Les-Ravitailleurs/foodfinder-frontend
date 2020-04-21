import React from "react";

import "./TextArea.css";

const TextArea = ({
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
    <div
      className="TextArea__wrapper"
      style={{ display: hide ? "none" : "block" }}
    >
      {label && <label className="TextArea__label">{label}</label>}
      <textarea
        className={`TextArea ${error ? "TextArea--error" : ""}`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        {value}
      </textarea>
      {error && <div className="TextArea__error">{error}</div>}
    </div>
  );
};

export default TextArea;
