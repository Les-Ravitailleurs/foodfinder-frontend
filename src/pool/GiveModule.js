import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import ReactGA from "react-ga";

import { loadStripe } from "@stripe/stripe-js";
// import ClapButton from "react-clap-button";

import api from "../api";
import "./GiveModule.css";
import Button from "../button/Button";
import EditableText from "../editableText/EditableText";
import Input from "../input/Input";
import Modal from "../modal/Modal";
import FormInput from "../input/FormInput";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

let pictosCount = 0;

const GiveModule = ({ pool }) => {
  const [mealCount, setMealCount] = useState(0);
  const [editorMealCount, setEditorMealCount] = useState("");
  // const [donatorName, setDonatorName] = useState("");
  // const [donatorAddress, setDonatorAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editMealCount, setEditMealCount] = useState(false);
  const [error, setError] = useState(null);
  const [showTaxModal, setShowTaxModal] = useState(false);

  const GiveIcon = ({ addCount }) => {
    return (
      <div
        id={`GiveModule__MealButton-${addCount}`}
        className="GiveModule__MealButton__Icon"
        onClick={() => {
          const singleTime = addCount === 10 ? 20 : 6;
          for (let i = 1; i <= addCount; i += 1) {
            const currentPictosCount = pictosCount;
            window
              .jQuery(`.GiveModule__MealButtons`)
              .append(
                `<div id="GiveModule__MealButton__Picto-${
                  currentPictosCount + i
                }" class="GiveModule__MealButton__Picto__${addCount}">🥗</div>`
              );
            setTimeout(() => {
              setMealCount(mealCount + i);
              window
                .jQuery(
                  `#GiveModule__MealButton__Picto-${currentPictosCount + i}`
                )
                .addClass("GiveModule__MealButton__Picto__Animate");
              setTimeout(() => {
                window
                  .jQuery(
                    `#GiveModule__MealButton__Picto-${currentPictosCount + i}`
                  )
                  .remove();
              }, 700);
            }, (i - 1) * singleTime);
            pictosCount += addCount;
          }
        }}
      >
        <div>
          <span className="GiveModule__MealButton__Add">Ajouter</span>
          <br />
          {addCount}
          <br />
          repas
        </div>
      </div>
    );
  };

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
          <div style={{ marginBottom: "10px" }}>
            <EditableText
              text={`${mealCount} repas`}
              onClick={() => {
                setEditorMealCount(mealCount > 0 ? mealCount : "");
                setEditMealCount(true);
              }}
            />
          </div>
        )}
      </div>
      <div className="GiveModule_Reset" onClick={() => setMealCount(0)}>
        Réinitialiser
      </div>
      <div className="GiveModule__MealButtons">
        <GiveCountButton giveCount={1} />
        <GiveCountButton giveCount={10} />
        <GiveCountButton giveCount={100} />
      </div>
      <strong
        style={{ fontSize: "14px", textAlign: "center", display: "block" }}
      >
        {process.env.REACT_APP_MEAL_PRICE}€ = 1 repas
      </strong>
      <span className="GiveModule__error">{error && error.message}</span>
      <div className="GiveModule__button">
        {/* <Input
          placeholder="Nom de donateur"
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
        /> */}
        <Button
          onClick={() => {
            setShowTaxModal(true);
            if (process.env.NODE_ENV === "production") {
              ReactGA.event({
                category: "Collectes",
                action: "click_donatepage",
                value: price,
              });
            }
          }}
          disabled={
            submitting || mealCount === 0 || editMealCount
            //  || !donatorName
          }
        >
          {submitting ? "Redirection..." : `Donner ${price ? `${price}€` : ""}`}
        </Button>
        <div className="GiveModule__Details">
          <strong>
            {mealCount === 0
              ? "66% du montant déductible des impôts"
              : `Soit ${(34 * price) / 100}€ après déduction d'impôts`}
          </strong>
          <p>
            Les 2€ par repas correspondent au remboursement des matières
            premières et des packagings aux restaurateurs.
          </p>
          <p>
            Les Ravitailleurs est une association loi 1901 d’intérêt général,
            enregistrée sous le numéro RNA W751256667
          </p>
          {/* <p>
            Le paiement se fera directement auprès de notre fournisseur Frichti,
            qui nous fournit l'équivalent en matières premières
          </p> */}
        </div>
      </div>
      {showTaxModal && (
        <Modal onClose={() => setShowTaxModal(false)}>
          <h1>Informations pour votre reçu fiscal</h1>
          <p className="PoolModal__description">
            Des informations complémentaires sont nécessaires pour que nous
            puissions générer votre reçu fiscal. Votre adresse est
            confidentielle et n’apparaîtra pas sur le site.
          </p>

          <Formik
            initialValues={{
              donatorName: "",
              donatorAddress: "",
              hideDonatorName: false,
            }}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={async (values, { setSubmitting }) => {
              if (process.env.NODE_ENV === "production") {
                ReactGA.event({
                  category: "Collectes",
                  action: "click_donateform",
                  value: price,
                });
              }
              try {
                const { data } = await api.post("/donation", {
                  mealCount,
                  poolId: pool.id,
                  donatorName: values.donatorName.trim(),
                  donatorAddress: values.donatorAddress.trim(),
                  hideDonatorName: values.hideDonatorName,
                  volunteerId: pool.volunteer && pool.volunteer.id,
                });
                const stripe = await stripePromise;
                const { error } = await stripe.redirectToCheckout({
                  sessionId: data.checkoutSessionId,
                });
                setSubmitting(false);
                if (error) {
                  console.log(error);
                  alert(error);
                }
              } catch (e) {
                console.log(e);
                alert(e);
              }
            }}
          >
            {({ isSubmitting, values, handleChange, handleBlur, errors }) => (
              <Form>
                <FormInput
                  name="donatorName"
                  label="Nom complet ou nom de votre entreprise"
                  placeholder="Gérard Menvusa"
                  value={values.donatorName}
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                  error={errors.donatorName}
                  validate={(name) => {
                    if (name.trim().length === 0) {
                      return "Veuillez entrer votre nom complet ou le nom de votre entreprise";
                    }
                  }}
                />
                <div
                  style={{
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <Field type="checkbox" name="hideDonatorName" />
                  <span
                    className="Input__label"
                    style={{ margin: "0 0 0 10px", fontWeight: 400 }}
                  >
                    Masquer votre nom de la liste des donateurs
                  </span>
                </div>
                <FormInput
                  name="donatorAddress"
                  label="Adresse complète"
                  placeholder="Ex: 17 rue de Paris, 75011 Paris"
                  value={values.donatorAddress}
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                  error={errors.donatorAddress}
                  validate={(email) => {
                    if (email.trim().length === 0) {
                      return "Veuillez entrer votre adresse";
                    }
                  }}
                />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Redirection..." : "Valider"}
                </Button>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </div>
  );
};

export default GiveModule;
