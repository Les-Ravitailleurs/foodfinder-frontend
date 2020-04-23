import React from "react";
import { isMobile } from "react-device-detect";

import "./AssoList.css";

import restoDuCoeur from "./restoDuCoeur.svg";
import secoursPop from "./secoursPop.svg";
import banlieueSante from "./banlieueSante.png";
import protectionCivile from "./protectionCivile.svg";

const AssoList = () => {
  return (
    <div className="AssoList">
      <h1>Les assos Ravitaillées :</h1>
      <div className="AssoList__images">
        <img src={restoDuCoeur} alt="restoDuCoeur" />
        <img src={secoursPop} alt="secoursPop" />{isMobile && <br/>}
        <img src={banlieueSante} alt="restoDuCoeur" />
        <img src={protectionCivile} alt="restoDuCoeur" />
      </div>
    </div>
  );
};

export default AssoList;
