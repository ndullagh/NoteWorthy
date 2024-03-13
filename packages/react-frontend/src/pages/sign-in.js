// pages/about.js

import React from "react";
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
  Text,
  FormErrorMessage
} from "@chakra-ui/react";
import { loginUser } from "../auth.js";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function SignIn() {
  const navigate = useNavigate();

  function handleLogin() {
    const { username, password } = formik.values;

    loginUser({ username, password })
      .then((response) => {
        // Successful login - handle the response or navigate
        console.log("Login Success:", response);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        // Login failed - handle the error
        console.error("Login Error:", error);
        formik.setStatus("error");

        if (error.message.includes("Login Error")) {
          formik.setErrors({
            username: "Invalid username or password",
            password: "Invalid username or password"
          });
        } else {
          formik.setErrors({
            username: "Invalid username or password",
            password: "Invalid username or password"
          });
        }
      });
  }

  const formik = useFormik({
    validationSchema: Yup.object({
      username: Yup.string().required("Username required"),
      password: Yup.string().required("Password required")
    }),
    initialValues: {
      username: "",
      password: ""
    }
  });

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

        <FormControl
          isInvalid={
            formik.errors.username && formik.touched.username
          }
        >
          <FormLabel>Username</FormLabel>
          <Input
            rounded="none"
            variant="filled"
            name="username"
            onChange={formik.handleChange}
            placeholder="username"
            onBlur={formik.handleBlur}
          />
          <FormErrorMessage>
            {formik.errors.username ||
            formik.status === "error" ? (
              <Text color="red.500">
                {formik.errors.username || "Login failed"}
              </Text>
            ) : null}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={
            formik.errors.password && formik.touched.password
          }
        >
          <FormLabel>Password</FormLabel>
          <Input
            rounded="none"
            variant="filled"
            name="password"
            type="password"
            onChange={formik.handleChange}
            placeholder="password"
            onBlur={formik.handleBlur}
          />
          <FormErrorMessage>
            {formik.errors.password ||
            formik.status === "error" ? (
              <Text color="red.500">
                {formik.errors.password || "Login failed"}
              </Text>
            ) : null}
          </FormErrorMessage>
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
