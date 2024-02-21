import React from "react"

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
  } from '@chakra-ui/react'

  import { ChevronDownIcon } from "@chakra-ui/icons";

  export default function newNoteModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button variant="solid" color={"white"} colorScheme="blue" onClick={onOpen}>New Notebook</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader bg="#323949" fontWeight="bold" position="relative">Create New Notebook</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <FormControl>
                    <FormLabel>Notebook Name</FormLabel>
                    <Input variant={"outline"}/>
                </FormControl>

                <FormControl>
                    <FormLabel>Color</FormLabel>
                    <Select icon={<ChevronDownIcon />} placeholder='Woohoo! A new icon'>
                        <option value='option1'>Red</option>
                        <option value='option2'>Orange</option>
                        <option value='option3'>Green</option>
                        <option value='option1'>Blue</option>
                        <option value='option2'>Purple</option>
                        <option value='option3'>Yellow</option>
                    </Select>
                </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Create
              </Button>
              <Button variant='ghost'>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }