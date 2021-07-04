import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useProduct } from "../../contexts";
import { actions } from "../../reducers";
import { primaryButtonStyleProps, textProps } from "../../utils";

function CartProduct(product) {
  const { dispatch } = useProduct();
  const { id, brand, name, image, size, idealFor, cartQuantity, price, type } =
    product;

  const updateQuantity = (productId, incOrDec) => {
    dispatch({
      type: actions.UPDATE_CART_QUANTITY,
      payload: { productId, incOrDec },
    });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: actions.REMOVE_FROM_CART, payload: { productId } });
  };

  const saveForLater = (product) => {
    dispatch({ type: actions.ADD_TO_SAVE_FOR_LATER, payload: { product } });
  };

  const moveToCart = (product) => {
    dispatch({
      type: actions.MOVE_FROM_SAVE_FOR_LATER_TO_CART,
      payload: { product },
    });
  };

  const removeFromSave = (productId) => {
    dispatch({
      type: actions.REMOVE_FROM_SAVE_FOR_LATER,
      payload: { productId },
    });
  };

  return (
    <Flex>
      <Flex direction="column">
        <Flex>
          <Flex basis="20%">
            <Image src={image} alt="clothing" h="5rem" />
          </Flex>
          <Flex direction="column">
            <Text isTruncated {...textProps}>
              {name}
            </Text>
            <Text {...textProps} color="gray.600" fontWeight="semibold">
              {brand}
            </Text>
            <Text>₹{price}</Text>
          </Flex>
        </Flex>
        <Flex align="center">
          <Flex my={2} align="center">
            <Button
              me={2}
              {...primaryButtonStyleProps}
              maxW="max"
              onClick={() => updateQuantity(id, false)}
              rounded="full"
              isDisabled={type === "save" || cartQuantity < 2}
            >
              -
            </Button>
            <Text {...textProps} fontWeight="semibold">
              {cartQuantity}
            </Text>
            <Button
              m={2}
              {...primaryButtonStyleProps}
              maxW="max"
              onClick={() => updateQuantity(id, true)}
              rounded="full"
              isDisabled={type === "save"}
            >
              +
            </Button>
          </Flex>
          <Button
            m={2}
            {...primaryButtonStyleProps}
            maxW="max"
            onClick={() =>
              type === "save" ? moveToCart(product) : saveForLater(product)
            }
          >
            {type === "save" ? "Move To Cart" : "Save For Later"}
          </Button>
          <Button
            m={2}
            {...primaryButtonStyleProps}
            maxW="max"
            h={"initial"}
            onClick={() =>
              type === "save" ? removeFromSave(id) : removeFromCart(id)
            }
          >
            {type === "save" ? "Remove From Save" : "Remove From Cart"}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default CartProduct;
