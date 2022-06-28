import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  forwardRef,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import React, { ForwardRefRenderFunction } from "react";
import { Path, UseFormRegister } from "react-hook-form";

interface InputProps extends ChakraInputProps {
  name: Path<any>;
  placeholder: string;
  label?: string;
  register: UseFormRegister<any>;
  required?: boolean;
  errors?: any;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
  label,
  register,
  required = false,
  errors,
  name,
  placeholder,
  ...rest
}: InputProps) => {
  return (
    <FormControl isInvalid={errors.name}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        id={name}
        placeholder={placeholder}
        {...register(name, {
          required: required,
          minLength: { value: 4, message: "Minimum length should be 4" },
        })}
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

export const Input = forwardRef(InputBase);
