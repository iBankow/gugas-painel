import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme";
import { ColorModeSwitcher } from "./components/ColorModeSwitcher";
import { AuthProvider } from "./contexts/authContext";
import { SidebarDrawerProvider } from "./contexts/sidebarDrawerContext";
import { AppRoutes } from "./routes/app.routes";
import { NotificationProvider } from "./contexts/notificationContext";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <SidebarDrawerProvider>
          <ColorModeSwitcher position={"fixed"} right={4} bottom={4} />
          <NotificationProvider>
            <AppRoutes />
          </NotificationProvider>
        </SidebarDrawerProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};
