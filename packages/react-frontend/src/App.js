import React from "react";
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
import NoteUpdate from "./pages/noteUpdate.js";
import PrivateRoutes from "./pages/privateroute";

function App() {
  /*function authorize(headers){
    addAuthHeader(headers,token)
  }*/

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route index element={<Home />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/notebook" element={<Notebooks />} />
            <Route
              path="/notebook/:book_id"
              element={<Pages />}
            />
            <Route
              path="/notebook/:book_id/:note_id"
              element={<ViewNote />}
            />
            <Route
              path="/notebook/:book_id/add/:note_id?"
              element={<NoteEdit />}
            />
            <Route
              path="/notebook/:book_id/update/:note_id?"
              element={<NoteUpdate />}
            />
            <Route
              path="/notebook/results/:key/:book_id?"
              element={<SearchResults />}
            />
            <Route
              path="/notebook/results/:key/:book_id/:note_id?"
              element={<ViewNote />}
            />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
