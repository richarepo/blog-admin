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
} from "@chakra-ui/react";

import InputComponent from "../../common/component/InputComponent";
import RichTextEditor from "../../common/component/RichTextEditor";
import { createBlog } from "../../api/blog";
import { fetchAllCategory } from "../../api/category";
import { fetchAllAuthor } from "../../api/author";
import { queryClient } from "../../..";
import useColorManager from "../../../hooks/colorManager";
import { CustomToast } from "../../../hooks/toast";

const INITITIAL_FORM_VALUES: any = {
  heading: "",
  category: "",
  content: "",
  author: "",
  image: "",
};

const CreateNewBlog = () => {
  const navigate = useNavigate();
  const { WHITE_DGRAY } = useColorManager();
  const { successToast } = CustomToast();
  const { data } = useQuery("fetchAllCategory", fetchAllCategory);
  const { data: authorDetails } = useQuery("fetchAllAuthor", fetchAllAuthor);

  const { mutate } = useMutation(createBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchAllBlogs"]);
      successToast("Blog has been created successfully!!");
    },
  });

  const authorData = useMemo(() => {
    return authorDetails?.data || [];
  }, [authorDetails]);

  const categories = useMemo(() => {
    return data?.data || [];
  }, [data]);

  const handleSubmitForm = async (values: any, actions: any) => {
    const blogData = new FormData();
    const blogValues = ["heading", "author", "category", "image", "content"];
    blogValues.forEach((i) => {
      blogData.append(i, values[i]);
    });
    await mutate(blogData);
    navigate("/", { replace: true });
    actions.resetForm(INITITIAL_FORM_VALUES);
  };

  return (
    <Box px={"1rem"} py={"1rem"} bgColor={WHITE_DGRAY}>
      <Heading as="h3" size="lg">
        Create a new blog
      </Heading>
      <Box px={"4rem"} mt={"2rem"}>
        <Formik
          initialValues={INITITIAL_FORM_VALUES}
          onSubmit={handleSubmitForm}
        >
          {(props: any) => (
            <form
              onSubmit={props.handleSubmit}
              method="POST"
              action="/blog"
              encType="multipart/form-data"
            >
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
                        {!!categories &&
                          (categories ?? []).map(
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
                        {!!authorData &&
                          (authorData || []).map(
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
                <Box mt={"1.3rem"} />
                <input
                  name="image"
                  type="file"
                  placeholder={"Blog Image"}
                  onChange={(value: any) => {
                    props.setFieldValue("image", value.currentTarget.files[0]);
                  }}
                  value={props.image}
                />
                <Box mt={"1.5rem"} />
                <RichTextEditor label="Enter your content" h={"100vh"} />
              </Box>
              <Box display={"flex"} justifyContent={"right"} pb="3rem" w="100%">
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={props.isSubmitting}
                  type="submit"
                  disabled={!props.dirty}
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
