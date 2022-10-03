/** @format */
import React from "react";
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  SpaceProps,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetchAllBlog } from "../api/blog";

interface IBlogTags {
  tags: Array<string>;
  marginTop?: SpaceProps["marginTop"];
}

const BlogTags: React.FC<IBlogTags> = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag size={"md"} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

interface BlogAuthorProps {
  date: Date;
  name: string;
}

export const BlogAuthor: React.FC<BlogAuthorProps> = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of }`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

const Home = () => {
  const { data } = useQuery("fetchAllBlog", fetchAllBlog);

  return (
    <Box>
      <Box
        as="header"
        position="fixed"
        h={"80px"}
        w={"100%"}
        zIndex={"5"}
        bg={"gray.100"}
        p="20px 0 20px 50px"
        bgColor={useColorModeValue("gray.100", "gray.900")}
      >
        <Heading as="h2">Blogs by Repozitory</Heading>
      </Box>
      <Container maxW={"7xl"} p="12" >
        <Box>
          {data?.length ? (
            data?.map(
              (
                { heading, author, category, _id, createdAt, content }: any,
                index: any
              ) => (
                <Box key={_id} mt={"3rem"}>
                  <Box
                    marginTop={{ base: "1", sm: "5" }}
                    display="flex"
                    flexDirection={{ base: "column", sm: "row" }}
                    justifyContent="space-between"
                  >
                    <Box
                      display="flex"
                      flex="1"
                      marginRight="3"
                      position="relative"
                      alignItems="center"
                    >
                      <Box
                        width={{ base: "100%", sm: "85%" }}
                        zIndex="2"
                        marginLeft={{ base: "0", sm: "5%" }}
                        marginTop="5%"
                      >
                        <Link
                          textDecoration="none"
                          _hover={{ textDecoration: "none" }}
                        >
                          <Image
                            borderRadius="lg"
                            src={
                              "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
                            }
                            alt="some good alt text"
                            objectFit="contain"
                          />
                        </Link>
                      </Box>
                      <Box
                        zIndex="1"
                        width="100%"
                        position="absolute"
                        height="100%"
                      >
                        <Box
                         _dark={{
                            bg: "radial(orange.600 1px, transparent 1px)",
                          }}
                          backgroundSize="20px 20px"
                          opacity="0.4"
                          height="100%"
                        />
                      </Box>
                    </Box>

                    <Box
                      display="flex"
                      flex="1"
                      flexDirection="column"
                      justifyContent="center"
                      marginTop={{ base: "3", sm: "0" }}
                    >
                     {category && <BlogTags tags={[category.category]} />}
                      <Heading marginTop="1">
                        <Link
                          textDecoration="none"
                          _hover={{ textDecoration: "none" }}
                        >
                          {heading}
                        </Link>
                      </Heading>
                      <Text
                        as="p"
                        marginTop="2"
                        _dark={{ bg: "gray.700" }}
                        fontSize="lg"
                      />
                      <Box
                        marginTop="2"
                        dangerouslySetInnerHTML={{ __html: content }}
                      />
                     {!!author && <BlogAuthor
                        name={author.author || null}
                        date={new Date(createdAt)}
                      />}
                    </Box>
                  </Box>
                </Box>
              )
            )
          ) : (
            <Box>Loading....</Box>
          )}
        </Box>
        <Divider marginTop="5" />
      </Container>
    </Box>
  );
};

export default Home;
