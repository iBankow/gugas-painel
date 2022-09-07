import { CloseIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Text, useColorMode } from "@chakra-ui/react"
import { motion } from "framer-motion"

interface CardProps {
    message?: string
    deleteNotification: () => void
}

const Card = ({ message, deleteNotification }: CardProps) => {
    const { colorMode } = useColorMode();
    return (
        <motion.div
            layout
            className="chakra-toast"
            initial="initial"
            whileHover={{ scale: 1.1 }}
            animate="animate"
            exit="exit"
        >
            <Box
                display={'box'}
                bg={colorMode === 'dark' ? "gray.900" : 'gray.200'}
                padding={5}
                borderRadius={10}
                zIndex={1000}
                w={'xs'}
            >
                <Flex alignItems={'center'} justifyContent={'space-between'}>
                    <Text fontWeight={'thin'}>Notificação!</Text>
                    <IconButton aria-label="Close" size={'sm'} icon={<CloseIcon />} onClick={deleteNotification} />
                </Flex>
                <Text fontWeight={'bold'}>{message}</Text>
            </Box>
        </motion.div>
    )
}
export { Card }