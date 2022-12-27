import { Button } from "@chakra-ui/react";
import React, { FC, memo, ReactNode } from "react";

type Props = {
  children: ReactNode;
  type?: "submit";
  color: string;
  size: string;
};

const FormButton: FC<Props> = memo((props) => {
  const { children, type, color, size } = props;
  return (
    <Button
      type={type}
      colorScheme={color}
      size={size}
      color="white"
      fontSize={size}
      fontWeight="bold"
    >
      {children}
    </Button>
  );
});

export default FormButton;
