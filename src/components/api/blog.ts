import apiClient from "../common/axiosClient";


export const createBlog = async (values: any) => {
  return apiClient.post("/blog", {
    heading: values.heading,
    category: values.category,
    author: values.author,
    content: values.content,
  });
};

export const fetchAllBlog = async (values: any) => {
  return apiClient.get("/blog").then((resp) => resp?.data?.data);
};
export const fetchBlogById = async (id:string) => {
   return apiClient.get(`/blog/${id}`).then((resp) => resp.data);
};