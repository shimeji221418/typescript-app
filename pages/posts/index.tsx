import { Stack } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PostCard from "../../components/organisms/PostCard";
import { app } from "../../firebase";
// import { useCurrentUser } from "../../hooks/useCurrentUser";
import { getPosts } from "../../lib/api/post";
import { GetPost } from "../../types/api/post";
import { useAuthContext } from "../../provider/AuthProvider";

const Posts = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const [posts, setPosts] = useState<Array<GetPost>>([]);
  // const { onCurrentUser, loginUser } = useCurrentUser();
  const { loginUser, loading, setLoading } = useAuthContext();

  useEffect(() => {
    const getPostList = async () => {
      try {
        const token = await auth.currentUser?.getIdToken(true);
        const config = { headers: { authorization: `Bearer ${token}` } };
        const res = await getPosts(config);
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
