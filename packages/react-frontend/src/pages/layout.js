import { Outlet } from "react-router-dom";
import React from "react";
import Navigation from "../components/Navbar/navbar"
import Footer from "../components/Footer/footer";
import "../index.css"


export default function Layout() {
  return (
    <html lang="en">
      <Navigation/>
      <body>
      <Outlet />
      </body>
      <Footer />
    </html>
  )
}

