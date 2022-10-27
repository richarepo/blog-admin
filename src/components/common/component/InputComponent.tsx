/** @format */

import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Field } from "formik";

const InputComponent = ({
  name,
  type,
  label,
  placeholder,
  mt,
  props,
  handleChange,
  setError,
}: any) => {
  return (
    <Field name={name}>
      {({ field, form }: any) => (
        <FormControl
          isInvalid={form.errors.name && form.touched.name}
          mr={"5px"}
        >
          <FormLabel fontSize="md" mt={mt} {...props}>
            {label}
          </FormLabel>
          <Input
            type={type}
            {...field}
            value={type === "file" ? "" : field?.value}
            placeholder={placeholder}
            size={"md"}
            onChange={(event: any) => {
              if (type === "file") {
                field.onChange(event.target.files[0]);

                handleChange && handleChange(event.target.files[0]);
              } else {
                form.handleChange(event);
                handleChange && handleChange(event);
              }

              setError && setError("");
            }}
          />
          <FormErrorMessage>{form.errors.name}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default InputComponent;
