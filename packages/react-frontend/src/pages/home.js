import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/homepage.css";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const Home = () => {
  const [decoded, setDecoded] = useState(null);

  if (Cookies.get("token") && !decoded) {
    setDecoded(jwtDecode(Cookies.get("token")));
  }
  return (
    <div className="homePage">
      <main>
        <div className="homeBody">
          {decoded ?  
            <h1 className="homeText">
            Welcome <br></br> {decoded.username}
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
