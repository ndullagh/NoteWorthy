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
import Pages from "./pages/pages";
import ViewNote from "./pages/viewNote"
import NoteEdit from "./pages/noteEdit"
import SearchResults from "./pages/searchresults"
import NoPage from "./pages/errorpage";
import Layout from "./pages/layout";


function App() {

  /*function getUser() {
    const promise = fetch("Http://localhost:3000/users?name=Zaf", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return promise;
  }*/

  return (

    <Router>
      <Routes>
        <Route path = "/" element={<Layout></Layout>}>
          <Route path="/signin" element={<SignIn />} />
          <Route index element={<Home />} />
          <Route path="/notebook" element={<Notebooks/>}/>
          <Route path="/notebook/pages" element={<Pages/>}/>
          <Route path="/notebook/pages/view" element={<ViewNote/>}/>
          <Route path="/notebook/pages/edit" element={<NoteEdit/>}/>
          <Route path="/notebook/results" element={<SearchResults/>}/>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </Router>

  );
}



export default App;
