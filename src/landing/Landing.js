/* eslint-disable */

import React, { useState, useEffect } from "react";
import axios from "axios";
import Mailchimp from "react-mailchimp-form";
import { useHistory, Link } from "react-router-dom";
import queryString from "query-string";
import Papa from "papaparse";

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
import api from "../api";

const Landing = () => {
  const history = useHistory();
  const query = queryString.parse(history.location.search);
  const [showModal, setShowModal] = useState(query.collecte === "creer");
  const [mealCount, setMealCount] = useState("");
  const [donatorCount, setDonatorCount] = useState("");
  const [benevoleCount, setBenevoleCount] = useState("");
  const [chefCount, setChefCount] = useState("");
  const [partenaires, setPartenaires] = useState([]);
  useEffect(() => {
    const setNumbers = async () => {
      const { data: landing } = await api.get("/landing");

      setMealCount(parseInt(landing.mealCount, 10).toLocaleString("fr"));
      setBenevoleCount(
        parseInt(landing.benevoleCount, 10).toLocaleString("fr")
      );
      setChefCount(parseInt(landing.chefCount, 10).toLocaleString("fr"));

      setPartenaires(landing.partenaires);

      setDonatorCount(parseInt(landing.donatorCount, 10).toLocaleString("fr"));
    };
    setNumbers();
  }, [setMealCount]);
  const entries = Object.entries(localStorage);
  const adminLocalStorage = entries.find((e) =>
    e[0].startsWith("ravit-admin-")
  );
  const adminPoolId = adminLocalStorage && adminLocalStorage[0].slice(12);
  const adminPoolCreatorName =
    adminPoolId &&
    localStorage.getItem(`ravit-pool-${adminPoolId}-creator-name`);

  return (
    <div>
      {adminPoolId && false && (
        <div className="topBanner">
          <Link to={`/collecte/${adminPoolId}`}>
            {adminPoolCreatorName}, retrouvez votre collecte en cliquant ici
          </Link>
        </div>
      )}

      <div className="section">
        <div className="container-4 w-container">
          <div className="div-block-2">
            <div className="div-block">
              <img
                src="/landing/images/logo_ravitailleur.svg"
                width={191}
                alt=""
                className="image"
              />
            </div>
            <h1 className="heading">
              Aidez nous à cuisiner des milliers
              <br />
              de repas pour les plus démunis
            </h1>
            <div className="div-block">
              <p className="paragraph">
                À cause de la crise sanitaire actuelle, des milliers de
                personnes, en France, ne peuvent plus se nourrir au quotidien.
                Vous pouvez aider.
                <br />‍<br />
              </p>
            </div>
            <div className="main-cta">
              <br />
              <Button onClick={() => setShowModal(true)}>
                Je crée ma collecte
              </Button>
            </div>
          </div>
        </div>
        <img
          src="/landing/images/carotte.svg"
          width={147}
          alt=""
          className="image-9"
        />
        <img
          src="/landing/images/casserole.svg"
          width={207}
          alt=""
          className="image-10"
        />
        <img
          src="/landing/images/fouet.svg"
          width={264}
          alt=""
          className="image-12"
        />
        <img
          src="/landing/images/rouleau-1.svg"
          width={292}
          alt=""
          className="image-11"
        />
      </div>
      <div className="section-7">
        <div className="div-block-20">
          <HowWorks />
          {/* <div>
            <div className="text-block-10">Les Ravitailleurs partenaires :</div>
          </div>
          <div className="div-block-21">
            <img
              src="/landing/images/BIG-MAMMA_2.png"
              width={103}
              id="w-node-192eb1ae600c-427335c4"
              alt=""
            />
            <img
              src="/landing/images/logo-frichti-bleu-1.svg"
              width={100}
              id="w-node-b563d32dfe57-427335c4"
              alt=""
            />
            <img
              src="/landing/images/LOGO-Kinn-Khao-22-02-62-02.jpg"
              width={150}
              id="w-node-8d7ba9c207d7-427335c4"
              alt=""
            />
          </div> */}
        </div>
        <div className="container-3 w-container">
          <h2
            className="heading-3"
            style={{ marginTop: "-40px", fontSize: "28px" }}
          >
            Ravitaillez depuis chez vous,
            <br />
            créez votre <span className="emphasis">collecte</span>
            <br />
          </h2>
          <p
            style={{
              textAlign: "center",
              margin: "50px",
              fontSize: "13px",
              fontFamily: "Open Sans, sans-serif",
            }}
          >
            Créez et partagez en quelques clics une collecte afin de récolter
            des repas
            <br />
            au sein de votre entreprise, communauté, famille, groupe d'amis...
          </p>
          <div className="reviews">
            <div className="reviewContainer">
              {/* <img
                className="reviewBackground"
                id="reviewBackground1"
                src={tomate}
                title="tomate"
              /> */}
              <div className="review">
                <img className="reviewImage" src={reviewer} alt="reviewer" />
                <br />
                Clémence a créé une collecte pour que ses collègues offrent des
                repas et a collecté <span className="green">568 repas</span>
              </div>
            </div>
            <div className="reviewContainer">
              {/* <img
                className="reviewBackground"
                id="reviewBackground2"
                src={tomateCarotte}
                title="tomateCarotte"
              /> */}
              <div className="review">
                <img className="reviewImage" src={reviewer3} alt="reviewer" />
                <br />
                Valentin a créé une collecte pour la partager sur Instagram, il
                a collecté <span className="green">2234 repas</span>
              </div>
            </div>
            <div className="reviewContainer">
              {/* <img
                className="reviewBackground"
                id="reviewBackground3"
                src={tomate}
                title="tomate"
              /> */}
              <div className="review">
                <img className="reviewImage" src={reviewer2} alt="reviewer" />
                <br />
                Sabrina a créé une collecte pour sa famille, elle a collecté{" "}
                <span className="green">243 repas</span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", margin: "50px" }}>
            <Button onClick={() => setShowModal(true)}>
              Je crée ma collecte
            </Button>
          </div>
          <h2
            className="heading-3"
            style={{
              fontSize: "25px",
              marginBottom: "-10px",
              paddingTop: "40px",
            }}
          >
            Grâce à nos bénévoles et partenaires,
            <br />
            nous avons déjà distribué&nbsp;:
            <br />
          </h2>
        </div>
      </div>
      <div className="div-block-19">
        <div className="div-block-14">
          <img
            src="/landing/images/Frame-4.svg"
            width={73}
            alt=""
            className="image-5"
          />
          <div className="div-block-13">
            <div id="plat-number" className="text-block-6 plat-number">
              {mealCount}
            </div>
            <div className="text-block-5">
              <strong>Repas</strong>
            </div>
          </div>
          <img
            src="/landing/images/Frame-3.svg"
            width={72}
            alt=""
            className="image-6"
          />
        </div>
      </div>
      <div className="section-2">
        <div style={{ textAlign: "center" }}>
          <div className="text-block-7">Aidés par :</div>
          <div
            style={{
              display: "flex",
              width: "100%",
              maxWidth: "500px",
              margin: "auto",
              justifyContent: "space-between",
            }}
          >
            <div className="countDisplay">
              <h1>{donatorCount}</h1>
              Citoyens
            </div>
            <div className="countDisplay">
              <h1>{benevoleCount}</h1>
              Bénévoles
            </div>
            <div className="countDisplay">
              <h1>{chefCount}</h1>
              Chefs
            </div>
          </div>
        </div>
        <div
          className="div-block-15"
          style={{ maxWidth: "500px", margin: "auto" }}
        >
          <AssoList />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
      <div className="section-6">
        <div className="div-block-9" style={{ marginBottom: "50px" }} />
        <div className="w-container">
          <div className="div-block-3">
            <div className="div-block-4">
              <h3 className="heading-2">Je suis cuisinier</h3>
              <p className="paragraph-2">
                Sortez les marmites ! Vous nous dites combien de repas vous
                pouvez cuisiner et quand, nous vous livrons les produits et
                venons rechercher les plats cuisinés.
              </p>
              <div>
                <a
                  href="https://docs.google.com/forms/d/1R40F0gfAfYHVev3oQV9-g9UoifQzZOZC94Dy7rsMaTE/"
                  target="_blank"
                  className="button-2 w-button"
                >
                  Je cuisine
                  <br />
                </a>
              </div>
            </div>
            <div className="div-block-5">
              <img
                src="/landing/images/Frame-1.svg"
                width={189}
                alt=""
                className="image-3"
              />
            </div>
          </div>
          <div className="div-block-3">
            <div className="div-block-5">
              <img
                src="/landing/images/producteurs.png"
                alt=""
                className="image-13"
              />
            </div>
            <div className="div-block-4 right">
              <h3 className="heading-2">Je suis bénévole</h3>
              <p className="paragraph-2 right">
                Nous avons besoin de vous ! Transport de marchandises,
                préparation de commande, inventaires ... inscrivez-vous et nous
                vous proposerons des missions.
                <br />
              </p>
              <div>
                <a
                  href="https://docs.google.com/forms/d/1wPg2c6uNbDwkic3WqvosU3zd_FxVukcEeI9-XJBajLY/"
                  target="_blank"
                  className="button-2 w-button"
                >
                  Je donne de mon temps
                  <br />
                </a>
              </div>
            </div>
          </div>
          <div className="div-block-3">
            <div className="div-block-4">
              <h3 className="heading-2">Je suis un citoyen</h3>
              <p className="paragraph-2">
                Créez et partagez en quelques clics une collecte afin de
                récollecter des repas au sein de votre entreprise, communauté,
                famille, groupe d’amis,...
                <br />
              </p>
              <div>
                <a
                  onClick={() => setShowModal(true)}
                  className="button-2 w-button"
                >
                  Je crée ma collecte
                  <br />
                </a>
              </div>
            </div>
            <div className="div-block-5">
              <img
                src="/landing/images/Frame-2.svg"
                width={177}
                alt=""
                className="image-7"
              />
            </div>
          </div>
          <div className="div-block-10 mercis">
            <h1>
              Merci à nos généreux
              <br />
              partenaires:
            </h1>
            <div className="div-block-18">
              {partenaires.map((p) => (
                <span className="partenaireName">
                  <a key={p.name} href={p.url} target="_blank">
                    {p.name}
                  </a>
                  •
                </span>
              ))}
            </div>
            <div
              style={{
                color: "rgba(0, 0, 0, 0.6)",
                fontFamily: "Open Sans",
                fontSize: "13px",
                padding: "20px",
                maxWidth: "600px",
                margin: "auto",
              }}
            >
              Les Ravitailleurs sont aidés par Frichti pour la gestion des flux
              logistiques et financiers.
              <br />
              Merci à toute l’équipe pour sa générosité et son soutien.
            </div>
          </div>
        </div>
      </div>
      <div className="section-4">
        <div className="w-container">
          <div
            data-animation="slide"
            data-duration={500}
            data-infinite={1}
            className="w-slider"
          >
            <div className="w-slider-mask">
              <div className="slide w-slide">
                <img
                  src="/landing/images/Ellipse-5-1.png"
                  width={100}
                  alt=""
                  className="image-4"
                />
                <div className="text-block">
                  “Donnez-nous vos invendus, nous les distribuerons aux
                  restaurateurs. Nous avons besoin de produits secs et frais.”
                </div>
                <div>
                  <em className="italic-text-2">Thierry Marx, Ravitailleur</em>
                </div>
              </div>
              <div className="w-slide" />
            </div>
            <div className="left-arrow w-slider-arrow-left">
              <div className="icon">
                <img src="/landing/images/Vector-1.svg" alt="" />
              </div>
            </div>
            <div className="right-arrow w-slider-arrow-right">
              <div className="icon">
                <img src="/landing/images/Vector.svg" alt="" />
              </div>
            </div>
            <div className="slide-nav w-slider-nav w-round" />
          </div>
        </div>
      </div>
      <div className="section-5">
        <div className="w-container">
          <div className="div-block-8">
            <div className="div-block-6">
              <div className="text-block-2">
                <strong>
                  Téléchargez notre guide pour cuisiner en toute sécurité
                  sanitaire
                </strong>
                <br />
              </div>
            </div>
            <div className="div-block-7">
              <a href="#" className="button-3 w-button">
                Télécharger notre guide{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="section-6">
        <div className="div-block-9" />
        <div className="container-2 w-container">
          <div className="div-block-10">
            <div className="div-block-12">
              <div className="text-block-3">
                Recevez des nouvelles du front, entrez votre email :
              </div>
              {/* <div className="div-block-11">
                <img
                  src="/landing/images/Ellipse-4.svg"
                  width={28}
                  alt=""
                  className="bubble"
                />
                <img
                  src="/landing/images/Ellipse-4.svg"
                  width={28}
                  alt=""
                  className="bubble"
                />
                <img
                  src="/landing/images/Ellipse-4.svg"
                  width={28}
                  alt=""
                  className="bubble"
                />
              </div> */}
            </div>
            <div className="w-form">
              <br />
              <Mailchimp
                action="https://lesravitailleurs.us19.list-manage.com/subscribe/post?u=30b516ffce51a9335e4e21f7c&amp;id=8a045718d8"
                fields={[
                  {
                    name: "EMAIL",
                    placeholder: "Adresse e-mail",
                    type: "email",
                    required: true,
                  },
                ]}
                className="email-form"
                messages={{
                  sending: "Enregistrement...",
                  success: "Merci pour votre inscription !",
                  error: "Une erreur est survenue.",
                  empty: "Veuillez entrer votre adresse email.",
                  duplicate:
                    "Trop d'inscription récentes pour cette adresse email",
                  button: "Je m'inscris",
                }}
              />
              <div className="success-message w-form-done">
                <div className="text-block-8">Merci !</div>
              </div>
              <div className="error-message w-form-fail">
                <div className="text-block-9">
                  Oops! Il semblerait qu'une erreur s'est produite. Veuillez
                  réessayer.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {showModal && <PoolModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Landing;
