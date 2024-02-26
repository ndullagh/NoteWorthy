import React from "react";
import Notebook from "../components/notebook";
import { SearchBar } from "../components/searchbar";
import { Stack } from "@chakra-ui/react";
import { NoteModal } from "../components/NoteModal";

export default function Notebooks() {
  return (
    <div className="notePageBody">
      <h1>Your Notebooks</h1>
      <Notebook
        title={"Here is a long title"}
        slug={"notebook/pages"}
        color={"lightskyblue"}
      ></Notebook>
      <Notebook
        title={"Short title"}
        slug={"notebook/pages"}
        color={"purple"}
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
        <NoteModal />
      </Stack>
    </div>
  );
}
