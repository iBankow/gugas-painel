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
  useBreakpointValue,
  Box,
  Flex,
  Input,
  Stack,
  Divider,
} from "@chakra-ui/react";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/axios";
import { ICategory } from "../../types";

const Categories = () => {
  const variant = useBreakpointValue({ base: false, md: true });

  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    await api
      .get(`/categories`)
      .then(({ data }: AxiosResponse<ICategory[]>) => {
        setCategories(data);
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
          <Button
            leftIcon={<AddIcon />}
            px="8"
            colorScheme={"yellow"}
            as={Link}
            to="category"
          >
            Adicionar Categoria
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
              <Th>Ativo</Th>
              <Th>Acoes</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories.map((category) => {
              return (
                <Tr key={category.id}>
                  {variant && <Td>{category.id}</Td>}
                  <Td>{category.category}</Td>
                  <Td>
                    {category.isActive ? (
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
              <Th>Ativo</Th>
              <Th>Acoes</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
};

export { Categories };
