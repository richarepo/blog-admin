import { Route, Routes } from "react-router-dom";
import AddNewAuthor from "./AddNewAuthor";
import Author from "./Author";

const AuthorMain = () => {
  return (
    <Routes>
      <Route path="/" element={<Author/>} />
      <Route path="/new" element={<AddNewAuthor />} />
      <Route path="/:authorId" element={<AddNewAuthor />} />
    </Routes>
  );
};

export default AuthorMain;