// pages/about.js

import React, { useState } from "react";
import { Box } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Checkbox,
  VStack,
  Heading,
  HStack,
  Text
} from "@chakra-ui/react";
import { loginUser } from "../auth.js";
import { useNavigate } from "react-router-dom";


export default function SignIn() {
  const navigate = useNavigate();

  const [FormData, setFormData] = useState({
    username: "",
    password: ""
  });



  function handleLogin() {
    console.log("here");
    loginUser(FormData)
      .then(
        setTimeout(
          () => {navigate("/")},
          1000
        ))}

  const onChangeHandler = (event) => {
    setFormData(() => ({
      ...FormData,
      [event.target.name]: event.target.value
    }));
  };

  return (
    <Box
      w={["full", "md"]}
      p={[8, 10]}
      mt={[20, "10vh"]}
      mx="auto"
      border={["none", "1px"]}
      borderColor={["", "gray.300"]}
      borderRadius={10}
    >
      <VStack spacing={4} align="flext-start" w="full">
        <VStack
          spacing={1}
          align={["flex-start", "center"]}
          w="full"
        >
          <Heading color="blue.800">
            Sign in to NoteWorthy
          </Heading>
        </VStack>

        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            rounded="none"
            variant="filled"
            name="username"
            onChange={onChangeHandler}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            rounded="none"
            variant="filled"
            name="password"
            type="password"
            onChange={onChangeHandler}
          />
        </FormControl>

        <HStack w="full" justify="space-between">
          <Checkbox>Remember me</Checkbox>
          <Button variant="link" colorScheme="blue">
            Forgot Password?
          </Button>
        </HStack>

        <Button
          rounded="none"
          colorScheme="blue"
          w="full"
          onClick={() => handleLogin()}
        >
          <Link>Sign in</Link>
        </Button>
      </VStack>

      <Box p={[2, 6]}>
        <Text align="center">
          New to NoteWorthy?{" "}
          <Link to="/signup" style={{ color: "blue" }}>
            Create an account
          </Link>
        </Text>
      </Box>
    </Box>
  );
}
