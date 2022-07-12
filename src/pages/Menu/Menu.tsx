import { Box, Grid, Text } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { api } from "../../services/axios";
import { ICategory, IMeta, IPaginate, IProduct } from "../../types";

const Menu = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>();
  const [meta, setMeta] = useState<IMeta>({
    current_page: 1,
    per_page: 10,
  } as IMeta);

  useEffect(() => {
    const getProducts = async () => {
      await api
        .get(`/products/?page=${meta.current_page}&perPage=${meta.per_page}`)
        .then(({ data }: AxiosResponse<IPaginate<IProduct>>) => {
          setProducts(data.data);
          setMeta(data.meta);
        });
    };
    getProducts();
    getCategories();
  }, [meta.current_page, meta.per_page]);

  const getCategories = async () => {
    await api
      .get(`/categories`)
      .then(({ data }: AxiosResponse<ICategory[]>) => {
        setCategories(data);
        setSelectedCategory(data[1]);
      });
  };

  return (
    <Box maxW={"1280px"} minH="100vh" mx="auto" py={"16"} px={"8"}>
      <Grid w={"100%"}>
        {categories.map((category) => {
          return <Text key={category.id}>{category.category}</Text>;
        })}
      </Grid>
      <Grid w={"100%"}>
        {products.map((product) => {
          return <Text key={product.id}>{product.name}</Text>;
        })}
      </Grid>
    </Box>
  );
};

export { Menu };
