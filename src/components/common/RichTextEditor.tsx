/** @format */
import { Box, FormErrorMessage, FormLabel, useColorModeValue } from "@chakra-ui/react";
import { Field } from "formik";
import SunEditor from "suneditor-react";


const CustomRichTextEditor = ({
  field,
  label,
  form: { errors, handleBlur, handleChange, values },
}: any) => {
  return (
    <Box>
      <FormLabel fontSize="md">{label} </FormLabel>
      <SunEditor
        {...field}
        setDefaultStyle="font-size: 14px; height:25vh; bgColor:#fff; _dark={{bgColor:gray.900}}"
        onChange={handleChange(field.name)}
        defaultValue={values[field.name]}
        onBlur={handleBlur(field.name)}
        setOptions={{
          height: 100,
          color: "transparent",
          buttonList: [
            ["undo", "redo", "font", "fontSize", "formatBlock"],
            [
              "bold",
              "underline",
              "italic",
              "strike",
              "subscript",
              "superscript",
              "removeFormat",
            ],
            [
              "fontColor",
              "hiliteColor",
              "outdent",
              "indent",
              "align",
              "horizontalRule",
              "list",
              "table",
            ],
            [
              "link",
              "image",
              "video",
              "fullScreen",
              "showBlocks",
              "codeView",
              "preview",
            ],
            ["print", "save"],
          ],
        }}
      
      />
      <FormErrorMessage>{errors[field.name]}</FormErrorMessage>
    </Box>
  );
};

const RichTextEditor = ({ label}: any) => {
  return (
    <Field name="content" component={CustomRichTextEditor} label={label}/>
  );
};

export default RichTextEditor;
