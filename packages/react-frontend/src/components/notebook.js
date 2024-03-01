import React from "react";
import { Link } from "react-router-dom";
import "../styles/notebook.css";

export default function Notebook(props) {
  return (
    <div>
      <Link
        style={{
          backgroundColor: props.color,
          color: "#3A3B3C"
        }}
        className="notebook"
        to={`${props.to_id}`}
      >
        {props.title}
      </Link>
    </div>
  );
}
