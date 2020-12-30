import React from "react";

import "./EditableText.css";
import editable from "./editable.svg";

const EditableText = ({ text, onClick }) => {
  return (
    <span className="EditableText" onClick={onClick}>
      <span>{text}</span>
      {/* <img src={editable} alt="editable" /> */}
    </span>
  );
};

export default EditableText;
