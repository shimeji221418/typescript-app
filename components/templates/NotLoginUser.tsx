import { useRouter } from "next/router";
import React, { FC, ReactElement, useEffect } from "react";
import { useAuthContext } from "../../provider/AuthProvider";

type Props = {
  children: ReactElement;
};

export const NotLoginUser: FC<Props> = ({ children }) => {
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      router.replace("/Login");
    }
  }, []);
  return children;
};
