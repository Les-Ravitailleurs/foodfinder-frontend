/* eslint-disable */

import React, { useState, useEffect, useCallback } from "react";

import axios from "axios";
import Mailchimp from "react-mailchimp-form";
import { useHistory, Link } from "react-router-dom";
import queryString from "query-string";
import Papa from "papaparse";
import ReactGA from "react-ga";

import "./Landing.css";
import Button from "../button/Button";
import HowWorks from "../howWorks/HowWorks";
import PoolModal from "../poolModal/PoolModal";
import reviewer from "./puce-collegue.svg";
import reviewer2 from "./puce-famille.svg";
import reviewer3 from "./puce-reseau.svg";
import tomate from "./tomate.svg";
import tomateCarotte from "./tomateCarotte.png";
import Footer from "../footer/Footer";
import AssoList from "../assoList/AssoList";
import CollectesSummary from "../collectesSummary/CollectesSummary";
import api from "../api";
import VolunteerModal from "../volunteerModal/VolunteerModal";

const Landing = ({ linkcreation }) => {
  const [poolData, setPoolData] = useState(null);
  const poolId = process.env.REACT_APP_RAVIT_POOL_ID;
  const [showVolunteerModal, setShowVolunteerModal] = useState(linkcreation);

  const getPool = useCallback(async () => {
    try {
      const { data } = await api.get(`/pool/${poolId}`);
      setPoolData(data);
    } catch (e) {
      console.log(e);
    }
  }, [poolId]);

  useEffect(() => {
    getPool();
  }, [getPool]);

  setTimeout(() => {
    if (updateContentIfReady) {
      updateContentIfReady();
    }
  }, 1000);

  const volunteerData = localStorage.getItem(`ravit-volunteer`);
  const volunteer = volunteerData && JSON.parse(volunteerData);
  console.log(volunteer);

  return (
    <div>
      <div className="secondary position-relative text-center top-section">
        {showVolunteerModal && (
          <VolunteerModal onClose={() => setShowVolunteerModal(false)} />
        )}
        {volunteer && (
          <div className="topBanner">
            {volunteer.name}, accède à ton tableau
            <br />
            de bord{' '}
            <Link to={`/dashboard/?token=${volunteer.id}`}>
              en cliquant ici
            </Link>
          </div>
        )}
        <img
          id="top-carotte"
          className="top-image"
          src="/landing/images/top-carotte.svg"
        />
        <img
          id="top-casserole"
          className="top-image"
          src="/landing/images/top-casserole.svg"
        />
        <img
          id="top-fouet"
          className="top-image"
          src="/landing/images/top-fouet.svg"
        />
        <img
          id="top-rouleau"
          className="top-image"
          src="/landing/images/top-rouleau.svg"
        />
        <div className="container">
          <img className="logo mt-5 mb-5" src="/landing/images/logo.svg" />
          <h1>Changez leur monde avec des marmites</h1>
          <div className="row justify-content-center">
            <div className="mb-3 col-lg-8">
              Restaurateurs, cuisinez pour les plus précaires. Particuliers,
              <br />
              financez leurs matières premières
            </div>
          </div>
          <Link
            className="button button-big mt-5 mb-3"
            to="/collecte"
            onClick={() => {
              if (process.env.NODE_ENV === "production") {
                ReactGA.event({
                  category: "Collectes",
                  action: "click_collect",
                });
              }
            }}
          >
            Accéder à la collecte
          </Link>
          <div className="text-center mb-5">
            <a className="small" id="restaurateur-cta">
              Vous êtes restaurateur&nbsp;?
            </a>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <h3 className="mt-5 mb-4">
                Chaque repas compte,
                <br className="d-sm-inline d-none" />
                alors on les compte pour vous
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center curve-bg">
        <div className="container">
          <div className="row">
            <div className="col-2 col-sm-3 meals-count-hand-left">
              <img src="/landing/images/hand-left-black.svg" />
            </div>
            <div className="col-8 col-sm-6">
              <div className="meals-count">
                <div className="meals-count-number" id="meals-count-number">
                  &nbsp;
                </div>
                <div className="bold mb-3">
                  Repas cuisinés
                  <br />
                  par les chefs et restos Ravitailleurs
                </div>
                {/* <img
              src="/landing/images/hand-right.svg"
              class="meals-count-hand-right"
            /> */}
              </div>
            </div>
            <div className="col-2 col-sm-3 meals-count-hand-right">
              <img src="/landing/images/hand-right-black.svg" />
            </div>
          </div>
          <h2 className="mt-5 mb-4">
            Urgence confinement&nbsp;!
            <br />
            Nouvel objectif: financer 50&nbsp;000 repas
            <br />
            avant le 31 décembre 2020
          </h2>
          <div className="row justify-content-center">
            <div className="mb-3 col-lg-8">
              Particuliers, participez à la grande collecte Ravitailleurs et
              obtenez un reçu fiscal pour votre don
            </div>
          </div>
          <CollectesSummary
            mealsCount={poolData ? poolData.startAt + poolData.mealCount : 0}
            donatorsCount={poolData ? poolData.donationsCount : 0}
          />
          <Link
            className="button button-big mt-4 mb-5"
            to="/collecte"
            onClick={() => {
              if (process.env.NODE_ENV === "production") {
                ReactGA.event({
                  category: "Collectes",
                  action: "click_collect",
                });
              }
            }}
          >
            Accéder à la collecte
          </Link>

          <h2 className="mt-5 mb-5">Ils cuisinent pour les plus démunis</h2>
          <div className="row justify-content-between partners-block">
            <div className="col-6 col-md-3">
              <img
                className="partner-logo-deco"
                id="partner-logo-deco-tomates"
                src="/landing/images/partner-deco-tomates.svg"
              />
              <div className="partner-block">
                <img
                  className="partner-logo"
                  src="/landing/images/partner-frichti.svg"
                />
                <h3 className="pb-3 mb-3">Frichti</h3>
                <div className="bold">
                  <span className="green" id="frichti-events-count" />
                  &nbsp;Événements
                  <br />
                  <span className="green" id="frichti-meals-count" />
                  &nbsp;Repas
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3 mt-md-5">
              <img
                className="partner-logo-deco"
                id="partner-logo-deco-cloche"
                src="/landing/images/partner-deco-cloche.svg"
              />
              <div className="partner-block">
                <img
                  className="partner-logo"
                  src="/landing/images/partner-loufoque.svg"
                />
                <h3 className="pb-3 mb-3">Loufoque</h3>
                <div className="bold">
                  <span className="green" id="loufoque-events-count" />
                  &nbsp;Événements
                  <br />
                  <span className="green" id="loufoque-meals-count" />
                  &nbsp;Repas
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <img
                className="partner-logo-deco"
                id="partner-logo-deco-toques"
                src="/landing/images/partner-deco-toques.svg"
              />
              <div className="partner-block">
                <img
                  className="partner-logo"
                  src="/landing/images/partner-aux-deux-amis.svg"
                />
                <h3 className="pb-3 mb-3">Aux Deux Amis</h3>
                <div className="bold">
                  <span className="green" id="aux-deux-amis-events-count" />
                  &nbsp;Événements
                  <br />
                  <span className="green" id="aux-deux-amis-meals-count" />
                  &nbsp;Repas
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3 mt-md-5">
              <img
                className="partner-logo-deco"
                id="partner-logo-deco-fouet"
                src="/landing/images/partner-deco-fouet.svg"
              />
              <div className="partner-block">
                <img
                  className="partner-logo"
                  src="/landing/images/partner-big-mamma.svg"
                />
                <h3 className="pb-3 mb-3">Big Mamma</h3>
                <div className="bold">
                  <span className="green" id="big-mamma-events-count" />
                  &nbsp;Événements
                  <br />
                  <span className="green" id="big-mamma-meals-count" />
                  &nbsp;Repas
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div
                className="button-secondary mb-4"
                data-toggle="modal"
                data-target="#partnersModal"
                id="partners-modal-button"
              >
                Voir tous les partenaires
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="partnersModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header text-left">
                  <h2 className="mb-0">
                    Merci à tous ces généreux restaurateurs&nbsp;:
                  </h2>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <img src="/landing/images/close.svg" />
                  </button>
                </div>
                <div className="modal-body text-left" id="partners-list" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="how-works mt-5">
        <div className="container pt-5 pb-5">
          <div className="col-md-9 how-works-left-container">
            <div className="how-works-left text-center">
              <h2>Comment ça marche&nbsp;?</h2>
              <div className="how-works-content">
                <div className="how-works-digit mt-4">1.</div>
                <div>
                  Vous financez les matières
                  <br />
                  premières
                </div>
                <div className="how-works-digit mt-4">2.</div>
                <div>
                  Nos chefs partenaires
                  <br />
                  cuisinent avec le 💛
                </div>
                <div className="how-works-digit mt-4">3.</div>
                <div>
                  Une personne isolée ou
                  <br />
                  exclue se régale
                </div>
              </div>
              <Link
                className="button mt-5"
                to="/collecte"
                onClick={() => {
                  if (process.env.NODE_ENV === "production") {
                    ReactGA.event({
                      category: "Collectes",
                      action: "click_collect",
                    });
                  }
                }}
              >
                Accéder à la collecte
              </Link>
              <img
                src="/landing/images/running-chef.svg"
                className="how-works-illu d-none d-md-inline"
              />
            </div>
          </div>
          <div className="col-md-7" />
          <div className="col-12">
            <img
              src="/landing/images/running-chef.svg"
              className="d-inline d-md-none how-works-illu-mobile"
            />
          </div>
        </div>
      </div>
      <div className="container text-center mb-5">
        <h2 className="mt-5 mb-3">Nous sommes fiers de les ravitailler</h2>
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
                <img className="asso-logo" src="/landing/images/utopia.svg" />
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
      <div className="secondary red-banner" id="restaurateur-section">
        <div className="overflow-hidden">
          <div className="container text-center">
            <h1 className="mt-5">
              Restaurateurs, faites juste ce que vous aimez
            </h1>
            <div>Vous cuisinez, on s’occupe du reste</div>
            <div className="row text-left value-props">
              <div className="col-12 col-md-4">
                <div className="value-prop">
                  <img src="/landing/images/chef.svg" />
                  <h3>Zéro temps perdu</h3>
                  <p>
                    Vous cuisinez, nous nous chargeons de l'organisation avec
                    l'association.
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="value-prop">
                  <img src="/landing/images/cookies.svg" />
                  <h3>Zéro coût</h3>
                  <p>
                    Vous cuisinez, nous vous remboursons les matières premières
                    sous 30 jours.
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="value-prop">
                  <img className="mt-4" src="/landing/images/fruits.svg" />
                  <h3>Retour garanti</h3>
                  <p>
                    Vous cuisinez, l’association vous fait un retour en images
                    sur l’événement.
                  </p>
                </div>
              </div>
            </div>
            <a
              className="button mb-5 mt-sm-5 mt-2"
              href="https://forms.gle/RW1AxsqnpPzeW9NY7"
              target="_blank"
              onClick={() => {
                if (process.env.NODE_ENV === "production") {
                  ReactGA.event({
                    category: "Restaurants",
                    action: "click_restoform",
                  });
                }
              }}
            >
              Je rejoins le mouvement
            </a>
            <div className="row our-mission-wrapper mt-5">
              {/* <img
            id="our-mission-hand-1"
            class="d-none d-sm-inline"
            src="/landing/images/hand-right.svg"
          />
          <img
            id="our-mission-hand-2"
            class="d-none d-sm-inline"
            src="/landing/images/hand-right.svg"
          /> */}
              <div className="col">
                <div className="row our-mission no-gutters text-left">
                  <div className="col-12 col-lg-8">
                    <div className="our-mission-left">
                      <span className="our-mission-title">NOTRE MISSION</span>
                      <h1>Lutter contre l’exclusion via le bien manger</h1>
                      <div className="mt-4">
                        Manger sain et à sa faim, c’est se considérer, se sentir
                        considéré. Notre mission : rendre le bien manger
                        accessible à tous.
                        <br />
                        <br />
                        Nous sommes nés pendant le confinement pour répondre à
                        l’urgence alimentaire. En deux mois, nous avons mobilisé
                        des centaines de bénévoles et cuisiné des dizaines de
                        milliers de repas.
                        <br />
                        <br />
                        Aujourd’hui, nous écrivons un nouveau chapitre des
                        Ravitailleurs. Notre objectif : avoir de l’impact auprès
                        de 100 000 personnes chaque mois. Vous-voulez nous aider
                        à y parvenir ? <br />
                        <br />
                        Écrivez-nous à contact@lesravitailleurs.org
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-4 our-mission-right">
                    <img
                      src="/landing/images/repas.svg"
                      className="our-mission-img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="asso-cta-block-wrapper">
              <div className="asso-cta-block">
                <h2>Vous êtes une association&nbsp;?</h2>
                <div>Faites vivre un moment spécial à vos bénéficiaires</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="yellow-curve" id="associations-section">
        <div className="container">
          <div id="yellow-disc" className="d-none d-sm-block">
            <img
              className="d-none d-lg-inline"
              src="/landing/images/yellow-disc.png"
            />
            <img
              className="d-lg-none"
              src="/landing/images/yellow-disc-small.png"
            />
          </div>
          <div className="row">
            <div className="col-12 col-sm-9 bold">
              <div>
                💛&nbsp;&nbsp;&nbsp;Nos restaurateurs cuisinent pour vous avec
                le coeur
              </div>
              <div className="mt-3">
                👨‍🍳&nbsp;&nbsp;&nbsp;Pas de nouveau process à mettre en place, on
                s’occupe de tout
              </div>
              <div className="mt-3 mb-5">
                🤝&nbsp;&nbsp;&nbsp;Tout est gratuit
              </div>
            </div>
            <div className="col-3 d-none d-sm-block">
              {/* <img id="asso-cta-image" src="/landing/images/plateau.svg" /> */}
            </div>
            <div className="col-12">
              <a
                className="button text-center"
                href="https://forms.gle/a6NXyCZr7zeuJFqFA"
                target="_blank"
                onClick={() => {
                  if (process.env.NODE_ENV === "production") {
                    ReactGA.event({
                      category: "Associations",
                      action: "click_assoform",
                    });
                  }
                }}
              >
                Je prends contact
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="red-banner text-center">
        <h2>En direct des cuisines</h2>
        <a
          className="button-secondary mt-3 mb-5"
          href="https://www.instagram.com/ravitailleurs/"
          target="_blank"
        >
          <img src="/landing/images/insta.svg" /> Ravitailleurs
        </a>
        <div className="insta-feed-wrapper">
          <img id="insta-hand-left" src="/landing/images/hand-left.svg" />
          <img id="insta-hand-right" src="/landing/images/hand-right.svg" />
          <div id="instagram-feed">
            <div className="instagram_gallery">
              <a>
                <img src="/landing/images/insta-square-1.svg" />
              </a>
              <a>
                <img src="/landing/images/insta-square-2.svg" />
              </a>
              <a>
                <img src="/landing/images/insta-square-1.svg" />
              </a>
              <a>
                <img src="/landing/images/insta-square-2.svg" />
              </a>
              <a>
                <img src="/landing/images/insta-square-1.svg" />
              </a>
              <a>
                <img src="/landing/images/insta-square-2.svg" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="secondary footer pt-3 pb-3">
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-sm-3 col-12 mb-3 mb-sm-0">
              <img src="/landing/images/logo.svg" />
            </div>
            <div className="col-sm-6 col-12 mb-3 mb-sm-0">
              <span>
                Design par
                <a href="https://source.paris/" target="_blank">
                  Source
                </a>{" "}
                &amp; Développement par
                <a
                  href="https://www.linkedin.com/in/noemalzieu"
                  target="_blank"
                >
                  Noé Malzieu
                </a>
              </span>
            </div>
            <div className="col-sm-3 col-12">
              <span>Tous droits réservés © 2020</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
