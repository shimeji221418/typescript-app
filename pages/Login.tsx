import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import React, { ChangeEvent, useCallback, useState } from "react";
import FormButton from "../components/atoms/FormButton";
import InputForm from "../components/atoms/InputForm";
import { useFormContext } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import { useRouter } from "next/router";

const Login = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const target = e.target;
      const name = target.name;
      const value = target.value;
      setLoginUser({ ...loginUser, [name]: value });
    },
    [loginUser, setLoginUser]
  );

  const handleonSubmit = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        loginUser.email,
        loginUser.password
      );
      await router.push("/");
    } catch (e: any) {
      setError(e.message);
      console.log(e);
    }
  };

  return (
    <Flex align="center" justify="center" h="100vh">
      <Box w="lg" bg="white" borderRadius="md" shadow="md" p={4}>
        {error && <Text>{error}</Text>}
        <Heading as="h1" fontSize="3xl" textAlign="center">
          Login
        </Heading>
        <form onSubmit={handleSubmit(handleonSubmit)}>
          <Stack spacing={4} p={4}>
            <InputForm title="email" type="text" handleChange={handleChange} />
            {errors.email && <Text>emailが入力されていません</Text>}
            <InputForm
              title="password"
              type="password"
              handleChange={handleChange}
            />
            {errors.password && <Text>passwordが入力されていません</Text>}
            <FormButton color="cyan" size="md" type="submit">
              Login
            </FormButton>
            <Text textAlign="center">
              ユーザー登録が済んでいない方は
              <Link href="/signUp" color="cyan.600">
                こちらから
              </Link>
            </Text>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
