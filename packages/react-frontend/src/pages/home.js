import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/homepage.css";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { addAuthHeader } from "../auth";

const Home = () => {
  const [decoded, setDecoded] = useState(null);

  if (Cookies.get("token") && !decoded) {
    setDecoded(jwtDecode(Cookies.get("token")));
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
          Cookies.get("token")
        )
      }
    );
    return promise;
  }

  function deleteUser(user_id) {
    const promise = fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/${user_id}`,
      {
        method: "DELETE",
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

  function handleDelete(){
    fetchUser(decoded.username) //fetch user from username
      .then((res) => res.json())
      .then((json) => {
        deleteUser(json[0]._id) //fetch notebooks from user using user_id
          .then(Cookies.remove("token"))
          .then(location.reload())

      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="homePage">
      <main>
        <div className="homeBody">
          {decoded ?  
            <h1 className="greeting">
            Welcome, {decoded.username}
            </h1>

          :           
            <h1 className="homeText">
              Welcome To <br></br> Noteworthy
            </h1>
          }
          <center>
          <Link
            to="/notebook"
            className="button"
            style={{ color: "white" }}
          >
            Start Writing.
          </Link>
          {
            Cookies.get("token") ?
            <>
            <Link
              className="button"
              style={{ color: "white" }}
              onClick={() => 
                {
                  Cookies.remove("token")
                  location.reload()

                }}
              >
              Logout.
            </Link>
            <Link
              className="button"
              style={{ color: "white" }}
              onClick={() => 
                {
                  handleDelete()

                }}
              >
              Delete Account.
            </Link>

            </>
          :
            <></>
          }
          </center>
        </div>
      </main>
    </div>
  );
};

export default Home;
