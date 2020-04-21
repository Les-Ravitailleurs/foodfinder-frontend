import React, { useState } from "react";

import { loadStripe } from "@stripe/stripe-js";

import api from "../api";
import "./GiveModule.css";
import Button from "../button/Button";
import EditableText from "../editableText/EditableText";
import Input from "../input/Input";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const GiveModule = ({ pool }) => {
  const [mealCount, setMealCount] = useState(0);
  const [editorMealCount, setEditorMealCount] = useState("");
  const [donatorName, setDonatorName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editMealCount, setEditMealCount] = useState(false);
  const [error, setError] = useState(null);
  const donate = async () => {
    setSubmitting(true);
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
  return (
    <div className="GiveModule">
      <h1>Offrez des repas</h1>
      <div className="GiveModule__MealButtons">
        <div
          className="GiveModule__MealButton"
          onClick={editMealCount ? null : () => setMealCount(mealCount + 1)}
        >
          +1
        </div>
        <div
          className="GiveModule__MealButton"
          onClick={editMealCount ? null : () => setMealCount(mealCount + 10)}
        >
          +10
        </div>
        <div
          className="GiveModule__MealButton"
          onClick={editMealCount ? null : () => setMealCount(mealCount + 100)}
        >
          +100
        </div>
      </div>
      <div className="GiveModule__MealCount">
        {editMealCount && (
          <div className="GiveModule__MealCountEdit">
            <Input
              placeholder="Nombre de repas"
              value={editorMealCount}
              onChange={(e) => {
                if (e.target.value) {
                  setEditorMealCount(parseInt(e.target.value, 10));
                } else {
                  setEditorMealCount("");
                }
              }}
            />
            <Button
              onClick={() => {
                if (editorMealCount !== "") {
                  setMealCount(editorMealCount);
                }
                setEditMealCount(false);
                setEditorMealCount("");
              }}
            >
              OK
            </Button>
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
        <p>
          Soit {mealCount} packaging + {mealCount} kg de riz ou de pâtes
          <br />+ {mealCount} kg de légumes
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
        />
        <Button
          onClick={donate}
          disabled={
            submitting || mealCount === 0 || editMealCount || !donatorName
          }
        >
          {submitting ? "Redirection..." : "Payer"}
        </Button>
        <div className="GiveModule__Details">
          <strong>1€ = 1 repas</strong>
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
    </div>
  );
};

export default GiveModule;
