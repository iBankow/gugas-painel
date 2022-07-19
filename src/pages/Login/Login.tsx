import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  useColorMode,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Logo } from "../../components/Logo";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../contexts/authContext";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const { signIn } = useAuth();
  const { colorMode } = useColorMode();
  const toast = useToast();
  const [handleShowPassword, setHandleShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await signIn(data)
      .then(() => {
        toast({
          title: "Login Realizado!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Algo inesperado aconteceu!",
          description: "Tente novamente em alguns instantes",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        console.log(error.message);
      });
  };

  return (
    <Box
      textAlign="center"
      fontSize="xl"
      bgGradient={
        colorMode === "dark"
          ? "linear(to-r, gray.700, yellow.600)"
          : "linear(to-r, yellow.200, gray.200)"
      }
    >
      <Center minH="100vh" p={3}>
        <VStack
          spacing={8}
          backgroundColor={colorMode === "dark" ? "gray.800" : "gray.100"}
          p={8}
          borderRadius={20}
          minW={"360px"}
          shadow={"xl"}
          as="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Logo name={"Gugas"} />
          <Divider />
          <Stack spacing={4} w={"100%"}>
            <FormControl isInvalid={Boolean(errors.email)}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<EmailIcon color="gray.300" />}
                />
                <Input
                  {...register("email", {
                    required: "Email obrigatorio!",
                  })}
                  placeholder={"Email"}
                  type={"email"}
                />
              </InputGroup>
              <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.password)}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<LockIcon color="gray.300" />}
                />
                <InputRightElement
                  zIndex={1000}
                  as={"button"}
                  borderLeft={"solid"}
                  alignSelf={"center"}
                  borderColor={"inherit"}
                  borderLeftWidth={"1px"}
                  onClick={() => {
                    setHandleShowPassword(!handleShowPassword);
                  }}
                  children={
                    <Icon
                      as={!handleShowPassword ? IoMdEye : IoMdEyeOff}
                      color="gray.300"
                    />
                  }
                />
                <Input
                  {...register("password", { required: "Senha obrigatoria!" })}
                  placeholder={"Password"}
                  type={!handleShowPassword ? "password" : "text"}
                />
              </InputGroup>
              <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
            </FormControl>
          </Stack>
          <Button
            width={"100%"}
            type={"submit"}
            colorScheme="green"
            rightIcon={<ArrowForwardIcon />}
            variant="solid"
          >
            Login
          </Button>
        </VStack>
      </Center>
    </Box>
  );
};

export { Login };
