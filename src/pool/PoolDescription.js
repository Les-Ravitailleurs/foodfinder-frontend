import { Link } from "react-router-dom";
import React, { useState } from "react";
import logoRavitailleurs from "./logo_ravitailleur.svg";
import EditableText from "../editableText/EditableText";
import PoolModal from "../poolModal/PoolModal";
import Button from "../button/Button";
import whitePen from "./whitePen.svg";

const PoolDescription = ({ pool, getPool }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [messageEdit, setMessageEdit] = useState(false);
  return (
    <div
      className={`PoolDescription ${
        pool.admin ? "PoolDescription--admin" : ""
      }`}
    >
      <Link to="/">
        <img
          className="PoolDescription__logo"
          alt="logo"
          src={logoRavitailleurs}
        />
      </Link>
      {/* <h1>
        Bienvenue sur la collecte créée par{" "}
        {pool.admin ? (
          <EditableText
            text={pool.creatorName}
            onClick={() => {
              setMessageEdit(false);
              setShowEditModal(true);
            }}
          />
        ) : (
          <span className="green">{pool.creatorName}</span>
        )}
      </h1>
       */}
      {!pool.volunteer && (
        <h1>
          Bienvenue sur la collecte des
          <br />
          <span className="green">Ravitailleurs</span>
        </h1>
      )}
      {pool.volunteer && (
        <h1>
          <span className="green">{pool.volunteer.name}</span> vous invite à participer à la
          <br />
          collecte des <span className="green">Ravitailleurs</span>
        </h1>
      )}

      <p>
        Les plus démunis ont besoin, aujourd’hui plus que jamais, d’aide
        alimentaire. Sans domiciles fixes, migrants, centres d’hébergements,
        hôtels sociaux n’ont plus assez de plats préparés pour vivre.<br/>Nous projetons de cuisiner et distribuer au moins 50 000 repas en 2021. Aidez-nous à les financer ! C’est 100% transparent : 1 repas = 2€
      </p>
      {/* {(pool.admin || pool.message) && (
        <div className="PoolDescription__Message">
          <p>
            {pool.message ? pool.message : "Laissez une note aux visiteurs"}
          </p>
          {!pool.admin && <p className="green">{pool.creatorName}</p>}
          {pool.admin && (
            <Button
              onClick={() => {
                setMessageEdit(true);
                setShowEditModal(true);
              }}
            >
              {pool.message ? "Editer le" : "Ajouter un"} message{" "}
              <img src={whitePen} alt="whitePen" />
            </Button>
          )}
        </div>
      )} */}
      {showEditModal && (
        <PoolModal
          pool={pool}
          messageMode={messageEdit}
          onClose={async () => {
            await getPool();
            setShowEditModal(false);
          }}
        />
      )}
    </div>
  );
};

export default PoolDescription;
