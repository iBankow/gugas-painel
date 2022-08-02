import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  forwardRef,
  InputGroup,
  InputLeftElement,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import React, { ForwardRefRenderFunction, useCallback } from "react";
import { UseFormRegister } from "react-hook-form";

interface InputProps extends ChakraInputProps {
  name: string;
  placeholder?: string;
  label?: string;
  register: UseFormRegister<any>;
  required?: boolean;
  errors: any;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    label,
    register,
    required = false,
    errors,
    name,
    placeholder,
    ...rest
  }: InputProps,
  ref
) => {
  const handleKeyUp = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    value = value.replaceAll(",", "");
    value = value.replaceAll(".", "");
    const options = { minimumFractionDigits: 2 };
    e.currentTarget.value = new Intl.NumberFormat("pt-BR", options).format(
      Number(value) / 100
    );
  }, []);

  return (
    <FormControl isInvalid={errors[name]} ref={ref}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
          children="R$"
        />
        <ChakraInput
          id={name}
          placeholder={placeholder}
          onKeyUp={handleKeyUp}
          {...register(name, {
            required: required,
          })}
          {...rest}
        />
      </InputGroup>

      {errors && (
        <FormErrorMessage>
          {errors[name] && errors[name].message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export const InputMask = forwardRef(InputBase);
