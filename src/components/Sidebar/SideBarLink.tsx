import { As, Icon, Link, Text } from "@chakra-ui/react";

import {
  Link as RouterLink,
  useMatch,
  useResolvedPath,
} from "react-router-dom";

interface SideBarLinkProps {
  icon?: As<any> | undefined;
  route: string;
  label: string;
}

const SideBarLink = ({ icon, route, label }: SideBarLinkProps) => {
  let resolved = useResolvedPath(route);
  const match = useMatch({ path: resolved.pathname, end: false });

  return (
    <Link
      display={"flex"}
      alignItems={"center"}
      color={match ? "yellow.300" : ""}
      as={RouterLink}
      to={route ? route : "/"}
    >
      {icon && <Icon as={icon} fontSize={"20"} />}
      <Text ml={"4"} fontWeight={match ? "extrabold" : "medium"}>
        {label}
      </Text>
    </Link>
  );
};

export { SideBarLink };
