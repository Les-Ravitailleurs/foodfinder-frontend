import React, { useState } from "react";
import Lottie from "react-lottie";
import VisibilitySensor from "react-visibility-sensor";
import moment from "moment";

import cuistot from "./cuistot.json";
import lemon from "./lemon-left.svg";
import tomato from "./tomato-right.svg";
import lemontomato from "./lemon-tomato.png";

import "./CollectesSummary.css";

const Gauge = ({ collectesPercent, isVisible }) => {
  const [decale, setDecale] = useState(false);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: cuistot,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  if (isVisible && !decale) {
    setTimeout(() => {
      setDecale(true);
    }, 400);
  }
  collectesPercent = Math.round(collectesPercent * 10) / 10;
  return (
    <div className="collectes-gauge-wrapper">
      <div
        className="collectes-cuistot"
        style={{
          marginLeft: `${decale ? collectesPercent : 0}%`,
          height: "84px",
          width: "72px",
        }}
      >
        <Lottie
          options={defaultOptions}
          isClickToPauseDisabled={true}
          height={84}
        />
      </div>
      <div
        className="collectes-gauge"
        style={{ width: `${collectesPercent}%` }}
      ></div>
      <div
        className="collectes-gauge-percent"
        style={{
          color: collectesPercent >= 90 ? "white" : "rgba(24, 24, 24, 0.6)",
          right:
            collectesPercent >= 90
              ? `calc(${100 - collectesPercent}% + 46px)`
              : "24px",
        }}
      >
        {collectesPercent}%
      </div>
    </div>
  );
};

const CollectesSummary = ({ mealsCount, donatorsCount }) => {
  const collectesPercent = mealsCount / 500;
  const now = moment();
  const end = moment("2021-02-28T23:00:00.000Z");
  const daysCount = end.diff(now, "days");
  const [isGaugeVisible, setIsGaugeVisible] = useState(false);
  const handleVisibilityChange = (isVisible) => {
    if (isVisible) setIsGaugeVisible(true);
  };
  return (
    <>
      <div className="collectes-summary-images d-lg-block d-none">
        <img src={lemon} className="ml-5 collectes-summary-image" />
        <img src={tomato} className="collectes-summary-image" />
        <img src={lemontomato} className="d-none collectes-summary-image" />
      </div>
      <div className="collectes-summary-wrapper">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="collectes-summary">
              <div className="row text-center text-lg-left">
                <div className="col-12 col-lg-6 collectes-summary-section">
                  Déjà récoltés
                  <br />
                  <h3>
                    <span className="green">
                      {mealsCount.toLocaleString()} / 50&nbsp;000
                    </span>
                    &nbsp;Repas
                  </h3>
                </div>
                <div className="col-lg-3 col-6 collectes-summary-section collectes-summary-section--borders">
                  Donateurs
                  <br />
                  <h3>
                    <span className="green">
                      {donatorsCount < 1000
                        ? donatorsCount.toLocaleString()
                        : `${parseInt(donatorsCount / 1000, 10)}k`}
                    </span>
                    &nbsp;Personnes
                  </h3>
                </div>
                <div className="col-lg-3 col-6 collectes-summary-section">
                  Temps restant
                  <br />
                  <h3>
                    <span className="green">{daysCount}</span>&nbsp;Jours
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <VisibilitySensor onChange={handleVisibilityChange}>
            <div className="col-12">
              <Gauge
                collectesPercent={collectesPercent}
                isVisible={isGaugeVisible}
              />
            </div>
          </VisibilitySensor>
        </div>
      </div>
    </>
  );
};

export default CollectesSummary;
