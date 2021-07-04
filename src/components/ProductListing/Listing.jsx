import React from "react";
import { SimpleGrid, Box, Spinner } from "@chakra-ui/react";
import { useProduct } from "../../contexts";
import ProductCard from "./ProductCard";
import {
  getBrandProducts,
  getSizeProducts,
  getIdealProducts,
  getSortedProducts,
} from "../../utils";

function Listing({ loading }) {
  const {
    state: {
      productList,
      sortBy,
      filters: { brand, size, idealFor },
    },
  } = useProduct();

  const sortedProducts = getSortedProducts(productList, sortBy);
  const brandProducts = getBrandProducts(sortedProducts, brand);
  const sizeProducts = getSizeProducts(brandProducts, size);
  const idealProdutcs = getIdealProducts(sizeProducts, idealFor);

  return (
    <>
      <Box ml="300px" my={"4rem"}>
        <SimpleGrid columns={4} mx={"2rem"} gridGap="1.5rem">
          {loading ? (
            <Spinner size="lg" />
          ) : (
            <>
              {idealProdutcs.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </>
          )}
        </SimpleGrid>
      </Box>
      )
    </>
  );
}

export default Listing;
