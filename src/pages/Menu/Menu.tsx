import { AspectRatio, Box, Divider, Flex, Grid, HStack, Image, Stack, Tab, TabList, Tabs, Text } from "@chakra-ui/react";
import Pagination from "@choc-ui/paginator";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Logo } from "../../components/Logo";
import { api } from "../../services/axios";
import { ICategory, IMeta, IPaginate, IProduct } from "../../types";

const Menu = () => {
  const navigate = useNavigate();
  const { categorySlug } = useParams()
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const [meta, setMeta] = useState<IMeta>({
    current_page: 1,
    per_page: 20,
  } as IMeta);

  useEffect(() => {
    getProducts();
    getCategories();
  }, [meta.current_page, meta.per_page, selectedCategory]);

  const getProducts = async () => {
    await api
      .get(`/products/?page=${meta.current_page}&perPage=${meta.per_page}${categorySlug ? `&categorySlug=${categorySlug}` : ''}`)
      .then(({ data }: AxiosResponse<IPaginate<IProduct>>) => {
        setProducts(data.data);
        setMeta(data.meta);
      });
  };

  const getCategories = async () => {
    await api
      .get(`/categories`)
      .then(({ data }: AxiosResponse<ICategory[]>) => {
        setCategories(data);
      });
  };

  return (
    <Box maxW={"1280px"} minH="100vh" mx="auto" px={"4"}>

      <Flex w={"100%"} overflowX={'auto'} gap={'4'} align='center' justifyContent={'center'} py={'8'} >
        <Tabs w={"100%"} justifyContent={'center'} colorScheme={'yellow'}>
          <TabList>
            <Tab onClick={() => {

              navigate(`/menu`)
              setSelectedCategory(null)
            }}>
              Todos
            </Tab>
            {categories.map((category) => {
              return (<Tab key={category.id} onClick={() => {
                navigate(`/menu/${category.slug}`)
                setSelectedCategory(category)
                setMeta({
                  ...meta,
                  current_page: 1,
                  per_page: 20,
                })
              }}>
                {category.category}
              </Tab>)
            })}
          </TabList>
        </Tabs>
      </Flex>
      <Grid w={"100%"}
        gap={6}
        templateColumns={[
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          "repeat(4, 1fr)",
          "repeat(5, 1fr)",
        ]}
      >
        {products.map((product) => {
          return (

            <Stack
              border="1px"
              borderColor={'yellow.400'}
              p={"2"}
              borderRadius={"md"}
              key={product.id}
            // borderColor={order.status === "paid" ? "green" : "red"}
            >
              <Stack w={'100%'} alignItems='center'>
                <Text key={product.id} fontWeight='extrabold' fontSize={'xl'} noOfLines={1}>{product.name}</Text>
              </Stack>

              <AspectRatio maxW='400px' ratio={4 / 3}>
                {product.image ?

                  <Image src={product.image} alt={product.name} objectFit='cover' />
                  :
                  product.category.image ?
                    <Image src={product.category.image} alt={product.category.category} objectFit='cover' /> :
                    <Logo name='Gugas' color={'yellow.400'} />

                }
              </AspectRatio>
              {/* <Stack justifyContent={"space-between"}>
                <Text fontWeight={"bold"}>Descricao:</Text>
                <Text>{product.description}</Text>
              </Stack> */}
              <Divider />
              <HStack justifyContent={"space-between"}>
                <Text fontWeight={"bold"}>Preco:</Text>
                <Text>
                  {Intl.NumberFormat("pt-Br", {
                    style: "currency",
                    currency: "BRL",
                  }).format(product.price.price)}
                </Text>
              </HStack>
            </Stack>
          );
        })}
      </Grid>
      <Flex w="full" py={26} alignItems="center" justifyContent="center">
        <Pagination
          defaultCurrent={1}
          total={meta.total || 10}
          onChange={(currentPage = 0) => {
            setMeta({ ...meta, current_page: currentPage });
          }}
          paginationProps={{ display: "flex" }}
          pageSize={meta.per_page}
        />
      </Flex>
    </Box >
  );
};

export { Menu };
