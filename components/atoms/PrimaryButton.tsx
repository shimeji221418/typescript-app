import { Button } from "@chakra-ui/react";
import React, { FC, memo, ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick: () => void;
  color: string;
  fontcolor?: string;
};

const PrimaryButton: FC<Props> = memo((props) => {
  const { children, onClick, color, fontcolor = "white" } = props;
  return (
    <Button onClick={onClick} colorScheme={color} color={fontcolor}>
      {children}
    </Button>
  );
});

export default PrimaryButton;
