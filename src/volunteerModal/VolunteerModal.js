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
          Ton lien a bien été créé
          <br />
          <span className="green">{createdVolunteer.name}</span>
        </h1>
        <div className="mb-3 text-left">
          <label className="Input__label">Ton lien</label>
          <div className="Input__subLabel">
            C’est le lien à partager aux personnes à qui tu diffuseras la
            collecte
          </div>
          <CopyPaste
            poolId={""}
            volunteerUsername={createdVolunteer.username}
          />
        </div>
        <div className="mb-3 text-left">
          <label className="Input__label">
            Le lien vers ton tableau de bord
          </label>
          <div className="Input__subLabel">
            Il est strictement personnel et te permettra de suivre les dons
            effectués via ton lien.
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
        Remplis le formulaire ci-dessous, tu recevras en retour ton lien vers la
        collecte et le lien vers ton tableau de bord.
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
                  return "Entre une adresse email pour continuer";
                } else if (!isEmail(email)) {
                  return "Entre une adresse email valide pour continuer";
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
                  return "Entre un pseudo pour continuer";
                }
              }}
              subLabel="Qui apparaîtra dans l’URL de ton lien"
            />
            <FormInput
              name="name"
              label="Nom"
              placeholder="Ex: Gérard"
              value={values.name}
              // onChange={handleChange}
              // onBlur={handleBlur}
              error={errors.name}
              validate={(email) => {
                if (email.trim().length === 0) {
                  return "Entre un nom pour continuer";
                }
              }}
              subLabel="Apparaîtra sur la collecte quand on cliquera sur ton lien"
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
                    return "Entre un emoji";
                  }
                }}
                autocomplete="off"
                subLabel="Choisis un emoji, les autres bénévoles pourront te féliciter pour les dons que tu as effectués en cliquant dessus dans leur tableau de bord."
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
