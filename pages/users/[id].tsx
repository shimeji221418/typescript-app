import {
  Avatar,
  Box,
  Flex,
  HStack,
  Link,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { deleteUser, getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import LikeButton from "../../components/atoms/LikeButton";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import CheckModal from "../../components/organisms/CheckModal";
import UserCard from "../../components/organisms/UserCard";
import { app } from "../../firebase";
// import { useCurrentUser } from "../../hooks/useCurrentUser";
import { deleteSelectUser, getSelectUser } from "../../lib/api/user";
import { GetUser } from "../../types/api/user";
import { useAuthContext } from "../../provider/AuthProvider";

const User = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const id = router.query.id as string;
  const [selectUser, setSelectUser] = useState<GetUser | null>(null);
  // const { onCurrentUser, loginUser } = useCurrentUser();
  const { loginUser, loading, setLoading } = useAuthContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const getUser = async () => {
      try {
        if (router.isReady) {
          const token = await auth.currentUser?.getIdToken(true);
          const config = { headers: { authorization: `Bearer ${token}` } };
          const res = await getSelectUser(id, config);
          // await onCurrentUser();
          setSelectUser(res.data);
          setLoading(false);
        }
      } catch (e: any) {
        console.log(e);
      }
    };
    getUser();
  }, []);

  const handleDelete = async () => {
    try {
      const token = await auth.currentUser?.getIdToken(true);
      const config = { headers: { authorization: `Bearer ${token}` } };
      await deleteSelectUser(id, config);
      await deleteCurrentUser();
    } catch (e: any) {
      console.log(e);
    }
  };

  const deleteCurrentUser = async () => {
    try {
      const user = auth.currentUser!;
      await deleteUser(user);
      await signOut(auth);
      router.replace("/signUp");
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <>
      {!loading && selectUser != null && (
        <Flex justify="center" mt={10}>
          <Box>
            <UserCard
              icon={selectUser.icon}
              id={selectUser.id}
              name={selectUser.name}
              email={selectUser.email}
            />
            {selectUser.uid === loginUser!.uid && (
              <Box display="flex" justifyContent="center" m={2}>
                <Box mr={2}>
                  <PrimaryButton onClick={onOpen} color="red">
                    delete
                  </PrimaryButton>
                </Box>

                <PrimaryButton
                  onClick={() => {
                    router.push(`/users/edit/${id}`);
                  }}
                  color="yellow"
                  fontcolor="black"
                >
                  update
                </PrimaryButton>
              </Box>
            )}
          </Box>

          <Box ml={5}>
            {selectUser?.posts ? (
              <>
                <Text mb={2} fontWeight="bold">
                  {selectUser!.name}の投稿一覧
                </Text>
                <Stack>
                  {selectUser!.posts.map((post) => (
                    <Stack key={post.id}>
                      <Box
                        w="md"
                        bg="white"
                        borderRadius="md"
                        shadow="md"
                        p={1}
                      >
                        <HStack>
                          <Avatar src={selectUser!.icon.url} mr={2} />
                          <Stack>
                            <Text>
                              <Link href={`/users/${selectUser!.id}`}>
                                {selectUser!.name}
                              </Link>
                            </Text>
                            <Text fontSize="lg" fontWeight="bold">
                              <Link href={`/posts/${post.id}`}>
                                {post.title}
                              </Link>
                            </Text>
                          </Stack>
                          <Spacer />
                          <Box>
                            {loginUser?.id && (
                              <LikeButton
                                postId={post.id}
                                userId={loginUser?.id}
                              />
                            )}
                          </Box>
                        </HStack>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </>
            ) : (
              <Text>まだ投稿がありません</Text>
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

export default User;
