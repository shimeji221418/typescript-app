import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import PostForm from "../../../components/molecules/PostForm";
import { app } from "../../../firebase";
// import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { getPost, updatePost } from "../../../lib/api/post";
import { GetPost } from "../../../types/api/post";
import { useAuthContext } from "../../../provider/AuthProvider";

const EditPost = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const id = router.query.id as string;
  // const { onCurrentUser, loginUser } = useCurrentUser()
  const { loginUser } = useAuthContext();

  const [editPost, setEditPost] = useState<
    Pick<GetPost, "title" | "content" | "image">
  >({
    title: "",
    content: "",
    image: { url: "" },
  });
  const [loading, setLoading] = useState(true);
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

  const createFormData = () => {
    const formData = new FormData();
    formData.append("post[title]", editPost.title);
    formData.append("post[content]", editPost.content);
    formData.append("post[image]", editPost.image.url);
    formData.append("user_id", loginUser!.id as any);
    return formData;
  };

  const handleonSubmit = async () => {
    try {
      const token = await auth.currentUser?.getIdToken(true);
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
          "Context-Type": "multipart/form-data",
        },
      };
      const data = createFormData();
      await updatePost(id, data, config);
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
          const config = { headers: { authorization: `Bearer ${token}` } };
          const res = await getPost(id, config);
          setEditPost({
            title: res.data.title,
            content: res.data.content,
            image: {
              url: res.data.image.url,
            },
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
      {!loading && (
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
