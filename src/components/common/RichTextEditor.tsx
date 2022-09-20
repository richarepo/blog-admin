/** @format */

import React from "react";
import { Box, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { Field } from "formik";
import SunEditor from "suneditor-react";

const CustomRichTextEditor = ({
  field,
  label,
  form: { errors, handleBlur, handleChange, values },
}: any) => {
  return (
    <Box>
      <FormLabel fontSize="md">
        {label}
      </FormLabel>
      <SunEditor
        {...field}
        setDefaultStyle="font-size: 14px;"
        onChange={handleChange(field.name)}
        defaultValue={values[field.name]}
        onBlur={handleBlur(field.name)}
        setOptions={{
          height: 100,
          color: "transparent",
          buttonList: [
            [
              "fontColor",
              "hiliteColor",
              "undo",
              "redo",
              "bold",
              "underline",
              "italic",
              "strike",
              "subscript",
              "superscript",
            ],
          ],
        }}
      />
      <FormErrorMessage>{errors[field.name]}</FormErrorMessage>
    </Box>
  );
};

const RichTextEditor = ({ label, placeholder, props }: any) => {
  return (
    <Field name="content" component={CustomRichTextEditor} label={label} />
  );
};

export default RichTextEditor;
