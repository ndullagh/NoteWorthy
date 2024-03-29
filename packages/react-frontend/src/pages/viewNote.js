import React, { useState, useEffect } from "react";
import { Box, Button, InputGroup } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { addAuthHeader } from "../auth";
import { AZURE_DOMAIN } from "../config";

export default function ViewNote() {
  const navigate = useNavigate();
  let params = useParams();

  const [note, setNote] = useState([]);

  function fetchNote(note_id) {
    const promise = fetch(
      `${AZURE_DOMAIN}/notes?_id=${note_id}`,
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

  function deleteNote(note_id) {
    const promise = fetch(`${AZURE_DOMAIN}/notes/${note_id}`, {
      method: "DELETE",
      headers: addAuthHeader(
        {
          "Content-Type": "application/json"
        },
        Cookies.get("token")
      )
    });

    return promise;
  }

  function handleDelete() {
    deleteNote(params.note_id)
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
      `/notebook/${params.book_id}/update/${params.note_id}`
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

      <Box
        border={"1px solid #949494"}
        width={"90%"}
        height={"350px"}
        overflow={"scroll"}
        backgroundColor={"#d3d3d3"}
        marginLeft={"5%"}
      >
        <Box
          paddingLeft={"2%"}
          dangerouslySetInnerHTML={{ __html: note.contents }}
        />
      </Box>

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
