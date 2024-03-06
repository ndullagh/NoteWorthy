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
          <Link
            to="/notebook"
            className="signInLink"
            style={{ color: "white" }}
          >

            Start Writing.
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
