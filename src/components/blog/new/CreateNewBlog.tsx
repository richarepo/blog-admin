/** @format */
import { useMemo } from "react";
import { Field, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import {
  Box,
  Button,
  Heading,
  Select,
  FormLabel,
  FormControl,
  FormErrorMessage,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";

import InputComponent from "../../common/InputComponent";
import RichTextEditor from "../../common/RichTextEditor";
import { createBlog } from "../../api/blog";
import { fetchAllCategory } from "../../api/category";
import { fetchAllAuthor } from "../../api/author";
import { queryClient } from "../../..";

const CreateNewBlog = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { data } = useQuery("fetchAllCategory", fetchAllCategory);
  const { data: authorDetails } = useQuery("fetchAllAuthor", fetchAllAuthor);

  const { mutate } = useMutation(createBlog, {
    onSuccess: () => {
       queryClient.invalidateQueries(["fetchAllBlog"]);
      toast({
        position: "top-right",
        title: `Blog has been created successfully!!`,
        status: "success",
        isClosable: true,
      });
    },
     
  });

  const authorDetail = useMemo(() => {
    return authorDetails?.data || [];
  }, [authorDetails]);

  const categories = useMemo(() => {
    return data?.data || [];
  }, [data]);

  const handleSubmitForm = async (values: any, actions: any) => {
    await mutate(values);
    navigate("/home", { replace: true });
    actions.resetForm({ heading: "", category: "", content: "", author: "" });
  };

  return (
    <Box px={"1rem"} py={"1rem"} bgColor={useColorModeValue("#fff","gray.900")}>
      <Heading as="h3" size="lg">
        Create a new blog
      </Heading>
      <Box px={"4rem"} mt={"2rem"} >
        <Formik
          initialValues={{
            heading: "",
            category: "",
            content: "",
            author: "",
          }}
          onSubmit={handleSubmitForm}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <Box>
                <InputComponent
                  name="heading"
                  label={"Blog heading"}
                  placeholder={"Enter your blog heading.."}
                />
                <Box mt={"1.3rem"} />

                <Field name="category">
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                      mr={"5px"}
                    >
                      <FormLabel fontSize="md" {...props}>
                        Select Category
                      </FormLabel>
                      <Select placeholder="Select Category" {...field}>
                        {(categories || []).map(
                          ({ category, _id }: any, index: any) => (
                            <option key={index} value={_id}>
                              {category}
                            </option>
                          )
                        )}
                      </Select>
                      <FormErrorMessage>
                        {form.errors.category}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="author">
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                      mr={"5px"}
                    >
                      <FormLabel fontSize="md" mt={"1rem"} {...props}>
                        Select Author
                      </FormLabel>
                      <Select placeholder="Select Author" {...field}>
                        {(authorDetail || []).map(
                          ({ author, _id }: any, index: any) => (
                            <option key={index} value={_id}>
                              {author}
                            </option>
                          )
                        )}
                      </Select>
                      <FormErrorMessage>{form.errors.author}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Box mt={"1.5rem"} />
                <RichTextEditor label="Enter your content" h={"100vh"}  />
              </Box>
              <Box display={"flex"} justifyContent={"right"} pb="3rem" w="100%">
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
