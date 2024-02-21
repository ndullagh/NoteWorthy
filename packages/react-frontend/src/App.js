import React from 'react';
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SignIn from "./pages/sign-in";
import Home from "./pages/home";
import Notebooks from "./pages/notebooks";
import NoPage from "./pages/errorpage";
import Layout from "./pages/layout";


function App() {

  

  return (
    <div className="page-container">
    <div className="content-wrap">
    <Router>
      <Routes>
        <Route path = "/" element={<Layout></Layout>}>
          <Route path="/signin" element={<SignIn />} />
          <Route index element={<Home />} />
          <Route path="/notebook" element={<Notebooks/>}/>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </Router>
    </div>
    </div>
    
  );
}



export default App;
