import { useState, useMemo, Fragment } from "react";
import { MdDelete } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import {
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useDisclosure,
} from "@chakra-ui/react";

import { deleteCategory, fetchAllCategory } from "../api/category";
import { queryClient } from "../..";
import DeleteConfirmationPopup from "../common/component/DeleteConfirmationPopup";

const categoryHeadings = ["Category", "Actions"];

const AllCategoryDetails = () => {
  const [idToBeDeleted, setIdToBeDeleted] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useQuery("fetchAllCategory", fetchAllCategory);

  const categories = useMemo(() => {
    return data?.data || [];
  }, [data]);

  const deleteCategoryById = (id: string) => {
    setIdToBeDeleted(id);
    onOpen();
  };

  const deleted = useMutation(deleteCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchAllCategory"]);
    },
  });

  const deleteCategoryDetails = (id: string) => {
    deleted.mutate(id);
    onClose();
  };

  return categories.length > 0 ? (
    <Fragment>
      {isOpen && (
        <DeleteConfirmationPopup
          label={"Delete Category"}
          description={"category"}
          isOpen={true}
          onClose={onClose}
          idToBeDeleted={() => deleteCategoryDetails(idToBeDeleted)}
        />
      )}
      <Table variant="simple">
        <Thead>
          <Tr>
            {categoryHeadings.map((heading: string, key: number) => (
              <Th key={key}>{heading}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {categories.map(({ category, _id }: any, index: any) => (
            <Tr key={index}>
              <Td textTransform={"capitalize"}>{category}</Td>
              <Td display={"flex"} ml={"9px"} cursor={"pointer"}>
                <MdDelete
                  size={"20px"}
                  color="red"
                  style={{ marginLeft: "10px" }}
                  onClick={() => deleteCategoryById(_id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Fragment>
  ) : (
    <Box>No Category added yet.</Box>
  );
};
export default AllCategoryDetails;
