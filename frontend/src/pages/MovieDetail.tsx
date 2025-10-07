import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Movie } from "../types/movie";

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/movies/${id}`)
      .then((res) => res.json())
      .then(setMovie);
  }, [id]);

  if (!movie) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
      <p className="text-gray-700">
        Genre:{" "}
        {(typeof movie.genre === "object" && movie.genre.name) || "Unknown"}
      </p>

      <p>Stock: {movie.numberInStock}</p>
      <p>Rental Rate: ${movie.dailyRentalRate}</p>

      <div className="mt-4 space-x-4">
        <Link
          to={`/movies/edit/${movie._id}`}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Edit
        </Link>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={async () => {
            await fetch(`http://localhost:5000/api/movies/${movie._id}`, {
              method: "DELETE",
            });
            window.location.href = "/movies";
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
