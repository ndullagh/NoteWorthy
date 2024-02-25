import React, { useState, useEffect } from "react";
import { Box, Button, InputGroup } from "@chakra-ui/react";

export default function ViewNote() {
  const noteval = { _id: "65dad0b16dcd1b5c6f2653d5" };

  const [note, setNote] = useState([]);

  function fetchNote(note_id) {
    const promise = fetch(
      `http://localhost:8000/notes?_id=${note_id}`
    );
    return promise;
  }

  useEffect(() => {
    fetchNote(noteval._id)
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
        <Button colorScheme="blue">Edit Note</Button>
      </InputGroup>
    </div>
  );
}
