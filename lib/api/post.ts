import { GetPost } from "../../types/api/post";
import { client3 } from "./client";

export const getPosts = (config: any) => {
  return client3.get<Array<GetPost>>("/", config);
};

export const getPost = (id: string, config: any) => {
  return client3.get<GetPost>(`/${id}`, config);
};

export const createPost = (params: any, config: any) => {
  return client3.post("/", params, config);
};

export const updatePost = (id: string, params: any, config: any) => {
  return client3.patch(`/${id}`, params, config);
};

export const deletePost = (id: string, config: any) => {
  return client3.delete(`/${id}`, config);
};
