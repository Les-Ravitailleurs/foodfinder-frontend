import React, { useState } from "react";
import { Formik, Form } from "formik";
import isEmail from "validator/lib/isEmail";

import Modal from "../modal/Modal";
import FormInput from "../input/FormInput";
import Button from "../button/Button";
import api from "../api";

const EmailModal = ({ onClose, poolId, name, mealCount }) => {
  const [done, setDone] = useState(false);
  return (
    <Modal onClose={onClose}>
      <h1>Petit souci technique</h1>
      <p className="PoolModal__description">
        Notre site rencontre actuellement un petit souci technique. N'hésitez
        pas à laisser ici votre email et nous vous écrirons quand tout sera
        revenu à la normale. Nous sommes désolés pour ce petit couac de
        lancement, merci d'avance pour votre patience.
      </p>
      <Formik
        initialValues={{
          email: "",
        }}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          await api.post("/saveEmail", {
            ...values,
            poolId,
            name,
            mealCount,
          });
          setDone(true);
          setTimeout(() => {
            onClose();
          }, 4000);
        }}
      >
        {({ isSubmitting, values, handleChange, handleBlur, errors }) => (
          <Form>
            <FormInput
              name="email"
              label="Entrez votre adresse email"
              placeholder="Adresse email"
              value={values.email}
              // onChange={handleChange}
              // onBlur={handleBlur}
              error={errors.email}
              validate={(email) => {
                if (email.trim().length === 0) {
                  return "Veuillez entrer votre adresse email";
                } else if (!isEmail(email)) {
                  return "Veuillez entrer une adresse email valide";
                }
              }}
            />
            <Button type="submit" disabled={isSubmitting || done}>
              {done ? "Merci !" : "Enregistrer"}
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EmailModal;
