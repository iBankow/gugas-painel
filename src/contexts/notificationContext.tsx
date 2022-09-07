import { Flex } from "@chakra-ui/react";
import { createContext, ReactNode, useState } from "react"
import { Card } from "../components/Notification/Card";
import { socket } from "../services/socket";

export const NotificationContext = createContext({});

type NotificationProviderProps = {
    children: ReactNode;
};

interface Notification {
    message: string
    uuid: string
}

export function NotificationProvider({ children }: NotificationProviderProps) {

    const [notifications, setNotifications] = useState<Notification[]>([])

    socket.on('news', (data: any) => {
        console.log(socket)
        const newNotifications = [...notifications, data]
        setNotifications(newNotifications)
    })

    const handleDeleteNotification = (uuid: string) => {
        const notification = notifications.filter(notify => notify.uuid !== uuid)

        setNotifications(notification)
    }

    return (
        <NotificationContext.Provider value={{}}>
            <Flex
                right={5}
                bottom={5}
                position={'fixed'}
                flexDir={'column'}
                zIndex={1000}
                gap={2}
            >
                {notifications.map((notification) => {
                    return (
                        <Card
                            key={notification.uuid}
                            message={notification.message}
                            deleteNotification={() => handleDeleteNotification(notification.uuid)}
                        />
                    )
                })}
            </Flex>
            {children}
        </NotificationContext.Provider>
    );
}