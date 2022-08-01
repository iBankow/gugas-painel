import { Box, Icon, Link, Stack, Text } from "@chakra-ui/react";
import { IoIosApps, IoIosListBox, IoIosPricetags, IoMdCash } from "react-icons/io";
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
          <SideBarLink icon={IoIosListBox} route="/products" label="Produtos" />
          <SideBarLink
            icon={IoIosPricetags}
            route="/categories"
            label="Categorias"
          />
          <SideBarLink icon={IoMdCash} route="/methods" label="Métodos" />
          <SideBarLink icon={IoIosApps} route="/orders" label="Vendas" />
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
