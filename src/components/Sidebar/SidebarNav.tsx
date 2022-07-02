import { Box, Icon, Link, Stack, Text } from "@chakra-ui/react";
import { RiDashboardLine } from "react-icons/ri";
import { Link as RouterLink } from "react-router-dom";

const SidebarNav = () => {
  return (
    <Stack spacing={"12"} align={"self-start"}>
      <Box>
        <Text fontWeight={"bold"} color={"gray.400"} fontSize={"small"}>
          GERAL
        </Text>
        <Stack spacing={"4"} mt={"8"} align={"stretch"}>
          <Link
            display={"flex"}
            alignItems={"cente"}
            color={"yellow.300"}
            as={RouterLink}
            to="/products"
          >
            <Icon as={RiDashboardLine} fontSize={"20"} />
            <Text ml={"4"} fontWeight="medium">
              Produtos
            </Text>
          </Link>
          <Link
            display={"flex"}
            alignItems={"cente"}
            as={RouterLink}
            to="/categories"
          >
            <Icon as={RiDashboardLine} fontSize={"20"} />
            <Text ml={"4"} fontWeight="medium">
              Categorias
            </Text>
          </Link>
          <Link
            display={"flex"}
            alignItems={"cente"}
            as={RouterLink}
            to="/orders"
          >
            <Icon as={RiDashboardLine} fontSize={"20"} />
            <Text ml={"4"} fontWeight="medium">
              Vendas
            </Text>
          </Link>
        </Stack>
      </Box>
      <Box>
        <Text fontWeight={"bold"} color={"gray.400"} fontSize={"small"}>
          RELATORIOS
        </Text>
        <Stack spacing={"4"} mt={"8"} align={"stretch"}>
          <Link display={"flex"} alignItems={"cente"}>
            <Icon as={RiDashboardLine} fontSize={"20"} />
            <Text ml={"4"} fontWeight="medium">
              Vendas
            </Text>
          </Link>
          <Link display={"flex"} alignItems={"cente"}>
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
