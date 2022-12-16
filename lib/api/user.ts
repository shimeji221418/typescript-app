import { GetUser } from "../../types/api/user";
import { client, client2 } from "./client";

export const signUpUser = (config: any) => {
  return client.post("/", config);
};

export const getUsers = (config: any) => {
  return client2.get<Array<GetUser>>("/", config);
};
