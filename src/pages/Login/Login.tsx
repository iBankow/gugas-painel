import {
  Box,
  Button,
  Center,
  Divider,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Logo } from "../../components/Logo";
import { IoMdEye } from "react-icons/io";
import { useState } from "react";

const Login = () => {
  const { colorMode } = useColorMode();
  const [handleShowPassword, setHandleShowPassword] = useState(false);

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
        >
          <Logo name={"Gugas"} />
          <Divider />
          <Box w={"100%"}>
            <InputGroup marginBottom={"4"}>
              <InputLeftElement
                pointerEvents="none"
                children={<EmailIcon color="gray.300" />}
              />
              <Input placeholder={"Email"} type={"email"} />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<LockIcon color="gray.300" />}
              />
              <InputRightElement
                zIndex={1000}
                as={"button"}
                onClick={() => {
                  setHandleShowPassword(!handleShowPassword);
                }}
                children={<Icon as={IoMdEye} color="gray.300" />}
              />
              <Input
                placeholder={"Password"}
                type={!handleShowPassword ? "password" : "text"}
              />
            </InputGroup>
          </Box>
          <Button
            width={"100%"}
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
