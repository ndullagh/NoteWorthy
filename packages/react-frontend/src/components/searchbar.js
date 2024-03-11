import React, { useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export const SearchBar = (props) => {
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState("");

  function onSubmit() {
    if (props.book_id) {
      navigate(
        `/notebook/results/${searchVal}/${props.book_id}`
      );
    } else {
      navigate(`/notebook/results/${searchVal}/undefined`);
    }
  }

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
          onChange={(value) =>
            setSearchVal(value.currentTarget.value)
          }
        />
        <InputRightAddon p={0} border="none">
          <Button
            variant="solid"
            size="sm"
            borderLeftRadius={0}
            borderRightRadius={3.3}
            border="1px solid #949494"
            onClick={onSubmit}
          >
            Search
          </Button>
        </InputRightAddon>
      </InputGroup>
    </>
  );
};
