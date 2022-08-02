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

interface MethodForm {
  method: string;
}

const Method = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MethodForm>();

  const onSubmit = async (value: MethodForm) => {
    await api
      .post("/methods", value)
      .then(() => {
        toast({
          title: "Método criada com sucesso.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/methods");
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
  };

  return (
    <Box w={"100%"}>
      <Stack marginBottom={"8"}>
        <Heading>Criar um novo Metodo</Heading>
      </Stack>
      <Divider />
      <Box as={"form"} onSubmit={handleSubmit(onSubmit)} marginTop={"8"}>
        <Stack spacing={"4"}>
          <Input
            name="method"
            label="Nome"
            placeholder="Nome do Metotdo"
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

export { Method };
