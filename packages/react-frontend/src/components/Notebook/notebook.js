import React from "react";
import { Link } from "react-router-dom";
import "../../styles/notebook.css"

// interface IBook = {
//   title:string;
//   slug:string;
// };

export default function Notebook(props) {
  return (
      <div>
        <Link className="notebook" to={`/${props.slug}`}>{props.title}</Link>
      </div>
  );
}
