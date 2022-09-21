/** @format */
import React from "react";
import { Formik } from "formik";
import { Box, Button, Heading } from "@chakra-ui/react";
import InputComponent from "../../common/InputComponent";
import RichTextEditor from "../../common/RichTextEditor";
 
const CreateNewBlog = () => {
  const handleSubmitForm = (values: any, actions: any) => {
    console.log(`values, actions`, values, actions);
  };

  return (
    <Box px={"1rem"} py={'1rem'} bgColor={"#fff"} height="100vh">
      <Heading as="h3" size="lg">
        Create a new blog
      </Heading>
      <Box px={"4rem"} mt={"2rem"}>
        <Formik
          initialValues={{
            type: "feature",
            name: "",
            description: "",
          }}
          onSubmit={handleSubmitForm}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <Box>
                <InputComponent
                  label={"Blog heading"}
                  placeholder={"Enter your blog heading.."}
                />
                <Box mt={"2rem"} />
                <RichTextEditor label="Enter your content" />
              </Box>
              <Box>
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Create
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default CreateNewBlog;
