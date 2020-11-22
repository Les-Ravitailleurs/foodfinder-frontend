import React, { useState } from "react";
import Clipboard from "react-clipboard.js";

import "./CopyPaste.css";
import link from "./link.svg";

const CopyPaste = ({ poolId, volunteerUsername, dashboardToken }) => {
  const [copied, setCopied] = useState(false);
  const textToCopy = dashboardToken
    ? `${document.location.protocol}//${document.location.host}/dashboard?token=${dashboardToken}`
    : `${document.location.protocol}//${
        document.location.host
      }/collecte/${poolId}${
        volunteerUsername ? `?rav=${volunteerUsername}` : ""
      }`;
  const justCopied = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="CopyPaste">
      <img src={link} alt="link" className="CopyPaste__link" />
      <div className="CopyPaste__content">{textToCopy}</div>
      <Clipboard data-clipboard-text={textToCopy} onSuccess={justCopied}>
        {copied ? "Copié !" : "Copier"}
      </Clipboard>
    </div>
  );
};

export default CopyPaste;
