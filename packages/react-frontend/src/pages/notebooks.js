import React from "react";
import Notebook from "../components/notebook";
import { SearchBar } from "../components/searchbar";
import { Stack, Button } from "@chakra-ui/react";


export default function Notebooks () {
    return (
      <div className="notePageBody">
        <h1>Your Notebooks</h1>
        <Notebook title={"Here is a long title"} slug={""} color = {"lightskyblue"}></Notebook>
        <Notebook title={"Short title"} slug={""} color = {"purple"}></Notebook>

        <Stack padding={5}spacing={4} direction="row" align="center" pos="fixed" bottom={16} width={"100%"} >
          <SearchBar />
          <Button variant="solid" color={"white"} backgroundColor={"#0ba6ff"}>New Notebook</Button>
        </Stack>
      </div>
    );
  }
