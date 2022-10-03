import apiClient from "../common/axiosClient";


export const fetchAllAuthor = async () => {
  return apiClient.get("/author").then((resp) => resp.data);
};

export const fetchAuthorById = async (id?: string) => {
  return apiClient.get(`/author/${id}`).then((resp) => resp.data.res);
};

export const createNewAuthor = async (values: any) => {
  const first: string = values.first_name;
  const last: string = values.last_name;
  const author: string = first + " " + last;
  values["author"] = author;
  delete values.first_name;
  delete values.last_name;
  return apiClient.post("/author", {
    author: values.author,
    qualification: values.qualification,
    phone: values.phone,
    email: values.email,
    avatar:values.avatar
  });
};

export const deleteAuthorById = async (id?: string) => {
  return apiClient.delete(`/author/${id}`);
};

export const editAuthorById = async (id: string, values: any) => {
  const first: string = values.first_name;
  const last: string = values.last_name;
  const author: string = first + " " + last;
  values["author"] = author;
  delete values.first_name;
  delete values.last_name;
  return apiClient.patch(`/author/${id}`, values);
};
