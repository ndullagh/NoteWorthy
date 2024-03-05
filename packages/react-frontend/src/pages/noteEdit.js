import { React, useState } from "react";
import {
  Input,
  InputGroup,
  FormLabel,
  Box,
  Button
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

import ReactQuill from "react-quill";

import "../styles/quill.css";

export default function NoteEdit() {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  let params = useParams();

  function postNote(note) {
    const promise = fetch("Http://localhost:8000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(note)
    });

    return promise;
  }

  const handleCancel = () =>
    navigate(`/notebook/${params.book_id}`);

  function onSubmit() {
    const newNote = {
      notebook: params.book_id,
      title: title,
      contents: value
    };
    postNote(newNote);
    handleCancel();
  }

  const navigate = useNavigate();

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link", "image"],
      ["clean"]
    ]
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image"
  ];

  return (
    <div>
      <center>
        <h1>Create Note.</h1>
      </center>
      <FormLabel
        pt={10}
        pl={5}
        borderColor={"blue"}
        fontSize={"xl"}
        fontFamily={"sans-serif"}
      >
        Title
      </FormLabel>
      <InputGroup pl={5} pb={5}>
        <Input
          borderColor={"#949494"}
          variant="outline"
          w={"55%"}
          onChange={(event) =>
            setTitle(event.currentTarget.value)
          }
        ></Input>
      </InputGroup>
      <InputGroup>
        <Box
          w="90%"
          ml={5}
          mb={10}
          maxH={350}
          border="1px solid #949494"
          borderRadius={6}
        >
          <ReactQuill
            style={{
              height: "350px",
              maxHeight: "450px",
              overflow: "auto"
            }}
            theme="snow"
            value={value}
            onChange={setValue}
            defaultValue={"<h1>dijbisdbvih</h1>"}
            modules={modules}
            formats={formats}
          />
          ;
        </Box>
      </InputGroup>
      <InputGroup>
        <Button ml={5} colorScheme="blue" onClick={onSubmit}>
          Submit
        </Button>
        <Button ml={5} variant={"ghost"} onClick={handleCancel}>
          Cancel
        </Button>
      </InputGroup>
    </div>
  );
}
