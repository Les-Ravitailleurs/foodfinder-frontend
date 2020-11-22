import React from "react";
import { Field } from "formik";

import Input from "./Input";

const FormInput = ({
  name,
  validate,
  placeholder,
  label,
  hide,
  subLabel,
  onFocus,
  autocomplete,
  onBlur,
}) => {
  return (
    <Field name={name} validate={validate}>
      {({ field, meta }) => (
        <Input
          placeholder={placeholder}
          label={label}
          name={name}
          value={field.value}
          onChange={field.onChange}
          onBlur={(e) => {
            if (onBlur) {
              onBlur();
            }
            return field.onBlur(e);
          }}
          error={meta.error}
          hide={hide}
          subLabel={subLabel}
          onFocus={onFocus}
          autocomplete={autocomplete}
        />
      )}
    </Field>
  );
};

export default FormInput;
