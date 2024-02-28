import React, { useState, useEffect } from "react";
import Notebook from "../components/notebook";
import { SearchBar } from "../components/searchbar";
import { Stack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Pages() {
  const navigate = useNavigate();
  const handleOnClick = () => navigate("/notebook/pages/edit");
  const [notes, setNotes] = useState([]);

  const notebook = { _id: "65dabc38b6c049d9c15c5450" };

  function fetchNotes(notebook_id) {
    const promise = fetch(
      `http://localhost:8000/notes?notebook_id=${notebook_id}`
    );
    return promise;
  }

  useEffect(() => {
    fetchNotes(notebook._id)
      .then((res) => res.json())
      .then((json) => setNotes(json))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="notePageBody">
      <h1>Notebook Pages</h1>
      {notes.map((note) => (
        <div key={note._id}>
          <Notebook
            title={note.title}
            color="lightskyblue"
            slug={"notebook/pages/view"}
          />
        </div>
      ))}

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
        <Button
          pl={6}
          pr={6}
          variant="solid"
          color={"white"}
          colorScheme="red"
          onClick={handleOnClick}
        >
          Delete Notebook
        </Button>
      </Stack>
    </div>
  );
}
