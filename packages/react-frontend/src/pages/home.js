import React from "react";
import { Link } from "react-router-dom";
import "../styles/homepage.css"

const Home = () => {
  return (
	<div className="homePage">
		<main>

				<div className="homeBody">
					<h1 className="homeText">Welcome To <br></br> NoteWorthy</h1>
					<Link to="/signin" className="signInLink" style={{color:'white'}}> Start Writing.  </Link>
				</div> 	


		</main>
	</div>
);
};

export default Home;
