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
  Button,
} from "@chakra-ui/react";
import { getUnique, primaryButtonStyleProps, textProps } from "../../utils";
import { useProduct } from "../../contexts";
import { actions } from "../../reducers";

function Filter() {
  const {
    state: { productList, sortBy },
    dispatch,
  } = useProduct();

  const updatePriceSort = (sort) => {
    sort === "asc"
      ? dispatch({ type: actions.PRICE_LOW_TO_HIGH })
      : dispatch({ type: actions.PRICE_HIGH_TO_LOW });
  };

  const clearFilters = () => {
    dispatch({ type: actions.CLEAR_ALL_FILTERS });
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
      <Flex m={2} justify="space-between">
        <Heading fontSize="1.5rem">Filters</Heading>
        <Button onClick={clearFilters} {...primaryButtonStyleProps} maxW="max">
          Clear ALL
        </Button>
      </Flex>

      <Flex direction="column" p="1rem" align="flex-start">
        <Text {...textProps}>Price</Text>
        <RadioGroup>
          <VStack mt={2}>
            <Radio
              isChecked={sortBy && sortBy === actions.PRICE_HIGH_TO_LOW}
              onChange={() => updatePriceSort("desc")}
            >
              High To Low
            </Radio>
            <Radio
              isChecked={sortBy && sortBy === actions.PRICE_LOW_TO_HIGH}
              onChange={() => updatePriceSort("asc")}
            >
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
  const {
    state: { filters },
    dispatch,
  } = useProduct();

  const addOrRemoveFilter = (category, value) => {
    dispatch({
      type: actions.UPDATE_CATEGORY_FILTERS,
      payload: { category, value },
    });
  };

  const checkCategory = (value) => {
    return filters[category].includes(value);
  };

  return (
    <>
      <VStack mt={2} spacing="2" align="flex-start">
        {getUnique(productList, category).map((elem, index) => (
          <Checkbox
            onChange={() => addOrRemoveFilter(category, elem)}
            colorScheme="accent"
            key={index}
            isChecked={checkCategory(elem)}
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
