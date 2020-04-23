import React from "react";

import "./Footer.css";
import logo from "../pool/logo_ravitailleur.svg";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="Footer_filler"></div>
      <div className="Footer__content">
        <a href="/">
          <img src={logo} alt="logo" />
        </a>
        <span style={{minWidth: '180px'}}>
          Design par{" "}
          <a href="https://source.paris/" target="_blank" rel="noopener noreferrer">
            Source
          </a><span className="desktopOnly"> & </span><span className="mobileOnly">,<br/></span>
          Développement par <a href="mailto:noe.malzieu@gmail.com">Noé Malzieu</a>
        </span>
        <span>Tous droits réservés © 2020</span>
      </div>
    </div>
  );
};

export default Footer;
