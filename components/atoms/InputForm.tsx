import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import React, { ChangeEvent, FC, memo } from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  title: string;
  type: string;
  value?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const InputForm: FC<Props> = memo((props) => {
  const { title, type, value, handleChange } = props;
  const { register } = useFormContext();
  return (
    <InputGroup>
      <InputLeftAddon children={title} bg="gray.500" color="white" />
      <Input
        value={value}
        {...register(`${title}`, {
          required: true,
          onChange: (e) => {
            handleChange(e);
          },
        })}
        id={title}
        placeholder={title}
        type={type}
        bg="white"
        name={title}
      />
    </InputGroup>
  );
});

export default InputForm;
