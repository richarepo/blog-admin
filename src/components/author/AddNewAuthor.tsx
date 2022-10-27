import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { Formik } from "formik";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import { queryClient } from "../..";
import {
  editAuthorById,
  fetchAuthorById,
  createNewAuthor,
} from "../api/author";
import InputComponent from "../common/component/InputComponent";
import formSchema from "../../validations";
import useColorManager from "../../hooks/colorManager";
import { CustomToast } from "../../hooks/toast";

const INITIAL_FORM_VALUES: any = {
  type: "author",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  qualification: "",
  avatar: "",
};

const AddNewAuthor = () => {
  const { authorId } = useParams();
  const navigate = useNavigate();
  const { WHITE_DGRAY } = useColorManager();
  const { successToast } = CustomToast();

  const { data: authorDetails } = useQuery(
    ["fetchAuthorById", authorId],
    async () => await fetchAuthorById(authorId)
  );

  const fetchAuthor = () => {
    queryClient.invalidateQueries(["fetchAllAuthor"]);
    successToast("Author has been created successfully!!");
  };

  const { mutate } = useMutation(createNewAuthor, {
    onSuccess: fetchAuthor,
  });

  const { mutate: updateAuthorData } = useMutation(
    ({ authorId, values }: any) => editAuthorById(authorId, values),
    {
      onSuccess: () => {
        successToast("Author details has been updated successfully!");
        queryClient.invalidateQueries(["fetchAllAuthor"]);
      },
    }
  );

  const updateAuthorDetails = async (values: any) => {
    await updateAuthorData({ values, authorId });
    navigate("/author", { replace: true });
  };

  const createAuthor = async (formData: any, action: any) => {
    await mutate(formData);
    navigate("/author", { replace: true });
    action.resetForm(INITIAL_FORM_VALUES);
  };

  const handleSubmitForm = async (values: any, action: any) => {
    const formData = new FormData(); //formdata object
    const author = values.first_name + values.last_name;
    values.author = author;
    const authorValues = [
      "author",
      "email",
      "phone",
      "qualification",
      "avatar",
    ];
    authorValues.forEach((i: string) => {
      formData.append(i, values[i]);
    });
    if (authorId) return updateAuthorDetails(values);
    return createAuthor(formData, action);
  };

  return (
    <Box px={"2rem"} py={"2rem"} bgColor={WHITE_DGRAY} height="100vh">
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
                      {props.errors.first_name && props.touched.first_name && (
                        <Box color={"#FF0000"}>{props.errors.first_name}</Box>
                      )}
                    </Box>
                    <InputComponent
                      name="last_name"
                      label={"Last Name"}
                      placeholder={"Last Name"}
                      mt={"1rem"}
                    />
                    {props.errors.last_name && props.touched.last_name && (
                      <Box color={"#FF0000"}>{props.errors.last_name}</Box>
                    )}
                    <InputComponent
                      name="qualification"
                      label={"Qualification"}
                      placeholder={"Qualification"}
                      mt={"1rem"}
                    />
                    {props.errors.qualification &&
                      props.touched.qualification && (
                        <Box color={"#FF0000"}>
                          {props.errors.qualification}
                        </Box>
                      )}
                    <InputComponent
                      name="phone"
                      label={"Phone"}
                      placeholder={"Phone"}
                      mt={"1rem"}
                    />
                    {props.errors.phone && props.touched.phone && (
                      <Box color={"#FF0000"}>{props.errors.phone}</Box>
                    )}
                    <InputComponent
                      name="email"
                      label={"Email"}
                      placeholder={"Email"}
                      mt={"1rem"}
                    />
                    {props.errors.email && props.touched.email && (
                      <Box color={"#FF0000"}>{props.errors.email}</Box>
                    )}
                    <Box mt={"1rem"} />
                    <input
                      name="avatar"
                      type="file"
                      placeholder={"Profile picture"}
                      value={props.avatar}
                      onChange={(value: any) => {
                        props.setFieldValue(
                          "avatar",
                          value.currentTarget.files[0]
                        );
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
