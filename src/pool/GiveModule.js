import React, { useState } from "react";

import { loadStripe } from "@stripe/stripe-js";

import api from "../api";
import Button from "../button/Button";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const GiveModule = ({ pool }) => {
  const [mealCount, setMealCount] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const donate = async () => {
    setSubmitting(true);
    const { data } = await api.post("/donation", {
      mealCount,
      poolId: pool.id,
    });
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId: data.checkoutSessionId,
    });
    setError(error);
  };
  return (
    <div className="GiveModule">
      <h1>Faites un don</h1>
      <span className="GiveModule__error">{error && error.message}</span>
      <div className="GiveModule__button">
        <Button onClick={donate} disabled={submitting}>
          {submitting
            ? `Redirection en cours...`
            : `Je donne ${mealCount} repas = ${mealCount}€`}
        </Button>
      </div>
    </div>
  );
};

export default GiveModule;
