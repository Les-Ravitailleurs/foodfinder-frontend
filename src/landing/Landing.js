/* eslint-disable */

import React, { useState, useEffect } from "react";
import axios from "axios";
import Mailchimp from "react-mailchimp-form";

import "./Landing.css";
import PoolModal from "../poolModal/PoolModal";

const Landing = () => {
  const [mealCount, setMealCount] = useState("0");
  useEffect(() => {
    const setMealNumber = async () => {
      const { data } = await axios.get(
        "https://sheets.googleapis.com/v4/spreadsheets/19aDWWKXLwUBrWyMeXYHaB7sQAxUdYueAaUaAtqo1ut4/values/A2?key=AIzaSyBroGL6GU8PGrCVFCJJjmCCHq1VAu_aJck"
      );
      setMealCount(data.values[0]);
    };
    setMealNumber();
  }, [setMealCount]);

  return (
    <div>
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
              Ressortons les marmites pour les plus démunis !<br />
            </h1>
            <div className="div-block">
              <p className="paragraph">
                Alors que les circuits habituels d’approvisionnement des assos
                sont perturbés (ben oui, restos fermés = pas de dons), nous nous
                organisons pour permettre aux sans domiciles fixes, aux
                personnes réfugiées, aux centres d'hébergement ou aux hôtels
                sociaux de continuer à recevoir des plats et denrées
                alimentaires !<br />‍<br />
                <strong className="bold-text">
                  Producteurs, distributeurs, restaurateurs, rejoignez-nous.
                </strong>
              </p>
            </div>
            <div className="main-cta">
              <a className="button w-button createPool">
                Je deviens Ravitailleur
              </a>
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
          <div>
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
          </div>
        </div>
        <div className="container-3 w-container">
          <h2 className="heading-3">
            <strong>
              Parce que chaque repas compte,
              <br />
              on compte les repas
            </strong>
            <br />
          </h2>
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
                repas donnés par les Ravitailleurs
              </div>
            </div>
            <img
              src="/landing/images/Frame-3.svg"
              width={72}
              alt=""
              className="image-6"
            />
          </div>
          <div className="div-block-15">
            <div className="text-block-7">Les asso Ravitaillées :</div>
            <div className="div-block-17">
              <img
                src="/landing/images/Group-94.png"
                width={117}
                alt=""
                className="logo-asso"
              />
              <img
                src="/landing/images/logo_protection.png"
                width={117}
                alt=""
                className="logo-asso"
              />
              <img
                src="/landing/images/Group-93.png"
                width={117}
                alt=""
                className="logo-asso"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="div-block-19" />
      <div className="section-2">
        <div className="w-container">
          <div className="div-block-3">
            <div className="div-block-4">
              <h3 className="heading-2">Je suis restaurateur</h3>
              <p className="paragraph-2">
                Rouvrez vos cuisinez ou cuisinez (un peu) plus. <br />
                <br />
                On vous met en relation avec les assos qui ont besoin de vous.
                <br />
              </p>
              <div>
                <a
                  href="https://frichti.typeform.com/to/odhOWE"
                  target="_blank"
                  className="button-2 w-button"
                >
                  Je deviens Ravitailleur
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
              <h3 className="heading-2">Je suis producteur ou distributeur</h3>
              <p className="paragraph-2 right">
                Donnez-nous vos invendus, nous les distribuerons aux
                restaurateurs. Nous avons besoin de produits secs et frais.
                <br />
              </p>
              <div>
                <a
                  href="https://frichti.typeform.com/to/odhOWE"
                  target="_blank"
                  className="button-2 w-button"
                >
                  Je deviens Ravitailleur
                  <br />
                </a>
              </div>
            </div>
          </div>
          <div className="div-block-3">
            <div className="div-block-4">
              <h3 className="heading-2">Je suis un citoyen</h3>
              <p className="paragraph-2">
                Contactez-nous et faites un don pour nous aider à acheter plus
                de matières premières.
                <br />
              </p>
              <div>
                <a
                  href="https://frichti.typeform.com/to/odhOWE"
                  target="_blank"
                  className="button-2 w-button"
                >
                  Je deviens Ravitailleur
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
              <div className="div-block-11">
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
              </div>
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
                  button: "Valider",
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
          <div className="div-block-10 mercis">
            <div className="text-block-4">
              <strong>Merci à nos partenaires pour leur générosité</strong> :
            </div>
            <div className="div-block-18">
              <img
                src="/landing/images/logo-frichti-bleu-1.svg"
                width={96}
                alt=""
                className="logo-merci"
              />
              <img
                src="/landing/images/Vendredi-alt---MonoBlack-1.png"
                width={104}
                height={72}
                alt=""
                className="logo-merci"
              />
              <img
                src="/landing/images/source-logo-1.png"
                width={123}
                height={16}
                alt=""
                className="logo-merci last"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="section-3">
        <div className="container w-container">
          <div className="div-block-16">
            <img
              src="/landing/images/logo_ravitailleur.svg"
              width={108}
              alt=""
            />
          </div>
        </div>
      </div>

      <script src="/landing/js/webflow.js" type="text/javascript"></script>
    </div>
  );
};

export default Landing;
