/** @format */

import React from "react";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Field } from "formik";

const InputComponent = ({ label, placeholder, props }: any) => {
  return (
    <Field name="name">
      {({ field, form }: any) => (
        <FormControl
          isInvalid={form.errors.name && form.touched.name}
          mr={"5px"}
        >
          <FormLabel fontSize="md" {...props}>
            {label}
          </FormLabel>
          <Input {...field} placeholder={placeholder} size={"md"} />
          <FormErrorMessage>{form.errors.name}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default InputComponent;
