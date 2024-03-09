import { Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";

function Intro(props) {
  const introLines = [
    "Track your expenses",
    "Track browser urls",
    "Track your to-dos",
  ];
  const [introIndex, setIntroIndex] = useState(0);

  return (
    <Box
      marginTop={"15%"}
      textAlign={"center"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      width={"50%"}
      marginLeft={"20%"}
    >
      <Box fontSize={"3xl"} fontWeight={"extrabold"}>
        <h1>Welcome to My-Tracker</h1>
      </Box>
      <Box
        fontSize={"4xl"}
        fontWeight={"extrabold"}
        bgColor={"#2F2F2F"}
        margin={"30px"}
        padding={"40px"}
        borderRadius={"50px"}
      >
        <h1>{introLines[introIndex]} </h1>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-around"}
        width={"100%"}
      >
        <Button onClick={() => setIntroIndex((introIndex - 1 + 3) % 3)}>
          Left
        </Button>
        <Button onClick={() => setIntroIndex((introIndex + 1) % 3)}>
          Right
        </Button>
      </Box>
    </Box>
  );
}

export default Intro;
