// import React, {
//   createContext,
//   FC,
//   ReactNode,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import { getAuth, onAuthStateChanged, User } from "firebase/auth";
// import { app } from "../firebase";
// import { Text } from "@chakra-ui/react";

// export type UserType = User | null;

// export type AuthContextProps = {
//   user: User;
// };

// type Props = {
//   children: ReactNode;
// };

// const AuthContext = createContext({});

// export const useAuthContext = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider: FC<Props> = ({ children }) => {
//   const auth = getAuth(app);
//   const [user, setUser] = useState<UserType>(null);
//   const [loading, setLoading] = useState(true);
//   const value = {
//     user,
//     loading,
//   };

//   useEffect(() => {
//     const unsubscribed = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//       setLoading(false);
//     });
//     return () => {
//       unsubscribed();
//     };
//   }, []);

//   if (loading) {
//     return <Text>Loading...</Text>;
//   } else {
//     return (
//       <AuthContext.Provider value={value}>
//         {!loading && children}
//       </AuthContext.Provider>
//     );
//   }
// };

// export default AuthProvider;

import { Text } from "@chakra-ui/react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { app } from "../firebase";

type Props = {
  children: ReactNode;
};

type UserType = User | null;

export type AuthContextProps = {
  user: UserType;
};

const AuthContext = createContext<Partial<AuthContextProps>>({});
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: FC<Props> = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState<UserType>(null);
  const [loading, setLoading] = useState(true);
  const value = {
    user,
    loading,
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      console.log(user);
    });
    return () => {
      unsubscribed();
    };
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
