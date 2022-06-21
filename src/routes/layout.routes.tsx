import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

const Layout = () => {
  return (
    <Flex direction={"column"} h="100vh">
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />
        <Outlet />
      </Flex>
    </Flex>
  );
};

export { Layout };
