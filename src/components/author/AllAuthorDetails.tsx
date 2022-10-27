import { MdDelete, MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState, useMemo, Fragment } from "react";
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

import { deleteAuthorById, fetchAllAuthor } from "../api/author";
import DeleteConfirmationPopup from "../common/component/DeleteConfirmationPopup";
import { queryClient } from "../..";

const authorTableHeadings = [
  "Author",
  "Qualification",
  "Phone",
  "Email",
  "Actions",
];

const AllAuthorDetails = () => {
  const [idToBeDeleted, setIdToBeDeleted] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useQuery("fetchAllAuthor", fetchAllAuthor);

  const authors = useMemo(() => {
    return data?.data || [];
  }, [data]);

  const deleteAuthor = (id: string) => {
    setIdToBeDeleted(id);
    onOpen();
  };

  const deleted = useMutation(deleteAuthorById, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchAllAuthor"]);
    },
  });

  const deleteAuthorDetails = (id: string) => {
    deleted.mutate(id);
    onClose();
  };

  return authors.length > 0 ? (
    <Fragment>
      {isOpen && (
        <DeleteConfirmationPopup
          label={"Delete Author"}
          description={"author"}
          onClose={onClose}
          isOpen={true}
          idToBeDeleted={()=>deleteAuthorDetails(idToBeDeleted)}
        />
      )}
      <Table variant="simple">
        <Thead>
          <Tr>
            {!!authorTableHeadings &&
              authorTableHeadings.map((heading: string, key: number) => (
                <Th key={key}>{heading}</Th>
              ))}
          </Tr>
        </Thead>
        <Tbody>
          {!!authors &&
            authors.map(
              (
                { _id, author, qualification, phone, email }: any,
                index: any
              ) => (
                <Tr key={index}>
                  <Td>{author}</Td>
                  <Td>{qualification}</Td>
                  <Td>{phone}</Td>
                  <Td>{email}</Td>
                  <Td display={"flex"} ml={"9px"} cursor={"pointer"}>
                    <Link to={`/author/${_id}`}>
                      <MdModeEdit size={"20px"} color="blue" />
                    </Link>

                    <MdDelete
                      size={"20px"}
                      color="red"
                      style={{ marginLeft: "20px" }}
                      onClick={() => deleteAuthor(_id)}
                    />
                  </Td>
                </Tr>
              )
            )}
        </Tbody>
      </Table>
    </Fragment>
  ) : (
    <Box>No author added yet.</Box>
  );
};

export default AllAuthorDetails;
