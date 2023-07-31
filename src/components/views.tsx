import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import MoviesDetails from "./movieDetails";
import ShowDetails from "./showDetails";

const Views = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="movie/:id" element={<MoviesDetails />}></Route>
      <Route path="show/:id" element={<ShowDetails />}></Route>
    </Routes>
  );
};

export default Views;
