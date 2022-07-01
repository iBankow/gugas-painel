import {
  Box,
  Button,
  Divider,
  Heading,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Form/Input";
import { api } from "../../services/axios";

interface CategoryForm {
  category: string;
}

const Category = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryForm>();

  const onSubmit = async (value: CategoryForm) => {
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
          <Button type="submit" colorScheme={"green"}>
            Salvar
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export { Category };
