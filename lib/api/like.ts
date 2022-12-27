import { GetLike } from "../../types/api/like";
import { client4 } from "./client";

export const getLike = (params: any) => {
  return client4.get<GetLike>("/", {
    params: { user_id: params.user_id, post_id: params.post_id },
  });
};

export const countLike = (id: number) => {
  return client4.get("/count", {
    params: { post_id: id },
  });
};

export const createLike = (params: any) => {
  return client4.post("/", params);
};

export const deleteLike = (id: number) => {
  return client4.delete(`/${id}`);
};
