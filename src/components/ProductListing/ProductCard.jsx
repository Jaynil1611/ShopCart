import React from "react";
import { Flex, Image, Text, Button } from "@chakra-ui/react";
import { primaryButtonStyleProps, textProps } from "../../utils";
import { Link } from "react-router-dom";
import { useProduct } from "../../contexts";
import { actions } from "../../reducers";

function ProductCard(product) {
  const { dispatch } = useProduct();

  const addToCart = (product) => {
    dispatch({
      type: actions.ADD_TO_CART,
      payload: { product: { ...product, cartQuantity: 1 } },
    });
  };

  const { brand, name, image, size, idealFor, price } = product;
  return (
    <Flex
      flex={1}
      direction="column"
      border="1px solid"
      borderColor="gray.200"
      wrap="wrap"
      rounded="lg"
    >
      <Flex flex={1} w="100%" justify="center">
        <Image src={image} alt="clothing" fit="contain" h="15rem" w="100%" />
      </Flex>
      <Flex p={"1rem"} direction="column" w="100%">
        <Text isTruncated {...textProps}>
          {name}
        </Text>
        <Text {...textProps} color="gray.600" fontWeight="semibold">
          {brand}
        </Text>
        <Text>₹{price}</Text>
        <Text>For {idealFor}</Text>
        <Text>Size : {Array.isArray(size) ? size.join(",") : size}</Text>
      </Flex>
      <Link to={"/cart"}>
        <Button onClick={() => addToCart(product)} {...primaryButtonStyleProps}>
          Add to Cart
        </Button>
      </Link>
    </Flex>
  );
}

export default ProductCard;
