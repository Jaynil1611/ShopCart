import React from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  VStack,
  Checkbox,
  Divider,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { getUnique, textProps } from "../../utils";
import { useProduct } from "../../contexts";
import { actions } from "../../reducers";

function Filter() {
  const {
    state: { productList },
    dispatch,
  } = useProduct();

  const updatePriceSort = (sort) => {
    sort === "asc"
      ? dispatch({ type: actions.PRICE_LOW_TO_HIGH })
      : dispatch({ type: actions.PRICE_HIGH_TO_LOW });
  };

  return (
    <Box
      position="fixed"
      overflow="auto"
      borderX="1px solid gray"
      w="300px"
      ps={2}
      h="90vh"
      my="1rem"
    >
      <Heading fontSize="1.5rem">Filters</Heading>
      <Flex direction="column" p="1rem" align="flex-start">
        <Text {...textProps}>Price</Text>
        <RadioGroup>
          <VStack mt={2}>
            <Radio value="1" onChange={() => updatePriceSort("desc")}>
              High To Low
            </Radio>
            <Radio value="2" onChange={() => updatePriceSort("asc")}>
              Low To High
            </Radio>
          </VStack>
        </RadioGroup>
        <Divider my={4} color="gray.400" w="100%" />
        <Text {...textProps}>Brands</Text>
        <FilterCategory productList={productList} category={"brand"} />
        <Text {...textProps}>Size</Text>
        <FilterCategory productList={productList} category={"size"} />
        <Text {...textProps}>Ideal For</Text>
        <FilterCategory productList={productList} category={"idealFor"} />
      </Flex>
    </Box>
  );
}

const FilterCategory = ({ productList, category }) => {
  const { dispatch } = useProduct();

  const addOrRemoveFilter = (category, value) => {
    dispatch({
      type: actions.UPDATE_CATEGORY_FILTERS,
      payload: { category, value },
    });
  };

  return (
    <>
      <VStack mt={2} spacing="2" align="flex-start">
        {getUnique(productList, category).map((elem, index) => (
          <Checkbox
            onChange={() => addOrRemoveFilter(category, elem)}
            colorScheme="accent"
            key={index}
          >
            {elem}
          </Checkbox>
        ))}
      </VStack>
      <Divider my={4} color="gray.400" w="100%" />
    </>
  );
};

export default Filter;
