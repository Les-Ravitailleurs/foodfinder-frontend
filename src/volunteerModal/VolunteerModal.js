import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import isEmail from "validator/lib/isEmail";
import { useHistory } from "react-router-dom";

import Modal from "../modal/Modal";
import FormInput from "../input/FormInput";
import FormTextArea from "../textarea/FormTextArea";
import Button from "../button/Button";
import api from "../api";
import CopyPaste from "../copyPaste/CopyPaste";

import "./VolunteerModal.css";

const VolunteerModal = ({ onClose, volunteer, messageMode }) => {
  const history = useHistory();
  const [createdVolunteer, setCreatedVolunteer] = useState(null);
  const [showEmojiList, setShowEmojiList] = useState(false);
  if (createdVolunteer) {
    return (
      <Modal onClose={onClose}>
        <h1>
          Votre lien a bien été créé
          <br />
          <span className="green">{createdVolunteer.name}</span>
        </h1>
        <div className="mb-3 text-left">
          <label className="Input__label">Votre lien</label>
          <div className="Input__subLabel">
            C’est le lien à partager aux personnes à qui vous diffuserez la
            collecte
          </div>
          <CopyPaste
            poolId={""}
            volunteerUsername={createdVolunteer.username}
          />
        </div>
        <div className="mb-3 text-left">
          <label className="Input__label">
            Le lien vers votre tableau de bord
          </label>
          <div className="Input__subLabel">
            Il est strictement personnel et vous permettra de suivre les dons
            effectués via votre lien.
          </div>
          <CopyPaste dashboardToken={createdVolunteer.id} />
        </div>
        <Button
          onClick={() =>
            history.push(`/dashboard?token=${createdVolunteer.id}`)
          }
        >
          {"Valider"}
        </Button>
      </Modal>
    );
  }
  return (
    <Modal onClose={onClose}>
      <h1>Hello nouveau collector !</h1>
      <p className="VolunteerModal__description">
        Remplissez le formulaire ci-dessous, vous recevrez en retour votre lien vers la
        collecte et le lien vers votre tableau de bord.
      </p>
      <Formik
        initialValues={{
          email: "",
          username: "",
          name: "",
          emoji: "",
        }}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={async (values, { setSubmitting }) => {
          const { data } = await api.post("/volunteer", {
            ...values,
          });
          setCreatedVolunteer(data);
          // if (volunteer) {
          //   // Close
          //   onClose();
          // } else {
          //   history.push(`/collecte/${data.id}/admin/${data.adminId}`);
          // }
        }}
      >
        {({
          isSubmitting,
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          errors,
        }) => (
          <Form>
            <FormInput
              name="email"
              label="Email"
              placeholder="Ex: gerard.mevusa@gmail.com"
              value={values.email}
              // onChange={handleChange}
              // onBlur={handleBlur}
              error={errors.email}
              validate={(email) => {
                if (email.trim().length === 0) {
                  return "Veuillez entrer une adresse email";
                } else if (!isEmail(email)) {
                  return "Veuillez entrer une adresse email valide";
                }
              }}
            />
            <FormInput
              name="username"
              label="Pseudo"
              placeholder="Ex: Gérard"
              value={values.username}
              // onChange={handleChange}
              // onBlur={handleBlur}
              error={errors.username}
              validate={(email) => {
                if (email.trim().length === 0) {
                  return "Veuillez entrer un pseudo";
                }
              }}
              subLabel="Qui apparaîtra dans l’URL de votre lien"
            />
            <FormInput
              name="name"
              label="Nom Complet"
              placeholder="Ex: Gérard Mevusa"
              value={values.name}
              // onChange={handleChange}
              // onBlur={handleBlur}
              error={errors.name}
              validate={(email) => {
                if (email.trim().length === 0) {
                  return "Veuillez entrer un nom";
                }
              }}
              subLabel="Apparaîtra sur la collecte quand on cliquera sur votre lien"
            />
            <div style={{ position: "relative" }}>
              <FormInput
                name="emoji"
                label="Emoji"
                placeholder="Emoji"
                value={values.emoji}
                // onChange={handleChange}
                onBlur={() => {
                  setTimeout(() => {
                    console.log('YO');
                    setShowEmojiList(false);
                  }, 100);
                }}
                onFocus={() => {
                  setShowEmojiList(true);
                }}
                error={errors.emoji}
                validate={(emoji) => {
                  if (emoji.trim().length === 0) {
                    return "Veuillez entrer un emoji";
                  }
                }}
                autocomplete="off"
                subLabel="Choisissez un emoji, les autres bénévoles pourront vous féliciter pour les dons faits via votre lien en cliquant dessus dans leur tableau de bord."
              />
              {showEmojiList && (
                <Picker
                  set="apple"
                  value={values.emoji}
                  onSelect={(emoji) => {
                    setFieldValue("emoji", emoji.native);
                    setShowEmojiList(false);
                  }}
                  i18n={{
                    search: "Recherche",
                    categories: {
                      smileys: "Smileys & Emotion",
                      people: "Personnes",
                      nature: "Nature",
                      foods: "Nourriture",
                      activity: "Activité",
                      places: "Voyage",
                      objects: "Objets",
                      symbols: "Symboles",
                      flags: "Drapeaux",
                    },
                  }}
                />
              )}
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {"Valider"}
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default VolunteerModal;
