import { Text, TextProps } from "@chakra-ui/react";

interface LogoProps extends TextProps {
  name: string;
}

export const Logo = ({ name, ...rest }: LogoProps) => {
  return (
    <Text
      fontWeight={"bold"}
      fontSize={["2xl", "3xl"]}
      textTransform={"uppercase"}
      letterSpacing="tight"
      {...rest}
    >
      {name}
    </Text>
  );
};
