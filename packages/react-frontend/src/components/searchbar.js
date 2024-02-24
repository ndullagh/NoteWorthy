import React from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

export const SearchBar = () => {
  return (
    <>
      <InputGroup borderRadius={5} size="sm">
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="gray.600" />
        </InputLeftElement>
        <Input
          variant="filled"
          type="text"
          placeholder="Search Keywords..."
          border="1px solid #949494"
        />
        <InputRightAddon p={0} border="none">
          <Button
            variant="solid"
            size="sm"
            borderLeftRadius={0}
            borderRightRadius={3.3}
            border="1px solid #949494"
          >
            Search
          </Button>
        </InputRightAddon>
      </InputGroup>
    </>
  );
};
