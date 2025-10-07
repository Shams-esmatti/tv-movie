import React from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import GenresList from "./pages/GenresList";
import GenreForm from "./pages/GenreForm";
import MovieDetail from "./pages/MovieDetail";
import MovieForm from "./pages/MovieForm";
import MovieList from "./pages/MovieList";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="genres" element={<GenresList />} />
        <Route path="genres/new" element={<GenreForm />} />
        <Route path="genres/:id/edit" element={<GenreForm />} />
        <Route path="movies" element={<MovieList />} />
        <Route path="movies/new" element={<MovieForm />} />
        <Route path="movies/:id" element={<MovieDetail />} />
        <Route path="movies/:id/edit" element={<MovieForm />} />
      </Route>
    </Routes>
  );
}
export default App;
