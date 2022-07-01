import {
  Box,
  Flex,
  Icon,
  Stack,
  Text,
  Avatar,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  MenuDivider,
  useBreakpointValue,
  IconButton,
} from "@chakra-ui/react";
import { Logo } from "../Logo";
import { RiMenuLine, RiNotificationLine, RiUserLine } from "react-icons/ri";
import { useAuth } from "../../contexts/authContext";
import { useSidebarDrawer } from "../../contexts/sidebarDrawerContext";

const Header = () => {
  const { onOpen } = useSidebarDrawer();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { user, logout } = useAuth();

  return (
    <Flex
      as={"header"}
      w={"100%"}
      maxW={1480}
      h={"20"}
      mx={"auto"}
      mt={"6"}
      px={"6"}
      align={"center"}
    >
      {!isWideVersion && (
        <IconButton
          aria-label="menu"
          variant={"unstyled"}
          fontSize={"24"}
          icon={<Icon as={RiMenuLine} />}
          onClick={onOpen}
          mr={"2"}
        />
      )}

      <Logo name="gugas" fontSize={"3xl"} align={"center"} />

      <Flex align={"center"} ml={"auto"}>
        <Stack
          spacing={["6", "8"]}
          direction="row"
          mx={["6", "8"]}
          pr={["6", "8"]}
          py={"1"}
          color={"gray.300"}
          borderRightWidth={1}
          borderRightColor={"gray.700"}
        >
          <Icon as={RiNotificationLine} />
          <Icon as={RiUserLine} />
        </Stack>

        <Flex>
          <Box mr={"4"} textAlign={"right"}>
            {isWideVersion && (
              <>
                <Text>{user?.name}</Text>
                <Text color={"gray.300"} fontSize={"small"}>
                  {user?.email}
                </Text>
              </>
            )}
          </Box>

          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar size={"md"} name={user?.name} src={user?.image} />
            </MenuButton>
            <MenuList>
              <MenuItem>Minha Conta</MenuItem>
              <MenuItem>Favoritos</MenuItem>
              <MenuDivider />
              <MenuItem color="red.400" onClick={logout}>
                Deslogar
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Flex>
  );
};

export { Header };
