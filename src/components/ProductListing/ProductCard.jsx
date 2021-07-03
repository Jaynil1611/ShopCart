import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import { textProps } from "../../utils";

function ProductCard({ id, brand, name, image, size, idealFor, price }) {
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
    </Flex>
  );
}

export default ProductCard;
