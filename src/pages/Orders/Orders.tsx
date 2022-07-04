import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Box,
  Flex,
  Stack,
  Divider,
  Grid,
  useDisclosure,
  useToast,
  Select,
} from "@chakra-ui/react";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/axios";
import { IOrder, IPaginate } from "../../types";
import { OrderAlertDialog } from "./components/OrderAlertDialog";
import { OrderCard } from "./components/OrderCard";
import { OrderModal } from "./components/OrderMotal";

const Orders = () => {
  const toast = useToast();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [order, setOrder] = useState<IOrder | null>(null);
  const [load, setLoad] = useState<boolean>(false);

  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  const { isOpen: isOpenDialog, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  useEffect(() => {
    getOrders();
  }, [load]);

  const handleDeleteOrder = async () => {
    await api
      .delete(`/sales/${order?.id}`)
      .then(() => {
        toast({
          title: "Venda deletada com sucesso.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        handleCloseDialog();
        setLoad(!load);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        toast({
          title: "Algo de errado ocorreu.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const handleOpenDialog = (order: IOrder) => {
    setOrder(order);
    onOpen();
  };

  const handleOpenModal = (order: IOrder) => {
    setOrder(order);
    onOpenModal();
  };

  const handleCloseDialog = () => {
    setOrder(null);
    onClose();
  };

  const handleCloseModal = () => {
    setOrder(null);
    onCloseModal();
  };

  const getOrders = async () => {
    await api
      .get(`/orders/?perPage`)
      .then(({ data }: AxiosResponse<IPaginate<IOrder>>) => {
        setOrders(data.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  return (
    <Box w={"100%"} as={Stack} spacing={"8"}>
      <Flex>
        <Stack
          direction={["column", "row"]}
          spacing={"4"}
          w="100%"
          justifyContent={"space-between"}
        >
          <Select placeholder="Filtrar Vendas" w={["100%", "300px"]}>
            <option value="paid">PAGO</option>
            <option value="not_paid">NAO PAGO</option>
          </Select>
          <Button
            leftIcon={<AddIcon />}
            px="8"
            colorScheme={"yellow"}
            as={Link}
            to="order"
          >
            Adicionar Venda
          </Button>
        </Stack>
      </Flex>
      <Divider />
      <Grid
        templateColumns={[
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          "repeat(4, 1fr)",
          "repeat(5, 1fr)",
        ]}
        gap={6}
      >
        {orders.map((order) => {
          return (
            <OrderCard
              order={order}
              key={order.id}
              onOpenDelete={handleOpenDialog}
              onOpenView={handleOpenModal}
            />
          );
        })}
      </Grid>
      <OrderAlertDialog
        onClose={handleCloseDialog}
        onDelete={handleDeleteOrder}
        cancelRef={cancelRef}
        isOpen={isOpenDialog}
      />
      <OrderModal
        order={order}
        onClose={handleCloseModal}
        isOpen={isOpenModal}
      />
    </Box>
  );
};

export { Orders };
