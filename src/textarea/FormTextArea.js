import React from "react";
import { Field } from "formik";

import TextArea from "./TextArea";

const FormTextArea = ({ name, validate, placeholder, label, hide }) => {
  return (
    <Field name={name} validate={validate}>
      {({ field, meta }) => (
        <TextArea
          placeholder={placeholder}
          label={label}
          name={name}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          error={meta.error}
          hide={hide}
        />
      )}
    </Field>
  );
};

export default FormTextArea;
