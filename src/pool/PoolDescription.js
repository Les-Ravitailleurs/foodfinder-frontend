import React from "react";
import logoRavitailleurs from "./logo_ravitailleur.svg";

const PoolDescription = ({ pool }) => {
  return (
    <div className="PoolDescription">
      <img className="PoolDescription__logo" alt="logo" src={logoRavitailleurs} />
      <h1>
        Bienvenue sur la collecte de {pool.poolName} crée par {pool.creatorName}
      </h1>
      <p>
        Les plus démunis ont besoin, aujourd’hui plus que jamais, d’aide
        alimentaire. Sans domiciles fixes, migrants, centres d’hébergements,
        hôtels sociaux n’ont plus assez de plats préparés pour vivre.
      </p>
    </div>
  );
};

export default PoolDescription;
