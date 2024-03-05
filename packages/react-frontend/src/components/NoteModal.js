import React, { useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  Select,
  FormControl,
  FormLabel
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";

export const NoteModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  //states of inputs
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");

  function postBook(notebook) {
    const promise = fetch(
      "Http://noteworthy-2.azurewebsites.net/notebooks/notebooks",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(notebook)
      }
    );

    return promise;
  }

  function updateNotebooks(notebook) {
    postBook(notebook)
      .then((res) => {
        if (res.status !== 201) throw new Error("Not Added!");
        return res.json();
      })
      .then((json) =>
        props.setNotebooks([...props.notebooks, json])
      )
      .catch((error) => {
        console.log(error);
      });
  }

  function onSubmit() {
    const newBook = {
      user: props.user._id,
      name: title,
      color: color
    };
    updateNotebooks(newBook);
  }
  return (
    <>
      <Button
        variant="solid"
        color={"white"}
        colorScheme="blue"
        onClick={onOpen}
      >
        New Notebook
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            color="whitesmoke"
            bg="#323949"
            fontWeight="bold"
            position="relative"
            textAlign={"center"}
          >
            Create New Notebook
          </ModalHeader>
          <ModalCloseButton color="whitesmoke" />
          <ModalBody>
            <FormControl>
              <FormLabel>Notebook Name</FormLabel>
              <Input
                variant={"outline"}
                onChange={(name) =>
                  setTitle(name.currentTarget.value)
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Color</FormLabel>
              <Select
                icon={<ChevronDownIcon />}
                placeholder="Choose Color"
                onChange={(color) =>
                  setColor(color.currentTarget.value)
                }
              >
                <option value="#FF6961">Red</option>
                <option value="#FAC898">Orange</option>
                <option value="#77DD77">Green</option>
                <option value="#BFF4FF">Blue</option>
                <option value="#C3B1E1">Purple</option>
                <option value="#FDFD96">Yellow</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onSubmit}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
