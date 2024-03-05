import React, { useState, useEffect } from "react";
import Notebook from "../components/notebook";
import { SearchBar } from "../components/searchbar";
import { Stack } from "@chakra-ui/react";
import { NoteModal } from "../components/NoteModal";

export default function Notebooks() {
  const [notebooks, setNotebooks] = useState([]);
  const user = { _id: "65d7ef6ca18285827c150bd0" };

  function fetchNotebooks(user_id) {
    const promise = fetch(
      `https://noteworthy-2.azurewebsites.net/notebooks?user_id=${user_id}`
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
