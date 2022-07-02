import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { RefObject } from "react";

interface OrderAlertDialogProps {
  onClose: () => void;
  onDelete: () => Promise<void>;
  isOpen: boolean;
  cancelRef: RefObject<any>;
}

const OrderAlertDialog = ({
  onClose,
  onDelete,
  isOpen,
  cancelRef,
}: OrderAlertDialogProps) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      motionPreset="slideInBottom"
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="bold"
            alignItems={"center"}
          >
            Deletar Venda
          </AlertDialogHeader>

          <AlertDialogBody>
            Tem certeza? Você não poderá desfazer essa ação depois.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={onDelete} ml={3}>
              Deletar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export { OrderAlertDialog };
