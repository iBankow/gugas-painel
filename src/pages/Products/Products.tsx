import { AddIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Tag,
  useBreakpointValue,
  Box,
  Flex,
  Input,
  Stack,
  Divider,
} from "@chakra-ui/react";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { api } from "../../services/axios";
import { IMeta, IPaginate, IProduct } from "../../types";

const Products = () => {
  const variant = useBreakpointValue({ base: false, md: true });

  const [products, setProducts] = useState<IProduct[]>([]);
  const [meta, setMeta] = useState<IMeta>({
    current_page: 1,
    per_page: 10,
  } as IMeta);

  useEffect(() => {
    getProducts();
  }, []);

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
          <Button leftIcon={<AddIcon />} px="8" colorScheme={"yellow"}>
            Adicionar Produto
          </Button>
        </Stack>
      </Flex>
      <Divider />
      <TableContainer w="100%">
        <Table variant="striped" size={"lg"}>
          <Thead>
            <Tr>
              {variant && <Th>ID</Th>}
              <Th>Nome</Th>
              <Th>Categoria</Th>
              <Th>Ativo</Th>
              <Th>Acoes</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product) => {
              return (
                <Tr key={product.id}>
                  {variant && <Td>{product.id}</Td>}
                  <Td>{product.name}</Td>
                  <Td>{product.category?.category || "--"}</Td>
                  <Td>
                    {product.isActive ? (
                      <Tag colorScheme={"green"}>SIM</Tag>
                    ) : (
                      <Tag colorScheme={"red"}>NAO</Tag>
                    )}
                  </Td>
                  <Td>
                    <Button colorScheme={"yellow"} size="sm">
                      Editar
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              {variant && <Th>ID</Th>}
              <Th>Nome</Th>
              <Th>Categoria</Th>
              <Th>Ativo</Th>
              <Th>Acoes</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
};

export { Products };
