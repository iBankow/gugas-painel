import { DeleteIcon, EditIcon, ViewIcon, UnlockIcon } from "@chakra-ui/icons";
import {
  Divider,
  GridItem,
  HStack,
  IconButton,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { IOrder } from "../../../types";

interface OrderCardProps {
  order: IOrder;
  onOpenDelete: (order: IOrder) => void;
  onOpenView: (order: IOrder) => void;
}

interface StatusTagProps {
  status: "paid" | "not_paid";
}

const StatusTag = ({ status }: StatusTagProps) => {
  const typeStatus = {
    paid: { color: "green", label: "PAGO" },
    not_paid: { color: "red", label: "NAO PAGO" },
  };

  return (
    <Tag colorScheme={typeStatus[status].color}>{typeStatus[status].label}</Tag>
  );
};

const OrderCard = ({ order, onOpenDelete, onOpenView }: OrderCardProps) => {
  return (
    <GridItem w="100%" h="100%">
      <Stack
        border="1px"
        p={"2"}
        borderRadius={"md"}
        borderColor={order.status === "paid" ? "green" : "red"}
        divider={<Divider />}
      >
        <HStack justifyContent={"space-between"}>
          <Text fontWeight={"bold"}>Total:</Text>
          <Text>
            {Intl.NumberFormat("pt-Br", {
              style: "currency",
              currency: "BRL",
            }).format(order.subTotal)}
          </Text>
        </HStack>
        <HStack justifyContent={"space-between"}>
          <Text fontWeight={"bold"}>Status:</Text>
          <StatusTag status={order.status} />
        </HStack>
        <HStack justifyContent={"space-between"}>
          <Text fontWeight={"bold"}>Pagamento:</Text>
          <Text>{order.method.method}</Text>
        </HStack>
        <HStack justifyContent={"space-between"}>
          <Text fontWeight={"bold"}>Produtos:</Text>
          <Text>{order.products.length}</Text>
        </HStack>
        <HStack w={"100%"} justifyContent={"space-around"} py={"2"}>
          <IconButton
            w={"100%"}
            aria-label="Edit Order"
            disabled={order.status === "paid"}
            icon={<EditIcon fontSize={18} />}
          />
          <IconButton
            w={"100%"}
            aria-label="View Order"
            icon={<ViewIcon fontSize={18} />}
            onClick={() => {
              onOpenView(order);
            }}
          />
          <IconButton
            w={"100%"}
            aria-label="Delete Order"
            onClick={() => {
              onOpenDelete(order);
            }}
            icon={<DeleteIcon fontSize={18} />}
          />
        </HStack>
      </Stack>
    </GridItem>
  );
};

export { OrderCard };
