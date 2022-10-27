import { Box, Image } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { fetchBlogByHeading } from "../api/blog";
import { SERVER_URL } from "../common/constant";


const BlogContent = () => {
  const { heading } = useParams();
  const { data } = useQuery(
    ["fetchAuthorById", heading],
    async () => await fetchBlogByHeading(heading)
  );

  const blogImage = data?.image.replace("size", "1240_1240");
  return (
    <Box>
      <Image src={`${SERVER_URL}/${blogImage}`} />;
      <Box marginTop="2" dangerouslySetInnerHTML={{ __html: data?.content }} />
    </Box>
  );
};

export default BlogContent;