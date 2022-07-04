import { Box, Icon, Link, Stack, Text } from "@chakra-ui/react";
import { RiDashboardLine } from "react-icons/ri";
import { SideBarLink } from "./SideBarLink";

const SidebarNav = () => {
  return (
    <Stack spacing={"12"} align={"self-start"}>
      <Box>
        <Text fontWeight={"bold"} color={"gray.400"} fontSize={"small"}>
          CADASTROS
        </Text>
        <Stack spacing={"4"} mt={"8"} align={"stretch"}>
          <SideBarLink
            icon={RiDashboardLine}
            route="/products"
            label="Produtos"
          />
          <SideBarLink
            icon={RiDashboardLine}
            route="/categories"
            label="Categorias"
          />
          <SideBarLink
            icon={RiDashboardLine}
            route="/methods"
            label="Métodos"
          />
          <SideBarLink icon={RiDashboardLine} route="/orders" label="Vendas" />
        </Stack>
      </Box>
      <Box>
        <Text fontWeight={"bold"} color={"gray.400"} fontSize={"small"}>
          RELATORIOS
        </Text>
        <Stack spacing={"4"} mt={"8"} align={"stretch"}>
          <Link display={"flex"} alignItems={"center"}>
            <Icon as={RiDashboardLine} fontSize={"20"} />
            <Text ml={"4"} fontWeight="medium">
              Vendas
            </Text>
          </Link>
          <Link display={"flex"} alignItems={"center"}>
            <Icon as={RiDashboardLine} fontSize={"20"} />
            <Text ml={"4"} fontWeight="medium">
              Dispesas
            </Text>
          </Link>
        </Stack>
      </Box>
    </Stack>
  );
};

export { SidebarNav };
