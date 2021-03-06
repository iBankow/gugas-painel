import {
  AspectRatio,
  Button,
  Divider,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import format from "date-fns/format";
import ptBr from "date-fns/locale/pt-BR";
import { Link } from "react-router-dom";
import { IProduct } from "../../../types";

interface ProductModalProps {
  product: IProduct;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  const createdAt = format(new Date(product.createdAt), "dd/MM/yyyy", {
    locale: ptBr,
  });
  const updatedAt = format(new Date(product.updatedAt), "dd/MM/yyyy", {
    locale: ptBr,
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Visualizar de Produto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack divider={<Divider />}>
            {product.image && (
              <AspectRatio ratio={4 / 3} w={"60%"} mx={"auto"} py="4">
                <Image
                  src={product.image}
                  alt={`Image ${product.name}`}
                  title={`Image - ${product.name}`}
                  objectFit="contain"
                />
              </AspectRatio>
            )}
            <Stack direction="row">
              <Text fontWeight={"bold"}>Nome:</Text>
              <Text>{product.name}</Text>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Stack direction="row">
                <Text fontWeight={"bold"}>Estoque:</Text>
                <Text>{product.stock.quantity}</Text>
              </Stack>
              <Stack direction="row">
                <Text fontWeight={"bold"}>Preco:</Text>
                <Text>
                  {Intl.NumberFormat("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  }).format(product.price.price || 0)}
                </Text>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent={"space-between"}>
              <Text fontWeight={"bold"}>Categoria:</Text>
              <Tag colorScheme={"yellow"}>
                {product.category.category.toUpperCase()}
              </Tag>
            </Stack>
            <Stack spacing={0}>
              <Text fontWeight={"bold"}>Descricao:</Text>
              <Text>{product.description}</Text>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Stack direction="row">
                <Text fontWeight={"bold"}>Criado em:</Text>
                <Text>{createdAt}</Text>
              </Stack>
              <Stack direction="row">
                <Text fontWeight={"bold"}>Atualizado em:</Text>
                <Text>{updatedAt}</Text>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent={"space-between"}>
              <Text fontWeight={"bold"}>ID:</Text>
              <Tag>{product.id}</Tag>
            </Stack>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            as={Link}
            to={`product/${product.id}`}
            variant="ghost"
            mr={3}
            colorScheme={"orange"}
          >
            Editar
          </Button>
          <Button colorScheme="red" onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { ProductModal };
