import {
  Avatar,
  Box,
  HStack,
  Link,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { FC, memo } from "react";
import { GetPost } from "../../types/api/post";
import { GetUser } from "../../types/api/user";
import LikeButton from "../atoms/LikeButton";

type Props = {
  post: GetPost;
  loginUser: GetUser | null;
};

const PostCard: FC<Props> = memo((props) => {
  const { post, loginUser } = props;
  return (
    <Box w="xl" bg="white" borderRadius="md" shadow="md" p={1}>
      <HStack>
        <Avatar src={post.user.icon.url} mr={2} />
        <Stack>
          <Text>
            <Link href={`/users/${post.user.id}`}>{post.user.name}</Link>
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </Text>
        </Stack>
        <Spacer />
        <Box>
          {loginUser?.id && (
            <LikeButton postId={post.id} userId={loginUser?.id} />
          )}
        </Box>
      </HStack>
    </Box>
  );
});

export default PostCard;
