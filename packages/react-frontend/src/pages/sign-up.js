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
  Heading
} from "@chakra-ui/react";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    setFormData(() => ({
      ...FormData,
      [event.target.name]: event.target.value
    }));
  };

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
        <form>
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
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                rounded="none"
                variant="filled"
                name="name"
                onChange={onChangeHandler}
              />
            </FormControl>
            <FormControl>
              <FormLabel>E-mail Address</FormLabel>
              <Input
                rounded="none"
                variant="filled"
                name="email"
                onChange={onChangeHandler}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  rounded="none"
                  variant="filled"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={onChangeHandler}
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
            </FormControl>
          </Stack>
        </form>

        <Button
          borderRadius={0}
          type="submit"
          variant="solid"
          colorScheme="blue"
        >
          <Link to="#" onClick={() => console.log(FormData)}>
            Sign up
          </Link>
        </Button>
      </Stack>
    </Flex>
  );
}
