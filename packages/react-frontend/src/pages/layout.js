import { Outlet } from "react-router-dom";
import React from "react";
import Navigation from "../components/Navbar/navbar"
import "../index.css"


export default function Layout() {
  return (
    <html lang="en">
      <Navigation/>
      <body>
      <Outlet />
      </body>
      <footer>hello</footer>
    </html>
  )
}

