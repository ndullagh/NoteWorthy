import React, { useState, useEffect } from "react";
import Notebook from "../components/notebook";
import { SearchBar } from "../components/searchbar";
import { Stack } from "@chakra-ui/react";
import { NoteModal } from "../components/NoteModal";
import { AZURE_DOMAIN } from "../config";

export default function Notebooks() {
  const [notebooks, setNotebooks] = useState([]);
  const user = { _id: "65e6b0e56c16628969cbb24b" };

  function fetchNotebooks(user_id) {
    const promise = fetch(
      `${AZURE_DOMAIN}/notebooks?user_id=${user_id}`
    );
    return promise;
  }

  useEffect(() => {
    fetchNotebooks(user._id)
      .then((res) => res.json())
      .then((json) => setNotebooks(json))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="notePageBody">
      <h1>Your Notebooks</h1>
      {notebooks.map((book) => (
        <div key={book._id}>
          <Notebook
            title={book.name}
            color={book.color}
            to_id={book._id}
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
        <NoteModal
          notebooks={notebooks}
          setNotebooks={setNotebooks}
          user={user}
        />
      </Stack>
    </div>
  );
}
