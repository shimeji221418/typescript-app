import { Box, Flex, Image, Input, Stack, Text, Wrap } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { NextRouter, useRouter } from "next/router";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import FormButton from "../../../components/atoms/FormButton";
import InputForm from "../../../components/atoms/InputForm";
import { app } from "../../../firebase";
import { getSelectUser, updateUser } from "../../../lib/api/user";

const Edit = () => {
  const auth = getAuth(app);
  const router: NextRouter = useRouter();
  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    uid: "",
    icon: "",
  });
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState<string>("");

  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const uploadIcon = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const file = e.target.files![0];
    setEditUser({ ...editUser, [name]: file });
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const target = e.target;
      const name = target.name;
      const value = target.value;
      setEditUser({ ...editUser, [name]: value });
    },
    [editUser, setEditUser]
  );

  const createFormData = () => {
    const formData = new FormData();
    formData.append("user[name]", editUser.name);
    formData.append("user[icon]", editUser.icon);

    return formData;
  };

  const handleonSubmit = async () => {
    try {
      const id = router.query.id as string;
      const token = await auth.currentUser?.getIdToken(true);
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
          "Context-Type": "multipart/form-data",
        },
      };
      const data = createFormData();
      await updateUser(id, data, config);
      router.push("/users");
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        if (router.isReady) {
          const id = router.query.id as string;
          const token = await auth.currentUser?.getIdToken(true);
          const config = { headers: { authorization: `Bearer ${token}` } };
          const res = await getSelectUser(id, config);
          if (auth.currentUser?.uid !== res.data.uid) {
            router.replace("/users");
          }
          setEditUser({
            name: res.data.name,
            email: res.data.email,
            uid: res.data.uid,
            icon: res.data.icon.url,
          });

          setLoading(false);
        }
      } catch (e: any) {
        console.log(e);
      }
    };
    getUser();
  }, []);
  return (
    <>
      {!loading && (
        <Flex align="start" justify="center" h="100vh">
          <Box
            w="lg"
            bg="white"
            shadow="md"
            borderRadius="md"
            textAlign="center"
            p={5}
            mt={20}
          >
            <Stack spacing={6}>
              <Text as="h1" fontSize="4xl" fontWeight="bold" color="cyan.600">
                Edit User
              </Text>
              <form onSubmit={handleSubmit(handleonSubmit)}>
                <Stack spacing={6}>
                  <InputForm
                    title="name"
                    type="text"
                    value={editUser.name}
                    handleChange={handleChange}
                  />
                  {errors.name && <Text>emailが入力されていません</Text>}
                  <Input
                    id="icon"
                    name="icon"
                    type="file"
                    variant="unstyled"
                    onChange={uploadIcon}
                  />
                  {preview && (
                    <Box>
                      <Text as="p">Preview</Text>
                      <Image
                        src={preview}
                        alt="preview img"
                        width="100px"
                        height="100px"
                        borderRadius="full"
                        m="auto"
                      />
                    </Box>
                  )}
                  <FormButton type="submit" color="cyan" size="md">
                    Edit
                  </FormButton>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default Edit;