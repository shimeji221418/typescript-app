import { IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import React, { FC, memo } from "react";

type Props = {
  onOpen: () => void;
};

const MenuIconButton: FC<Props> = memo((props) => {
  const { onOpen } = props;
  return (
    <IconButton
      aria-label="iconButton"
      icon={<HamburgerIcon />}
      variant="solid"
      display={{ base: "sm", md: "lg" }}
      onClick={onOpen}
    />
  );
});

export default MenuIconButton;
