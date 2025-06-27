import React from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Editor from "./pages/Editor";
import Contact from "./pages/Contact";
import Landing from "./pages/Landing";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        toastClassName="text-lg font-medium font-sans text-gray-800"
      />

      <RouteHandler />
    </BrowserRouter>
  );
};

const RouteHandler = () => {
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false;

  return (
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/projects" element={<Home/>} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/editior/:id"
        element={isLoggedIn ? <Editor /> : <Navigate to="/login" />}
      />
      <Route path="/contact" element={<Contact/>} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
};
export default App;
