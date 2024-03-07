import { React, useState, useEffect } from "react";
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

export default function NoteUpdate() {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true); // New state to indicate loading state
  let params = useParams();

  useEffect(() => {
    async function fetchNote() {
      try {
        const response = await fetch(`Http://localhost:8000/notes/${params.note_id}`);
        const data = await response.json();
        setTitle(data.title);
        setValue(data.contents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching note:', error);
      }
    }

    fetchNote();
  }, [params.note_id]); // Fetch note data when note_id changes

  async function updateNote(note) {
    try {
      const promise = await fetch(`Http://localhost:8000/notes/${params.note_id}`, {
        method: "PATCH", // Use PUT method to update existing note
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
      });
      if (promise.ok) {
        console.log("Note updated successfully");
      } else {
        console.error("Failed to update note");
      }
    } catch (error) {
      console.error('Error updating note:', error);
    }
  }

  const handleCancel = () =>
    navigate(`/notebook/${params.book_id}`);

  function onSubmit() {
    const updatedNote = {
      title: title,
      contents: value
    };
    updateNote(updatedNote);
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

  if (loading) {
    return <div>Loading...</div>; // Render loading state until data is fetched
  }

  return (
    <div>
      <center>
        <h1>Update Note.</h1>
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
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
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
            modules={modules}
            formats={formats}
          />
          ;
        </Box>
      </InputGroup>
      <InputGroup>
        <Button ml={5} colorScheme="blue" onClick={onSubmit}>
          Update
        </Button>
        <Button ml={5} variant={"ghost"} onClick={handleCancel}>
          Cancel
        </Button>
      </InputGroup>
    </div>
  );
}
