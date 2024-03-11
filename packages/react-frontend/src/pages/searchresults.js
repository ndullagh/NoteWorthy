import React, { useState, useEffect } from "react";
import Notebook from "../components/notebook";
//import { SearchBar } from "../components/searchbar";
import { Stack } from "@chakra-ui/react";
//import { NoteModal } from "../components/NoteModal";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { addAuthHeader } from "../auth";
import { AZURE_DOMAIN } from "../config";
import { useParams } from "react-router-dom";

export default function SearchResults() {
  const [notes, setNotes] = useState([]);
  const token = Cookies.get("token");
  const [user, setUser] = useState(null);
  let params = useParams();

  if (!user) {
    setUser(jwtDecode(token));
  }

  function fetchUser(username) {
    const promise = fetch(
      `${AZURE_DOMAIN}/users?username=${username}`,
      {
        method: "GET",
        headers: addAuthHeader(
          {
            "Content-Type": "application/json"
          },
          token
        )
      }
    );
    return promise;
  }

  function fetchNotes(user_id, notebook_id, key) {
    if(notebook_id != undefined){
    const promise = fetch(
      `${AZURE_DOMAIN}/notes?notebook_id=${notebook_id}&&user_id=${user_id}&&key=${key}`,
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
    console.log(notebook_id);
    return promise;
    }
    else{
      const promise = fetch(
        `${AZURE_DOMAIN}/notes?user_id=${user_id}&&key=${key}`,
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
      console.log(notebook_id);
      return promise;
    }
  }

  useEffect(() => {
    fetchUser(user.username) //fetch user from username
      .then((res) => res.json())
      .then((json) => {
        fetchNotes(json[0]._id, params.book_id, params.key) //fetch notebooks from user using user_id
          .then((result) => result.json())
          .then((jso) => {
            if (jso)
              //jso is  undefined here
              setNotes(jso);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="notePageBody">
      <h1>Search Result</h1>
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
        
      </Stack>
    </div>
  );
}
