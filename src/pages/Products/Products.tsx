import { AddIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Tag,
  Box,
  Flex,
  Input,
  Stack,
  Divider,
  IconButton,
  Tooltip,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/axios";
import { IMeta, IPaginate, IProduct } from "../../types";
import { IoMdCreate, IoMdEye } from "react-icons/io";
import { ProductModal } from "./components/ProductModal";
import Pagination from "@choc-ui/paginator";

const Products = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [meta, setMeta] = useState<IMeta>({
    current_page: 1,
    per_page: 10,
  } as IMeta);

  useEffect(() => {
    const getProducts = async () => {
      await api
        .get(`/products/?page=${meta.current_page}&perPage=${meta.per_page}`)
        .then(({ data }: AxiosResponse<IPaginate<IProduct>>) => {
          setProducts(data.data);
          setMeta(data.meta);
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    };
    getProducts();
  }, [meta.current_page, meta.per_page]);

  return (
    <Box w={"100%"} as={Stack} spacing={"8"}>
      <Flex>
        <Stack
          direction={["column", "row"]}
          spacing={"4"}
          w="100%"
          justifyContent={"space-between"}
        >
          <Input placeholder="Pesquisar Produto" w={["100%", "300px"]} />
          <Button
            leftIcon={<AddIcon />}
            px="8"
            colorScheme={"yellow"}
            as={Link}
            to="new-product"
          >
            Adicionar Produto
          </Button>
        </Stack>
      </Flex>
      <Divider />
      <TableContainer w="100%">
        <Table variant="striped" size={"lg"}>
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Categoria</Th>
              <Th>Estoque</Th>
              <Th>Preco</Th>
              <Th>Ativo</Th>
              <Th>Acoes</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product) => {
              return (
                <Tr key={product.id}>
                  <Td>{product.name}</Td>
                  <Td>
                    {(
                      <Tag colorScheme={"yellow"}>
                        {product.category?.category.toUpperCase()}
                      </Tag>
                    ) || "--"}
                  </Td>
                  <Td>
                    <Text color={product.stock.quantity < 10 ? "red.500" : ""}>
                      {product.stock.quantity || "--"}
                    </Text>
                  </Td>
                  <Td>
                    {Intl.NumberFormat("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    }).format(product.price.price) || "--"}
                  </Td>
                  <Td>
                    {product.isActive ? (
                      <Tag colorScheme={"green"}>SIM</Tag>
                    ) : (
                      <Tag colorScheme={"red"}>NAO</Tag>
                    )}
                  </Td>
                  <Td>
                    <Stack spacing={"2"} direction={"row"} align={"center"}>
                      <Tooltip label="Editar Produto">
                        <IconButton
                          as={Link}
                          to={`/products/${product.id}`}
                          colorScheme="blue"
                          aria-label="Edit product"
                          size={"sm"}
                          icon={<IoMdCreate fontSize={16} />}
                        />
                      </Tooltip>
                      <Tooltip label="Visualizar Produto">
                        <IconButton
                          colorScheme="orange"
                          aria-label="View product"
                          size={"sm"}
                          onClick={() => {
                            setProduct(product);
                            onOpen();
                          }}
                          icon={<IoMdEye fontSize={16} />}
                        />
                      </Tooltip>
                    </Stack>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Nome</Th>
              <Th>Categoria</Th>
              <Th>Estoque</Th>
              <Th>Preco</Th>
              <Th>Ativo</Th>
              <Th>Acoes</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
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
      {product && (
        <ProductModal isOpen={isOpen} onClose={onClose} product={product} />
      )}
    </Box>
  );
};

export { Products };
