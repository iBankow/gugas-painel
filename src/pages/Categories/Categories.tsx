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
  Stack,
  Divider,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { IoMdCreate } from "react-icons/io";
import { Link } from "react-router-dom";
import { api } from "../../services/axios";
import { ICategory } from "../../types";

const Categories = () => {
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
          justifyContent={"flex-end"}
        >
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
              <Th>Nome</Th>
              <Th textAlign="center">Ativo</Th>
              <Th textAlign="right">Acoes</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories.map((category) => {
              return (
                <Tr key={category.id}>
                  <Td>{category.category}</Td>
                  <Td textAlign="center">
                    {category.isActive ? (
                      <Tag colorScheme={"green"}>SIM</Tag>
                    ) : (
                      <Tag colorScheme={"red"}>NAO</Tag>
                    )}
                  </Td>
                  <Td textAlign="right">
                    <Tooltip label="Editar Categoria">
                      <IconButton
                        as={Link}
                        to={`category/${category.id}`}
                        colorScheme="blue"
                        aria-label="Edit Category"
                        size={"sm"}
                        icon={<IoMdCreate fontSize={16} />}
                      />
                    </Tooltip>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Nome</Th>
              <Th textAlign="center">Ativo</Th>
              <Th textAlign="right">Acoes</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
};

export { Categories };
