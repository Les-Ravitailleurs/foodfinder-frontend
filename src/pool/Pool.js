import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import isMobile from "../isMobile";
import queryString from "query-string";
import moment from "moment";
import "moment/locale/fr";
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
import tf1 from "./tf1.svg";
import leParisien from "./leParisien.svg";
import franceBleu from "./franceBleu.svg";
import parisMatch from "./parisMatch.svg";

moment.locale("fr");

const Pool = () => {
  // const { poolId, adminId } = useParams();
  const { rav: volunteer } = queryString.parse(window.location.search);
  const [pool, setPool] = useState(null);
  const history = useHistory();
  const poolId = process.env.REACT_APP_RAVIT_POOL_ID;
  const [retraits, setRetraits] = useState([]);

  // if (adminId) {
  //   localStorage.setItem(`ravit-admin-${poolId}`, adminId);
  //   history.push(`/collecte/${poolId}`);
  // }

  const getPool = useCallback(async () => {
    try {
      const savedAdminId = localStorage.getItem(`ravit-admin-${poolId}`);
      const { data } = await api.get(
        `/pool/${poolId}${volunteer ? `?volunteer=${volunteer}` : ""}`
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

  useEffect(() => {
    const checkAndSet = () => {
      if (window.retraits) {
        setRetraits(window.retraits);
      } else {
        setTimeout(checkAndSet, 100);
      }
    };
    checkAndSet();
  }, []);

  const [newsIndex, setNewsIndex] = useState(0);

  const newsCarouselLeft = useCallback(() => {
    setNewsIndex(Math.max(0, newsIndex - 1));
  });

  const newsCarouselRight = useCallback(() => {
    setNewsIndex(Math.min(3, newsIndex + 1));
  });

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
            <div className="Pool__LastMissions">
              <h3>Les dernières missions effectuées</h3>
              {retraits.map((retrait) => (
                <div className="Pool__Mission">
                  <div className="Pool__Mission__Left">
                    <div className="Pool__Mission__Left__MealCount">
                      {retrait.mealCount}
                    </div>
                    <div>
                      <strong>
                        Repas cuisinés
                        <br />
                      </strong>
                      le {moment(retrait.date, "DD/MM/YYYY").format("DD MMMM")}
                    </div>
                  </div>
                  <div className="Pool__Mission__Right">
                    <div className="Pool__Mission__Right__Half">
                      <span>pour </span>
                      <strong>{retrait.pour}</strong>
                    </div>
                    <div className="Pool__Mission__Right__Half">
                      <span>par </span>
                      <strong>{retrait.par}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="container text-center mb-5">
              <h3 className="mt-5 mb-3">Ils parlent de nous</h3>
              <div className="row no-gutters align-items-center">
                <div className="col-1 d-none d-sm-block">
                  <img
                    className="carousel-arrow"
                    onClick={newsCarouselLeft}
                    src="/landing/images/left-arrow.svg"
                  />
                </div>
                <div className="col-sm-10 col">
                  <div className="NewsWrapper">
                    <div
                      className="NewsItem"
                      style={{ marginLeft: `-${newsIndex * 100}%` }}
                    >
                      <div className="NewsLogo">
                        <img src={leParisien} />
                      </div>
                      <div className="NewsContent">
                        <div>
                          Depuis sa création au premier confinement, ce
                          collectif a permis à des restaurateurs parisiens de
                          cuisiner bénévolement plus de 59 000 repas, distribués
                          aux plus démunis par les associations d’entraide.{" "}
                          <a
                            href="https://www.leparisien.fr/paris-75/paris-avec-les-ravitailleurs-des-chefs-cuisiniers-rallument-les-feux-pour-les-plus-demunis-09-12-2020-8413315.php"
                            target="_blank"
                          >
                            Lire l'article
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="NewsItem">
                      <div className="NewsLogo">
                        <img src={tf1} />
                      </div>
                      <div className="NewsContent">
                        <div>
                          Pol Maire, ingénieur, a lancé "Les Ravitailleurs". Ce
                          collectif de restaurateurs et de maraîchers vient en
                          aide aux associations pour distribuer des repas aux
                          plus démunis, particulièrement vulnérables en cette
                          période de confinement.
                          <a
                            href="https://www.lci.fr/social/video-confinement-une-chaine-de-solidarite-pour-offrir-des-repas-aux-plus-demunis-2150757.html"
                            target="_blank"
                          >
                            Lire l'article
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="NewsItem">
                      <div className="NewsLogo">
                        <img src={franceBleu} />
                      </div>
                      <div className="NewsContent">
                        <div>
                          50.000 repas distribués en 8 semaines&nbsp;! Pol
                          Marie, un des créateurs des "Ravitailleurs", nous
                          explique le fonctionnement de cette initiative.
                          <a
                            href="https://www.francebleu.fr/vie-quotidienne/famille-enfants/les-ravitailleurs-connectent-cuisiniers-et-associations-pour-venir-en-aide-aux-plus-demunis-1590418345"
                            target="_blank"
                          >
                            Lire l'article
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="NewsItem">
                      <div className="NewsLogo">
                        <img src={parisMatch} />
                      </div>
                      <div className="NewsContent">
                        <div>
                          Pol Maire, un ancien de chez Frichti, a lancé Les
                          Ravitailleurs, un collectifs d'acteur de la
                          restauration qui vient en aide aux associations pour
                          distribuer des repas aux plus démunis,
                          particulièrement vulnérables en cette période de
                          confinement.
                          <a
                            href="https://www.parismatch.com/Actu/Societe/Les-Ravitailleurs-une-itinative-pour-venir-en-aide-aux-plus-demunis-1680917"
                            target="_blank"
                          >
                            Lire l'article
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-1 d-none d-sm-block">
                  <img
                    className="carousel-arrow"
                    onClick={newsCarouselRight}
                    src="/landing/images/right-arrow.svg"
                  />
                </div>
              </div>
            </div>
            <div className="container text-center mb-5">
              <h3 className="mt-5 mb-3">Les asso Ravitaillées&nbsp;:</h3>
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
