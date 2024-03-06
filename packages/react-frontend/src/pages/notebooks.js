import React, { useState, useEffect } from "react";
import Notebook from "../components/notebook";
import { SearchBar } from "../components/searchbar";
import { Stack } from "@chakra-ui/react";
import { NoteModal } from "../components/NoteModal";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { addAuthHeader } from "../auth";

export default function Notebooks() {
  const [notebooks, setNotebooks] = useState([]);
  const [token, setToken] = useState(Cookies.get("token"));
  console.log(setToken);
  const [user, setUser] = useState(null);
  const [userid, setUserId] = useState({});


  if (!token) {
    useNavigate("/signin");
  }

  if (!user && token) {
    setUser(jwtDecode(token));
  }

  function fetchUser(username) {
    const promise = fetch(
      `http://localhost:8000/users?username=${username}`,
      {
        method: "GET",
        headers: addAuthHeader({
          "Content-Type": "application/json"
        },token),
      }
    );
    return promise;
  }

  function fetchNotebooks(user_id) {
    const promise = fetch(
      `http://localhost:8000/notebooks?user_id=${user_id}`,
      {
        method: "GET",
        headers: addAuthHeader({
          "Content-Type": "application/json"
        },token)
      }
    );
    return promise;
  }

  useEffect(() => {
    fetchUser(user.username)
    .then((res) => res.json())
    .then((json) => {
      setUserId({_id : json[0]._id})
      fetchNotebooks(json[0]._id)})
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
          user={userid}
        />
      </Stack>
    </div>
  );
}
