import {
  Box,
  Button,
  Divider,
  Heading,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../../components/Form/Input";
import { api } from "../../services/axios";
import { ICategory } from "../../types";

interface CategoryForm {
  category: string;
  slug: string;
}

const Category = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryForm>();

  useEffect(() => {
    if (categoryId) {
      getData();
    }
  }, [categoryId, reset]);

  const getData = async () => {
    await api
      .get(`/categories/${categoryId}`)
      .then(({ data }: AxiosResponse<ICategory>) => {
        reset(data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  const onSubmit = async (value: CategoryForm) => {
    if (categoryId) {
      await api
        .put(`/categories/${categoryId}`, value)
        .then(() => {
          toast({
            title: "Categoria atualizada com sucesso.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          navigate("/categories");
        })
        .catch((error: AxiosError) => {
          toast({
            title: "Algo de errado ocorreu.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          console.log(error.message);
        });
    } else {
      await api
        .post("/categories", value)
        .then(() => {
          toast({
            title: "Categoria criada com sucesso.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          navigate("/categories");
        })
        .catch((error: AxiosError) => {
          toast({
            title: "Algo de errado ocorreu.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          console.log(error.message);
        });
    }
  };

  return (
    <Box w={"100%"}>
      <Stack marginBottom={"8"}>
        <Heading>Criar uma nova Categoria</Heading>
      </Stack>
      <Divider />
      <Box as={"form"} onSubmit={handleSubmit(onSubmit)} marginTop={"8"}>
        <Stack spacing={"4"}>
          <Input
            name="category"
            label="Nome"
            placeholder="Nome da Categoria"
            register={register}
            errors={errors}
            required
          />
          <Input
            name="slug"
            label="Slug"
            placeholder="URL da Categoria"
            register={register}
            errors={errors}
          />
          <Button type="submit" colorScheme={"green"}>
            Salvar
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export { Category };
