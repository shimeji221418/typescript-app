import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import PostForm from "../../../components/molecules/PostForm";
import { app } from "../../../firebase";
// import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { getPost, updatePost } from "../../../lib/api/post";
import { EditPostType, GetPost } from "../../../types/api/post";
import { useAuthContext } from "../../../provider/AuthProvider";
import {
  BaseClientWithAuthType,
  baseClientWithAuth,
} from "../../../lib/api/client";

const EditPost = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const id = router.query.id as string;
  // const { onCurrentUser, loginUser } = useCurrentUser()
  const { loginUser, loading, setLoading } = useAuthContext();

  const [editPost, setEditPost] = useState<EditPostType>({
    id: 0,
    title: "",
    content: "",
    image: "",
  });
  const [preview, setPreview] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setEditPost({ ...editPost, [name]: value });
  };

  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const name = target.name;
    const file = target.files![0];
    setEditPost({ ...editPost, [name]: file });
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const loginUserPost = loginUser!.posts!.find(
    (post) => post.id === editPost.id
  );

  const createFormData = () => {
    const formData = new FormData();
    formData.append("post[title]", editPost.title);
    formData.append("post[content]", editPost.content);
    if (editPost.image !== loginUserPost!.image.url)
      formData.append("post[image]", editPost.image);
    formData.append("user_id", loginUser!.id as any);
    return formData;
  };

  const handleonSubmit = async () => {
    try {
      console.log(editPost);
      const token = await auth.currentUser?.getIdToken(true);
      const params: BaseClientWithAuthType = {
        method: "patch",
        url: `/posts/${id}/`,
        token: token!,
        data: createFormData(),
        options: {
          "Context-Type": "multipart/form-data",
        },
      };
      await baseClientWithAuth(params);
      router.push("/posts");
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getSelectPost = async () => {
      try {
        if (router.isReady) {
          const token = await auth.currentUser?.getIdToken(true);
          const params: BaseClientWithAuthType = {
            method: "get",
            url: `/posts/${id}`,
            token: token!,
          };
          const res = await baseClientWithAuth(params);
          setEditPost({
            id: res.data.id,
            title: res.data.title,
            content: res.data.content,
            image: res.data.image.url,
          });
          setPreview(res.data.image.url);
          // await onCurrentUser();
          setLoading(false);
        }
      } catch (e: any) {
        console.log(e);
      }
    };
    getSelectPost();
  }, []);

  return (
    <>
      {!loading && editPost && loginUser && (
        <>
          <PostForm
            title="Edit Post"
            handleChange={handleChange}
            uploadImage={uploadImage}
            handleonSubmit={handleonSubmit}
            preview={preview}
            value={editPost.title}
            value2={editPost.content}
          />
        </>
      )}
    </>
  );
};

export default EditPost;
