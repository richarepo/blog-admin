import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import SideBar from "./components/sidebar"
import { Route, Routes } from "react-router-dom";
import Home from "./components/home";
import CreateNewBlog from "./components/blog/new/CreateNewBlog";

export const App = () => (
  <ChakraProvider theme={theme}>
    <SideBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/blog/new" element={<CreateNewBlog />} />
      </Routes>
    </SideBar>
  </ChakraProvider>
);
