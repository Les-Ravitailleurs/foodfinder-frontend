import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

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
import SocialShare from '../socialShare/SocialShare';

const DonationSuccess = () => {
  const { mealCount, poolId } = useParams();
  const [pool, setPool] = useState({});
  const history = useHistory();
  const [showPoolModal, setShowPoolModal] = useState(false);
  console.log(showPoolModal);

  useEffect(() => {
    const getPool = async () => {
      try {
        const { data } = await api.get(`/pool/${poolId}`);
        setPool(data);
      } catch (e) {
        history.push("/");
      }
    };
    getPool();
  }, [poolId, history]);

  return (
    <div className="DonationSuccess">
      <img alt="fouet" src={fouet} className="DonationSuccess__bgFouet" />
      <img alt="spatule" src={spatule} className="DonationSuccess__bgSpatule" />
      <img alt="couteau" src={couteau} className="DonationSuccess__bgCouteau" />
      <img alt="cookies" src={cookies} className="DonationSuccess__bgCookies" />
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
            <h1>2050</h1>
            <span>Repas collectés</span>
          </div>
          <h1>Merci&nbsp;!</h1>
          <p>
            Grâce à vous, nous allons pouvoir cuisiner
            <br />
            <b>{mealCount || 0} repas</b> en plus pour les plus démunis.
          </p>
        </div>
      </div>
      <div className="DonationSuccess__share">
        <h1>Aidez {pool.creatorName}&nbsp;!</h1>
        <p>
          Vous pouvez partager la collecte de {pool.creatorName} en utilisant le
          lien suivant&nbsp;:
        </p>
        <CopyPaste poolId={pool.id} />
        <SocialShare poolId={pool.id} />
      </div>
      <div className="DonationSuccess__new">
        <h1>Vous aussi, créez voter collecte en un clic.</h1>
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
      </div>
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
    </div>
  );
};

export default DonationSuccess;
