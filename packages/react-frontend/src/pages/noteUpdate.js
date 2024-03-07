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
  let params = useParams();

  if(params.note_id){
    useEffect(() => {
        async function fetchNote() {
          try {
            const response = await fetch(`Http://localhost:8000/notes/?_id=${params.note_id}`);
            const data = await response.json();
            return data;
          } catch (error) {
            console.error('Error fetching note:', error);
          }
        }
    
        fetchNote().then((data) => {
            setTitle(data.title);
            setValue(data.contents);
        }).catch((error) => {
            console.error(error);
        });
    }, [params.note_id]); // Fetch note data when note_id changes
    
  }

  
  function updateNote(note) {
    const promise = fetch(`Http://localhost:8000/notes/${params.note_id}`, {
      method: "PATCH",
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
    const updatedNote = {
      title: title,
      contents: value,
      modified: new Date()
    };
    updateNote(updatedNote);
    navigate(`/notebook/${params.book_id}/${params.note_id}`)
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
        <h1>Edit Note.</h1>
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
          Update
        </Button>
        <Button ml={5} variant={"ghost"} onClick={handleCancel}>
          Cancel
        </Button>
      </InputGroup>
    </div>
  );
}
