import { Text } from "@chakra-ui/react";

interface LogoProps {
  name: string;
}

export const Logo = ({ name }: LogoProps) => {
  return (
    <Text
      fontSize={"xxx-large"}
      fontWeight={"bold"}
      textTransform={"uppercase"}
    >
      {name}
    </Text>
  );
};
