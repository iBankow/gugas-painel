import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Divider,
  Heading,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Input } from "../../components/Form/Input";
import { InputMask } from "../../components/Form/InputMask";
import { NumberInput } from "../../components/Form/NumberField";
import { Switch } from "../../components/Form/Switch";
import { api } from "../../services/axios";
import { ICategory, IProduct } from "../../types";

interface ProductForm {
  name: string;
  description?: string;
  price: string;
  quantity: number;
  categoryId: string;
  isActive: boolean;
}

const Product = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const { productId } = useParams();

  const [categories, setCategories] = useState<ICategory[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ProductForm>();

  useEffect(() => {
    if (productId) {
      const getData = async () => {
        await api
          .get(`/products/${productId}`)
          .then(({ data }: AxiosResponse<IProduct>) => {
            const product = {
              name: data.name,
              categoryId: data.categoryId,
              description: data.description,
              isActive: data.isActive,
              price: new Intl.NumberFormat("pt-BR", {
                minimumFractionDigits: 2,
              }).format(Number(data.price.price)),
              quantity: data.stock.quantity,
            };
            reset(product);
          })
          .catch((error: AxiosError) => {
            console.log(error);
          });
      };
      getData();
    }
    getCategories();
  }, [productId, reset]);

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

  const onSubmit = async (value: ProductForm) => {
    const productValue = String(value.price)
      .replaceAll(",", "")
      .replaceAll(".", "");
    if (productId) {
      await api
        .put(`/products/${productId}`, { ...value, price: +productValue / 100 })
        .then(() => {
          toast({
            title: "Produto atualizado com sucesso.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          navigate("/products");
        })
        .catch((error: AxiosError) => {
          toast({
            title: "Algo de errado ocorreu.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          console.log(error.message);
        });
    } else {
      await api
        .post("/products", { ...value, price: +productValue / 100 })
        .then(() => {
          toast({
            title: "Produto criado com sucesso.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          navigate("/products");
        })
        .catch((error: AxiosError) => {
          toast({
            title: "Algo de errado ocorreu.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          console.log(error.message);
        });
    }
  };

  return (
    <Box w={"100%"}>
      <Stack marginBottom={"8"}>
        <Heading>Criar um novo Produto</Heading>
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
            <BreadcrumbLink as={Link} to="/products">
              Produtos
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink as={Link} to="/products/product">
              Produto
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Stack>
      <Divider />
      <Box as={"form"} onSubmit={handleSubmit(onSubmit)} marginTop={"8"}>
        <Stack spacing={"4"}>
          <Input
            name="name"
            label="Nome"
            placeholder="Nome do Produto"
            register={register}
            errors={errors}
            required
          />
          <Stack direction={"row"} spacing={"4"}>
            <NumberInput
              name="quantity"
              type={"number"}
              label="Estoque"
              placeholder="Estoque do produto"
              register={register}
              errors={errors}
              required
            />
            <InputMask
              name="price"
              label="Preço"
              placeholder="Preco do produto"
              register={register}
              defaultValue={0}
              errors={errors}
              required
            />
          </Stack>
          <Input
            name="description"
            label="Descricao"
            placeholder="Descricao do produto"
            register={register}
            errors={errors}
          />

          <Stack direction={"row"} spacing={"4"}>
            <Input
              name="categoryId"
              label="Categoria"
              placeholder="Categoria do produto"
              register={register}
              errors={errors}
              as={Select}
              required
            >
              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.category}
                  </option>
                );
              })}
            </Input>
            {productId && (
              <Switch
                id="isActive"
                height={"100%"}
                name="isActive"
                label="Ativo"
                register={register}
                defaultChecked={getValues("isActive")}
                errors={errors}
                size="lg"
                colorScheme={"blue"}
              />
            )}
          </Stack>
          <Button type="submit" colorScheme={"green"}>
            Salvar
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export { Product };
