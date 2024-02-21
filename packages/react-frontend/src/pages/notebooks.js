import React from "react";
import Notebook from "../components/Notebook/notebook";

export default function Notebooks () {
    return (
      <div className="notePageBody">
        <h1>Notebook Page</h1>
        <Notebook title={"Here is a long title"} slug={""} color = {"lightskyblue"}></Notebook>
        <Notebook title={"Short title"} slug={""} color = {"purple"}></Notebook>
      </div>
    );
  }
