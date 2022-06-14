import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    gray: {
      50: "#f2f2f3",
      100: "#d7d7d7",
      200: "#bdbdbd",
      300: "#a2a2a2",
      400: "#878789",
      500: "#6e6e70",
      600: "#565656",
      700: "#3d3d3d",
      800: "#242424",
      900: "#0c0c0d",
    },
    cyan: {
      50: "#dafbff",
      100: "#aeefff",
      200: "#80e2fd",
      300: "#51d6fb",
      400: "#29cbf8",
      500: "#18b1df",
      600: "#048aae",
      700: "#00627d",
      800: "#003c4e",
      900: "#00161e",
    },
    yellow: {
      50: "#fff6dd",
      100: "#fbe3b3",
      200: "#f6d187",
      300: "#f1bf59",
      400: "#edac2c",
      500: "#d39312",
      600: "#a4720b",
      700: "#765105",
      800: "#473100",
      900: "#1b0f00",
    },
    transparent: {
      50: "#00000005",
      100: "#00000010",
      200: "#00000020",
      300: "#00000030",
      400: "#00000040",
      500: "#00000050",
      600: "#00000060",
      700: "#00000070",
      800: "#00000080",
      900: "#00000090",
    },
  },
});

export default theme;
