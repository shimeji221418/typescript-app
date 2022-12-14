import React, { ChangeEvent, useCallback, useState } from "react";
import InputForm from "../components/atoms/InputForm";
import { useFormContext } from "react-hook-form";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import FormButton from "../components/atoms/FormButton";
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase";
import { NextRouter, useRouter } from "next/router";
import { NewUserType } from "../types";
import {
  BaseClientWithoutAuthType,
  baseClientWithoutAuth,
} from "../lib/api/client";

const signUp = () => {
  const auth: Auth = getAuth(app);
  const router: NextRouter = useRouter();

  const [newUser, setNewUser] = useState<NewUserType>({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const handleonChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const target = e.target;
      const name = target.name;
      const value = target.value;
      setNewUser({ ...newUser, [name]: value });
    },
    [newUser, setNewUser]
  );

  const handleonSubmit = () => {
    const request = async () => {
      await handleSignUp();
      if (auth.currentUser) {
        try {
          const token = await auth.currentUser.getIdToken(true);
          const data = { token };
          const params: BaseClientWithoutAuthType = {
            method: "post",
            url: "/auth/registrations/",
            data: data,
          };
          await baseClientWithoutAuth(params);
          router.push("/users");
        } catch (e: any) {
          console.log(e);
        }
      }
    };
    request();
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );
      await updateProfile(auth.currentUser!, {
        displayName: newUser.name,
      });
      console.log(auth.currentUser?.displayName);
      router.push("/");
    } catch (e: any) {
      console.log(e);
      setError(e.message);
    }
  };

  return (
    <>
      <Flex align="center" justify="center" h="100vh">
        <Box w="lg" bg="white" borderRadius="md" shadow="md" p={4}>
          <Heading as="h1" fontSize="4xl" textAlign="center" pt={4}>
            SignUp
          </Heading>
          <Text>{error}</Text>
          <form onSubmit={handleSubmit(handleonSubmit)}>
            <Stack p={4} spacing={4}>
              <InputForm
                title="name"
                type="text"
                handleChange={handleonChange}
              />
              {errors.name && <Text>name??????????????????????????????</Text>}
              <InputForm
                title="email"
                type="text"
                handleChange={handleonChange}
              />
              {errors.email && <Text>email??????????????????????????????</Text>}
              <InputForm
                title="password"
                type="password"
                handleChange={handleonChange}
              />
              {errors.password && <Text>password??????????????????????????????</Text>}
              <FormButton type="submit" color="cyan" size="md">
                SignUp
              </FormButton>
            </Stack>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default signUp;
