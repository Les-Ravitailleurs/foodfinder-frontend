import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import isMobile from "../isMobile";

import "./Pool.css";
import PoolDescription from "./PoolDescription";
import PoolSummary from "./PoolSummary";
import GiveModule from "./GiveModule";
import api from "../api";
import Footer from "../footer/Footer";
import AssoList from "../assoList/AssoList";
import HowWorks from "../howWorks/HowWorks";
import CollectesSummary from "../collectesSummary/CollectesSummary";

import couteau from "./couteau.svg";
import fouet from "./fouet1.svg";
import spatule from "./spatule.svg";

const Pool = () => {
  // const { poolId, adminId } = useParams();
  const [pool, setPool] = useState(null);
  const history = useHistory();
  const poolId = process.env.REACT_APP_RAVIT_POOL_ID;

  // if (adminId) {
  //   localStorage.setItem(`ravit-admin-${poolId}`, adminId);
  //   history.push(`/collecte/${poolId}`);
  // }

  const getPool = useCallback(async () => {
    try {
      const savedAdminId = localStorage.getItem(`ravit-admin-${poolId}`);
      const { data } = await api.get(
        `/pool/${poolId}${savedAdminId ? `?adminId=${savedAdminId}` : ""}`
      );
      if (savedAdminId && data.admin === false) {
        localStorage.removeItem(`ravit-admin-${poolId}`);
      }
      localStorage.setItem(
        `ravit-pool-${poolId}-creator-name`,
        data.creatorName
      );
      setPool(data);
    } catch (e) {
      history.push("/");
    }
  }, [history, poolId]);

  useEffect(() => {
    getPool();
  }, [getPool]);

  return (
    <div className="Pool">
      <div className="PoolLeft">
        <div className="PoolLeftContent">
          <div style={{ maxWidth: "1000px", margin: "auto" }}>
            <img alt="fouet" src={fouet} className="PoolLeft__bgFouet" />
            <img alt="spatule" src={spatule} className="PoolLeft__bgSpatule" />
            <img alt="couteau" src={couteau} className="PoolLeft__bgCouteau" />
            {pool && (
              <>
                <PoolDescription pool={pool} getPool={getPool} />
                {!isMobile && (
                  <>
                    <HowWorks />
                    <br />
                  </>
                )}
                {isMobile && <GiveModule pool={pool} />}
                {isMobile && <HowWorks />}
                <div className="Pool__CollectesSummary">
                  <CollectesSummary
                    mealsCount={pool ? pool.startAt + pool.mealCount : 0}
                    donatorsCount={pool ? pool.donationsCount : 0}
                  />
                </div>
                <PoolSummary pool={pool} />
              </>
            )}
            <div className="container text-center mb-5">
              <h2 className="mt-5 mb-3">
                Nous sommes fiers de les ravitailler
              </h2>
              <div className="row no-gutters align-items-center">
                <div className="col-1 d-none d-sm-block">
                  <img
                    className="carousel-arrow"
                    id="carousel-arrow-left"
                    src="/landing/images/left-arrow.svg"
                  />
                </div>
                <div className="col-sm-10 col">
                  <div className="assos-logos-wrapper">
                    <div className="assos-logos">
                      {/* <img
                        className="asso-logo"
                        src="/landing/images/restos-du-coeur.svg"
                      /> */}
                      <img
                        className="asso-logo"
                        src="/landing/images/protection-civile.svg"
                      />
                      <img
                        className="asso-logo"
                        src="/landing/images/secours-populaire.svg"
                      />
                      <img
                        className="asso-logo"
                        src="/landing/images/utopia.svg"
                      />
                      <img
                        className="asso-logo"
                        src="/landing/images/banlieues-sante.svg"
                      />
                      <img
                        className="asso-logo"
                        src="/landing/images/la-table-ouverte.svg"
                      />
                      <img
                        className="asso-logo"
                        src="/landing/images/action-froid.svg"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-1 d-none d-sm-block">
                  <img
                    className="carousel-arrow"
                    id="carousel-arrow-right"
                    src="/landing/images/right-arrow.svg"
                  />
                </div>
              </div>
            </div>
            {/* <AssoList /> */}
            {/* <p className="Pool__FrichtiHelp">
              Les Ravitailleurs sont aidés par Frichti pour la gestion des flux
              logistiques et financiers.
              <br />
              Merci à toute l’équipe pour sa générosité et son soutien.
            </p> */}
          </div>
        </div>
        <Footer />
      </div>
      {!isMobile && (
        <div className="PoolRight">
          {pool && (
            <>
              <GiveModule pool={pool} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Pool;
