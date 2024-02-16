// pages/about.js

import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
    /*style={{
				display: "flex",
				justifyContent: "centre",
				alignItems: "centre",
				height: "100vh",
                background: "#dce3e6",
                textAlign: "center",
			
                
			}}*/
    
			<div class="homeTitle">
    <h1>Welcome To <br></br> 
		NoteWorthy</h1>
	<Link to="/sign-in" className="signInLink" style={{color:'white'}}> Start Writing  </Link>
    </div> 

		</div>
	);

};

export default Home;
