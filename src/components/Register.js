import { Box, Button, FormLabel, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ValidateFields } from "../utils/utils";
import { webAppBaseUrl } from "../constants/constants";
import { useGoogleLogin } from "@react-oauth/google";

import FacebookLogin from "react-facebook-login";
import { getGoogleoAuthInfo } from "../utils/api";

function Register(props) {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    imageUrl: "",
  });

  const setName = (e) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      name: e.target.value,
    }));
  };

  const setEmail = (e) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      email: e.target.value,
    }));
  };

  const setPassword = (e) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      password: e.target.value,
    }));
  };

  const setImage = (e) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      imageUrl: e.target.value,
    }));
  };

  const userResponseFacebook = (response) => {
    if (response && response.accessToken !== undefined) {
      console.log(response);
    }
  };

  const [registerError, setRegisterError] = useState("");

  const [useroAuth2Data, setUseroAuth2Data] = useState({});

  const googleRegister = useGoogleLogin({
    onSuccess: (userResponse) =>
      getGoogleoAuthInfo(userResponse.access_token, setUseroAuth2Data),
    onError: (err) =>
      console.log(`Google Authentication failed due to error ${err}`),
  });

  useEffect(() => {
    const baseURL = webAppBaseUrl + "/google/signin";
    if (useroAuth2Data.data !== undefined) {
      axios
        .post(baseURL, useroAuth2Data.data)
        .then((res) => {
          if (res.status === 200 && res.data !== null) {
            document.cookie = `token=${res.data.token}; path=/;`;
            navigate("/intro");
          } else {
            alert(
              `error occurred in registering with google auth 2 ${res.data}`
            );
          }
        })
        .catch((err) => {
          alert(
            `error occurred in registering with google auth 2 : ${err.response.data}`
          );
        })
        .finally(() => {
          console.log("registering user with google auth 2 promise completed");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useroAuth2Data]);

  const onSubmitForm = () => {
    setRegisterError("");

    if (ValidateFields(details) === false) {
      setRegisterError("please provide valid login details");
      return;
    }

    const baseURL = webAppBaseUrl + "/user/register";
    axios
      .post(baseURL, details)
      .then((res) => {
        if (res.status === 200 && res.data !== null) {
          document.cookie = `token=${res.data.token}; path=/;`;
          navigate("/login");
        } else {
          alert(`error occurred in registering user ${res.data}`);
        }
      })
      .catch((err) => {
        alert(`error occurred in registering user : ${err.response.data}`);
      })
      .finally(() => {
        console.log("register user promise completed");
      });
  };

  return (
    <Box
      width={"100%"}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"center"}
      paddingTop={"10%"}
      paddingBottom={"10%"}
      color={"white"}
    >
      <Box
        display={"flex"}
        minW={"50%"}
        flexDirection={"column"}
        alignItems={"center"}
        bgColor={"#000000"}
        borderRadius={"10px"}
        padding={"50px"}
        fontWeight={"extrabold"}
        fontSize={"small"}
        color={"white"}
      >
        <Box>
          <Text fontSize={{ base: "2xl", lg: "5xl" }}>
            Sign up to start <br></br>Advanced Tracking
          </Text>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          marginTop={"30px"}
          width={"60%"}
        >
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            _autofill={"true"}
            value={details.name}
            onChange={setName}
            border={"1px solid #717171"}
          ></Input>
          <FormLabel marginTop={"20px"}>Email</FormLabel>
          <Input
            type="email"
            value={details.email}
            _autofill={"true"}
            onChange={setEmail}
            border={"1px solid #717171"}
          ></Input>
          <FormLabel marginTop={"20px"}>Image Url</FormLabel>
          <Input
            type="text"
            value={details.imageUrl}
            _autofill={"true"}
            onChange={setImage}
            border={"1px solid #717171"}
          ></Input>
          <FormLabel marginTop={"20px"}>Password</FormLabel>
          <Input
            type="password"
            value={details.password}
            _autofill={"true"}
            onChange={setPassword}
            border={"1px solid #717171"}
          ></Input>
          <Box height={"50px"} padding={"15px"}>
            {registerError.length !== 0 && (
              <Text color={"red.900"} fontWeight={"extrabold"}>
                {registerError}
              </Text>
            )}
          </Box>
          <Button
            onClick={onSubmitForm}
            bgColor={"#1ED760"}
            color={"black"}
            padding={"25px"}
            borderRadius={"30px"}
            fontSize={"2xl"}
            marginBottom={"30px"}
            _hover={{
              bgColor: "#1ED760",
              transform: "scale(1.1)",
              fontSize: "20px",
            }}
          >
            Register
          </Button>
        </Box>
        <Box>
          <hr></hr>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          width={{ base: "60%", lg: "60%" }}
        >
          <Button
            bgColor={"#000000"}
            margin={"10px"}
            border={"1px solid #717171"}
            _hover={{ bgColor: "#000000" }}
            padding={"30px"}
            fontSize={{ base: "sm", lg: "xl" }}
            onClick={() => googleRegister()}
            width={"100%"}
            marginBottom="40px"
          >
            Singup with Google
          </Button>
          <FacebookLogin
            appId="200518769459225"
            autoLoad={false}
            fields="name,email,picture"
            scope="public_profile,user_friends"
            callback={userResponseFacebook}
            icon="fa-facebook"
            version="3.1"
            textButton="Register with Facebook"
            marginTop="100px"
          />
        </Box>
        <Box>
          <hr></hr>
        </Box>
        <Box marginTop={"30px"}>
          <Text display={"inline"} color={"#A7A7A7"}>
            Already have a account?
          </Text>
          <Text display={"inline"} marginLeft={"5px"}>
            <Link to="/login">Log in here</Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export default Register;
