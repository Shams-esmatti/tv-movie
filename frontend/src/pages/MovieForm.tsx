import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Movie } from "../types/movie";

type Genre = {
  _id: string;
  name: string;
};

export default function MovieForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movie, setMovie] = useState<{
    title: string;
    genre: string;
    numberInStock: number;
    dailyRentalRate: number;
  }>({
    title: "",
    genre: "",
    numberInStock: 0,
    dailyRentalRate: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        // 1. Fetch genres
        const genreRes = await fetch("http://localhost:5000/api/genres");
        const genreJson = await genreRes.json();

        const genreArray = Array.isArray(genreJson)
          ? genreJson
          : genreJson.data;
        setGenres(genreArray || []);

        // 2. If editing, fetch movie
        if (id && id !== "new") {
          const movieRes = await fetch(
            `http://localhost:5000/api/movies/${id}`
          );
          const movieJson = await movieRes.json();

          const genreId =
            typeof movieJson.genre === "object"
              ? movieJson.genre._id
              : movieJson.genre;

          // Match only after genres are loaded
          const matched = genreArray.find((g: Genre) => g._id === genreId);

          setMovie({
            title: movieJson.title || "",
            genre: matched ? genreId : "",
            numberInStock: movieJson.numberInStock || 0,
            dailyRentalRate: movieJson.dailyRentalRate || 0,
          });
        }
      } catch (err) {
        console.error("Error loading data", err);
      }
    };

    loadData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url =
      id === "new"
        ? "http://localhost:5000/api/movies"
        : `http://localhost:5000/api/movies/${id}`;

    await fetch(url, {
      method: id === "new" ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie),
    });

    navigate("/movies");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold">
        {id === "new" ? "Add Movie" : "Edit Movie"}
      </h2>

      <input
        type="text"
        placeholder="Title"
        value={movie.title}
        onChange={(e) => setMovie({ ...movie, title: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />

      <select
        value={movie.genre}
        onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Select Genre</option>
        {genres.length === 0 && <option disabled>Loading genres...</option>}
        {genres.map((g) => (
          <option key={g._id} value={g._id}>
            {g.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Stock"
        value={movie.numberInStock}
        onChange={(e) =>
          setMovie({ ...movie, numberInStock: Number(e.target.value) })
        }
        className="w-full p-2 border rounded"
      />

      <input
        type="number"
        placeholder="Rental Rate"
        value={movie.dailyRentalRate}
        onChange={(e) =>
          setMovie({ ...movie, dailyRentalRate: Number(e.target.value) })
        }
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </form>
  );
}
