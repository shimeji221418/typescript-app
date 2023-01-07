import { Text } from "@chakra-ui/react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { app } from "../firebase";
import { useRouter } from "next/router";
import { LoginUserType } from "../types/api/user";
import { getCurrentUser } from "../lib/api/user";

type Props = {
  children: ReactNode;
};

export type AuthContextProps = {
  loginUser: LoginUserType;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextProps>({
  // loginUser: null,
} as AuthContextProps);
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: FC<Props> = ({ children }) => {
  const router = useRouter();
  const auth = getAuth(app);
  const [loginUser, setLoginUser] = useState<LoginUserType>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const value = {
    loginUser,
    loading,
    setLoading,
  };

  const isLoginOrSingUpPage: boolean =
    router.pathname === "/Login" || router.pathname === "/signUp";

  useEffect(() => {
    const onCurrentUser = async () => {
      try {
        const token = await auth.currentUser?.getIdToken(true);
        const config = {
          headers: { authorization: `Bearer ${token}` },
          params: { uid: auth.currentUser?.uid },
        };
        const res = await getCurrentUser(config);
        setLoginUser(res.data);
        setLoading(false);
      } catch (e: any) {
        console.log(e);
        setLoading(false);
      }
    };

    const unsubscribed = onAuthStateChanged(auth, (resultUser) => {
      if (isLoginOrSingUpPage && resultUser) {
        router.replace("/");
      }
      if (!isLoginOrSingUpPage && resultUser == null) {
        router.replace("/Login");
        return;
      }
      onCurrentUser();
      console.log(resultUser);
    });
    unsubscribed();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  } else {
    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    );
  }
};

export default AuthProvider;
