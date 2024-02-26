import React from "react";
import Notebook from "../components/notebook";
import { SearchBar } from "../components/searchbar";
import { Stack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Pages() {
  const navigate = useNavigate();
  const handleOnClick = () => navigate("/notebook/pages/edit");

  return (
    <div className="notePageBody">
      <h1>Notebook Pages</h1>
      <Notebook
        title={"I am page one"}
        slug={"notebook/pages/view"}
        color={"#636363"}
      ></Notebook>
      <Notebook
        title={"And I am page two"}
        slug={"notebook/pages/view"}
        color={"#636363"}
      ></Notebook>

      <Stack
        padding={5}
        spacing={4}
        direction="row"
        align="center"
        pos="fixed"
        bottom={16}
        width={"100%"}
      >
        <SearchBar />
        <Button
          variant="solid"
          color={"white"}
          colorScheme="blue"
          onClick={handleOnClick}
        >
          Add Page
        </Button>
      </Stack>
    </div>
  );
}
