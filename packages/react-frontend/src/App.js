import React,{useState} from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import Home from "./pages/home";
import Notebooks from "./pages/notebooks";
import Pages from "./pages/pages";
import ViewNote from "./pages/viewNote";
import NoteEdit from "./pages/noteEdit";
import SearchResults from "./pages/searchresults";
import NoPage from "./pages/errorpage";
import Layout from "./pages/layout";
import { loginUser } from "./auth";



function App() {
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  //const [message, setMessage] = useState("");

  function login (formData){
    loginUser(formData,setToken)
    console.log(token);
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route path="/signin" element={<SignIn handleLogin={login} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route index element={<Home />} />
          <Route path="/notebook" element={<Notebooks />} />
          <Route path="/notebook/pages" element={<Pages />} />
          <Route
            path="/notebook/pages/view"
            element={<ViewNote />}
          />
          <Route
            path="/notebook/pages/edit"
            element={<NoteEdit />}
          />
          <Route
            path="/notebook/results"
            element={<SearchResults />}
          />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
