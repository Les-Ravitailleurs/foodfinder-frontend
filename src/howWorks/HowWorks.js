import React from "react";

import "./HowWorks.css";

const HowWorks = () => {
  return (
    <>
      <h2 className="HowWorks__title">Comment ça marche&nbsp;?</h2>
      <div className="HowWorks">
        <div className="HowWorks__step">
          <div className="HowWorks__step__number">1.</div>
          <div className="HowWorks__step__description">
            Vous financez les
            <br />
            matières premières
          </div>
        </div>
        <div className="HowWorks__step">
          <div className="HowWorks__step__number">2.</div>
          <div className="HowWorks__step__description">
            Vous financez les
            <br />
            matières premières
          </div>
        </div>
        <div className="HowWorks__step">
          <div className="HowWorks__step__number">3.</div>
          <div className="HowWorks__step__description">
            Vous financez les
            <br />
            matières premières
          </div>
        </div>
      </div>
    </>
  );
};

export default HowWorks;
