import React from "react";
import { Formik, Form } from "formik";
import isEmail from "validator/lib/isEmail";
import { useHistory } from "react-router-dom";

import Modal from "../modal/Modal";
import FormInput from "../input/FormInput";
import FormTextArea from "../textarea/FormTextArea";
import Button from "../button/Button";
import api from "../api";

import "./PoolModal.css";

const PoolModal = ({ onClose, pool, messageMode }) => {
  const history = useHistory();
  return (
    <Modal onClose={onClose}>
      {pool && !messageMode && <h1>Editez votre collecte</h1>}
      {pool && messageMode && <h1>Editez votre message</h1>}
      {!pool && (
        <h1>
          Créez votre collecte:
          <br />
          c'est facile&nbsp;!
        </h1>
      )}
      {!pool && (
        <p className="PoolModal__description">
          Vous êtes la personne la mieux placée pour proposer à vos proches,
          collègues, amis, followers d’offrir des repas pour les plus démunis.
          Créez votre collecte en un clic. Les fonds collectés iront directement
          dans l’achat de matière première.
        </p>
      )}
      <Formik
        initialValues={{
          creatorName: pool ? pool.creatorName : "",
          creatorEmail: pool ? pool.creatorEmail : "",
          message: pool ? pool.message : "",
        }}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={async (values, { setSubmitting }) => {
          const { data } = await api.post("/pool", {
            ...values,
            poolId: pool ? pool.id : null,
            adminId: pool ? pool.adminId : null,
          });
          if (pool) {
            // Close
            onClose();
          } else {
            history.push(`/collecte/${data.id}/admin/${data.adminId}`);
          }
        }}
      >
        {({ isSubmitting, values, handleChange, handleBlur, errors }) => (
          <Form>
            <FormInput
              name="creatorEmail"
              label="Entrez votre adresse email"
              placeholder="Adresse email"
              value={values.creatorEmail}
              // onChange={handleChange}
              // onBlur={handleBlur}
              error={errors.creatorEmail}
              validate={(email) => {
                if (email.trim().length === 0) {
                  return "Veuillez entrer votre adresse email";
                } else if (!isEmail(email)) {
                  return "Veuillez entrer une adresse email valide";
                }
              }}
              hide={pool && messageMode}
            />
            <FormInput
              name="creatorName"
              label="Entrez votre nom"
              placeholder="Nom"
              value={values.creatorName}
              // onChange={handleChange}
              // onBlur={handleBlur}
              error={errors.creatorName}
              validate={(name) => {
                if (name.trim().length === 0) {
                  return "Veuillez entrer votre nom";
                } else if (name.trim().length === 1) {
                  return "Veuillez entrer un nom d'au moins 2 lettres";
                }
              }}
              hide={pool && messageMode}
            />
            <FormTextArea
              name="message"
              label="Entrez votre message"
              placeholder="Message"
              value={values.message}
              hide={!pool || !messageMode}
            ></FormTextArea>
            <Button type="submit" disabled={isSubmitting}>
              Je {pool ? "modifie" : "crée"} ma collecte
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default PoolModal;
