import { ChakraProvider } from "@chakra-ui/react";
// import { Index } from "./routes/routes";
import theme from "./theme/theme";
import { ColorModeSwitcher } from "./components/ColorModeSwitcher";
import { AuthProvider } from "./contexts/authContext";
import { SidebarDrawerProvider } from "./contexts/sidebarDrawerContext";
import { AppRoutes } from "./routes/app.routes";

export const App = () => (
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <SidebarDrawerProvider>
        <ColorModeSwitcher position={"fixed"} right={4} bottom={4} />
        <AppRoutes />
      </SidebarDrawerProvider>
    </AuthProvider>
  </ChakraProvider>
);
