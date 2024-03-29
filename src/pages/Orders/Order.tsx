import { AddIcon, ChevronRightIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Select,
  Stack,
  Text,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  IconButton,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { AxiosError, AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "../../components/Form/Input";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/axios";
import { IOrder, IPaymentMethod, IProduct } from "../../types";
import { socket } from "../../services/socket";

interface IError {
  message: string;
}

interface IResponseError {
  errors: IError[];
}

interface Product {
  quantity: number;
  productId: string;
  price?: number;
}

type ItemsFormProps = {
  items: Product[];
  subTotal: number;
  methodId: string;
  status: string;
};

const Order = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId } = useParams();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [methods, setMethods] = useState<IPaymentMethod[]>([]);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [load, setLoad] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ItemsFormProps>();

  const { fields, append, remove } = useFieldArray<ItemsFormProps>({
    control,
    name: "items",
  });

  const onSubmit = async (value: any) => {
    if (orderId) {
      await api
        .put(`/sales/${orderId}`, value)
        .then(({ data }: AxiosResponse<IOrder>) => {
          toast({
            title: "Venda atualizada com sucesso.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          socket.emit("order:update", data);
          navigate("/orders");
        })
        .catch(({ response }: AxiosError<IResponseError>) => {
          if (response?.data.errors) {
            response?.data.errors.forEach((error) => {
              toast({
                title: "Erro de Estoque",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            });
          } else {
            toast({
              title: "Algo de errado ocorreu.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
          console.log(response?.data.errors);
        });
    } else {
      await api
        .post("/sales", value)
        .then(({ data }: AxiosResponse<IOrder>) => {
          toast({
            title: "Venda cadastrada com sucesso.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          navigate("/orders");
          socket.emit("order:new", data);
        })
        .catch(({ response }: AxiosError<IResponseError>) => {
          if (response?.data.errors) {
            response?.data.errors.forEach((error) => {
              toast({
                title: "Erro de Estoque",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            });
          } else {
            toast({
              title: "Algo de errado ocorreu.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
          console.log(response?.data.errors);
        });
    }
  };

  useEffect(() => {
    getProducts();
    getMethods();
  }, []);

  const getOrder = useCallback(async () => {
    await api
      .get(`/orders/${orderId}`)
      .then(({ data }: AxiosResponse<IOrder>) => {
        const order = {
          status: data.status,
          methodId: data.methodId,
          items: data.products.map((product) => {
            return {
              price: product.meta?.pivot_price,
              productId: product.id,
              quantity: product.meta?.pivot_quantity,
            };
          }),
        };
        console.log(data);
        setSubTotal(data.subTotal);
        reset(order);
      })
      .catch(() => {
        navigate("/orders/new-order", {
          replace: true,
          state: { path: location.pathname },
        });
      });
  }, [orderId, reset, navigate, location.pathname]);

  useEffect(() => {
    if (orderId) {
      getOrder();
    }
  }, [getOrder, orderId]);

  const calculateSubtotal = useCallback(() => {
    const values = getValues();
    var prevSubTotal: number = 0;
    values?.items?.forEach((field, index) => {
      if (field.productId) {
        const product = products.find((item) => {
          if (item.id === field.productId) {
            setValue(`items.${index}.price`, item?.price?.price || 0);
          }
          return item.id === field.productId;
        });
        prevSubTotal +=
          Number(product?.price.price || 0) * Number(field.quantity || 0);
      }
    });
    setSubTotal(prevSubTotal);
    setValue("subTotal", +prevSubTotal);
  }, [getValues, products, setValue]);

  useEffect(() => {
    calculateSubtotal();
  }, [fields, load, calculateSubtotal]);

  const getProducts = async () => {
    await api
      .get(`/products/select/all`)
      .then(({ data }: AxiosResponse<IProduct[]>) => {
        setProducts(data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

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
    <Box w={"100%"}>
      <Stack marginBottom={"8"}>
        <Heading>{!!orderId ? "Editar" : "Criar"} Venda</Heading>
        <Breadcrumb
          spacing="8px"
          separator={<ChevronRightIcon color="gray.500" />}
        >
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/orders">
              Vendas
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage={true}>
            <BreadcrumbLink
              as={Link}
              to={`/orders/${orderId ? orderId : "new-order"}`}
            >
              Venda
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Stack>
      <Divider />
      <Box as={"form"} onSubmit={handleSubmit(onSubmit)} marginTop={"8"}>
        <Stack spacing={"4"}>
          <Input
            name="methodId"
            as={Select}
            label="Método"
            placeholder="Método de Pagamento"
            register={register}
            errors={errors}
            required
          >
            {methods.map((method) => {
              return (
                <option key={method.id} value={method.id}>
                  {method.method}
                </option>
              );
            })}
          </Input>
          <Input
            as={Select}
            name="status"
            label="Status"
            placeholder="Status de Pagamento"
            register={register}
            errors={errors}
            required
          >
            <option value={"paid"}>Pago</option>
            <option value={"not_paid"}>Nao Pago</option>
          </Input>
          {fields.map(({ id }, index) => {
            return (
              <Stack key={id} direction={"row"} spacing={"4"} w="100%">
                <Select
                  {...register(`items.${index}.productId`)}
                  placeholder="Produto"
                  required
                  disabled={!!orderId}
                  colorScheme={"red"}
                  onChange={(e) => {
                    setValue(`items.${index}.productId`, e.target.value);
                    setSelectedProducts(
                      getValues("items").map((item) => item.productId)
                    );
                    setLoad(!load);
                  }}
                >
                  {products.map((product) => {
                    return (
                      <option
                        key={product.id}
                        value={product.id}
                        disabled={selectedProducts.includes(product.id)}
                      >
                        {product.name}
                      </option>
                    );
                  })}
                </Select>
                <NumberInput
                  min={1}
                  defaultValue={1}
                  onChange={(e) => {
                    setValue(`items.${index}.quantity`, +e);
                    setLoad(!load);
                  }}
                >
                  <NumberInputField
                    {...register(`items.${index}.quantity`)}
                    placeholder="Quantidade"
                    disabled={!!orderId}
                  />

                  <NumberInputStepper display={!!orderId ? "none" : "flex"}>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <IconButton
                  colorScheme="red"
                  aria-label="View product"
                  disabled={!!orderId}
                  size={"md"}
                  onClick={() => remove(index)}
                  icon={<DeleteIcon fontSize={18} />}
                />
              </Stack>
            );
          })}
          <Button
            type="button"
            disabled={!!orderId}
            onClick={() => {
              append({});
            }}
            colorScheme={"blue"}
            leftIcon={<AddIcon />}
          >
            Adicionar Produto
          </Button>
        </Stack>
        <Divider marginY={"8"} />
        <Flex w={"100%"} justifyContent="space-between" align={"center"}>
          <Text fontSize={"4xl"} fontWeight="bold" mr={"8"}>
            Subtotal:
          </Text>
          <Box
            fontSize={"4xl"}
            fontWeight="bold"
            textAlign={"end"}
            border="1px"
            borderRadius={"md"}
            borderColor={"gray.600"}
            px="2"
            w={"100%"}
          >
            {Intl.NumberFormat("pt-br", {
              style: "currency",
              currency: "BRL",
            }).format(subTotal)}
          </Box>
        </Flex>
        <Button type="submit" w={"full"} marginTop={"8"} colorScheme={"green"}>
          Salvar
        </Button>
      </Box>
    </Box>
  );
};

export { Order };
