import { Box, Flex, Image, Input, Stack, Text } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import FormButton from "../../components/atoms/FormButton";
import InputForm from "../../components/atoms/InputForm";
import { app } from "../../firebase";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { createPost } from "../../lib/api/post";

type Post = {
  title: string;
  content: string;
  user_id: Number;
  image: string;
};

const New = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const [newPost, setNewPost] = useState<Post>({
    title: "",
    content: "",
    user_id: 0,
    image: "",
  });
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const { onCurrentUser, loginUser } = useCurrentUser();

  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setNewPost({ ...newPost, [name]: value });
  };

  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const name = target.name;
    const file = target.files![0];
    setNewPost({ ...newPost, [name]: file });
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const createFormData = () => {
    const formData = new FormData();
    formData.append("post[title]", newPost.title);
    formData.append("post[content]", newPost.content);
    formData.append("post[image]", newPost.image);
    formData.append("user_id", loginUser!.id as any);
    return formData;
  };

  const handleonSubmit = async () => {
    try {
      const token = await auth.currentUser?.getIdToken(true);
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
          "Context-Type": "multipart/form-data",
        },
      };
      const data = createFormData();
      await createPost(data, config);
      router.push("/posts");
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect(() => {
    onCurrentUser();
    setLoading(false);
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
                New Post
              </Text>
              <form onSubmit={handleSubmit(handleonSubmit)}>
                <Stack spacing={6}>
                  <InputForm
                    title="title"
                    type="text"
                    handleChange={handleChange}
                  />
                  {errors.title && <Text>emailが入力されていません</Text>}
                  <InputForm
                    title="content"
                    type="text"
                    handleChange={handleChange}
                  />
                  {errors.content && <Text>emailが入力されていません</Text>}
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    variant="unstyled"
                    onChange={uploadImage}
                  />
                  {preview && (
                    <Box>
                      <Text as="p">Preview</Text>
                      <Image
                        src={preview}
                        alt="preview img"
                        width="200px"
                        height="200px"
                        m="auto"
                      />
                    </Box>
                  )}
                  <FormButton type="submit" color="cyan" size="lg">
                    Post
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

export default New;
