import { createContext, ReactNode, useContext, useState } from "react";
import { socket } from "../services/socket";

type NotificationContextData = {
  notification: boolean;
};

export const NotificationContext = createContext({} as NotificationContextData);

type NotificationProviderProps = {
  children: ReactNode;
};

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notification, setNotification] = useState(false);

  socket.on("news", () => {
    setNotification(!notification);
  });

  return (
    <NotificationContext.Provider value={{ notification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => {
  return useContext(NotificationContext);
};
