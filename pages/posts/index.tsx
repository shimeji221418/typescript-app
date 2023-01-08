import { Stack } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PostCard from "../../components/organisms/PostCard";
import { app } from "../../firebase";
// import { useCurrentUser } from "../../hooks/useCurrentUser";
import { GetPost } from "../../types/api/post";
import { useAuthContext } from "../../provider/AuthProvider";
import {
  BaseClientWithAuthType,
  baseClientWithAuth,
} from "../../lib/api/client";

const Posts = () => {
  const auth = getAuth(app);
  const [posts, setPosts] = useState<Array<GetPost>>([]);
  // const { onCurrentUser, loginUser } = useCurrentUser();
  const { loginUser, loading, setLoading } = useAuthContext();

  useEffect(() => {
    const getPostList = async () => {
      try {
        const token = await auth.currentUser?.getIdToken(true);
        const params: BaseClientWithAuthType = {
          method: "get",
          url: `/posts/`,
          token: token!,
        };
        const res = await baseClientWithAuth(params);
        setPosts(res.data);
        // await onCurrentUser();
        console.log(res.data);
        setLoading(false);
      } catch (e: any) {
        console.log(e);
      }
    };
    getPostList();
  }, []);

  return (
    <>
      {!loading && (
        <Stack align="center" mt={5} spacing={3}>
          {loginUser != null &&
            posts.map((post) => (
              <Stack key={post.id}>
                <PostCard post={post} loginUser={loginUser} />
              </Stack>
            ))}
        </Stack>
      )}
    </>
  );
};

export default Posts;
