import { MdDelete, MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
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
import DeleteAuthorPopup from "./DeleteAuthor";
import { useState } from "react";

const TableComponent = ({ head, data }: any) => {
  const [idToBeDeleted, setIdToBeDeleted] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOnClick = (id: string) => {
    setIdToBeDeleted(id);
    onOpen();
  };
  return data.length > 0 ? (
    <>
      {isOpen && (
        <DeleteAuthorPopup
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
              data.map((author: any, index: any) => (
                <Tr key={author._id}>
                  <Td>{author.author}</Td>
                  <Td>{author.qualification}</Td>
                  <Td>{author.phone}</Td>
                  <Td>{author.email}</Td>
                  <Td display={"flex"} ml={"9px"} cursor={"pointer"}>
                    <Link to={`/author/${author._id}`}>
                      <MdModeEdit size={"20px"} color="blue" />{" "}
                    </Link>
                    <Box ml={"20px"}>
                      <MdDelete
                        size={"20px"}
                        color="red"
                        onClick={() => handleOnClick(author._id)}
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
    <Box>No author added yet.</Box>
  );
};

export default TableComponent;
