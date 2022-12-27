import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Link,
  Stack,
} from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import React, { FC, memo } from "react";
import { app } from "../../firebase";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleLogout: () => void;
};

const MenuDrawer: FC<Props> = memo((props) => {
  const auth = getAuth(app);
  const { isOpen, onClose, handleLogout } = props;
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="xs">
      <DrawerOverlay />
      <DrawerContent textAlign="center">
        <DrawerCloseButton />
        <DrawerHeader
          as="h1"
          fontSize="4xl"
          fontWeight="bold"
          pb={0}
          color="cyan.700"
        >
          MENU
        </DrawerHeader>
        <DrawerHeader as="h2" fontSize="2xl" p={0} color="cyan.700">
          User: {auth.currentUser && auth.currentUser.displayName}
        </DrawerHeader>
        <DrawerBody mt={10} fontWeight="bold" color="cyan.400" fontSize="xl">
          <Stack spacing={8}>
            <Link href="/users">ユーザー一覧</Link>
            <Link href="/posts">投稿一覧</Link>
            <Link href="/posts/new">新規投稿</Link>
            <Link onClick={handleLogout}>ログアウト</Link>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
});

export default MenuDrawer;
