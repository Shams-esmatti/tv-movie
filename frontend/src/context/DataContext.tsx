import React, { createContext, useState, ReactNode } from "react";

// --- Type Definitions ---
export interface Genre {
  id: string;
  name: string;
}

export interface Movie {
  id: string;
  title: string;
  genreId: string;
  numberInStock?: number;
  dailyRentalRate?: number;
}

interface DataContextType {
  genres: Genre[];
  movies: Movie[];
  addGenre: (genre: Genre) => void;
  updateGenre: (genre: Genre) => void;
  deleteGenre: (id: string) => void;
  addMovie: (movie: Movie) => void;
  updateMovie: (movie: Movie) => void;
  deleteMovie: (id: string) => void;
}

// --- Context Creation ---
const DataContext = createContext<DataContextType | undefined>(undefined);

// --- Provider Component ---
interface Props {
  children: ReactNode;
}

export const DataProvider = ({ children }: Props) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);

  const addGenre = (genre: Genre) => setGenres((prev) => [...prev, genre]);
  const updateGenre = (updated: Genre) =>
    setGenres((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
  const deleteGenre = (id: string) =>
    setGenres((prev) => prev.filter((g) => g.id !== id));

  const addMovie = (movie: Movie) => setMovies((prev) => [...prev, movie]);
  const updateMovie = (updated: Movie) =>
    setMovies((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
  const deleteMovie = (id: string) =>
    setMovies((prev) => prev.filter((m) => m.id !== id));

  return (
    <DataContext.Provider
      value={{
        genres,
        movies,
        addGenre,
        updateGenre,
        deleteGenre,
        addMovie,
        updateMovie,
        deleteMovie,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
