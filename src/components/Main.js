import { Box } from "@chakra-ui/react";
import React from "react";
import Navbar from "./Navbar";
import Intro from "./Intro";

function Main(props) {
  return (
    <Box
      display={"flex"}
      flexDirection={{ base: "column", lg: "row" }}
      padding={"50px 50px"}
      maxH={{ lg: "100vh" }}
    >
      <Navbar activeTab={"intro"}></Navbar>
      <Intro></Intro>
    </Box>
  );
}

export default Main;
