import apiClient from "../common/axiosClient";


export const fetchAllCategory = async () => {
  return apiClient.get("/categories").then((resp) => resp.data);
};

export const createNewCategory = async (values: any) => {
  return apiClient.post("/categories", {
    category: values.category,
  });
};

export const deleteCategory = async (id?:string) => {
  return apiClient.delete(`/categories/${id}`);
};
