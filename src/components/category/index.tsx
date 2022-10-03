import { useMemo, useState } from "react";
import { Formik } from "formik";
import { useQuery, useMutation } from "react-query";
import {
  Box,
  Heading,
  Button,
  Flex,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";

import InputComponent from "../common/InputComponent";
import { queryClient } from "../..";
import {
  fetchAllCategory,
  createNewCategory,
  deleteCategory,
} from "../api/category";
import AllCategoryDetails from "./AllCategoryDetails";


const categoryHeadings = [{ Headings: "Category" }, { Headings: "Actions" }];

const INITIAL_FORM_VALUES = {
  type: "category",
  category: "",
};

const CreateNewCategory = () => {
  const toast = useToast();
  const [err, setErr] = useState("");
  const color = useColorModeValue("#fff", "gray.900");

  const fetchCategory = () => {
    toast({
      position: "top-right",
      title: `Category has been created successfully!!`,
      status: "success",
      isClosable: true,
    });
    queryClient.invalidateQueries(["fetchAllCategory"]);
  };

  const { data } = useQuery("fetchAllCategory", fetchAllCategory);
  const { mutate } = useMutation(createNewCategory, {
    onSuccess: fetchCategory,
    onError: (error: any) => {
      setErr(error.response.data.error);
    },
  });

  const deleted = useMutation(deleteCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchAllCategory"]);
    },
  });

  const deleteCategoryDetails = (id: string) => {
    deleted.mutate(id);
  };

  const categories = useMemo(() => {
    return data?.data || [];
  }, [data]);

  const handleSubmitForm = async (values: any, action: any) => {
    await mutate(values);
    action.resetForm({ category: "" });
  };

  return (
    <Box
      px={"1rem"}
      py={"1rem"}
      bgColor={useColorModeValue("#fff", "gray.900")}
      height="100vh"
    >
      <Heading as="h3" size="lg">
        Create a new category
      </Heading>
      <Box px={"4rem"} mt={"2rem"}>
        <Formik initialValues={INITIAL_FORM_VALUES} onSubmit={handleSubmitForm}>
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <Flex>
                <InputComponent
                  name="category"
                  label={"Category"}
                  placeholder={"Enter category name"}
                  w={"100%"}
                  setError={setErr}
                />
                <Box display={"flex"} alignItems={"end"}>
                  <Button
                    colorScheme="teal"
                    type="submit"
                    disabled={!props.dirty}
                  >
                    Create
                  </Button>
                </Box>
              </Flex>
              {!!err && <Box color={"#FF0000"}>{err}</Box>}
              <Box
                display={"flex"}
                mt={"3rem"}
              >
                <AllCategoryDetails
                  head={categoryHeadings}
                  data={categories}
                />
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default CreateNewCategory;
