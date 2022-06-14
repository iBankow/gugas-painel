import { ChakraProvider } from "@chakra-ui/react";
import { Index } from "./routes/rotues";
import theme from "./theme/theme";
import { ColorModeSwitcher } from "./components/ColorModeSwitcher";

export const App = () => (
  <ChakraProvider theme={theme}>
    <ColorModeSwitcher position={"absolute"} right={4} bottom={4} />
    <Index />
  </ChakraProvider>
);
