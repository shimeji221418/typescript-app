import { getAuth } from "firebase/auth";
import { useState } from "react";
import { app } from "../firebase";
import { getCurrentUser } from "../lib/api/user";
import { GetUser } from "../types/api/user";

export const useCurrentUser = () => {
  const auth = getAuth(app);
  const [loginUser, setLoginUser] = useState<GetUser | null>(null);
  const onCurrentUser = async () => {
    try {
      const token = await auth.currentUser?.getIdToken(true);
      const config = {
        headers: { authorization: `Bearer ${token}` },
        params: { uid: auth.currentUser?.uid },
      };
      const res = await getCurrentUser(config);
      setLoginUser(res.data);
    } catch (e: any) {
      console.log(e);
    }
  };
  return { onCurrentUser, loginUser };
};
