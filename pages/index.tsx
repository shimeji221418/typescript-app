import { Button, Text } from "@chakra-ui/react";
import { getAuth, signOut } from "firebase/auth";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { app } from "../firebase";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();
  const auth = getAuth(app);
  const handleLogout = async () => {
    await signOut(auth);
    await router.push("/Login");
  };
  return (
    <>
      <Text as="h1" fontSize="4xl">
        Home
      </Text>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
}
