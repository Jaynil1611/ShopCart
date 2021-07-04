import React from "react";
import {
  Button,
  Flex,
  Box,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { primaryButtonStyleProps } from "../../utils";
import { GrCart } from "react-icons/all";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <Box
        position="sticky"
        overflow="hidden"
        zIndex={1}
        top="0px"
        bgColor="white"
        boxShadow="md"
        rounded="lg"
      >
        <Flex h="4rem" justify="space-around" align="center">
          <Link to="/">
            <Heading> ShopCart </Heading>
          </Link>
          <Flex>
            <InputGroup w="30vw">
              <InputLeftElement children={<Search2Icon />}></InputLeftElement>
              <Input type="text" placeholder="Search here"></Input>
            </InputGroup>
          </Flex>
          <Flex justifyContent="space-between" w="20vw">
            <Button {...primaryButtonStyleProps} maxW="max">
              Login
            </Button>
            <Button {...primaryButtonStyleProps} maxW="max">
              SignUp
            </Button>
            <Link to={"/cart"}>
              <Button
                leftIcon={<GrCart color="white" />}
                {...primaryButtonStyleProps}
                maxW="max"
              >
                Cart
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default Navbar;
