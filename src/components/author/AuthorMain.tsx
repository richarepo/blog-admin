import {  useMemo } from "react";
import { Box, Button, Heading, useColorModeValue } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Link, Route, Routes } from "react-router-dom";

import { fetchAllAuthor} from "../api/author";
import TableComponent from "./TableComponent";
import { queryClient } from "../..";
import AddNewAuthor from "./AddNewAuthor";


const authorHeading = [
  { Headings: "Author" },
  { Headings: "Qualification" },
  { Headings: "Phone" },
  { Headings: "Email" },
  { Headings: "Actions" },
];

const fetchAuthor = () => {
  queryClient.invalidateQueries(["fetchAllAuthor"]);
};

const AuthorDetails = () => {

  const { data} = useQuery("fetchAllAuthor", fetchAllAuthor,{
    onSuccess: () => fetchAuthor
});

  const authors = useMemo(()=>{
      return data?.data || []
  },[data])

  return (
    <Box px={"2rem"} py={"2rem"} bgColor={useColorModeValue("#fff","gray.900")} height="100vh" >
      <Box w={"100%"} display={"flex"} justifyContent={"space-between"} bg={useColorModeValue("#fff","gray.900")}>
        <Heading as="h3" size="lg">
          Author details
        </Heading>
        <Link to="/author/new">
          <Button colorScheme={"teal"} ml={"3rem"} >Create Author</Button>
        </Link>
      </Box>
      <Box display={"flex"} mt={"3rem"} bg={useColorModeValue("#fff", "gray.900")}>
        <TableComponent
          
          w={"20%"}
          head={authorHeading}
          data={authors}
        />
      </Box>
    </Box>
  );
};

const AuthorMain = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthorDetails />} />
      <Route path="/new" element={<AddNewAuthor />} />
      <Route path="/:authorId" element={<AddNewAuthor />} />
    </Routes>
  );
};

export default AuthorMain;
