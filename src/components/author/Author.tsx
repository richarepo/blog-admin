import { Box, Button, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import AllAuthorDetails from "./AllAuthorDetails";
import useColorManager from "../../hooks/colorManager";


const Author = () => {
  const { WHITE_DGRAY } = useColorManager();

  return (
    <Box px={"2rem"} py={"2rem"} bgColor={WHITE_DGRAY} height="100vh">
      <Box
        w={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        bg={WHITE_DGRAY}
      >
        <Heading as="h3" size="lg">
          Author details
        </Heading>
        <Link to="/author/new">
          <Button colorScheme={"teal"} ml={"3rem"}>
            Create Author
          </Button>
        </Link>
      </Box>
      <Box display={"flex"} mt={"3rem"} bg={WHITE_DGRAY}>
        <AllAuthorDetails />
      </Box>
    </Box>
  );
};

export default Author;