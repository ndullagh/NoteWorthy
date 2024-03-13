import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  Input,
  Button,
  InputGroup,
  Stack,
  FormControl,
  FormLabel,
  InputRightElement,
  VStack,
  Heading,
  FormErrorMessage
} from "@chakra-ui/react";
import { signupUser } from "../auth.js";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function SignUp() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  function handleSignup() {
    signupUser(formik.values)
      .then((response) => {
        // Successful sign-up - handle the response or navigate
        console.log("Login Success:", response);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        console.error("Sign-up Error:", error);
        formik.setStatus("error");

        if (error.response && error.response.status === 409) {
          formik.setErrors({
            username: "Username or email already exists",
            email: "Username or email already exists"
          });
        } else {
          formik.setErrors({
            username: "Username or email already exists",
            email: "Username or email already exists"
          });
        }
      });
  }

  const formik = useFormik({
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username required")
        .min(
          6,
          "Username is too short. Make sure it's at least 6 characters."
        ),
      email: Yup.string()
        .email("Invalid email")
        .required("Email required"),
      password: Yup.string()
        .required("Password required")
        .min(
          8,
          "Password is too short. Make sure it's at least 8 characters."
        )
    }),
    initialValues: {
      username: "",
      email: "",
      password: ""
    }
  });

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="69vh"
      backgroundColor="white"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <form onSubmit={formik.handleSubmit}>
          <Stack
            spacing={4}
            w={["full", "md"]}
            p={[8, 10]}
            mt={[20, "10vh"]}
            mx="auto"
            backgroundColor="whiteAlpha.900"
            border={["none", "1px"]}
            borderColor={["", "gray.300"]}
            borderRadius={10}
          >
            <VStack
              spacing={1}
              align={["flex-start", "center"]}
              w="full"
            >
              <Heading color="blue.800">
                Sign up for NoteWorthy
              </Heading>
            </VStack>
            <FormControl
              isInvalid={
                formik.errors.username &&
                formik.touched.username
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
                {formik.errors.username}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                formik.errors.email && formik.touched.email
              }
            >
              <FormLabel>E-mail Address</FormLabel>
              <Input
                rounded="none"
                variant="filled"
                name="email"
                onChange={formik.handleChange}
                placeholder="johndoe@gmail.com"
                onBlur={formik.handleBlur}
              />
              <FormErrorMessage>
                {formik.errors.email}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={
                formik.errors.password &&
                formik.touched.password
              }
            >
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  rounded="none"
                  variant="filled"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={formik.handleChange}
                  placeholder="password"
                  onBlur={formik.handleBlur}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={handleShowClick}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {formik.errors.password}
              </FormErrorMessage>
            </FormControl>
          </Stack>
        </form>

        <Button
          borderRadius={0}
          type="submit"
          variant="solid"
          colorScheme="blue"
        >
          <Link to="#" onClick={() => handleSignup()}>
            Sign up
          </Link>
        </Button>
      </Stack>
    </Flex>
  );
}
