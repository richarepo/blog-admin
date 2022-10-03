import { MdDelete } from "react-icons/md";
import {
  Box,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useDisclosure,
} from "@chakra-ui/react";
import DeleteCategoryPopup from "./DeleteCategory";
import { useState } from "react";

const AllCategoryDetails = ({ head, data }: any) => {
  const [idToBeDeleted, setIdToBeDeleted] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOnClick = (id: string) => {
    setIdToBeDeleted(id);
    onOpen();
  };
  return data.length > 0 ? (
    <>
      {isOpen && (
        <DeleteCategoryPopup
          onClose={onClose}
          isOpen={isOpen}
          deleteId={idToBeDeleted}
        />
      )}
      <TableContainer w={"100%"}>
        <Table variant="simple">
          <Thead>
            <Tr>
              {head.length > 0 &&
                head.map((head: any, key: number) => (
                  <Th key={key}>{head.Headings}</Th>
                ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.length &&
              data.reverse().map((category: any, index: any) => (
                <Tr key={category._id}>
                  <Td textTransform={"capitalize"}>{category.category}</Td>
                  <Td display={"flex"} ml={"9px"} cursor={"pointer"}>
                    <Box ml={"20px"}>
                      <MdDelete
                        size={"20px"}
                        color="red"
                        onClick={() => handleOnClick(category._id)}
                      />
                    </Box>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  ) : (
    <Box>No Category added yet.</Box>
  );
};
export default AllCategoryDetails;
