import { ChakraProvider } from "@chakra-ui/react";
import { Index } from "./routes/routes";
import theme from "./theme/theme";
import { ColorModeSwitcher } from "./components/ColorModeSwitcher";
import { AuthProvider } from "./contexts/authContext";

export const App = () => (
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <ColorModeSwitcher position={"absolute"} right={4} bottom={4} />
      <Index />
    </AuthProvider>
  </ChakraProvider>
);
