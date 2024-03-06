import React, { useState, useEffect } from "react";
import Notebook from "../components/notebook";
import { SearchBar } from "../components/searchbar";
import { Stack, Button } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

export default function Pages() {
  const navigate = useNavigate();
  let params = useParams();
  const handleOnClick = () => navigate(`add`);
  const [notes, setNotes] = useState([]);

  function fetchNotes(notebook_id) {
    const promise = fetch(
      `http://localhost:8000/notes?notebook_id=${notebook_id}`
    );
    return promise;
  }

  function deleteNotebook(notebook_id) {
    const promise = fetch(
      `Http://localhost:8000/notebooks/${notebook_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return promise;
  }

  function handleDelete() {
    deleteNotebook(params.book_id)
      .then((res) => {
        if (res.status !== 204) throw new Error("Not Removed!");
        navigate("/notebook");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchNotes(params.book_id)
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
            to_id={note._id}
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
          onClick={handleDelete}
        >
          Delete Notebook
        </Button>
      </Stack>
    </div>
  );
}
