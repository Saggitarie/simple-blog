import axios from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getPosts = async () => {
  const { data } = await instance.get("/posts");

  return data;
};

export const getComments = async () => {
  const { data } = await instance.get("/comments");

  return data;
};
