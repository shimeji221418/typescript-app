import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";

const options = {
  ignoreHeaders: true,
};

export type MethodType = "get" | "post" | "patch" | "delete";

export type BaseClientWithAuthType = {
  method: MethodType;
  url: string;
  token: string;
  data?: any;
  options?: any;
};

export type BaseClientWithoutAuthType = Omit<BaseClientWithAuthType, "token">;

const baseClient = applyCaseMiddleware(
  axios.create({
    baseURL: "http://localhost:3001/api/v1",
  }),
  options
);

export const baseClientWithAuth = (params: BaseClientWithAuthType) => {
  const { method, url, token, data, options } = params;

  return baseClient.request({
    headers: { authorization: `Bearer ${token}`, ...options },
    method,
    url,
    data,
  });
};

export const baseClientWithoutAuth = (params: BaseClientWithoutAuthType) => {
  const { method, url, data } = params;

  return baseClient.request({
    method,
    url,
    data,
  });
};

export const client = applyCaseMiddleware(
  axios.create({
    baseURL: "http://localhost:3001/api/v1/auth/registrations/",
  }),
  options
);

export const client2 = applyCaseMiddleware(
  axios.create({
    baseURL: "http://localhost:3001/api/v1/users/",
  }),
  options
);

export const client3 = applyCaseMiddleware(
  axios.create({
    baseURL: "http://localhost:3001/api/v1/posts/",
  }),
  options
);

export const client4 = applyCaseMiddleware(
  axios.create({
    baseURL: "http://localhost:3001/api/v1/likes/",
  }),
  options
);
