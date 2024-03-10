import React, { useState, useEffect } from "react";
import Notebook from "../components/notebook";
import { SearchBar } from "../components/searchbar";
import { Stack, Button } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { addAuthHeader } from "../auth";
import { AZURE_DOMAIN } from "../config";

export default function Pages() {
  const navigate = useNavigate();
  let params = useParams();
  const handleOnClick = () => navigate(`add`);
  const [notes, setNotes] = useState([]);

  function fetchNotes(notebook_id) {
    const promise = fetch(
      `${AZURE_DOMAIN}/notes?notebook_id=${notebook_id}`,
      {
        method: "GET",
        headers: addAuthHeader(
          {
            "Content-Type": "application/json"
          },
          Cookies.get("token")
        )
      }
    );
    return promise;
  }

  function deleteNotebook(notebook_id) {
    const promise = fetch(
      `${AZURE_DOMAIN}/notebooks/${notebook_id}`,
      {
        method: "DELETE",
        headers: addAuthHeader(
          {
            "Content-Type": "application/json"
          },
          Cookies.get("token")
        )
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
