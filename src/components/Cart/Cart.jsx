import { Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { useProduct } from "../../contexts";
import { textProps } from "../../utils";
import CartProduct from "./CartProduct";

function Cart() {
  const {
    state: { cartList, savedForLater },
  } = useProduct();

  const totalPrice = cartList.reduce((total, { cartQuantity, price }) => {
    return total + cartQuantity * Number(price);
  }, 0);

  const discount = Math.floor((totalPrice * 2) / 100);

  return (
    <>
      <SimpleGrid columns={2} templateColumns={"2fr 1fr"} gap={"1rem"}>
        <Flex
          border="1px solid"
          borderColor="gray.200"
          direction="column"
          m={"2rem"}
          ml={"8rem"}
        >
          <Flex m={2} direction="column">
            <Heading m={2} size="lg">
              My Cart
            </Heading>
            {cartList.length > 0 &&
              cartList.map((product) => (
                <CartProduct key={product.id} {...product} type="cart" />
              ))}
            {cartList.length === 0 && (
              <Text
                {...textProps}
                textAlign="center"
                color="gray.600"
                fontWeight="semibold"
              >
                Your Cart is Empty
              </Text>
            )}
          </Flex>
          <Flex m={2} mt={'4rem'} direction="column">
            {savedForLater.length > 0 && (
              <>
                <Heading m={2} size="lg">
                  Saved For Later ({savedForLater.length})
                </Heading>
                {savedForLater.map((product) => (
                  <CartProduct key={product.id} {...product} type="save" />
                ))}
              </>
            )}
          </Flex>
        </Flex>
        {cartList.length > 0 && (
          <Flex
            border="1px solid"
            borderColor="gray.200"
            direction="column"
            m={"2rem"}
          >
            <Heading m={2} size="lg" color="gray.500">
              Price Details
            </Heading>
            <Flex m={2} justify="space-between">
              <Text> Price ({cartList.length} item)</Text>
              <Text>₹{totalPrice}</Text>
            </Flex>
            <Flex m={2} justify="space-between">
              <Text> Discount </Text>
              <Text> - ₹{discount}</Text>
            </Flex>
            <Flex m={2} justify="space-between">
              <Text> Delivery Charges </Text>
              <Text> FREE </Text>
            </Flex>
            <Flex m={2} justify="space-between">
              <Text {...textProps}> Total Amount </Text>
              <Text> ₹{totalPrice - discount} </Text>
            </Flex>
          </Flex>
        )}
      </SimpleGrid>
    </>
  );
}

export default Cart;
