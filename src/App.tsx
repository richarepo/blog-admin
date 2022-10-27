import { ChakraProvider, theme } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import SideBar from "./components/sidebar";
import Home from "./components/home";
import CreateNewBlog from "./components/blog/new/CreateNewBlog";
import CreateNewCategory from "./components/category";
import AuthorMain from "./components/author/AuthorMain";
import BlogContent from "./components/home/BlogContent";


export const App = () => (
  <ChakraProvider theme={theme}>
    <SideBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:heading" element={<BlogContent/>} />  
        <Route path="/categories" element={<CreateNewCategory />} />
        <Route path="/author/*" element={<AuthorMain/>} />
        <Route path="/blog" element={<CreateNewBlog />} />   
      </Routes>
    </SideBar>
  </ChakraProvider>
);
