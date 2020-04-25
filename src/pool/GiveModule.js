import React, { useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
// import ClapButton from "react-clap-button";

import api from "../api";
import "./GiveModule.css";
import Button from "../button/Button";
import EditableText from "../editableText/EditableText";
import Input from "../input/Input";
import EmailModal from "../EmailModal/emailModal";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const GiveModule = ({ pool }) => {
  const [mealCount, setMealCount] = useState(0);
  const [editorMealCount, setEditorMealCount] = useState("");
  const [donatorName, setDonatorName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editMealCount, setEditMealCount] = useState(false);
  const [error, setError] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const donate = async () => {
    setSubmitting(true);
    // setTimeout(() => {
    //   setShowEmailModal(true);
    //   setSubmitting(false);
    // }, 1000);
    const { data } = await api.post("/donation", {
      mealCount,
      poolId: pool.id,
      donatorName: donatorName.trim(),
    });
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId: data.checkoutSessionId,
    });
    setError(error);
  };

  const GiveIcon = ({ addCount }) => (
    <div
      className="GiveModule__MealButton__Icon"
      onClick={() => setMealCount(mealCount + addCount)}
    >
      +{addCount}
    </div>
  );

  const GiveCountButton = ({ giveCount }) => (
    <div className="GiveModule__MealButton">
      <GiveIcon addCount={giveCount} />

      {/* <ClapButton
        maxCount={1}
        isClicked={false}
        iconComponent={(props) => (
          <GiveIcon {...props} addCount={giveCount} size={70} />
        )}
        ref={(r) => {
          const onClick = r.onClick;
          r.onClick = (e) => {
            elem.dispatchEvent(event);

            elem.addEventListener('build', function (e) { }, false);
            onClick(e);
          };
        }}
      /> */}
    </div>
  );

  const price = mealCount
    ? mealCount * parseFloat(process.env.REACT_APP_MEAL_PRICE)
    : 0;

  const validateEditMeal = () => {
    if (editorMealCount !== "") {
      setMealCount(editorMealCount);
    }
    setEditMealCount(false);
    setEditorMealCount("");
  };

  return (
    <div className="GiveModule">
      <h1>Offrez des repas</h1>
      <div className="GiveModule__MealButtons">
        <GiveCountButton giveCount={1} />
        <GiveCountButton giveCount={10} />
        <GiveCountButton giveCount={100} />
      </div>
      <div className="GiveModule__MealCount">
        {editMealCount && (
          <div className="GiveModule__MealCountEdit">
            <Input
              placeholder="Nombre de repas"
              value={editorMealCount}
              onChange={(e) => {
                if (e.target.value) {
                  const newInt = parseInt(e.target.value, 10);
                  if (!Number.isNaN(Number(newInt))) {
                    setEditorMealCount(newInt);
                  }
                } else {
                  setEditorMealCount("");
                }
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  validateEditMeal();
                }
              }}
            />
            <Button onClick={validateEditMeal}>OK</Button>
          </div>
        )}
        {!editMealCount && (
          <EditableText
            text={`${mealCount} repas`}
            onClick={() => {
              setEditorMealCount(mealCount > 0 ? mealCount : "");
              setEditMealCount(true);
            }}
          />
        )}
        <br />
        <p style={{ visibility: mealCount > 0 ? "visible" : "hidden" }}>
          Soit {mealCount}&nbsp;packaging +&nbsp;{(mealCount * 0.25).toFixed(1)}
          &nbsp;kg de riz ou de pâtes +&nbsp;{(mealCount * 0.15).toFixed(1)}
          &nbsp;kg de légumes
        </p>
      </div>
      <span className="GiveModule__error">{error && error.message}</span>
      <div className="GiveModule__button">
        <Input
          placeholder="Votre nom"
          value={donatorName}
          onChange={(e) => {
            setDonatorName(e.target.value.slice(0, 200));
          }}
          onKeyDown={(e) => {
            if (submitting || mealCount === 0 || editMealCount || !donatorName)
              return;
            if (e.keyCode === 13) {
              donate();
            }
          }}
        />
        <Button
          onClick={donate}
          disabled={
            submitting || mealCount === 0 || editMealCount || !donatorName
          }
        >
          {submitting ? "Redirection..." : `Payer ${price ? `${price}€` : ""}`}
        </Button>
        <div className="GiveModule__Details">
          <strong>{process.env.REACT_APP_MEAL_PRICE}€ = 1 repas</strong>
          <p>
            Le nombre de repas que vous offrez ne sera pas visible sur la page
            de la collecte. Seul votre nom s'affichera.
          </p>
          <p>
            Le paiement se fera directement auprès de notre fournisseur Frichti,
            qui nous fournit l'équivalent en matières premières
          </p>
        </div>
      </div>
      {showEmailModal && (
        <EmailModal
          poolId={pool.id}
          name={donatorName}
          mealCount={mealCount}
          onClose={() => setShowEmailModal(false)}
        />
      )}
    </div>
  );
};

export default GiveModule;
