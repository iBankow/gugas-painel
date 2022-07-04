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
} from "@chakra-ui/react";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/axios";
import { IPaymentMethod } from "../../types";

const Methods = () => {
  const [methods, setMethods] = useState<IPaymentMethod[]>([]);

  useEffect(() => {
    getMethods();
  }, []);

  const getMethods = async () => {
    await api
      .get(`/methods`)
      .then(({ data }: AxiosResponse<IPaymentMethod[]>) => {
        setMethods(data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  return (
    <Box w={"100%"} as={Stack} spacing={"8"}>
      <Flex justifyContent={"end"}>
        <Button
          leftIcon={<AddIcon />}
          px="8"
          colorScheme={"yellow"}
          as={Link}
          to="method"
        >
          Adicionar Método
        </Button>
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
            {methods.map((method) => {
              return (
                <Tr key={method.id}>
                  <Td>{method.method}</Td>
                  <Td textAlign="center">
                    {method.isActive ? (
                      <Tag colorScheme={"green"}>SIM</Tag>
                    ) : (
                      <Tag colorScheme={"red"}>NAO</Tag>
                    )}
                  </Td>
                  <Td textAlign="right">
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

export { Methods };
