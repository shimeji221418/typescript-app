import { GetUser } from "../../types/api/user";
import { MethodType, client, client2 } from "./client";

export const signUpUser = (config: any) => {
  return client.post("/", config);
};

// export const getUsers = (config: any) => {
//   return client2.get<Array<GetUser>>("/", config);
// };

export const getUsers = (token: string) => {
  const params = {
    method: "get" as MethodType,
    url: "/users",
    token,
  };
  // return baseClient(params);
  // return client2.get<Array<GetUser>>("/", config);
};

export const getSelectUser = (id: string, config: any) => {
  return client2.get<GetUser>(`/${id}`, config);
};

export const updateUser = (id: string, params: any, config: any) => {
  return client2.patch(`/${id}`, params, config);
};

export const deleteSelectUser = (id: string, config: any) => {
  return client2.delete(`/${id}`, config);
};

export const getCurrentUser = (config: any) => {
  return client2.get("/current", config);
};
