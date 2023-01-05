import { Box, Image, Link, Stack, Text } from "@chakra-ui/react";
import React, { FC, memo } from "react";
import { GetUser } from "../../types/api/user";

const UserCard: FC<Pick<GetUser, "icon" | "name" | "id" | "email">> = memo(
  (props) => {
    const {
      icon: { url },
      name,
      id,
      email,
    } = props;
    return (
      <Box h="300px" w="240px" bg="white" shadow="md" borderRadius="md" p={4}>
        <Stack spacing={5}>
          <Image src={url} borderRadius="full" m="auto" boxSize="150px" />
          <Text as="h1" fontSize="2xl" fontWeight="bold" textAlign="center">
            <Link href={`/users/${id}`}>{name}</Link>
          </Text>
          {email ? (
            <Text as="h1" fontSize="lg" textAlign="center">
              {email}
            </Text>
          ) : (
            ""
          )}
        </Stack>
      </Box>
    );
  }
);

export default UserCard;
