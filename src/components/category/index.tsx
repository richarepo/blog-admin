import { useState } from "react";
import { Formik } from "formik";
import { useMutation } from "react-query";
import { Box, Heading, Button, Flex } from "@chakra-ui/react";

import InputComponent from "../common/component/InputComponent";
import { queryClient } from "../..";
import { createNewCategory } from "../api/category";
import AllCategoryDetails from "./AllCategoryDetails";
import useColorManager from "../../hooks/colorManager";
import { CustomToast } from "../../hooks/toast";

const INITIAL_FORM_VALUES = {
  type: "category",
  category: "",
};

const CreateNewCategory = () => {
  const { successToast } = CustomToast();
  const [err, setErr] = useState("");
  const { WHITE_DGRAY } = useColorManager();

  const fetchCategory = () => {
    successToast("Category has been created successfully!!");
    queryClient.invalidateQueries(["fetchAllCategory"]);
  };

  const { mutate } = useMutation(createNewCategory, {
    onSuccess: fetchCategory,
    onError: (error: any) => {
      setErr(error.response.data.error);
    },
  });

  const handleSubmitForm = async (values: any, action: any) => {
    await mutate(values);
    action.resetForm({ category: "" });
  };

  return (
    <Box p={"1rem"} bgColor={WHITE_DGRAY} height="100vh">
      <Heading as="h3" size="lg">
        Create a new category
      </Heading>
      <Box px={"4rem"} mt={"2rem"}>
        <Formik initialValues={INITIAL_FORM_VALUES} onSubmit={handleSubmitForm}>
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <Flex justifyContent={"space-between"} alignItems={"flex-end"}>
                <InputComponent
                  name="category"
                  label={"Category"}
                  placeholder={"Enter category name"}
                  setError={setErr}
                />
                <Button
                  colorScheme="teal"
                  type="submit"
                  disabled={!props.dirty}
                >
                  Create
                </Button>
              </Flex>
              {!!err && <Box color={"#FF0000"}>{err}</Box>}
            </form>
          )}
        </Formik>
        <Box display={"flex"} mt={"3rem"}>
          <AllCategoryDetails />
        </Box>
      </Box>
    </Box>
  );
};

export default CreateNewCategory;
