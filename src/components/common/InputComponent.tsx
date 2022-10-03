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
  setError
}: any) => {

  return (
    <Field name={name} >
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
            value={type=== "file" ? "" : field?.value}
            placeholder={placeholder}
            size={"md"}
            onChange={(event: any) => {
              console.log(`Your type ==>`, field);
              
              if (type === "file") {
                field.onChange(event.target.files[0]);
                console.log(`Your 2 type ==>`, type);
                handleChange && handleChange(event.target.files[0]);
                console.log(`Your 3 type ==>`, type);
                console.log(
                  `Your answer ================>`,
                  event.target.files[0]
                );
              } else {
                form.handleChange(event);
                handleChange && handleChange(event);
              }
              console.log(`Your value ===>`, event);
              
           
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
