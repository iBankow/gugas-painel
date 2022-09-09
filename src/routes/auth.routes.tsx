import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { useToast } from "@chakra-ui/react";
import { socket } from "../services/socket";

interface Notification {
  message: string;
  uuid: string;
}

const AuthRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const toast = useToast();
  socket.on("news", (data: Notification) => {
    if (isAuthenticated) {
      toast({
        title: "Notificação!",
        description: data.message,
        position: "bottom-right",
        variant: "left-accent",
        status: "info",
        isClosable: true,
        id: data.uuid,
      });
    }
  });

  return isAuthenticated === true ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};

export { AuthRoute };
