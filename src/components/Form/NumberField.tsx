import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  forwardRef,
  NumberInput as ChakraInput,
  NumberInputProps as ChakraInputProps,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
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
      <ChakraInput min={1} defaultValue={1} ref={ref}>
        <NumberInputField {...register(name)} placeholder={placeholder} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </ChakraInput>
      {errors && (
        <FormErrorMessage>
          {errors[name] && errors[name].message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export const NumberInput = forwardRef(InputBase);
