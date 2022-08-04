import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  TableCaption,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import format from "date-fns/format";
import ptBr from "date-fns/locale/pt-BR";
import { IOrder } from "../../../types";
import { StatusTag } from "./OrderCard";

interface OrderModalProps {
  order?: IOrder | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderModal = ({ order, isOpen, onClose }: OrderModalProps) => {
  const createdAt = format(new Date(order?.createdAt || 0), "dd/MM/yyyy", {
    locale: ptBr,
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Visualizar Venda</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack divider={<Divider />}>
            <Stack direction="row">
              <Text fontWeight={"bold"}>Status:</Text>
              <StatusTag status={order?.status || "paid"} />
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Stack direction="row">
                <Text fontWeight={"bold"}>Total:</Text>
                <Text>
                  {Intl.NumberFormat("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  }).format(order?.subTotal || 0)}
                </Text>
              </Stack>
              <Stack direction="row">
                <Text fontWeight={"bold"}>Pagamento:</Text>
                <Text>{order?.method.method}</Text>
              </Stack>
            </Stack>
            <Text fontWeight={"bold"}>Produtos:</Text>
            <Stack>
              <Table variant="simple">
                <TableCaption>
                  {Intl.NumberFormat("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  }).format(order?.subTotal || 0)}
                </TableCaption>

                <Thead>
                  <Tr>
                    <Th>Produto</Th>
                    <Th>Preco</Th>
                    <Th textAlign={"center"}>Quantidade</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {order?.products.map((product) => {
                    return (
                      <Tr key={product.id}>
                        <Td>{product.name}</Td>
                        <Td>
                          {Intl.NumberFormat("pt-br", {
                            style: "currency",
                            currency: "BRL",
                          }).format(product?.meta?.pivot_price || 0)}
                        </Td>
                        <Td textAlign={"center"}>
                          {product.meta?.pivot_quantity}
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Text fontWeight={"bold"}>Criado em:</Text>
              <Text>{createdAt}</Text>
            </Stack>
            <Stack direction="row" justifyContent={"space-between"}>
              <Text fontWeight={"bold"}>ID:</Text>
              <Tag>{order?.id}</Tag>
            </Stack>
          </Stack>
        </ModalBody>
        <ModalFooter>
          {/* <Button
            as={Link}
            to={`product/${order?.id}`}
            variant="ghost"
            mr={3}
            colorScheme={"orange"}
          >
            Editar
          </Button> */}
          <Button colorScheme="red" onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { OrderModal };
