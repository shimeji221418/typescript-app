import { Box, Flex, Image, Input, Stack, Text } from "@chakra-ui/react";
import React, { ChangeEvent, FC, memo, useState } from "react";
import { useFormContext } from "react-hook-form";
import FormButton from "../atoms/FormButton";
import InputForm from "../atoms/InputForm";

type Props = {
  title: string;
  value?: string;
  value2?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleonSubmit: () => void;
  uploadImage: (e: ChangeEvent<HTMLInputElement>) => void;
  preview: string;
};

const PostForm: FC<Props> = memo((props) => {
  const {
    title,
    handleChange,
    handleonSubmit,
    uploadImage,
    value,
    value2,
    preview,
  } = props;
  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  return (
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
            {title}
          </Text>
          <form onSubmit={handleSubmit(handleonSubmit)}>
            <Stack spacing={6}>
              <InputForm
                title="title"
                type="text"
                value={value}
                handleChange={handleChange}
              />
              {errors.title && <Text>titleが入力されていません</Text>}
              <InputForm
                title="content"
                type="text"
                value={value2}
                handleChange={handleChange}
              />
              {errors.content && <Text>contentが入力されていません</Text>}
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
  );
});

export default PostForm;
