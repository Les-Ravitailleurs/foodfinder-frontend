import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";

import "./DonationSuccess.css";
import api from "../api";
import Footer from "../footer/Footer";

import couteau from "./couteau.svg";
import fouet from "./fouet1.svg";
import spatule from "./spatule.svg";
import logo from "./logo_ravitailleur.svg";
import cookies from "./cookies.svg";
import successLeftHand from "./successLeftHand.svg";
import successRightHand from "./successRightHand.svg";
import CopyPaste from "../copyPaste/CopyPaste";
import Button from "../button/Button";
import PoolModal from "../poolModal/PoolModal";
import SocialShare from "../socialShare/SocialShare";

const DonationSuccess = () => {
  const { mealCount } = useParams();
  const poolId = process.env.REACT_APP_RAVIT_POOL_ID;
  const [pool, setPool] = useState({});
  const history = useHistory();
  const [showPoolModal, setShowPoolModal] = useState(false);
  const [isReceiptAvailable, setIsReceiptAvailable] = useState(false);
  const { taxReceipt } = queryString.parse(window.location.search);

  const receiptURL = `https://${process.env.REACT_APP_S3_BUCKET}.s3.eu-west-3.amazonaws.com/taxReceipts/${taxReceipt}.pdf`;

  useEffect(() => {
    const getPool = async () => {
      try {
        const { data } = await api.get(`/pool/${poolId}`);
        setPool(data);
      } catch (e) {
        console.log(e);
        history.push("/");
      }
    };
    getPool();
  }, [poolId, history]);

  useEffect(() => {
    const checkReceipt = async () => {
      try {
        await axios.get(receiptURL);
        setIsReceiptAvailable(true);
      } catch (e) {
        const timer = setTimeout(checkReceipt, 1000);
        return () => clearTimeout(timer);
      }
    };
    checkReceipt();
  }, [setIsReceiptAvailable, receiptURL]);

  return (
    <div className="DonationSuccess">
      <img src={logo} alt="logo" className="DonationSuccess__logo" />
      <div className="DonationSuccess__merci__wrapper">
        <img
          src={successLeftHand}
          alt="successLeftHand"
          className="DonationSuccess__successLeftHand"
        />
        <img
          src={successRightHand}
          alt="successRightHand"
          className="DonationSuccess__successRightHand"
        />
        <div className="DonationSuccess__merci">
          <div className="DonationSuccess__totalCount">
            <div className="DonationSuccess__newCount">
              +&nbsp;{mealCount || 0}
            </div>
            <h1>{pool.mealCount && pool.mealCount + pool.startAt}</h1>
            <span>repas dans la collecte</span>
          </div>
          <h1>Merci&nbsp;!</h1>
          <p>
            Grâce à vous, nous allons pouvoir fournir
            <br />
            <b>{mealCount || 0} repas</b> à ceux qui en ont le plus besoin.
          </p>
          <a href={receiptURL} target="_blank">
            <Button disabled={!isReceiptAvailable}>
              {isReceiptAvailable
                ? "Télécharger votre reçu fiscal"
                : "Génération de votre reçu fiscal..."}
            </Button>
          </a>
          <span
            style={{
              fontSize: "12px",
              color: "rgba(0, 0, 0, 0.6)",
              fontWeight: 500,
            }}
          >
            <br />
            Retrouvez également ce document dans vos mails
          </span>
        </div>
      </div>
      <div className="DonationSuccess__share">
        <h1>Partagez la collecte&nbsp;!</h1>
        <p>
          Vous pouvez partager la collecte en utilisant le lien suivant&nbsp;:
        </p>
        <CopyPaste poolId={""} />
        <SocialShare poolId={""} />
      </div>
      {/* <div className="DonationSuccess__new">
        <h1>Vous aussi, créez votre collecte en un clic.</h1>
        <p>
          Le don que vous venez de faire sera comptabilisé dans cette nouvelle
          collecte. Proposez à vos collègues, amis, proches d’offrir des repas
          aux plus démunis.
        </p>
        <br />
        <Button
          onClick={() => {
            setShowPoolModal(true);
          }}
        >
          Je crée ma collecte
        </Button>
        <br />
      </div> */}
      <h1 className="DonationSuccess_thanks">Merci. Chaque repas compte.</h1>
      <br />
      <br />
      <Footer />
      {showPoolModal && (
        <PoolModal
          onClose={() => {
            setShowPoolModal(false);
          }}
        />
      )}
      <img alt="fouet" src={fouet} className="DonationSuccess__bgFouet" />
      <img alt="spatule" src={spatule} className="DonationSuccess__bgSpatule" />
      <img alt="couteau" src={couteau} className="DonationSuccess__bgCouteau" />
      <img alt="cookies" src={cookies} className="DonationSuccess__bgCookies" />
    </div>
  );
};

export default DonationSuccess;
