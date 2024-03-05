import React, { useState, useEffect } from "react";
import Notebook from "../components/notebook";
import { SearchBar } from "../components/searchbar";
import { Stack } from "@chakra-ui/react";
import { NoteModal } from "../components/NoteModal";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Notebooks() {
  const [notebooks, setNotebooks] = useState([]);
  const [token, setToken] = useState(Cookies.get("token"));
  const [user, setUser] = useState(null);
  console.log(setToken)


  if (!token) {
    useNavigate("/signin")
  }

  if(!user){
    setUser(jwtDecode(token))
    console.log(user)
    console.log(token)
  }


  function fetchNotebooks(username) {
    const promise = fetch(
      `http://localhost:8000/notebooks?username=${username}`
    );
    return promise;
  }

  useEffect(() => {
    fetchNotebooks(user.username)
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
