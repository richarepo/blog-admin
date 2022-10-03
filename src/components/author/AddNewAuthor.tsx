import { Box, Button, Flex, Heading, useColorModeValue, useToast, Wrap, WrapItem } from "@chakra-ui/react";
import { Formik } from "formik";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import { queryClient } from "../..";
import {
  editAuthorById,
  fetchAuthorById,
  createNewAuthor,
} from "../api/author";
import InputComponent from "../common/InputComponent";
import formSchema from "../../validations";


const INITIAL_FORM_VALUES: any = {
  type: "author",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  qualification: "",
  avatar: ""
//  image:""
};


const AddNewAuthor = () => {
  const { authorId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const { data: authorDetails, isLoading: isfetching } = useQuery(
    ["fetchAuthorById", authorId],
    async () => await fetchAuthorById(authorId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["fetchAllAuthor"]);
      },
    }
  );

  const fetchAuthor = () => {
    queryClient.invalidateQueries(["fetchAllAuthor"]);
    toast({
      position: "top-right",
      title: `Author has been created successfully!!`,
      status: "success",
      isClosable: true,
    });
  };

  const { mutate } = useMutation(createNewAuthor, {
    onSuccess: fetchAuthor
  });

  const { mutate: updateAuthorData } = useMutation(
    ({ authorId, values }: any) => editAuthorById(authorId, values),
    {
      onSuccess: (authorId: any) => {
        toast({
          position: "top-right",
          title: `Author details has been updated successfully!!`,
          status: "success",
          isClosable: true,
        });
        queryClient.invalidateQueries(["fetchAllAuthor"]);
      },
    }
  );

  const handleSubmitForm = async (values: any, action: any) => {
    if (authorId) {
      await updateAuthorDetails(values);
    } else {
      await mutate(values);
      navigate("/author", { replace: true });
      action.resetForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        qualification: "",
        avatar:""
      });
    }
  };

  const updateAuthorDetails = async (values: any) => {
    await updateAuthorData({ values, authorId });
    navigate("/author", { replace: true });
  };




  return (
    <Box
      px={"2rem"}
      py={"2rem"}
      bgColor={useColorModeValue("#fff", "gray.900")}
      height="100vh"
    >
      <Heading as="h3" size="lg">
        {!!authorId ? "Update author details" : "Create new author"}
      </Heading>
      <Box px={"4rem"} mt={"2rem"}>
        {(!!authorId ? !!authorDetails : true) && (
          <Formik
            initialValues={authorDetails || INITIAL_FORM_VALUES}
            onSubmit={handleSubmitForm}
            validationSchema={formSchema}
          >
            {(props: any) => (
              <form
                onSubmit={props.handleSubmit}
                method="POST"
                action="/author"
                encType="multipart/form-data"
              >
                <Flex w={"100%"}>
                  <Box px={"1rem"} py={"1rem"} w={"80%"}>
                    <Box>
                      <InputComponent
                        name="first_name"
                        label={"First Name"}
                        placeholder={"First Name"}
                      />
                      {props.errors.first_name && props.touched.first_name ? (
                        <Box color={"#FF0000"}>{props.errors.first_name}</Box>
                      ) : null}
                    </Box>
                    <InputComponent
                      name="last_name"
                      label={"Last Name"}
                      placeholder={"Last Name"}
                      mt={"1rem"}
                    />
                    {props.errors.last_name && props.touched.last_name ? (
                      <Box color={"#FF0000"}>{props.errors.last_name}</Box>
                    ) : null}
                    <InputComponent
                      name="qualification"
                      label={"Qualification"}
                      placeholder={"Qualification"}
                      mt={"1rem"}
                    />
                    {props.errors.qualification &&
                    props.touched.qualification ? (
                      <Box color={"#FF0000"}>{props.errors.qualification}</Box>
                    ) : null}
                    <InputComponent
                      name="phone"
                      label={"Phone"}
                      placeholder={"Phone"}
                      mt={"1rem"}
                    />
                    {props.errors.phone && props.touched.phone ? (
                      <Box color={"#FF0000"}>{props.errors.phone}</Box>
                    ) : null}
                    <InputComponent
                      name="email"
                      label={"Email"}
                      placeholder={"Email"}
                      mt={"1rem"}
                    />
                    {props.errors.email && props.touched.email ? (
                      <Box color={"#FF0000"}>{props.errors.email}</Box>
                    ) : null}
                    <InputComponent
                      name="avatar"
                      type="file"
                      label={"Profile"}
                      placeholder={"Profile picture"}
                      mt={"1rem"}
                      handleChange={(value:any) => {
                        props.setFieldValue("avatar", "sdfsdfsdfsdf");
                      }}
                    />
                    <Box py={"1rem"} display={"flex"} justifyContent={"right"}>
                      <Button
                        width={"7rem"}
                        colorScheme="teal"
                        type="submit"
                        isLoading={props.isSubmitting}
                        disabled={!(props.isValid && props.dirty)}
                      >
                        {!!authorId ? "Update" : "Create"}
                      </Button>
                    </Box>
                  </Box>
                </Flex>
              </form>
            )}
          </Formik>
        )}
      </Box>
    </Box>
  );
};

export default AddNewAuthor;
