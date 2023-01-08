import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import PostForm from "../../components/molecules/PostForm";
import { app } from "../../firebase";
// import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useAuthContext } from "../../provider/AuthProvider";
import {
  BaseClientWithAuthType,
  baseClientWithAuth,
} from "../../lib/api/client";

type Post = {
  title: string;
  content: string;
  user_id: Number;
  image: string;
};

const New = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const [newPost, setNewPost] = useState<Post>({
    title: "",
    content: "",
    user_id: 0,
    image: "",
  });
  const [preview, setPreview] = useState("");
  // const { onCurrentUser, loginUser } = useCurrentUser();
  const { loginUser, loading, setLoading } = useAuthContext();

  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setNewPost({ ...newPost, [name]: value });
  };

  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const name = target.name;
    const file = target.files![0];
    setNewPost({ ...newPost, [name]: file });
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const createFormData = () => {
    const formData = new FormData();
    formData.append("post[title]", newPost.title);
    formData.append("post[content]", newPost.content);
    formData.append("post[image]", newPost.image);
    formData.append("user_id", loginUser!.id as any);
    return formData;
  };

  const handleonSubmit = async () => {
    try {
      const token = await auth.currentUser?.getIdToken(true);
      const params: BaseClientWithAuthType = {
        method: "post",
        url: "/posts/",
        token: token!,
        data: createFormData(),
        options: {
          "Context-Type": "multipart/form-data",
        },
      };
      baseClientWithAuth(params);
      router.push("/posts");
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <>
      {!loading && (
        <PostForm
          title="New Post"
          handleChange={handleChange}
          uploadImage={uploadImage}
          handleonSubmit={handleonSubmit}
          preview={preview}
        />
      )}
    </>
  );
};

export default New;
