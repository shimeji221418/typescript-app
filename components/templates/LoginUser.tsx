import { useRouter } from "next/router";
import React, { FC, ReactElement, useEffect } from "react";
import { useAuthContext } from "../../provider/AuthProvider";

type Props = {
  children: ReactElement;
};

export const LoginUser: FC<Props> = ({ children }) => {
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, []);
  return children;
};
