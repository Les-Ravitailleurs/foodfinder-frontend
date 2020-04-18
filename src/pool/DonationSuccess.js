import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import "./DonationSuccess.css";
import api from "../api";

import couteau from "./couteau.svg";
import fouet from "./fouet1.svg";
import spatule from "./spatule.svg";
import logo from "./logo_ravitailleur.svg";

const DonationSuccess = () => {
  const { donationId } = useParams();
  const [donation, setDonation] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const getDonation = async () => {
      try {
        const { data } = await api.get(`/donation/${donationId}`);
        setDonation(data);
      } catch (e) {
        history.push("/");
      }
    };
    getDonation();
  }, [donationId, history]);

  const donationMealCount = donation && donation.amount / 100;

  return (
    <div className="DonationSuccess">
      <img src={logo} alt="logo" className="DonationSuccess__logo" />
      <div className="DonationSuccess__merci">
        <div className="DonationSuccess__totalCount">
          <div className="DonationSuccess__newCount">
            +&nbsp;{donationMealCount}
          </div>
          <h1>2050</h1>
          Repas collectés
        </div>
        <h1>Merci&nbsp;!</h1>
        <p>
          Grâce à votre don, nous allons pouvoir fournir <b>{donationMealCount} repas</b> à ceux qui en
          ont le plus besoin.
        </p>
      </div>
      <div className="DonationSuccess__comment">
        <h1>Pas si vite&nbsp;!</h1>
        <p>Avant de partir vous pouvez laisser un commentaire sur la page de la collecte</p>
      </div>
    </div>
  );
};

export default DonationSuccess;
