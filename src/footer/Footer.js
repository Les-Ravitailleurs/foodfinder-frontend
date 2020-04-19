import React from "react";

import "./Footer.css";
import logo from "../pool/logo_ravitailleur.svg";


const Footer = () => {
  return (
    <div className="Footer">
      <div className="Footer_filler"></div>
        <div className="Footer__content">
          <img src={logo} />
          <span>Tous droits réservés © 2020</span>
      </div>
    </div>
  );
};

export default Footer;
