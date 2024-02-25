import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";

export default function ViewNote() {
  const noteval = { _id: "65dac6256dcd1b5c6f26531b" };

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
      .then((json) => setNote(json))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Box pl={5}>
        <div
          dangerouslySetInnerHTML={{ __html: note.contents }}
        />
      </Box>
    </div>
  );
}
