import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React, { memo, useCallback } from "react";
import { app } from "../../firebase";
import { HamburgerIcon } from "@chakra-ui/icons";
import MenuDrawer from "../molecules/MenuDrawer";
import MenuIconButton from "../atoms/MenuIconButton";

const Header = memo(() => {
  const router = useRouter();
  const auth = getAuth(app);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handlePushHome = useCallback(() => {
    router.push("/");
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    await router.push("/Login");
  };
  return (
    <>
      <Flex
        as="nav"
        bg="cyan.500"
        align="center"
        justify="space-between"
        p={{ base: 3, md: 4 }}
        m={0}
      >
        <Flex as="a" align="center" _hover={{ cursor: "pointer" }} pr={5}>
          <Heading
            as="h1"
            fontSize={{ base: "3xl", md: "4xl" }}
            color="white"
            onClick={handlePushHome}
          >
            Typescript-app
          </Heading>
          {/* <Text as="h2" color="white" pl={3}>
            User:
          </Text>
          <Text as="h2" color="white" pl={1} fontSize="xl" fontWeight="bold">
            {auth.currentUser && auth.currentUser.displayName}
          </Text> */}
        </Flex>
        <Flex flexGrow={6} color="white" display={{ base: "none", md: "flex" }}>
          <HStack spacing={5}>
            <Link href="/users">ユーザー一覧</Link>
            <Link href="/posts">投稿一覧</Link>
            <Link href="/posts/new">新規投稿</Link>
            <Link onClick={handleLogout}>ログアウト</Link>
          </HStack>
        </Flex>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer
        isOpen={isOpen}
        onClose={onClose}
        handleLogout={handleLogout}
      />
    </>
  );
});
export default Header;
