import {
  Avatar,
  Box,
  Flex,
  HStack,
  Image,
  Link,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import LikeButton from "../../components/atoms/LikeButton";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import CheckModal from "../../components/organisms/CheckModal";
import { app } from "../../firebase";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { deletePost, getPost } from "../../lib/api/post";
import { GetPost } from "../../types/api/post";

const Post = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const id = router.query.id as string;
  const [selectPost, setSelectPost] = useState<GetPost | null>(null);
  const [loading, setLoading] = useState(true);
  const { onCurrentUser, loginUser } = useCurrentUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const getSelectPost = async () => {
      try {
        if (router.isReady) {
          const token = await auth.currentUser?.getIdToken(true);
          const config = { headers: { authorization: `Bearer ${token}` } };
          const res = await getPost(id, config);
          setSelectPost(res.data);
          await onCurrentUser();
          setLoading(false);
        }
      } catch (e: any) {
        console.log(e);
      }
    };
    getSelectPost();
  }, []);

  const handleDelete = useCallback(async () => {
    try {
      if (router.isReady) {
        const token = await auth.currentUser?.getIdToken(true);
        const config = { headers: { authorization: `Bearer ${token}` } };
        await deletePost(id, config);
        router.push("/posts");
      }
    } catch (e: any) {
      console.log(e);
    }
  }, []);

  return (
    <>
      {!loading && (
        <Flex justify="center" align="center" mt={10}>
          <Box w="xl" bg="white" shadow="lg" borderRadius="md" p={4} pb={8}>
            <HStack align="top">
              <Avatar src={selectPost!.user.icon.url} mr={2} size="lg" />
              <Stack>
                <Text fontSize="xl">
                  <Link href={`/users/${selectPost!.user.id}`}>
                    {selectPost!.user.name}
                  </Link>
                </Text>
                <Text fontSize="2xl" fontWeight="bold">
                  {selectPost!.content}
                </Text>
                {selectPost!.image ? (
                  <Image src={selectPost!.image.url} w="100%" h="100%" />
                ) : (
                  ""
                )}
              </Stack>
              <Spacer />
              <Box>
                {loginUser?.id && (
                  <LikeButton postId={selectPost!.id} userId={loginUser?.id} />
                )}
              </Box>
            </HStack>
            {selectPost?.user.uid === loginUser?.uid && (
              <Box display="flex" justifyContent="center" mt={4}>
                <Box mr={1}>
                  <PrimaryButton color="red" onClick={onOpen}>
                    delete
                  </PrimaryButton>
                </Box>
                <PrimaryButton
                  color="yellow"
                  onClick={handleDelete}
                  fontcolor="black"
                >
                  update
                </PrimaryButton>
              </Box>
            )}
          </Box>
        </Flex>
      )}
      <CheckModal
        isOpen={isOpen}
        onClose={onClose}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default Post;
