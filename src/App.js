import React from "react";
import { Box } from "@chakra-ui/react";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./components/Home";
import ForgotPassword from "./components/ForgotPassword";
import Expenses from "./components/Expenses";
import Urls from "./components/Urls";
import ToDos from "./components/ToDos";
import Main from "./components/Main";

function App() {
  return (
    <Box bgColor={"#222222"} color={"white"} width={"100%"} minHeight={"100vh"}>
      <BrowserRouter>
        <Box>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="forgot-password" element={<ForgotPassword />}></Route>
            <Route path="intro" element={<Main />}></Route>
            <Route path="expenses" element={<Expenses />}></Route>
            <Route path="urls" element={<Urls />}></Route>
            <Route path="to-dos" element={<ToDos />}></Route>
          </Routes>
        </Box>
        <Box maxH={"100vh"}>
          <Outlet></Outlet>
        </Box>
      </BrowserRouter>
    </Box>
  );
}

export default App;
