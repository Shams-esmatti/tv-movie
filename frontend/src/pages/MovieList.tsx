import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Movie } from "../types/movie";

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<{ _id: string; name: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/movies")
      .then((res) => res.json())
      .then(setMovies);

    fetch("http://localhost:5000/api/genres")
      .then((res) => res.json())
      .then(setGenres);
  }, []);

  // Filtered list
  const filtered = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGenre = !selectedGenre || movie.genre?._id === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Movies</h1>
        <Link
          to="/movies/new"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Movie
        </Link>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex gap-4 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        />

        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="p-2 border rounded w-full md:w-1/4"
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g._id} value={g._id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      {/* Movie List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((movie) => (
          <Link
            to={`/movies/${movie._id}`}
            key={movie._id}
            className="p-4 border rounded hover:shadow-md"
          >
            <h2 className="font-bold">{movie.title}</h2>
            <p className="text-gray-600 dark:text-gray-300">
              {movie.genre?.name}
            </p>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="text-gray-500">No movies found.</p>
        )}
      </div>
    </div>
  );
}
