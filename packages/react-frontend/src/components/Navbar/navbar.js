import React from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navigation() {

  return (
    <Navbar bg="dark" data-bs-theme="dark" fixed="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          NoteWorthy
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end"></Navbar.Collapse>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/notebook">
            My Notes
          </Nav.Link>
          <Nav.Link as={NavLink} to="/signin">
            Sign In
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
