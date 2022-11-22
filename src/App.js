import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { MainTodo } from "./pages/MainTodo";
import { SignIn } from "./pages/SignIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todolist" element={<MainTodo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
