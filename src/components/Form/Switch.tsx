import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Switch as ChakraInput,
  SwitchProps as ChakraInputProps,
} from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";

interface InputProps extends ChakraInputProps {
  name: string;
  placeholder?: string;
  label?: string;
  register: UseFormRegister<any>;
  required?: boolean;
  errors: any;
}

const InputBase = ({
  label,
  register,
  required = false,
  errors,
  name,
  placeholder,
  ...rest
}: InputProps) => {
  return (
    <FormControl isInvalid={errors[name]}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        id={name}
        placeholder={placeholder}
        {...register(name)}
        {...rest}
      />
      {errors && (
        <FormErrorMessage>
          {errors[name] && errors[name].message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export const Switch = InputBase;
