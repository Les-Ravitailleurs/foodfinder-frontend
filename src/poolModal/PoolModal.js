import React from "react";
import { Formik, Form } from "formik";
import isEmail from "validator/lib/isEmail";
import { useHistory } from "react-router-dom";

import Modal from "../modal/Modal";
import Input from "../input/Input";
import Button from "../button/Button";
import api from "../api";

import "./PoolModal.css";

const PoolModal = () => {
  const history = useHistory();
  return (
    <Modal>
      <h1>
        Créez votre collecte:
        <br />
        c'est facile&nbsp;!
      </h1>
      <Formik
        initialValues={{ poolName: "", creatorName: "", creatorEmail: "" }}
        validate={(values) => {
          const errors = {};
          if (values.poolName.trim().length === 0) {
            errors.poolName = "Veuillez entrer un nom pour votre collecte";
          }
          if (values.creatorName.trim().length === 0) {
            errors.creatorName = "Veuillez entrer votre nom";
          }
          if (values.creatorEmail.trim().length === 0) {
            errors.creatorEmail = "Veuillez entrer votre adresse email";
          } else if (!isEmail(values.creatorEmail)) {
            errors.creatorEmail = "Veuillez entrer une adresse email valide";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const { data } = await api.post("/pool", values);
          history.push(`/collecte/${data.id}/admin/${data.adminId}`);
        }}
      >
        {({ isSubmitting, values, handleChange, errors }) => (
          <Form>
            <Input
              placeholder="Nom de collecte"
              label="Choisissez un nom pour votre collecte"
              name="poolName"
              value={values.poolName}
              onChange={handleChange}
              error={errors.poolName}
            />
            <Input
              placeholder="Adresse email"
              label="Entrez votre adresse email"
              name="creatorEmail"
              value={values.creatorEmail}
              onChange={handleChange}
              error={errors.creatorEmail}
            />
            <Input
              placeholder="Nom"
              label="Entrez votre nom"
              name="creatorName"
              value={values.creatorName}
              onChange={handleChange}
              error={errors.creatorName}
            />
            <Button type="submit" disabled={isSubmitting}>
              Je crée ma collecte
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default PoolModal;
