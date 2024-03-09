import { Box, Button, FormLabel, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ValidateFields } from "../utils/utils";
import { webAppBaseUrl } from "../constants/constants";
import ReactFacebookLogin from "react-facebook-login";
import { getGoogleoAuthInfo } from "../utils/api";
import { useGoogleLogin } from "@react-oauth/google";

function Login() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

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

  const userResponseFacebook = (response) => {
    if (response && response.accessToken !== undefined) {
      console.log(response);
    }
  };

  const [loginError, setLoginError] = useState("");

  const [useroAuth2Data, setUseroAuth2Data] = useState({});

  const googleLoginAction = useGoogleLogin({
    onSuccess: (userResponse) =>
      getGoogleoAuthInfo(userResponse.access_token, setUseroAuth2Data),
    onError: (err) =>
      console.log(`Google Authentication failed due to error ${err}`),
  });

  useEffect(() => {
    const baseURL = webAppBaseUrl + "/google/login";
    if (useroAuth2Data.data !== undefined) {
      axios
        .post(baseURL, useroAuth2Data.data)
        .then((res) => {
          if (res.status === 200 && res.data !== null) {
            document.cookie = `token=${res.data.token}; path=/;`;
            navigate("/intro");
          } else {
            alert(
              `error occurred in logging-in with google auth 2 ${res.data}`
            );
          }
        })
        .catch((err) => {
          alert(
            `error occurred in logging-in with google auth 2 : ${err.response.data}`
          );
        })
        .finally(() => {
          console.log("logging-in user with google auth 2 promise completed");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useroAuth2Data]);

  const onSubmitForm = () => {
    const user = {
      email: details.email,
      password: details.password,
    };
    setLoginError("");

    if (ValidateFields(user) === false) {
      setLoginError("please provide valid login details");
      return;
    }

    const baseURL = webAppBaseUrl + "/user/login";
    axios
      .post(baseURL, user)
      .then((res) => {
        if (res.status === 200 && res.data !== null) {
          document.cookie = `token=${res.data.token}; path=/;`;
          navigate("/intro");
        } else {
          alert(`error occurred in logging-in user ${res.data}`);
        }
      })
      .catch((err) => {
        alert(`error occurred in logging-in user: ${err.response.data}`);
      })
      .finally(() => {
        console.log("login user promise completed");
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
      >
        <Box fontSize={"4xl"} marginBottom={"50px"}>
          <Text>Login to Tracker App</Text>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          paddingBottom={"50x"}
          width={{ base: "80%", lg: "60%" }}
        >
          <Button
            bgColor={"#000000"}
            margin={"10px"}
            border={"1px solid #717171"}
            _hover={{ bgColor: "#000000" }}
            padding={"30px"}
            fontSize={{ base: "sm", lg: "xl" }}
            onClick={() => googleLoginAction()}
            marginBottom={"20px"}
          >
            Continue With Google
          </Button>
        </Box>
        <ReactFacebookLogin
          appId="200518769459225"
          autoLoad={false}
          fields="name,email,picture"
          scope="public_profile,user_friends"
          callback={userResponseFacebook}
          icon="fa-facebook"
          version="3.1"
          textButton="Register with Facebook"
        />
        <Box
          display={"flex"}
          flexDirection={"column"}
          marginTop={"40px"}
          width={"60%"}
        >
          <FormLabel>Email or username</FormLabel>
          <Input
            type="email"
            value={details.email}
            onChange={setEmail}
            placeholder="Email or username"
          ></Input>
          <FormLabel marginTop={"20px"}>Password</FormLabel>
          <Input
            type="password"
            value={details.password}
            onChange={setPassword}
            placeholder="Password"
          ></Input>
          <Box height={"50px"} padding={"15px"}>
            {loginError.length !== 0 && (
              <Text color={"red.900"} fontWeight={"extrabold"}>
                {loginError}
              </Text>
            )}
          </Box>
          <Button
            onClick={onSubmitForm}
            bgColor={"#1ED760"}
            color={"black"}
            padding={"25px"}
            borderRadius={"30px"}
            _hover={{
              bgColor: "#1ED760",
              transform: "scale(1.1)",
              fontSize: "20px",
            }}
          >
            Log In
          </Button>
        </Box>
        <Box margin={"20px"} fontSize={"larger"}>
          <a href="forgot-password" alt="tmp">
            Forgot your password ?
          </a>
        </Box>
        <Box margin={"5px"} color={"#A7A7A7"}>
          <hr></hr>
        </Box>
        <Box fontSize={"medium"}>
          <Text display={"inline"} color={"#A7A7A7"}>
            Do't have a account ?{" "}
          </Text>
          <Text display={"inline"}>
            <Link to="/register">Sign up for our To-Do App</Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
