import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  forwardRef,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import { ForwardRefRenderFunction } from "react";
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
  return (
    <FormControl isInvalid={errors[name]}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        id={name}
        placeholder={placeholder}
        {...register(name, {
          required: required,
        })}
        {...rest}
        ref={ref}
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
