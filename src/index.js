import React, { useState, useEffect } from "react";
import { capsFirst } from "./utils";
import "fontsource-inter/500.css";
import ReactDOM from "react-dom/client";
import theme from "./theme";

import {
  ChakraProvider,
  extendTheme,
  Container,
  Heading,
  Button,
  VStack,
  HStack,
  Text,
  Flex,
  Tag,
  InputGroup,
  InputLeftElement,
  Input,
  Spinner,
  Box,
} from "@chakra-ui/react";

import ChakraCarousel from "./ChakraCarousel";
import { Search2Icon } from "@chakra-ui/icons";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoaging, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      let res = await fetch("https://jsonplaceholder.typicode.com/posts/");
      let resData = await res.json();
      let content = resData.filter(
        (value) => value.userId.toString() === search
      );
      setData(content.length <= 0 ? resData : [...content]);
      setIsLoading(false);
      //can have an if statement if content is empty then show a notification no user
      console.log(content);
    };
    getData();
  }, [search, setSearch]);

  return (
    <ChakraProvider theme={extendTheme(theme)}>
      <Container
        py={8}
        px={0}
        maxW={{
          base: "100%",
          sm: "35rem",
          md: "43.75rem",
          lg: "57.5rem",
          xl: "75rem",
          xxl: "87.5rem",
        }}
      >
        <Box mb={10}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Search2Icon color="gray.300" />}
            />
            <Input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              placeholder="Search"
            />
          </InputGroup>
        </Box>
        {isLoaging ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : (
          <ChakraCarousel gap={32}>
            {data.slice(5, 15).map((post, index) => (
              <Flex
                key={index}
                boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
                justifyContent="space-between"
                flexDirection="column"
                overflow="hidden"
                color="gray.300"
                bg="base.d100"
                rounded={5}
                flex={1}
                p={5}
              >
                <VStack mb={6}>
                  <Heading
                    fontSize={{ base: "xl", md: "2xl" }}
                    textAlign="left"
                    w="full"
                    mb={2}
                  >
                    {capsFirst(post.title)}
                  </Heading>
                  <Text w="full">{capsFirst(post.body)}</Text>
                </VStack>

                <Flex justifyContent="space-between">
                  <HStack spacing={2}>
                    <Tag size="sm" variant="outline" colorScheme="green">
                      User: {post.userId}
                    </Tag>
                    <Tag size="sm" variant="outline" colorScheme="cyan">
                      Post: {post.id - 5}
                    </Tag>
                  </HStack>
                  <Button
                    onClick={() => alert(`Post ${post.id - 5} clicked`)}
                    colorScheme="green"
                    fontWeight="bold"
                    color="gray.900"
                    size="sm"
                  >
                    More
                  </Button>
                </Flex>
              </Flex>
            ))}
          </ChakraCarousel>
        )}
      </Container>
    </ChakraProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
