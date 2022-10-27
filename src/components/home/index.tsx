/** @format */
import React, { FC } from "react";
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
  Spinner
} from "@chakra-ui/react";
import { useQuery } from "react-query";

import { fetchAllBlog } from "../api/blog";
import { SERVER_URL } from "../common/constant";
import useColorManager from "../../hooks/colorManager";

interface IBlogTags {
  tags: Array<string>;
  marginTop?: SpaceProps["marginTop"];
}

const BlogTags: FC<IBlogTags> = (props) => {
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
  image: string;
}

export const BlogAuthor: React.FC<BlogAuthorProps> = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src={props.image}
        alt={`Avatar of }`}
      />
      <Text fontWeight="medium">{`${
        props.name
      } - ${props.date.toLocaleDateString()}`}</Text>
    </HStack>
  );
};

const Home = () => {
  const { data,isLoading } = useQuery("fetchAllBlog", fetchAllBlog);
  const { GRAY_DGRAY } = useColorManager();

  const getImage = (image: any) => {
    const blogCardImage = image.replace("size", "760_560");
    return `${SERVER_URL}/${blogCardImage}`;
  };

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
        bgColor={GRAY_DGRAY}
      >
        <Heading as="h2">Blogs by Repozitory</Heading>
      </Box>
      <Container maxW={"7xl"} p="12">
        <Box>
          {data?.length ? (
            data?.map(
              (
                { heading, author, category, createdAt, content, image }: any,
                index: any
              ) => {
                return (
                  <Box key={index} mt={"3rem"}>
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
                            href={`${heading}`}
                            isExternal
                            textDecoration="none"
                            _hover={{ textDecoration: "none" }}
                          >
                            <Image
                              borderRadius="lg"
                              src={getImage(image)}
                              alt="some good alt text"
                              objectFit="contain"
                            />
                          </Link>
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
                            isExternal
                            href={`/blog/${heading}`}
                            textDecoration="none"
                            _hover={{ textDecoration: "none" }}
                          >
                            {heading}
                          </Link>
                        </Heading>
                        <Box
                          marginTop="2"
                          dangerouslySetInnerHTML={{ __html: content }}
                        />
                        {!!author && (
                          <BlogAuthor
                            name={author.author || null}
                            date={new Date(createdAt)}
                            image={`${SERVER_URL}/${author.avatar}` || ""}
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>
                );
              }
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
