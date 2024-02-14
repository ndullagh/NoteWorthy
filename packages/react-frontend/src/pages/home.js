// pages/about.js

import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div
			/*style={{
				display: "flex",
				justifyContent: "centre",
				alignItems: "centre",
				height: "100vh",
                background: "#dce3e6",
                textAlign: "center",
			
                
			}}*/
		>
			<div class="header">
    <h1>NoteWorthy</h1>
	<Link to="/sign-in" style={{color:'white'}}> Lets Get Started  </Link>
    </div> 

		</div>
	);
};

export default Home;