import React, { useState, useEffect } from "react";
import Notebook from "../components/notebook";
import { SearchBar } from "../components/searchbar";
import { Stack } from "@chakra-ui/react";
import { NoteModal } from "../components/NoteModal";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { addAuthHeader } from "../auth";
import { AZURE_DOMAIN } from "../config";

export default function Notebooks() {
  const [notebooks, setNotebooks] = useState([]);
  const token = Cookies.get("token")
  const [user, setUser] = useState(null);
  const [userid, setUserId] = useState({});

  if (!user) {
    setUser(jwtDecode(token));
  }
  
  function fetchUser(username) {
    const promise = fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users?username=${username}`,
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

  function fetchNotebooks(user_id) {
    const promise = fetch(
      `${AZURE_DOMAIN}/notebooks?user_id=${user_id}`,
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


  useEffect(() => {
    fetchUser(user.username) //fetch user from username
      .then((res) => res.json())
      .then((json) => {
        setUserId({ _id: json[0]._id }); //set userid state var for reuse
        fetchNotebooks(json[0]._id) //fetch notebooks from user using user_id
          .then((result) => result.json())
          .then((jso) =>{
            if(jso)        //jso is  undefined here
            setNotebooks(jso)
          })
      })
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
