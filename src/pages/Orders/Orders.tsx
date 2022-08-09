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
  Spinner,
  Center,
} from "@chakra-ui/react";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/axios";
import { IMeta, IOrder, IPaginate } from "../../types";
import { OrderAlertDialog } from "./components/OrderAlertDialog";
import { OrderCard } from "./components/OrderCard";
import { OrderModal } from "./components/OrderModal";
import Pagination from "@choc-ui/paginator";

const Orders = () => {
  const toast = useToast();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [meta, setMeta] = useState<IMeta>({
    current_page: 1,
    per_page: 10,
  } as IMeta);
  const [order, setOrder] = useState<IOrder | null>(null);
  const [load, setLoad] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  const { isOpen: isOpenDialog, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  useEffect(() => {
    const getOrders = async () => {
      setLoading(false);
      await api
        .get(`/orders/?page=${meta.current_page}&perPage=${meta.per_page}`)
        .then(({ data }: AxiosResponse<IPaginate<IOrder>>) => {
          setOrders(data.data);
          setMeta(data.meta);
        })
        .catch((error: AxiosError) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getOrders();
  }, [load, meta.current_page, meta.per_page]);

  const handleDeleteOrder = async () => {
    await api
      .delete(`/sales/${order?.id}`)
      .then(() => {
        toast({
          title: "Venda deletada com sucesso.",
          status: "success",
          duration: 5000,
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
          duration: 5000,
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
            <option value="paid">Pago</option>
            <option value="not_paid">Nao Pago</option>
          </Select>
          <Button
            leftIcon={<AddIcon />}
            px="8"
            colorScheme={"yellow"}
            as={Link}
            to="new-order"
          >
            Adicionar Venda
          </Button>
        </Stack>
      </Flex>
      <Divider />
      {loading ? (
        <Center h="100%">
          <Spinner size={"xl"} />
        </Center>
      ) : (
        <>
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
          <Flex w="full" py={26} alignItems="center" justifyContent="center">
            <Pagination
              defaultCurrent={1}
              total={meta.total || 10}
              onChange={(currentPage = 0) => {
                setMeta({ ...meta, current_page: currentPage });
              }}
              paginationProps={{ display: "flex" }}
              pageSize={meta.per_page}
            />
          </Flex>
        </>
      )}
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
