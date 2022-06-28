import { Box } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../components/Form/Input";
import { api } from "../../services/axios";
import { IProduct } from "../../types";

const Products = () => {
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await api
      .get("/products")
      .then(() => {})
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  const { register, control, handleSubmit } = useForm<any>();

  return (
    <Box w={"100%"}>
      <Input name="product" placeholder="Nome do Produto" register={register} />
    </Box>
  );
};

export { Products };
