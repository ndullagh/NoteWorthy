import React from "react";
import { Link } from "react-router-dom";
import "../styles/notebook.css"


export default function Notebook(props) {
  return (
      <div>
        <Link style={{backgroundColor: props.color}} className="notebook" to={`/${props.slug}`}>{props.title}</Link>
      </div>
  );
}
