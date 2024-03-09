import { Box, Button, Image } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookieToken, isCookieExpired } from "../utils/utils";
import { useDispatch } from "react-redux";

function Navbar(props) {
  const { activeTab, user } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const isTokenCookieExpired = isCookieExpired("token");
    if (isTokenCookieExpired === true) {
      navigate("/");
    }
    const updatedToken = getCookieToken();
    dispatch({
      type: "SetToken",
      token: updatedToken,
    });
  }, [dispatch, navigate]);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"flex-start"}
      alignItems={"flex-start"}
      maxW={"30%"}
    >
      <Box
        fontSize={"2xl"}
        fontWeight={"extrabold"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        alignContent={"center"}
      >
        <Image
          marginBottom={"20px"}
          maxHeight={"150px"}
          borderRadius={"50%"}
          src={
            user?.image ||
            "https://media.licdn.com/dms/image/D4D03AQHVazDmSnplbA/profile-displayphoto-shrink_400_400/0/1686335890990?e=1715212800&v=beta&t=96pkNAGWy2l5n9Of_N6d0OOJFA2m3U2iFrPmdjvjsw8"
          }
          alt="user-image"
        ></Image>
        <h1>{user?.name || "Anup Yadav"}</h1>
      </Box>
      <Box
        bgColor={"#B89CE2"}
        display={"flex"}
        flexDirection={"column"}
        padding={"2px 2px"}
        borderRadius={"5px"}
        marginTop={"50px"}
      >
        <Button
          bgColor={activeTab === "intro" ? "#1BD760" : "#B89CE2"}
          _hover={{ bgColor: "#1BD760" }}
          fontSize={"3xl"}
          onClick={() => navigate("/intro")}
          padding={"50px"}
        >
          Intro
        </Button>
        <Button
          bgColor={activeTab === "expense" ? "#1BD760" : "#B89CE2"}
          _hover={{ bgColor: "#1BD760" }}
          fontSize={"3xl"}
          marginTop={"5px"}
          onClick={() => navigate("/expenses")}
          padding={"50px"}
        >
          Expenses
        </Button>
        <Button
          bgColor={activeTab === "url" ? "#1BD760" : "#B89CE2"}
          _hover={{ bgColor: "#1BD760" }}
          fontSize={"3xl"}
          marginTop={"5px"}
          onClick={() => navigate("/urls")}
          padding={"50px"}
        >
          Urls
        </Button>
        <Button
          bgColor={activeTab === "to-do" ? "#1BD760" : "#B89CE2"}
          _hover={{ bgColor: "#1BD760" }}
          fontSize={"3xl"}
          marginTop={"5px"}
          onClick={() => navigate("/to-dos")}
          padding={"50px"}
        >
          To-Dos
        </Button>
      </Box>
    </Box>
  );
}

export default Navbar;
