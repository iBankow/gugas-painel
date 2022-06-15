import { Box, Center, Spinner, useColorMode } from "@chakra-ui/react";

const Loading = () => {
  const { colorMode } = useColorMode();

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
        <Spinner size={"xl"} />
      </Center>
    </Box>
  );
};

export { Loading };
