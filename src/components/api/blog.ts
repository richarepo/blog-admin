import apiClient from "../common/apiClient";

export const createBlog = async (values: any) => {
  return apiClient.post("/blog", values);
};

export const fetchAllBlog = async () => {
  return apiClient.get("/blog").then((resp) => resp?.data?.data);
};

export const fetchBlogByHeading = async (heading?: string) => {
  return apiClient.get(`/blog/${heading}`).then((resp) => resp.data.data);
};