import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";

const options = {
  ignoreHeaders: true,
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
