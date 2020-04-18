import React, { useState } from "react";

import "./Landing.css";
import PoolModal from "../poolModal/PoolModal";

const Landing = () => {
  const [showCreatePool, setShowCreatePool] = useState(false);
  const eventMethod = window.addEventListener
    ? "addEventListener"
    : "attachEvent";
  const eventer = window[eventMethod];
  const messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";

  eventer(messageEvent, (e) => {
    if (e.data === "createPool" && !showCreatePool) {
      setShowCreatePool(true);
    }
  });
  return (
    <>
      <iframe
        title="landing"
        src="/landing"
        id="landing-iframe"
        width="100%"
        height="100%"
        border="0"
      ></iframe>
      {showCreatePool && <PoolModal />}
    </>
  );
};

export default Landing;
