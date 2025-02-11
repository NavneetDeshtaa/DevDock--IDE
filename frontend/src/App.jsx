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
import About from "./pages/About";
import Contact from "./pages/Contact";

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
      <Route
        path="/"
        element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
      />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/editior/:id"
        element={isLoggedIn ? <Editor /> : <Navigate to="/login" />}
      />
      <Route
        path="/about"
        element={isLoggedIn ? <About /> : <Navigate to="/login" />}
      />
      <Route
        path="/contact"
        element={isLoggedIn ? <Contact /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
};

export default App;
