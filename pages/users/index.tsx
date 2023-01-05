import { Wrap, WrapItem } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import UserCard from "../../components/organisms/UserCard";
import { app } from "../../firebase";
import { getUsers } from "../../lib/api/user";
import { GetUser } from "../../types/api/user";

const Users = () => {
  const auth = getAuth(app);
  const [users, setUsers] = useState<Array<GetUser>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserLists = async () => {
      try {
        const currentUser = auth.currentUser;
        const token = await currentUser?.getIdToken(true);
        const config = { headers: { authorization: `Bearer ${token}` } };
        const res = await getUsers(config);
        console.log(res.data);
        setUsers(res.data);
        setLoading(false);
      } catch (e: any) {
        console.log(e);
      }
    };
    getUserLists();
  }, []);

  return (
    <>
      {!loading && (
        <Wrap spacing={6} m={6}>
          {users.map((user) => (
            <WrapItem key={user.id}>
              <UserCard
                name={user.name}
                icon={user.icon}
                id={user.id}
                email={user.email}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
    </>
  );
};

export default Users;
