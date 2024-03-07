import React, { useState, useEffect } from "react";
import { Box, Button, InputGroup } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewNote() {
  const navigate = useNavigate();
  let params = useParams();

  const [note, setNote] = useState([]);

  function fetchNote(note_id) {
    const promise = fetch(
      `https://noteworthy-2.azurewebsites.net/notes?_id=${note_id}`
    );
    return promise;
  }

  function deleteNotebook(note_id) {
    const promise = fetch(
      `https://noteworthy-2.azurewebsites.net/notes/${note_id}`,
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
    deleteNotebook(params.note_id)
      .then((res) => {
        if (res.status !== 204) throw new Error("Not Removed!");
        navigate(`/notebook/${params.book_id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleEdit() {
    navigate(
      `/notebook/${params.book_id}/add/${params.note_id}`
    );
  }

  useEffect(() => {
    fetchNote(params.note_id)
      .then((res) => res.json())
      .then((json) => {
        setNote(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Box pl={"5%"} textAlign={"left"} pb={6} mt={3}>
        <h1 style={{ textAlign: "left", paddingBottom: 10 }}>
          {note.title}
        </h1>
        <h5>
          Last Modified:{" "}
          {new Date(note.modified).toDateString()}
        </h5>
      </Box>
      <center>
        <Box
          border={"1px solid #949494"}
          width={"90%"}
          height={"350px"}
          overflow={"scroll"}
          backgroundColor={"#d3d3d3"}
        >
          <div
            dangerouslySetInnerHTML={{ __html: note.contents }}
          />
        </Box>
      </center>
      <InputGroup ml={"5%"} mt={2}>
        <Button colorScheme="blue" onClick={handleEdit}>
          Edit Note
        </Button>
        <Button colorScheme="red" ml={3} onClick={handleDelete}>
          Delete Note
        </Button>
      </InputGroup>
    </div>
  );
}
